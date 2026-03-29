import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Limpia MAX — Limpieza Profesional de Casas y Pisos en Barcelona',
  description: 'Servicio premium de limpieza profesional en Barcelona. Garantía de resultados impecables para casas, limpiezas de fin de obra y mudanzas. Cotiza gratis en segundos.',
  metadataBase: new URL('https://limpiamaxweb.com'),
};

import { StripeConnectProvider } from '@/components/StripeConnectProvider';
import { CartProvider } from '@/components/CartProvider';
import { AnnouncementBanner } from '@/components/home/AnnouncementBanner';
import { AuthProvider } from '@/components/providers/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <StripeConnectProvider accountId={process.env.NEXT_PUBLIC_STRIPE_CONNECT_ACCOUNT_ID || ''}>
            <CartProvider>
              <AnnouncementBanner />
              {children}
            </CartProvider>
          </StripeConnectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
