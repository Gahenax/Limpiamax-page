/**
 * Barcelona Address Sanitizer — Sovereign Logistics Module
 * Higieniza y normaliza direcciones para el equipo de despacho de Limpiamax.
 */

export interface SanitizedAddress {
  original: string;
  normalized: string;
  district: string | null;
  postalCode: string | null;
  isBarcelona: boolean;
}

const BARCELONA_DISTRICTS = [
  'Ciutat Vella',
  'Eixample',
  'Sants-Montjuïc',
  'Les Corts',
  'Sarrià-Sant Gervasi',
  'Gràcia',
  'Horta-Guinardó',
  'Nou Barris',
  'Sant Andreu',
  'Sant Martí',
];

export function sanitizeBarcelonaAddress(address: string): SanitizedAddress {
  let normalized = address.trim();
  
  // 1. Limpieza básica de puntuación y capitalización
  normalized = normalized.replace(/\s+/g, ' ');
  
  // 2. Extracción de Código Postal (Barcelona empieza por 080)
  const pcMatch = normalized.match(/\b080\d{2}\b/);
  const postalCode = pcMatch ? pcMatch[0] : null;

  // 3. Identificación de Distrito (Búsqueda por palabras clave)
  let detectedDistrict = null;
  for (const district of BARCELONA_DISTRICTS) {
    if (new RegExp(district, 'i').test(normalized)) {
      detectedDistrict = district;
      break;
    }
  }

  // 4. Lógica de "Detección Inteligente" para barrios comunes sin el nombre del distrito
  if (!detectedDistrict) {
    if (/sants|poble\s*sec/i.test(normalized)) detectedDistrict = 'Sants-Montjuïc';
    if (/pedralbes|maternitat/i.test(normalized)) detectedDistrict = 'Les Corts';
    if (/poblenou|besos|vila\s*olimpica/i.test(normalized)) detectedDistrict = 'Sant Martí';
    if (/sagrada\s*familia|fort\s*pienc|dreta/i.test(normalized)) detectedDistrict = 'Eixample';
    if (/gotic|raval|barceloneta/i.test(normalized)) detectedDistrict = 'Ciutat Vella';
  }

  const isBarcelona = /barcelona|bcn/i.test(normalized) || !!postalCode || !!detectedDistrict;

  return {
    original: address,
    normalized,
    district: detectedDistrict,
    postalCode,
    isBarcelona,
  };
}
