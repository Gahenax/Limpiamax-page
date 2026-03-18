import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia' as any,
  });
  try {
    const { email } = await request.json();

    const account = await stripe.accounts.create({
      type: 'express',
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return NextResponse.json({
      accountId: account.id,
    });
  } catch (error: any) {
    console.error('Error creating Stripe account:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
