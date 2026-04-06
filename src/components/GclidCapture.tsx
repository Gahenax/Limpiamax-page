'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GclidCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const gclid = searchParams.get('gclid');
    if (gclid) {
      localStorage.setItem('limpiamax_gclid', gclid);
      console.log('🎯 GCLID capturado para atribución:', gclid);
    }
  }, [searchParams]);

  return null;
}
