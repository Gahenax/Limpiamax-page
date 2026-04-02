import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-expect-error - overriding strict apiVersion typing
    apiVersion: '2024-12-18.acacia',
  });
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    const accountSession = await stripe.accountSessions.create({
      account: accountId,
      components: {
        payments: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
          },
        },
        account_onboarding: {
          enabled: true,
        },
      },
    });

    return NextResponse.json({
      client_secret: accountSession.client_secret,
    });
  } catch {
    return NextResponse.json({ error: 'Error al crear la sesión' }, { status: 500 });
  }
}
