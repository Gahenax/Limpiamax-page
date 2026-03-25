import { google } from 'googleapis';
import path from 'path';

const keyPath = path.join(process.cwd(), 'service-account-key.json');
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

/**
 * Logs data to a Google Sheet.
 * @param {string} spreadsheetId The ID of the spreadsheet.
 * @param {string} range The range to append to (e.g., 'Sheet1!A1').
 * @param {Array} values Array of values to append (e.g., [['Name', 'Email', 'Message']]).
 */
export async function logToSheet(spreadsheetId, range, values) {
  try {
    const sheets = google.sheets({version: 'v4', auth});
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    throw error;
  }
}
