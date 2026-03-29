import { NextResponse } from 'next/server';
import { logToSheet } from '@/lib/sheets_logger';
import { analyzeMessage } from '@/lib/ia_helper';

const MAX_FIELD_LENGTH = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ success: false, error: 'Nombre inválido' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length === 0 || phone.length > 50) {
      return NextResponse.json({ success: false, error: 'Teléfono inválido' }, { status: 400 });
    }
    if (message && (typeof message !== 'string' || message.length > MAX_FIELD_LENGTH)) {
      return NextResponse.json({ success: false, error: 'Mensaje demasiado largo' }, { status: 400 });
    }

    const safeName = name.trim().slice(0, MAX_FIELD_LENGTH);
    const safeEmail = email.trim().slice(0, MAX_FIELD_LENGTH);
    const safePhone = phone.trim().slice(0, 50);
    const safeMessage = message ? message.trim().slice(0, MAX_FIELD_LENGTH) : 'No message provided';

    // 1. Analyze message with Vertex AI
    const iaResult = await analyzeMessage(safeName, safePhone, safeEmail, safeMessage);

    // 2. Log to Google Sheets
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_CONTACTS;
    if (SPREADSHEET_ID) {
      const range = 'Contactos!A1';
      const timestamp = new Date().toLocaleString();

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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
