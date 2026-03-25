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
  title: 'Limpieza de Mudanza en Barcelona | LimpiaMax',
  description: 'Servicio especializado de limpieza para mudanzas en Barcelona. Deja tu antiguo o nuevo hogar impecable. Precios transparentes y reserva online.',
};

export default function MudanzaPage() {
  const mudanzaTestimonials = [
    {
      name: "Laura S.",
      text: "Contraté la limpieza para entrar a vivir en mi nuevo piso y fue la mejor decisión. Estaba todo brillante y pude meter mis cosas sin preocuparme.",
      rating: 5,
      date: "Hace 3 días"
    },
    {
      name: "Jordi M.",
      text: "Excelente para la entrega de llaves. El propietario quedó encantado y me devolvieron la fianza sin problemas.",
      rating: 5,
      date: "Hace 2 semanas"
    },
    {
      name: "Elena P.",
      text: "Rápido, eficaz y muy profesional. El equipo de LimpiaMax se encargó de cada rincón.",
      rating: 5,
      date: "Hace 1 mes"
    }
  ];

  return (
    <BannerLayoutWrapper>
      <main>
        <Hero 
          badgeText="📦 Especialistas en Mudanzas"
          title={<>Llega y <span className="text-accent">Descansa</span> en tu nuevo hogar.</>}
          subtitle="Limpieza profunda pre-entrada o post-salida. Recupera tu fianza o estrena casa con la garantía de LimpiaMAX."
        />
        <WorkingProcess />
        <PromoBar />
        <SocialProof customTestimonials={mudanzaTestimonials} />
        <ShopSection initialCategory="hogar" initialServiceTitle="Limpieza Profunda de Casa" />
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
