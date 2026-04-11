import { Phone, MapPin, Instagram } from 'lucide-react';
import { Logo } from '../ui/Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t ultra-thin-border border-accent/10 py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-20">
          <div className="max-w-md">
            <Link href="/" className="flex items-start self-start mb-8 hover:scale-105 transition-transform duration-300">
              <Logo />
            </Link>
            <p className="editorial-title text-2xl text-primary mb-6">Excelencia en cada fibra, <span className="text-accent underline decoration-accent/20 underline-offset-8">Barcelona</span>.</p>
            <p className="text-muted-foreground/60 text-lg font-medium leading-relaxed max-w-sm">
              Transformamos espacios con un estándar boutique. Higiene absoluta con el toque premium que tu hogar merece.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20 w-full md:w-auto">
            <div className="space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Navegación</p>
              <ul className="space-y-5 font-bold text-primary/70">
                <li><Link href="/" className="hover:text-accent transition-colors">Inicio</Link></li>
                <li><Link href="/servicios" className="hover:text-accent transition-colors">Servicios</Link></li>
                <li><Link href="/#contacto" className="hover:text-accent transition-colors">Reservar</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Contacto</p>
              <div className="space-y-5 font-bold text-primary/70">
                 <a href="tel:+34674571497" className="flex items-center gap-3 hover:text-accent transition-colors"><Phone className="w-4 h-4 text-accent/50" /> +34 674 571 497</a>
                 <a href="https://www.instagram.com/limpiamaxbcn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors"><Instagram className="w-4 h-4 text-accent/50" /> Instagram</a>
                 <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent/50" /> Barcelona, España</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-32 pt-12 flex flex-col sm:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.1em] text-muted-foreground/30">
          <p>© {new Date().getFullYear()} Limpia MAX — Boutique Cleaning Services.</p>
          <div className="flex gap-10">
            <Link href="#privacidad" className="hover:text-accent transition-colors">Privacidad</Link>
            <Link href="#terminos" className="hover:text-accent transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
