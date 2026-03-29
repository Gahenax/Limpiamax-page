import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { ShopSection } from '@/components/home/ShopSection';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import { MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestros Servicios de Limpieza en Barcelona | LimpiaMax',
  description: 'Descubre nuestros servicios personalizados: Limpieza de casas, tapizados, mudanzas y fines de obra. Reserva con precio cerrado e inmediato en Barcelona.',
};

export default function ServiciosPage() {
  return (
    <BannerLayoutWrapper>
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-primary font-outfit mb-4">Nuestros Servicios</h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-medium">
            Soluciones de limpieza profesional adaptadas a cada necesidad. Elige tu servicio y reserva en segundos.
          </p>
        </div>
        
        <ShopSection />
      </main>

      {/* Floating Action Button (WhatsApp) */}
      <a
        href="https://wa.me/34674571497"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100] w-16 h-16 bg-[#25D366] rounded-full shadow-elegant-xl flex items-center justify-center hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up md:translate-y-0"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white fill-white" />
        <span className="absolute flex h-4 w-4 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#128C7E]"></span>
        </span>
      </a>

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
