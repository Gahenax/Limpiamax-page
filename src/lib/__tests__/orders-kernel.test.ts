import { test, describe } from 'node:test';
import assert from 'node:assert';
import { mapStripeSessionToOrderRow } from '../orders-kernel.ts';

describe('mapStripeSessionToOrderRow', () => {
  test('should map a session with full metadata correctly', () => {
    const mockSession = {
      id: 'cs_test_123',
      created: 1710000000,
      amount_total: 5000,
      payment_status: 'paid',
      customer_details: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      metadata: {
        service_date: '2024-03-20',
        service_time: '10:00',
        customer_name: 'Jane Doe',
        customer_phone: '+34600000000',
        customer_address: 'Calle Mayor 1, Madrid',
        category: 'Limpieza Profunda',
        frequency: 'Semanal'
      }
    } as any;

    const result = mapStripeSessionToOrderRow(mockSession);

    assert.strictEqual(result[0], 'cs_test_123'); // ID
    assert.strictEqual(result[1], '2024-03-20'); // Fecha
    assert.strictEqual(result[2], '10:00'); // Hora
    assert.strictEqual(result[3], 'Jane Doe'); // Nombre (from metadata)
    assert.strictEqual(result[4], 'john@example.com / +34600000000'); // Email / Tel
    assert.strictEqual(result[5], 'Calle Mayor 1, Madrid'); // Ubicación
    assert.strictEqual(result[6], 'Limpieza Profunda'); // Servicio
    assert.strictEqual(result[7], 'Semanal'); // Frecuencia
    assert.strictEqual(result[8], 50); // Monto
    assert.strictEqual(result[9], 'PAGADO'); // Estado
    assert.strictEqual(result[10], 'Stripe'); // Método
  });

  test('should use fallbacks when metadata is missing', () => {
    const createdTimestamp = 1710000000;
    const expectedDate = new Date(createdTimestamp * 1000).toLocaleDateString('es-ES');

    const mockSession = {
      id: 'cs_test_456',
      created: createdTimestamp,
      amount_total: null,
      payment_status: 'unpaid',
      customer_details: {
        name: 'John Fallback',
        email: 'fallback@example.com'
      },
      metadata: {}
    } as any;

    const result = mapStripeSessionToOrderRow(mockSession);

    assert.strictEqual(result[1], expectedDate); // Fecha fallback
    assert.strictEqual(result[2], 'A convenir'); // Hora fallback
    assert.strictEqual(result[3], 'John Fallback'); // Nombre fallback from customer_details
    assert.strictEqual(result[4], 'fallback@example.com / N/A'); // Phone fallback
    assert.strictEqual(result[5], 'Ubicación pendiente'); // Ubicación fallback
    assert.strictEqual(result[6], 'Limpieza General'); // Servicio fallback
    assert.strictEqual(result[7], 'Venta Web'); // Frecuencia fallback
    assert.strictEqual(result[8], 0); // Amount fallback
    assert.strictEqual(result[9], 'PENDIENTE'); // Estado fallback
  });

  test('should handle minimal session data', () => {
    const mockSession = {
      id: 'cs_test_789',
      created: 1710000000,
    } as any;

    const result = mapStripeSessionToOrderRow(mockSession);

    assert.strictEqual(result[0], 'cs_test_789');
    assert.strictEqual(result[3], 'Cliente Limpiamax'); // Absolute fallback
    assert.strictEqual(result[4], 'N/A / N/A'); // Email and phone fallbacks
  });
});
