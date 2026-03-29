import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { ShopSection } from '@/components/home/ShopSection';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import { Metadata } from 'next';
import { WhatsAppFAB } from '@/components/home/WhatsAppFAB';

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

      <WhatsAppFAB />

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
