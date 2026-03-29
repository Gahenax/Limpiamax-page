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
import { CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { WhatsAppFAB } from '@/components/home/WhatsAppFAB';

export const metadata: Metadata = {
  title: 'Limpieza Fin de Obra Barcelona | LimpiaMax',
  description: 'Servicio premium de limpieza post-reforma en Barcelona. Eliminamos el polvo de obra y restos de pintura. Resultados impecables garantizados.',
};

export default function FinDeObraPage() {
  const obraTestimonials = [
    {
      name: "Marc T.",
      text: "Increíble cómo dejaron el piso tras la reforma. No quedaba ni rastro del polvo blanco que parecía imposible de quitar.",
      rating: 5,
      date: "Hace 1 semana"
    },
    {
      name: "Sílvia R.",
      text: "Muy detallistas con los marcos de las ventanas y los rodapiés. Valen cada euro por la tranquilidad de entrar a una casa impecable.",
      rating: 5,
      date: "Hace 1 mes"
    }
  ];

  return (
    <BannerLayoutWrapper>
      <main className="bg-white">
        <Hero 
          badgeText="🏗️ Limpieza Post-Reforma Premium"
          title={<>Dile adiós al <span className="text-accent">polvo</span> de la obra.</>}
          subtitle="Acondicionamiento total para disfrutar de tu reforma. Eliminamos manchas de cemento y restos de pintura con maquinaria profesional."
        />

        {/* Feature Section: Checklist Boutique */}
        <section className="py-32 bg-secondary/30 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="text-reveal">
                <h2 className="editorial-title text-5xl lg:text-7xl text-primary mb-10 tracking-tight">Estándar de Calidad <br/><span className="text-accent">Post-Obra</span></h2>
                <div className="space-y-6">
                  {[
                    "Eliminación de polvo fino en techos y paredes",
                    "Limpieza técnica de marcos y raíles de ventanas",
                    "Desincrustado de restos de cemento y silicona",
                    "Tratamiento especial para suelos recién instalados",
                    "Desinfección de conductos y rejillas de aire",
                    "Pulido manual de grifería y sanitarios"
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
                  <Image src="/hero-premium-4.png" alt="Limpieza industrial post-obra" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-black text-2xl tracking-tight">Equipamiento Industrial v2.0</p>
                    <p className="text-white/70 font-medium">Usamos aspiradoras HEPA para el polvo respirable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkingProcess />
        <PromoBar />
        <SocialProof customTestimonials={obraTestimonials} />
        <ShopSection initialCategory="hogar" initialServiceTitle="Limpieza Fin de Obra" />
        <MicroFAQ />
        <ContactSection />

        <WhatsAppFAB />
      </main>

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
