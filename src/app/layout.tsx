import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Limpia MAX — Limpieza Profesional de Casas y Pisos en Barcelona',
  description: 'Servicio premium de limpieza profesional en Barcelona. Garantía de resultados impecables para casas, limpiezas de fin de obra y mudanzas. Cotiza gratis en segundos.',
  metadataBase: new URL('https://limpiamaxweb.com'),
  alternates: {
    canonical: '/',
  },
};


import { StripeConnectProvider } from '@/components/StripeConnectProvider';
import { CartProvider } from '@/components/CartProvider';
import { AnnouncementBanner } from '@/components/home/AnnouncementBanner';
import SchemaMarkup from '@/components/SchemaMarkup';
import GclidCapture from '@/components/GclidCapture';
import Script from 'next/script';
import { Suspense } from 'react';
// AuthProvider purgado por Gahenax Layer 1

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
          <StripeConnectProvider accountId={process.env.NEXT_PUBLIC_STRIPE_CONNECT_ACCOUNT_ID || ''}>
            <CartProvider>
              {/* CMP - Consent Management Platform (Prioridad Máxima) */}
              <Script 
                type="text/javascript" 
                src="https://cdn.consentmanager.net/delivery/autoblocking/47f3952bc2205.js"
                data-cmp-ab="1"
                data-cmp-host="c.delivery.consentmanager.net"
                data-cmp-cdn="cdn.consentmanager.net"
                data-cmp-codesrc="16"
                strategy="beforeInteractive"
              />

              {/* Google Tag (gtag.js) - Instalación Manual Requerida */}
              <Script 
                src="https://www.googletagmanager.com/gtag/js?id=AW-18064056551"
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'AW-18064056551');
                  gtag('config', 'G-5B27CWZ3SY');
                `}
              </Script>
              
              <SchemaMarkup />
              <Suspense fallback={null}>
                <GclidCapture />
              </Suspense>
              <AnnouncementBanner />
              {children}
            </CartProvider>
          </StripeConnectProvider>
      </body>
    </html>
  );
}
