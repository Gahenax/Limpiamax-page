import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const keyPath = path.join(process.cwd(), 'service-account-key.json');
const FAILED_LOG_PATH = path.join(process.cwd(), 'failed_webhooks.json');

/**
 * Auntenticación centralizada para el Bot Gahenax Limpiamax (TS Edition).
 */
function getAuth() {
  return new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/calendar'
    ],
  });
}

/**
 * Guarda un evento fallido localmente para re-intento manual/automático posterior.
 * (Mecanismo de Resiliencia Soberana)
 */
async function logFailedEvent(type: string, data: Record<string, unknown>, error: unknown) {
  const entry = {
    timestamp: new Date().toISOString(),
    type,
    data,
    error: error instanceof Error ? error.message : String(error),
  };

  try {
    let currentLog = [];
    if (fs.existsSync(FAILED_LOG_PATH)) {
      const content = fs.readFileSync(FAILED_LOG_PATH, 'utf8');
      currentLog = JSON.parse(content);
    }
    currentLog.push(entry);
    fs.writeFileSync(FAILED_LOG_PATH, JSON.stringify(currentLog, null, 2));
    console.error(`🛡️ Evento fallido guardado en ${FAILED_LOG_PATH}`);
  } catch (fsErr) {
    console.error('CRITICAL: Failed to write to resilience log:', fsErr);
  }
}

/**
 * Logs data to a Google Sheet using Service Account authentication.
 */
export async function logToSheet(spreadsheetId: string | undefined, range: string, values: (string | number)[][]) {
  if (!spreadsheetId) {
    console.warn('Google Sheets Sync skipped: Spreadsheet ID not provided.');
    return null;
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({version: 'v4', auth});
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Error logging to Google Sheets:', error);
    await logFailedEvent('SHEETS_SYNC', { spreadsheetId, range, values }, error);
    throw error;
  }
}

/**
 * Crea un evento en Google Calendar.
 */
export async function createCalendarEvent(eventDetails: {
  summary: string;
  location?: string;
  description?: string;
  startTime: string;
  endTime: string;
}, calendarId = 'primary') {
  try {
    const auth = getAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary: eventDetails.summary,
      location: eventDetails.location || '',
      description: eventDetails.description || '',
      start: {
        dateTime: eventDetails.startTime,
        timeZone: 'Europe/Madrid',
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: 'Europe/Madrid',
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    console.log('✅ Evento agendado en Calendar:', response.data.htmlLink);
    return response.data;
  } catch (error: unknown) {
    console.error('Error creating calendar event:', error);
    await logFailedEvent('CALENDAR_SYNC', { eventDetails, calendarId }, error);
    throw error;
  }
}
