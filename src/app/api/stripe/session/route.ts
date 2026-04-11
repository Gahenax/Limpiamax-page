import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
}) : null;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe configuration error' }, { status: 500 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Solo devolvemos datos no sensibles para la UI
    return NextResponse.json({
      customer_name: session.metadata?.customer_name,
      service_date: session.metadata?.service_date,
      service_time: session.metadata?.service_time,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      category: session.metadata?.category,
    });
  } catch (err: unknown) {
    console.error('Error retrieving session:', err);
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
}
