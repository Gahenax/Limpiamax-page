import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { rateLimit, getClientIp } from '@/lib/rate-limiter';

const VALID_FREQUENCIES = ['once', 'weekly', 'biweekly', 'monthly'] as const;
type Frequency = typeof VALID_FREQUENCIES[number];

export async function POST(request: NextRequest) {
  // Rate limit: 10 checkout attempts per minute per IP
  const ip = getClientIp(request);
  if (!rateLimit(ip, 10, 60_000)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Inténtalo de nuevo en un momento.' }, { status: 429 });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
  });

  try {
    const body = await request.json();
    const { items, frequency, formData, success_url, cancel_url } = body;

    // Validate required fields
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Se requieren artículos en el carrito' }, { status: 400 });
    }
    if (!formData || typeof formData !== 'object') {
      return NextResponse.json({ error: 'Datos del formulario inválidos' }, { status: 400 });
    }
    if (!success_url || !cancel_url) {
      return NextResponse.json({ error: 'URLs de redirección requeridas' }, { status: 400 });
    }
    if (frequency && !VALID_FREQUENCIES.includes(frequency as Frequency)) {
      return NextResponse.json({ error: 'Frecuencia inválida' }, { status: 400 });
    }

    // Validate formData fields
    const nombre = String(formData.nombre || '').slice(0, 100);
    const email = String(formData.email || '').slice(0, 200);
    const telefono = String(formData.telefono || '').replace(/[^\d+\s\-()]/g, '').slice(0, 20);
    const calle = String(formData.calle || '').slice(0, 200);
    const piso = String(formData.piso || '').slice(0, 50);
    const cp = String(formData.cp || '').replace(/\D/g, '').slice(0, 10);

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Nombre y email son obligatorios' }, { status: 400 });
    }

    const isSubscription = frequency && frequency !== 'once';

    // Mapping frequencies to Stripe recurring objects
    const recurringMap: Record<string, Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring> = {
      weekly: { interval: 'week' },
      biweekly: { interval: 'week', interval_count: 2 },
      monthly: { interval: 'month' },
    };

    const line_items = items.map((item: { title: string, description?: string, price: string }) => {
      const title = String(item.title || '').slice(0, 200);
      const description = item.description ? String(item.description).slice(0, 500) : undefined;
      // Apply the same discount factors as in CartProvider for backend consistency
      let amount = Math.round(parseFloat(String(item.price).replace(',', '.')) * 100);
      if (frequency === 'weekly') amount = Math.round(amount * 0.85);
      else if (frequency === 'biweekly') amount = Math.round(amount * 0.90);
      else if (frequency === 'monthly') amount = Math.round(amount * 0.95);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: title + (isSubscription ? ` (${frequency})` : ''),
            description,
          },
          unit_amount: amount,
          ...(isSubscription && { recurring: recurringMap[frequency] }),
        },
        quantity: 1,
      };
    });

    const mainService = items.length > 0 ? String(items[0].title || '').slice(0, 200) : 'Limpieza General';

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      line_items,
      metadata: {
        customer_name: nombre,
        customer_email: email,
        customer_phone: telefono,
        customer_address: `${calle}, ${piso}, ${cp}`,
        frequency: frequency || 'once',
        category: mainService,
      },
      success_url: success_url + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la sesión de pago' }, { status: 500 });
  }
}
