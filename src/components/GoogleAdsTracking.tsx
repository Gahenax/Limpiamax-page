'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAdsTracking() {
  const searchParams = useSearchParams();
  const GTAG_ID = process.env.NEXT_PUBLIC_GA_ID || 'AW-CONVERSION_ID'; // Placeholder

  useEffect(() => {
    // 1. Capturar GCLID de la URL
    const gclid = searchParams.get('gclid');
    if (gclid) {
      localStorage.setItem('limpiamax_gclid', gclid);
      console.log('✅ GCLID capturado y persistido:', gclid);
    }

    // 2. Cargar gtag.js dinámicamente
    if (typeof window !== 'undefined' && !window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTAG_ID}', {
          'anonymize_ip': true,
          'cookie_flags': 'SameSite=None;Secure'
        });
      `;
      document.head.appendChild(script2);
    }
  }, [searchParams, GTAG_ID]);

  return null; // Componente invisible
}
