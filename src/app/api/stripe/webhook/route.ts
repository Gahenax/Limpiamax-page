import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { logToSheet, createCalendarEvent } from '@/lib/sheets-logger';
import { mapStripeSessionToOrderRow } from '@/lib/orders-kernel';
import { SHEETS_CONFIG } from '@/lib/constants';

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
      
      const spreadsheetId = process.env.GOOGLE_SHEET_ID_SALES;
      const metadata = session.metadata || {};
      
      // 1. Log to Google Sheets (Arquitectura de 11 Columnas Centralizada)
      if (spreadsheetId) {
        try {
          const orderRow = mapStripeSessionToOrderRow(session);
          
          await logToSheet(
            spreadsheetId, 
            SHEETS_CONFIG.RANGE_VENTAS, 
            [orderRow]
          );
          
          console.log(`✅ Venta ${session.id} registrada en Sheets (Kernel v2).`);
        } catch (logErr) {
          console.error('Failed to log sale to sheet:', logErr);
        }
      }

      // 2. Agendar en Google Calendar (Agenda Soberana)
      try {
        const startTime = new Date(); // Fallback si no hay metadata
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

        await createCalendarEvent({
          summary: `Limpieza: ${metadata.customer_name || 'Nuevo Cliente'}`,
          location: metadata.customer_address || 'Dirección no especificada',
          description: `Servicio: ${metadata.category}\nCliente: ${metadata.customer_name}\nFrecuencia: ${metadata.frequency}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        });
        console.log('✅ Servicio agendado en Calendar.');
      } catch (calErr) {
        console.error('Failed to create calendar event:', calErr);
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
