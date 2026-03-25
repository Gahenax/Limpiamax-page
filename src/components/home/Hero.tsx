'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  badgeText?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: string;
}

const DEFAULT_SLIDES = [
  {
    url: "/hero-premium-1.png",
    alt: "Limpieza de Apartamentos de Lujo",
    badge: "✨ Limpieza Profesional en Barcelona",
    title: <>Limpiezas de <span className="text-accent block sm:inline">casas</span> y pisos.</>,
    subtitle: <>Recupera tu tiempo. Resultados impecables con precios transparentes desde <span className="font-bold text-primary text-2xl">€22,00</span> <span className="text-sm line-through text-muted-foreground ml-1 font-bold">(vs €35 promedio)</span>.</>
  },
  {
    url: "/hero-premium-4.png",
    alt: "Limpieza Fin de Obra Premium",
    badge: "🏗️ Limpieza Post-Reforma",
    title: <>Dile adiós al <span className="text-accent">polvo</span> de la obra.</>,
    subtitle: <>Acondicionamiento total para disfrutar de tu reforma. Eliminamos manchas de cemento y restos de pintura con maquinaria pro.</>
  },
  {
    url: "/hero-premium-5.png",
    alt: "Limpieza Especializada de Mudanzas",
    badge: "📦 Especialistas en Mudanzas",
    title: <>Llega y <span className="text-accent">Descansa</span> en tu nuevo hogar.</>,
    subtitle: <>Limpieza profunda pre-entrada o post-salida. Recupera tu fianza o estrena casa con la absoluta garantía de LimpiaMAX.</>
  },
  {
    url: "/hero-premium-2.png",
    alt: "Limpieza Profesional de Sofás",
    badge: "🛋️ Especialistas en Tapicería",
    title: <>Tu sofá como <span className="text-accent">nuevo</span>, sin manchas.</>,
    subtitle: <>Eliminamos ácaros, manchas difíciles y olores. Limpieza profunda a domicilio con tecnología de inyección-extracción.</>
  },
  {
    url: "/hero-premium-3.png",
    alt: "Limpieza de Oficinas Corporativas",
    badge: "🏢 Limpieza de Oficinas y Locales",
    title: <>Espacios de trabajo <span className="text-accent">impecables</span>.</>,
    subtitle: <>Mejora la productividad y salud de tu equipo con un ambiente desinfectado, brillante y profesional todos los días.</>
  }
];

export function Hero({
  badgeText,
  title,
  subtitle
}: HeroProps) {
  const isLandingPage = !!title;
  
  const getInitialIndex = (badge?: string) => {
    if (!badge) return 0;
    const text = badge.toLowerCase();
    if (text.includes("obra") || text.includes("reforma")) return 1;
    if (text.includes("mudanza") || text.includes("entrada") || text.includes("salida")) return 2;
    if (text.includes("sofa") || text.includes("tapiceria")) return 3;
    if (text.includes("oficina") || text.includes("local") || text.includes("empresa")) return 4;
    return 0;
  };

  const [currentIdx, setCurrentIdx] = useState(() => getInitialIndex(badgeText));
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay logic
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }, 6000); // 6 seconds per slide
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // Sync index if badgeText changes (e.g. navigating between landing pages)
  const [prevBadge, setPrevBadge] = useState(badgeText);
  if (badgeText !== prevBadge) {
    setPrevBadge(badgeText);
    setCurrentIdx(getInitialIndex(badgeText));
  }

  const nextSlide = () => {
    stopAutoplay();
    setCurrentIdx((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    startAutoplay();
  };

  const prevSlide = () => {
    stopAutoplay();
    setCurrentIdx((prev) => (prev - 1 + DEFAULT_SLIDES.length) % DEFAULT_SLIDES.length);
    startAutoplay();
  };

  // Logic: Always show the slide's content to keep them "matched"
  const displayBadge = DEFAULT_SLIDES[currentIdx].badge;
  const displayTitle = DEFAULT_SLIDES[currentIdx].title;
  const displaySubtitle = DEFAULT_SLIDES[currentIdx].subtitle;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 bg-card overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          {/* Text content with key to trigger re-animation on slide change */}
          <div key={currentIdx} className="animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors mb-6 bg-success/10 text-success border-success/20 font-bold uppercase tracking-wider">
              {displayBadge}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold font-outfit text-primary leading-[1.05] mb-6 sm:mb-8 tracking-tighter">
              {displayTitle}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-lg leading-relaxed font-medium">
              {displaySubtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a 
              href="#servicios" 
              className="inline-flex items-center justify-center px-10 py-5 bg-accent text-white rounded-full font-extrabold text-xl shadow-gold-glow hover:shadow-elegant-xl transition-all active:scale-[0.98] hover:-translate-y-0.5"
            >
              Reserva tu limpieza ahora
            </a>
            <a 
              href="mailto:limpiamaxbarcelona00@gmail.com?subject=Solicitud de Presupuesto Limpieza" 
              className="inline-flex items-center justify-center gap-3 px-8 py-5 border-2 border-primary text-primary rounded-full font-black text-lg hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
            >
              Pide Presupuesto
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 px-8 py-5 border border-border rounded-full bg-white shadow-sm w-fit">
            <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
            <span className="text-base font-bold text-muted-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-success" /> Disponible hoy en Barcelona
            </span>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-elegant-xl border-[12px] border-white bg-muted relative">
            <img 
              src={DEFAULT_SLIDES[currentIdx].url} 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105" 
              alt={DEFAULT_SLIDES[currentIdx].alt}
              loading="eager" 
              key={currentIdx}
            />
            
            {/* Carousel Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur shadow-2xl rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90 z-30"
              aria-label="Anterior imagen"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur shadow-2xl rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90 z-30"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {DEFAULT_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoplay(); setCurrentIdx(i); startAutoplay(); }}
                  className={`h-2.5 rounded-full transition-all duration-500 ${i === currentIdx ? 'w-10 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'}`} 
                  aria-label={`Ir a slide ${i + 1}`}
                />
              ))}
            </div>
            
            {/* Overlay Gradient for better indicator/arrow visibility */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Review Badge */}
          <div className="absolute bottom-4 -left-8 bg-white p-6 rounded-3xl shadow-elegant-xl border border-border max-w-[240px] z-20">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-base font-bold text-primary leading-snug">
              4.9/5 de 2,000+ clientes satisfechos
            </p>
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 opacity-[0.03] -z-10 bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />
    </section>
  );
}
