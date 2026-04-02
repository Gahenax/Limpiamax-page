import { NextResponse } from 'next/server';
import { logToSheet } from '@/lib/sheets-logger';
import { analyzeMessage } from '@/lib/ia_helper';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

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
