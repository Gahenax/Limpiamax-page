import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia' as any,
  });
  try {
    const { items, success_url, cancel_url } = await request.json();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          description: item.description,
        },
        unit_amount: Math.round(parseFloat(item.price.replace(',', '.')) * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: success_url + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating Checkout Session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
