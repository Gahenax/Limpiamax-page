import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-expect-error - overriding strict apiVersion typing
    apiVersion: '2024-12-18.acacia',
  });
  try {
    const body = await request.json();
    const rawEmail = String(body.email || '').trim().slice(0, 200);

    if (!rawEmail || !rawEmail.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const account = await stripe.accounts.create({
      type: 'express',
      email: rawEmail,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return NextResponse.json({
      accountId: account.id,
    });
  } catch {
    return NextResponse.json({ error: 'Error al crear la cuenta' }, { status: 500 });
  }
}
