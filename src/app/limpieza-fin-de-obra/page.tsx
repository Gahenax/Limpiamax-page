import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { Hero } from '@/components/home/Hero';
import { PromoBar } from '@/components/home/PromoBar';
import { WorkingProcess } from '@/components/home/WorkingProcess';
import { SocialProof } from '@/components/home/SocialProof';
import { ShopSection } from '@/components/home/ShopSection';
import { MicroFAQ } from '@/components/home/MicroFAQ';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import { MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Limpieza de Fin de Obra en Barcelona | LimpiaMax',
  description: 'Limpieza profesional post-reforma en Barcelona. Eliminamos polvo fino, restos de pintura y suciedad de obra. Reserva online con precio cerrado.',
};

export default function FinDeObraPage() {
  const obraTestimonials = [
    {
      name: "Andrés G.",
      text: "Acabamos la reforma y el polvo estaba por todos lados. LimpiaMax vino y en unas horas el piso era otro. Brutal el cambio.",
      rating: 5,
      date: "Hace 1 día"
    },
    {
      name: "Constructora BCN",
      text: "Usamos LimpiaMax para la entrega de nuestras obras. Siempre puntuales y el nivel de detalle es inmejorable.",
      rating: 5,
      date: "Hace 1 semana"
    },
    {
      name: "Mónica T.",
      text: "Increíble cómo quedó la cocina después de la reforma. No hay rastro de polvo en los armarios ni ventanas.",
      rating: 5,
      date: "Hace 3 semanas"
    }
  ];

  return (
    <BannerLayoutWrapper>
      <main>
        <Hero 
          badgeText="🏗️ Limpieza Post-Reforma"
          title={<>Dile adiós al <span className="text-accent">polvo</span> de la obra.</>}
          subtitle="Acondicionamiento total para disfrutar de tu reforma. Eliminamos manchas de cemento y restos de pintura con maquinaria pro."
        />
        <WorkingProcess />
        <PromoBar />
        <SocialProof customTestimonials={obraTestimonials} />
        <ShopSection initialCategory="hogar" initialServiceTitle="Limpieza Fin de Obra" />
        <MicroFAQ />
        <ContactSection />

        {/* Floating Action Button (WhatsApp) */}
        <a
          href="https://wa.me/34674571497"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100] w-16 h-16 bg-[#25D366] rounded-full shadow-elegant-xl flex items-center justify-center hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up md:translate-y-0"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-8 h-8 text-white fill-white" />
        </a>
      </main>

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
