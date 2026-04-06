import { google } from 'googleapis';
import axios from 'axios';
import path from 'path';

/**
 * GoogleAdsService
 * 
 * Orquestador de conversiones offline para Limpiamax.
 * Convierte clics de anuncios (gclid) en ventas reales reportadas a Google Ads.
 */
export class GoogleAdsService {
  private static auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;
  private static developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  private static customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, ''); // Sin guiones
  private static apiVersion = 'v19';

  private static async getAccessToken() {
    if (!this.auth) {
      this.auth = new google.auth.GoogleAuth({
        keyFile: path.join(process.cwd(), 'secrets', 'service-account-key.json'),
        scopes: ['https://www.googleapis.com/auth/adwords'],
      });
    }
    const client = await this.auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  }

  /**
   * Reporta una conversión de "Compra" a Google Ads.
   */
  static async reportConversion(params: {
    gclid: string;
    conversionActionName?: string; // e.g. "customers/123/conversionActions/456"
    amount: number;
    currencyCode?: string;
    conversionDateTime?: string; // Format: yyyy-mm-dd hh:mm:ss+|-hh:mm
  }) {
    if (!this.developerToken || !this.customerId) {
        console.warn('⚠️ Google Ads API: Faltan credenciales (Token o Customer ID) en .env');
        return;
    }

    if (!params.gclid) {
        console.log('ℹ️ No GCLID provided, skipping Google Ads reporting.');
        return;
    }

    try {
      const accessToken = await this.getAccessToken();
      const endpoint = `https://googleads.googleapis.com/${this.apiVersion}/customers/${this.customerId}:uploadClickConversions`;

      // Definir la acción de conversión por defecto si no viene
      // NOTA: El usuario deberá crear esta acción en su panel de Google Ads y darnos el ID
      const conversionAction = params.conversionActionName || process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;

      if (!conversionAction) {
          console.warn('⚠️ Google Ads API: Falta GOOGLE_ADS_CONVERSION_ACTION_ID en .env');
          return;
      }

      const payload = {
        conversions: [
          {
            gclid: params.gclid,
            conversionAction: conversionAction,
            conversionDateTime: params.conversionDateTime || new Date().toISOString().replace('T', ' ').split('.')[0] + '+00:00',
            conversionValue: params.amount,
            currencyCode: params.currencyCode || 'EUR',
          },
        ],
        partialFailure: true,
      };

      const response = await axios.post(endpoint, payload, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': this.developerToken,
          'login-customer-id': this.customerId, // Generalmente el mismo MCC o la cuenta operativa
        },
      });

      if (response.data.partialFailureError) {
        console.error('❌ Google Ads API Partial Failure:', JSON.stringify(response.data.partialFailureError, null, 2));
      } else {
        console.log(`✅ Conversión reportada exitosamente a Google Ads via API (${params.gclid})`);
      }

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Error reporting to Google Ads:', error.response?.data || error.message);
      } else {
        console.error('❌ Unknown error reporting to Google Ads:', error);
      }
      throw error;
    }
  }
}
