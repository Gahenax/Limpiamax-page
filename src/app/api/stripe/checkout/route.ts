import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return NextResponse.json({ error: 'Stripe Secret Key not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
  });
  try {
    const { items, frequency, formData, success_url, cancel_url } = await request.json();

    const isSubscription = frequency && frequency !== 'once';
    
    // Mapping frequencies to Stripe recurring objects
    const recurringMap: Record<string, Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring> = {
      weekly: { interval: 'week' },
      biweekly: { interval: 'week', interval_count: 2 },
      monthly: { interval: 'month' },
    };

    const line_items = items.map((item: { title: string, description?: string, price: string }) => {
      // Apply the same discount factors as in CartProvider for backend consistency
      let amount = Math.round(parseFloat(item.price.replace(',', '.')) * 100);
      if (frequency === 'weekly') amount = Math.round(amount * 0.85);
      else if (frequency === 'biweekly') amount = Math.round(amount * 0.90);
      else if (frequency === 'monthly') amount = Math.round(amount * 0.95);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title + (isSubscription ? ` (${frequency})` : ''),
            description: item.description,
          },
          unit_amount: amount,
          ...(isSubscription && { recurring: recurringMap[frequency] }),
        },
        quantity: 1,
      };
    });

    const mainService = items.length > 0 ? items[0].title : 'Limpieza General';

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      line_items,
      metadata: {
        customer_name: formData.nombre,
        customer_email: formData.email,
        customer_phone: formData.telefono,
        customer_address: `${formData.calle}, ${formData.piso}, ${formData.cp}`,
        service_date: formData.service_date,
        service_time: formData.service_time,
        frequency: frequency || 'once',
        category: mainService
      },
      success_url: success_url + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating Checkout Session:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
