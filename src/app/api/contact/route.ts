import { NextResponse } from 'next/server';
import { logToSheet } from '@/lib/sheets-logger';
// Build Force Sync ID: 3105-01
import { analyzeMessage } from '@/lib/ia_helper';

// --- Rate Limiting (en memoria, se reinicia con deploy) ---
const ipRequestMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 5; // máximo 5 envíos por minuto

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting por IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Demasiadas solicitudes. Inténtalo de nuevo en un minuto.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, website } = body;

    // Honeypot: si el campo "website" tiene valor, es un bot
    if (website) {
      // Devolvemos 200 para no alertar al bot de que fue detectado
      return NextResponse.json({ success: true, message: 'Información recibida correctamente' });
    }

    // Validación básica
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios.' },
        { status: 400 }
      );
    }

    // 1. Analyze message with Vertex AI
    const iaResult = await analyzeMessage(name, phone, email, message || 'No message provided');

    // 2. Log to Google Sheets
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_CONTACTS; 
    const range = 'Hoja 1!A1';
    const timestamp = new Date().toLocaleString();
    
    if (SPREADSHEET_ID) {
      await logToSheet(SPREADSHEET_ID, range, [[
        timestamp,
        name,
        email,
        phone,
        message,
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
