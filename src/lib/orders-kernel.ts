import Stripe from 'stripe';

/**
 * Arquitectura Industrial de 11 Columnas (Sovereign Schema)
 * A: ID | B: Fecha | C: Hora | D: Nombre | E: Contacto | F: Ubicación | G: Servicio | H: Frecuencia | I: Monto | J: Estado | K: Método
 */
export type OrderRow = [
  string, // A: ID Transacción
  string, // B: Fecha del Servicio
  string, // C: Hora
  string, // D: Nombre del Cliente
  string, // E: Email / Teléfono
  string, // F: Ubicación / Dirección
  string, // G: Servicio Solicitado (SSOT)
  string, // H: Frecuencia (Sub-categoría)
  number, // I: Monto Total €
  string, // J: Estado de Pago
  string  // K: Método de Pago
];

/**
 * El "Cerebro" de Mapeo de Limpiamax.
 * Convierte una sesión de Stripe en una fila íntegra para Google Sheets.
 */
export function mapStripeSessionToOrderRow(session: Stripe.Checkout.Session): OrderRow {
  const metadata = session.metadata || {};
  
  // 1. Extracción de Tiempos
  const serviceDate = metadata.service_date || new Date(session.created * 1000).toLocaleDateString('es-ES');
  const serviceTime = metadata.service_time || 'A convenir';
  
  // 2. Datos del Cliente
  const customerName = metadata.customer_name || session.customer_details?.name || 'Cliente Limpiamax';
  const email = session.customer_details?.email || 'N/A';
  const phone = metadata.customer_phone || 'N/A';
  const customerEmailPhone = `${email} / ${phone}`;
  
  // 3. Logística y Servicio
  const location = metadata.customer_address || 'Ubicación pendiente';
  const serviceRequested = metadata.category || 'Limpieza General';
  const frequency = metadata.frequency || 'Venta Web';
  
  // 4. Finanzas
  const totalAmount = (session.amount_total || 0) / 100;
  const paymentStatus = session.payment_status === 'paid' ? 'PAGADO' : 'PENDIENTE';
  const paymentMethod = 'Stripe';

  return [
    session.id,
    serviceDate,
    serviceTime,
    customerName,
    customerEmailPhone,
    location,
    serviceRequested,
    frequency,
    totalAmount,
    paymentStatus,
    paymentMethod
  ];
}
