import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { logToSheet, createCalendarEvent } from '@/lib/sheets-logger';
// Build Force Sync ID: 3105-02
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
        let startDateTime: Date;
        
        if (metadata.service_date) {
          // metadata.service_date format: YYYY-MM-DD
          // metadata.service_time format: "09:00 - 13:00 (Mañana)" or similar
          const [year, month, day] = metadata.service_date.split('-').map(Number);
          startDateTime = new Date(year, month - 1, day);
          
          if (metadata.service_time?.includes('Tarde')) {
            startDateTime.setHours(14, 0, 0);
          } else {
            startDateTime.setHours(9, 0, 0);
          }
        } else {
          startDateTime = new Date(); // Fallback
        }
        
        const endDateTime = new Date(startDateTime.getTime() + 4 * 60 * 60 * 1000); // 4h duration

        await createCalendarEvent({
          summary: `Limpieza: ${metadata.customer_name || 'Nuevo Cliente'}`,
          location: metadata.customer_address || 'Dirección no especificada',
          description: `Servicio: ${metadata.category}\nCliente: ${metadata.customer_name}\nFrecuencia: ${metadata.frequency}\nHorario: ${metadata.service_time}`,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString()
        });
        console.log('✅ Servicio agendado en Calendar con fecha real.');
      } catch (calErr) {
        console.error('Failed to create calendar event:', calErr);
      }

      // 3. Enviar Email de Confirmación (Resend)
      if (process.env.RESEND_API_KEY && metadata.customer_email) {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          await resend.emails.send({
            from: 'Limpiamax <hola@limpiamaxweb.com>',
            to: metadata.customer_email,
            subject: '¡Reserva Confirmada en Limpiamax!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h1 style="color: #1a1a1a;">¡Hola ${metadata.customer_name}!</h1>
                <p>Tu reserva para <strong>${metadata.category}</strong> ha sido confirmada con éxito.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <h3 style="color: #1a1a1a;">Detalles del Servicio:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li>📅 <strong>Fecha:</strong> ${metadata.service_date}</li>
                  <li>🕒 <strong>Horario:</strong> ${metadata.service_time}</li>
                  <li>📍 <strong>Dirección:</strong> ${metadata.customer_address}</li>
                </ul>
                <p style="margin-top: 30px;">Un equipo se pondrá en contacto contigo pronto para cualquier detalle adicional.</p>
                <p>Gracias por confiar en <strong>Limpiamax</strong>.</p>
              </div>
            `
          });
          console.log('✅ Email de confirmación enviado via Resend.');
        } catch (emailErr) {
          console.error('Failed to send confirmation email:', emailErr);
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
