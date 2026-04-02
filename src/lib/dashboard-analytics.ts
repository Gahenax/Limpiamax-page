import { google } from 'googleapis';
import path from 'path';

const keyPath = path.join(process.cwd(), 'service-account-key.json');

/**
 * Motor de Analíticas de Gahenax - Extrae y procesa datos de Google Sheets para el Dashboard.
 */
export async function getDashboardData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const salesId = process.env.GOOGLE_SHEET_ID_SALES;
  const contactsId = process.env.GOOGLE_SHEET_ID_CONTACTS;

  if (!salesId || !contactsId) {
    throw new Error('Spreadsheet IDs not configured in .env');
  }

  try {
    // 1. Obtener datos de Ventas
    const salesResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: salesId,
      range: 'Hoja 1!A2:K1000', // Empezamos en A2 para saltar encabezados
    });

    // 2. Obtener datos de Contactos (Leads)
    const contactsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: contactsId,
      range: 'Hoja 1!A2:F1000',
    });

    const salesRows = salesResponse.data.values || [];
    const contactsRows = contactsResponse.data.values || [];

    // --- PROCESAMIENTO DE KPIs ---

    // Ingresos Totales (Columna I - index 8)
    const totalRevenue = salesRows.reduce((acc, row) => acc + (parseFloat(row[8]) || 0), 0);
    
    // Conteo de Leads y Ventas
    const totalSales = salesRows.length;
    const totalLeads = contactsRows.length;
    
    // Tasa de Conversión (Aproximada)
    const conversionRate = totalLeads > 0 ? (totalSales / totalLeads) * 100 : 0;
    
    // Ticket Promedio
    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    // --- PROCESAMIENTO PARA GRÁFICAS (Últimos 7 días) ---
    // Agrupamos por fecha para mostrar tendencias
    const chartDataMap: Record<string, { date: string, sales: number, leads: number }> = {};
    
    // Procesar Ventas
    salesRows.forEach(row => {
      const date = row[1] || 'N/A'; // Columna Fecha (index 1)
      if (!chartDataMap[date]) chartDataMap[date] = { date, sales: 0, leads: 0 };
      chartDataMap[date].sales++;
    });

    // Procesar Leads
    contactsRows.forEach(row => {
      const date = row[0]?.split(',')[0] || 'N/A'; // Columna Fecha (index 0 - timestamp local)
      if (!chartDataMap[date]) chartDataMap[date] = { date, sales: 0, leads: 0 };
      chartDataMap[date].leads++;
    });

    const chartData = Object.values(chartDataMap)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-15); // Últimos 15 puntos de datos

    return {
      kpis: {
        totalRevenue,
        totalSales,
        totalLeads,
        conversionRate,
        averageTicket,
      },
      chartData,
      // Map rows to objects for TypeScript compatibility
      recentActivity: salesRows.slice(-5).reverse().map(row => ({
        id: row[0] || 'N/A',
        date: row[1] || 'N/A',
        customer: row[2] || 'N/A',
        amount: row[8] || '0',
        status: row[7] || 'N/A'
      })),
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
}
