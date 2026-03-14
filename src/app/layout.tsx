import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Limpia MAX — Limpieza Profesional en Barcelona',
  description: 'Servicio de limpieza profesional de casas, sofás, alfombras y colchones en Barcelona. Precios desde €9,99.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
