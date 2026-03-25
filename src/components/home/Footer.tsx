import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { Logo } from '../ui/Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary text-white py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-2 bg-accent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16">
          <div className="max-w-sm">
            <Link href="/" className="flex items-start self-start">
              <Logo variant="light" />
            </Link>
            <p className="text-white/60 text-lg mt-6 font-medium leading-relaxed">
              Expertos en limpieza profesional en Barcelona. Transformamos tu hogar con tecnología de vanguardia y personal certificado.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 w-full md:w-auto">
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-widest text-accent">Navegación</p>
              <ul className="space-y-4 font-bold text-white/80">
                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
                <li><Link href="/#contacto" className="hover:text-white transition-colors">Reserva Local</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-widest text-accent">Contacto</p>
              <div className="space-y-4 font-bold text-white/80">
                 <a href="tel:+34674571497" className="flex items-center gap-3 hover:text-white transition-colors"><Phone className="w-4 h-4 text-accent" /> +34 674 571 497</a>
                 <a href="https://www.instagram.com/limpiamaxbcn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><Instagram className="w-4 h-4 text-accent" /> @limpiamaxbcn</a>
                 <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> Barcelona, ES</p>
                 <Link href="/contacto" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-4 h-4 text-accent" /> Escríbenos</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-20 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-bold text-white/30">
          <p>© {new Date().getFullYear()} Limpia MAX. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <Link href="/#contacto" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/#contacto" className="hover:text-white transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
