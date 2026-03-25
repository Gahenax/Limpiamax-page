import { NextResponse } from 'next/server';
import { logToSheet } from '@/lib/sheets_logger';
import { analyzeMessage } from '@/lib/ia_helper';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 1. Analyze message with Vertex AI
    const iaResult = await analyzeMessage(name, phone, email, message || 'No message provided');

    // 2. Log to Google Sheets
    // Replace with your actual Spreadsheet ID
    const SPREADSHEET_ID = '1_xYv-L2yG-uN6Aov7-j5ZqW9V4ZzY07vWzY07vWzY0'; 
    const range = 'Contactos!A1';
    const timestamp = new Date().toLocaleString();
    
    await logToSheet(SPREADSHEET_ID, range, [[
      timestamp,
      name,
      email,
      phone,
      message,
      iaResult.category
    ]]);

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
