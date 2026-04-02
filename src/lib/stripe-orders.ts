import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
});

export interface BookingOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  services: string[];
  whatsappSent?: boolean;
}

export async function getStripeOrders(limit = 50): Promise<BookingOrder[]> {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit,
      expand: ['data.line_items'],
    });

    return sessions.data
      .filter((session) => session.status === 'complete' && session.metadata?.customerName)
      .map((session) => ({
        id: session.id,
        customerName: session.metadata?.customerName || 'N/A',
        email: session.customer_details?.email || 'N/A',
        phone: session.metadata?.customerPhone || 'N/A',
        address: session.metadata?.customerAddress || 'N/A',
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'eur',
        status: session.payment_status,
        date: new Date(session.created * 1000).toISOString(),
        services: session.metadata?.services ? JSON.parse(session.metadata.services) : [],
        whatsappSent: session.metadata?.whatsappSent === 'true',
      }));
  } catch {
    return [];
  }
}

export async function updateOrderMetadata(sessionId: string, metadata: Record<string, string>) {
  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata,
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}
