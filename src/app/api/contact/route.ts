import { NextRequest, NextResponse } from 'next/server';
import { logToSheet } from '@/lib/sheets-logger';
// Build Force Sync ID: 3105-01
import { analyzeMessage } from '@/lib/ia_helper';
import { rateLimit, getClientIp } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  // Rate limit: 5 contact form submissions per minute per IP
  const ip = getClientIp(request);
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Inténtalo de nuevo en un momento.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Nombre requerido' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 });
    }

    // Sanitize inputs
    const safeName = String(name).slice(0, 100).trim();
    const safeEmail = String(email).slice(0, 200).trim();
    const safePhone = String(phone || '').replace(/[^\d+\s\-()]/g, '').slice(0, 20);
    const safeMessage = String(message || '').slice(0, 1000).trim();

    // 1. Analyze message with Vertex AI
    const iaResult = await analyzeMessage(safeName, safePhone, safeEmail, safeMessage || 'No message provided');

    // 2. Log to Google Sheets
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_CONTACTS;
    const range = 'Hoja 1!A1';
    const timestamp = new Date().toLocaleString();

    if (SPREADSHEET_ID) {
      await logToSheet(SPREADSHEET_ID, range, [[
        timestamp,
        safeName,
        safeEmail,
        safePhone,
        safeMessage,
        iaResult.category
      ]]);
    }

    return NextResponse.json({
      success: true,
      message: 'Información recibida correctamente',
      category: iaResult.category,
      waTeamLink: iaResult.waTeamLink,
      waUserLink: iaResult.waUserLink
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Error al procesar la solicitud'
    }, { status: 500 });
  }
}
