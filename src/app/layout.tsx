import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Limpia MAX — Limpieza Profesional en Barcelona',
  description: 'Servicio de limpieza profesional de casas, sofás, alfombras y colchones en Barcelona. Precios desde €9,99.',
  metadataBase: new URL('https://limpiamaxweb.com'),
  alternates: {
    canonical: '/',
  },
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
