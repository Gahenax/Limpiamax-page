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
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Limpieza de Mudanza y Fin de Alquiler Barcelona | LimpiaMax',
  description: 'Servicio experto de limpieza de fin de alquiler y mudanzas en Barcelona. Recupera tu fianza con nuestra limpieza profunda garantizada.',
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
      <main className="bg-white">
        <Hero 
          badgeText="📦 Limpieza de Mudanza y Fin de Alquiler"
          title={<>Limpieza de <span className="text-accent">Mudanza</span> y Fin de Alquiler.</>}
          subtitle="Garantiza tu fianza. Limpieza profunda pre-entrada o post-salida con la absoluta garantía de LimpiaMAX."
        />

        {/* Feature Section: Mudanza Checklist Boutique */}
        <section className="py-32 bg-secondary/30 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="text-reveal">
                <h2 className="editorial-title text-5xl lg:text-7xl text-primary mb-10 tracking-tight">Garantía de <br/><span className="text-accent">Entrega de Llaves</span></h2>
                <div className="space-y-6">
                  {[
                    "Desinfección de armarios y cajones por dentro",
                    "Limpieza de conductos de ventilación y filtros",
                    "Acondicionamiento total de cocina y baños",
                    "Fregado de cristales, persianas y marcos",
                    "Eliminación de olores residuales de pintura",
                    "Desinfección de suelos para bebés y mascotas"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-primary/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[4rem] overflow-hidden shadow-gold-glow relative animate-float">
                  <img src="/hero-premium-5.png" alt="Limpieza de mudanzas" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-black text-2xl tracking-tight">Expertos en Barcelona Ciudad</p>
                    <p className="text-white/70 font-medium">Desde mudanzas locales hasta residenciales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkingProcess />
        <PromoBar />
        <SocialProof customTestimonials={mudanzaTestimonials} />
        <ShopSection initialCategory="hogar" initialServiceTitle="Limpieza de Mudanza" />
        <MicroFAQ />
        <ContactSection />

        {/* Floating Action Button (WhatsApp) */}
        <a
          href="https://wa.me/34674571497"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100] w-16 h-16 bg-[#25D366] rounded-full shadow-gold-glow flex items-center justify-center hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-blur-reveal"
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
