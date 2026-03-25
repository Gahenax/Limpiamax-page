import { Zap, Gift, ShieldCheck } from 'lucide-react';

export function PromoBar() {
  return (
    <section className="relative z-20 mt-16 mb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-elegant-xl border border-border/50 flex items-center gap-6 group hover:border-accent/30 transition-all animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Llega y Descansa</h4>
              <p className="text-muted-foreground text-sm font-bold">Recupera tu <span className="text-primary italic">tiempo libre</span></p>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-[2.5rem] shadow-gold-glow border border-white/10 flex items-center gap-6 group hover:scale-[1.02] transition-all animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
              <Gift className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h4 className="font-black text-white uppercase tracking-tighter text-lg">Promo Apertura</h4>
              <p className="text-white/70 text-sm font-bold">-€10 en <span className="text-accent underline">tu primer sofá</span></p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-elegant-xl border border-border/50 flex items-center gap-6 group hover:border-accent/30 transition-all animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-success" />
            </div>
            <div>
              <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Seguro Total</h4>
              <p className="text-muted-foreground text-sm font-bold">Respaldo <span className="text-primary italic">Allianz Included</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
