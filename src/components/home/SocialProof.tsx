import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  date: string;
}

interface SocialProofProps {
  customTestimonials?: Testimonial[];
}

export function SocialProof({ customTestimonials }: SocialProofProps) {
  const defaultTestimonials = [
    {
      name: "María Gómez",
      text: "Increíble el trabajo de fin de obra. Dejaron el piso impecable para entrar a vivir el mismo día.",
      rating: 5,
      date: "Hace 2 días"
    },
    {
      name: "Carlos R.",
      text: "Vinieron a limpiar el sofá y parece nuevo. Super puntuales y profesionales.",
      rating: 5,
      date: "Hace 1 semana"
    },
    {
      name: "Oficinas Nexus",
      text: "Contratamos el mantenimiento mensual y se nota la diferencia en el ambiente. Totalmente recomendados.",
      rating: 5,
      date: "Hace 2 semanas"
    }
  ];

  const testimonials = customTestimonials || defaultTestimonials;

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          
          {/* Rating Section */}
          <div className="text-center md:text-left md:max-w-xs">
            <div className="flex justify-center md:justify-start gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-accent text-accent" />
              ))}
            </div>
            <h3 className="text-4xl font-black font-outfit text-primary mb-2">4.9/5</h3>
            <p className="text-lg font-bold text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              +2,500 clientes felices
            </p>
          </div>

          {/* Testimonials */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-3xl shadow-elegant border border-border/30 animate-fade-in-up flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-gold-glow hover:-translate-y-1" 
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-primary/90 font-medium text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="mt-auto">
                  <p className="font-bold text-primary text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">{t.date}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        
        {/* Instagram Results Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h4 className="text-2xl font-bold font-outfit text-primary">Resultados 100% Reales</h4>
            <p className="text-muted-foreground text-sm font-medium mt-2">Síguenos en Instagram <a href="https://www.instagram.com/limpiamaxbcn/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@limpiamaxbcn</a> para ver más transformaciones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-elegant border border-border/30 aspect-square group relative">
              <Image 
                src="/ig/ig1.jpg" 
                alt="Limpieza de sofá" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-elegant border border-border/30 aspect-square group relative">
              <Image 
                src="/ig/ig2.jpg" 
                alt="Resultado de limpieza" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-elegant border border-border/30 aspect-square group relative">
              <Image 
                src="/ig/ig3.jpg" 
                alt="Limpieza profunda" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
