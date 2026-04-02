export const PROMOTIONS = [
  { id: 1, title: 'Limpieza de Primavera', discount: '15%', code: 'SPRING15' },
  { id: 2, title: 'Primera Mudanza', discount: '10%', code: 'WELCOME10' },
  { id: 3, title: 'Fidelidad Limpiamax', discount: '20%', code: 'LOYALTY20' }
];

export const SERVICE_STATUS = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En curso',
  COMPLETED: 'Completado',
  PAID: 'Pagado'
};

// --- Google Sheets Industrial Architecture (Sovereign Sync) ---
export const SHEETS_CONFIG = {
  TAB_VENTAS: 'Hoja 1',
  TAB_CONTACTOS: 'CONTACTOS',
  RANGE_VENTAS: 'Hoja 1!A1',
  RANGE_CONTACTOS: 'CONTACTOS!A1'
};

// --- Master Service Catalog (Single Source of Truth) ---
export const MASTER_SERVICES = [
  'Limpieza General',
  'Limpieza de Casa (Básica)',
  'Limpieza Profunda',
  'Limpieza de Oficina',
  'Limpieza Fin de Obra',
  'Limpieza de Mudanza',
  'Limpieza de Tapicería',
  'Limpiezas Industriales'
];
