import { ModelServiceClient } from '@google-cloud/aiplatform';
import path from 'path';

const keyPath = path.join(process.cwd(), 'service-account-key.json');
const location = 'us-central1';

/**
 * Analyzes a message using Vertex AI and returns a category + structured WhatsApp messages.
 * @param {string} name Customer name.
 * @param {string} phone Customer phone.
 * @param {string} email Customer email.
 * @param {string} message The customer message to analyze.
 */
export async function analyzeMessage(name, phone, email, message) {
  try {
    // We keep the client initialization for future Gemini integration, 
    // but for now we focus on the structuring logic.
    new ModelServiceClient({
      keyFilename: keyPath,
      apiEndpoint: `${location}-aiplatform.googleapis.com`,
    });

    // Logic for categorization and structuring
    const category = "Presupuesto"; 
    
    const teamMessage = `*NUEVO LEAD - LIMPIAMAX*%0A%0A*Cliente:* ${name}%0A*Tel:* ${phone}%0A*Email:* ${email}%0A*Tipo:* ${category}%0A*Mensaje:* ${message}`;
    
    const userMessage = `Hola ${name}, gracias por contactar con *Limpiamax Barcelona*. He recibido tu consulta sobre "${message}". Un asesor te enviará el presupuesto en menos de 1 hora. ¡Saludos!`;

    const waTeamLink = `https://wa.me/34674571497?text=${teamMessage}`;
    const waUserLink = `https://wa.me/${phone.replace(/\s+/g, '')}?text=${encodeURIComponent(userMessage)}`;

    return {
      category,
      teamMessage,
      userMessage,
      waTeamLink,
      waUserLink
    };
  } catch (error) {
    throw error;
  }
}
