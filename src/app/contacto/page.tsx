import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import { Metadata } from 'next';
import { WhatsAppFAB } from '@/components/home/WhatsAppFAB';

export const metadata: Metadata = {
  title: 'Contacto y Presupuestos | LimpiaMax Barcelona',
  description: 'Contacta con LimpiaMax para un presupuesto personalizado de limpieza en Barcelona. Atención inmediata vía WhatsApp o email.',
};

export default function ContactoPage() {
  return (
    <BannerLayoutWrapper>
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-primary font-outfit mb-4">Contacto</h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-medium">
            ¿Tienes alguna pregunta o necesitas un presupuesto personalizado? Estamos aquí para ayudarte.
          </p>
        </div>
        
        <ContactSection />
      </main>

      <WhatsAppFAB />

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
