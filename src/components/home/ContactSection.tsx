"use client";

import { Phone, MessageCircle, Mail, Send } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-5xl lg:text-7xl font-extrabold font-outfit text-primary mb-8 tracking-tighter">Solicita tu presupuesto</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-medium">
              Déjanos tus datos y te enviaremos un presupuesto personalizado en <span className="text-primary font-bold">menos de 1 hora</span>. Resultados garantizados.
            </p>
            
            <div className="space-y-6">
              {/* Phone Card */}
              <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-white border border-border shadow-elegant hover:shadow-elegant-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground/50 uppercase tracking-widest mb-1">Teléfono Directo</p>
                  <a href="tel:+34674571497" className="text-3xl font-black text-primary hover:text-accent transition-colors">+34 674 571 497</a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/34674571497" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-6 p-8 rounded-[2rem] bg-success/5 border border-success/10 shadow-elegant hover:shadow-elegant-lg hover:bg-success/10 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <MessageCircle className="w-8 h-8 text-success fill-success/20" />
                </div>
                <div>
                  <p className="text-xs font-black text-success/60 uppercase tracking-widest mb-1">Respuesta Rápida</p>
                  <span className="text-2xl font-black text-primary">Chat por WhatsApp</span>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:limpiamaxbarcelona00@gmail.com?subject=Solicitud de Presupuesto Limpieza" 
                className="flex items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-[2rem] bg-accent/5 border border-accent/10 shadow-elegant hover:shadow-elegant-lg hover:bg-accent/10 transition-all group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-black text-accent/60 uppercase tracking-widest mb-1 truncate">Presupuesto por Email</p>
                  <span className="text-base sm:text-xl font-black text-primary break-all block leading-tight">
                    limpiamaxbarcelona00@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="animate-scale-in">
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData);
                
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  });
                  if (res.ok) alert('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
                  else alert('Hubo un error al enviar el mensaje.');
                } catch (err) {
                  console.error(err);
                  alert('Error de conexión.');
                }
              }}
              className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-border shadow-high-density space-y-8 relative"
            >
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white font-black text-xs uppercase tracking-tighter -rotate-12 shadow-xl border-4 border-white">
                  Rápido
                </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-primary uppercase tracking-widest ml-1" htmlFor="name">Nombre</label>
                <input 
                  className="flex h-16 w-full rounded-2xl border-2 border-slate-100 bg-white px-6 py-2 text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/10 focus-visible:border-accent" 
                  id="name" 
                  name="name"
                  placeholder="Ej. María García" 
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-primary uppercase tracking-widest ml-1" htmlFor="phone">Teléfono</label>
                <input 
                  type="tel" 
                  className="flex h-16 w-full rounded-2xl border-2 border-slate-100 bg-white px-6 py-2 text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/10 focus-visible:border-accent" 
                  id="phone" 
                  name="phone"
                  placeholder="+34 600 000 000" 
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-primary uppercase tracking-widest ml-1" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  className="flex h-16 w-full rounded-2xl border-2 border-slate-100 bg-white px-6 py-2 text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/10 focus-visible:border-accent" 
                  id="email" 
                  name="email"
                  placeholder="tu@email.com" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-6 flex items-center justify-center gap-3 bg-primary text-white rounded-3xl font-black text-2xl shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] mt-6"
              >
                <Send className="w-6 h-6" />
                Solicitar Info
              </button>
              <p className="text-sm font-bold text-center text-muted-foreground">
                Promedio de respuesta: <span className="text-accent underline decoration-2 underline-offset-4">42 minutos</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
