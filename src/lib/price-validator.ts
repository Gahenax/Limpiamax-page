/**
 * Gahenax Price Validator — Catálogo Server-Side de Precios
 * 
 * NUNCA confiar en el precio enviado desde el cliente.
 * Este módulo es la FUENTE ÚNICA DE VERDAD para los precios.
 */

export interface ProductPrice {
  id: string;
  title: string;
  basePrice: number; // en céntimos (EUR)
}

// Catálogo canónico de precios — actualizar aquí cuando cambien
const PRICE_CATALOG: ProductPrice[] = [
  // Limpieza de Casa
  { id: 'limpieza-casa-basica', title: 'Limpieza de Casa (Básica)', basePrice: 2200 },
  { id: 'limpieza-casa-profunda', title: 'Limpieza de Casa (Profunda)', basePrice: 3900 },
  { id: 'limpieza-casa-premium', title: 'Limpieza de Casa (Premium)', basePrice: 5900 },
  
  // Limpieza de Fin de Obra
  { id: 'limpieza-fin-obra-piso', title: 'Limpieza Fin de Obra (Piso)', basePrice: 14900 },
  { id: 'limpieza-fin-obra-casa', title: 'Limpieza Fin de Obra (Casa)', basePrice: 24900 },
  
  // Limpieza de Mudanza
  { id: 'limpieza-mudanza-entrada', title: 'Limpieza de Mudanza (Entrada)', basePrice: 8900 },
  { id: 'limpieza-mudanza-salida', title: 'Limpieza de Mudanza (Salida)', basePrice: 8900 },
  
  // Servicios adicionales
  { id: 'limpieza-tapizados', title: 'Limpieza de Tapizados', basePrice: 3500 },
  { id: 'limpieza-cristales', title: 'Limpieza de Cristales', basePrice: 2500 },
];

// Factores de descuento por frecuencia
const FREQUENCY_DISCOUNTS: Record<string, number> = {
  once: 1.0,
  weekly: 0.85,
  biweekly: 0.90,
  monthly: 0.95,
};

/**
 * Valida el precio de un producto contra el catálogo del servidor.
 * Si el título no coincide con ningún producto conocido, intenta un match parcial.
 * 
 * @returns El precio validado en céntimos o null si el producto no existe.
 */
export function validatePrice(title: string, frequency: string = 'once'): number | null {
  // Match exacto primero
  let product = PRICE_CATALOG.find(p => p.title === title);
  
  // Match parcial (el título del cliente puede venir ligeramente diferente)
  if (!product) {
    const normalizedTitle = title.toLowerCase().trim();
    product = PRICE_CATALOG.find(p => 
      normalizedTitle.includes(p.title.toLowerCase()) || 
      p.title.toLowerCase().includes(normalizedTitle)
    );
  }
  
  if (!product) return null;
  
  const discount = FREQUENCY_DISCOUNTS[frequency] ?? 1.0;
  return Math.round(product.basePrice * discount);
}

/**
 * Valida un precio del cliente contra el catálogo.
 * Si el precio del cliente difiere del esperado, devuelve el precio del servidor.
 * Si el producto no existe en el catálogo, devuelve el precio del cliente como fallback
 * (para no bloquear ventas de productos nuevos aún no catalogados).
 */
export function getValidatedAmount(
  title: string, 
  clientPrice: string, 
  frequency: string = 'once'
): number {
  const serverPrice = validatePrice(title, frequency);
  const clientAmount = Math.round(parseFloat(clientPrice.replace(',', '.')) * 100);
  
  if (serverPrice !== null) {
    // Producto conocido: usar precio del servidor (ignorar lo que mandó el cliente)
    if (clientAmount !== serverPrice) {
      console.warn(
        `⚠️ PRICE MISMATCH DETECTED: "${title}" — Client sent ${clientAmount}¢ but server expects ${serverPrice}¢. Using server price.`
      );
    }
    return serverPrice;
  }
  
  // Producto desconocido: log warning y usar precio del cliente como fallback
  console.warn(`⚠️ UNKNOWN PRODUCT: "${title}" not in price catalog. Using client price ${clientAmount}¢ as fallback.`);
  return clientAmount;
}
