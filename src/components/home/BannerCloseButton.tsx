'use client';

import { X } from 'lucide-react';
import { useCart } from '../CartProvider';
import { useEffect, useState } from 'react';

export function BannerCloseButton() {
  const { setIsBannerVisible } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('limpiamax-banner-closed')) {
      setIsBannerVisible(false);
      // Hide the parent banner immediately
      const banner = document.getElementById('announcement-banner');
      if (banner) banner.style.display = 'none';
      const mainDiv = document.getElementById('main-layout-wrapper');
      if (mainDiv) mainDiv.style.paddingTop = '0px';
      const header = document.querySelector('header');
      if (header) header.style.top = '0px';
    }
  }, [setIsBannerVisible]);

  if (!mounted) return null;

  return (
    <button 
      onClick={() => {
        setIsBannerVisible(false);
        localStorage.setItem('limpiamax-banner-closed', 'true');
        const banner = document.getElementById('announcement-banner');
        if (banner) banner.style.display = 'none';
        const mainDiv = document.getElementById('main-layout-wrapper');
        if (mainDiv) mainDiv.style.paddingTop = '0px';
        const header = document.querySelector('header');
        if (header) header.style.top = '0px';
      }} 
      className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
      aria-label="Cerrar anuncio"
    >
      <X className="w-3 h-3 md:w-4 md:h-4 text-white" />
    </button>
  );
}
