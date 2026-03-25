import { MousePointerClick, MessageCircle, Home } from 'lucide-react';

export function WorkingProcess() {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-white" />,
      title: "Reserva y Pago",
      desc: "Elige tu servicio y abona de forma 100% segura mediante Stripe. Sin registros largos."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: "Confirmación Inmediata",
      desc: "Una vez completado el pago, te contactamos por WhatsApp, llamada o email para fijar fecha y hora."
    },
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: "Servicio en Casa",
      desc: "Nuestros profesionales transforman tu espacio empleando productos propios."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold font-outfit text-primary tracking-tight">Tu limpieza en 3 simples pasos</h2>
          <p className="text-muted-foreground mt-4 font-medium text-lg">Olvídate de la incertidumbre. Nuestro proceso es transparente y rápido.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-1 bg-slate-100 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center mb-6 shadow-gold-glow rotate-3 hover:rotate-0 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold font-outfit text-primary mb-3">
                <span className="text-accent mr-2">{idx + 1}.</span>
                {step.title}
              </h3>
              <p className="text-muted-foreground font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
