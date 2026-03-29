import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { logToSheet } from '@/lib/sheets_logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook Error: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Payment successful for session: ${session.id}`);
      
      // Log to Google Sheets if configured
      const spreadsheetId = process.env.GOOGLE_SHEET_ID_SALES;
      if (spreadsheetId) {
        try {
          await logToSheet(spreadsheetId, 'Ventas!A1', [[
            new Date().toISOString(),
            session.id,
            session.customer_details?.email || 'N/A',
            (session.amount_total || 0) / 100,
            session.currency,
            'SUCCESS',
            session.metadata?.customer_name || 'N/A',
            session.metadata?.customer_phone || 'N/A'
          ]]);
        } catch (logErr) {
          console.error('Failed to log sale to sheet:', logErr);
        }
      }

      console.log('Order processed and synced with Admin Hub.');
      break;
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${paymentIntent.id}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
