'use client';

import { useCart } from '../CartProvider';
import { Header } from './Header';

export function BannerLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isBannerVisible } = useCart();

  return (
    <div 
      id="main-layout-wrapper"
      className="min-h-screen bg-background text-foreground selection:bg-accent/10 transition-all duration-300"
      style={{ paddingTop: isBannerVisible ? '32px' : '0' }}
    >
      <Header />
      {children}
    </div>
  );
}
