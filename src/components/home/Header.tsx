'use client';

import { Phone, Mail, ShoppingCart, X, Trash2, Menu, MessageCircle, Instagram } from 'lucide-react';
import { useCart } from '../CartProvider';
import { Logo } from '../ui/Logo';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const { cart, isCartOpen, setIsCartOpen, setIsCheckoutOpen, findService, calculateTotal, isBannerVisible } = useCart();

  return (
    <header 
      style={{ top: isBannerVisible ? '32px' : '0' }}
      className="hidden md:block fixed left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border transition-all duration-300"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-start">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/servicios" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            Servicios
          </Link>
          <Link href="/#contacto" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            Contacto
          </Link>
          <a href="tel:+34674571497" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            +34 674 571 497
          </a>
          <a href="https://www.instagram.com/limpiamaxbcn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors">
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
          <a href="mailto:limpiamaxbarcelona00@gmail.com" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors">
            <Mail className="w-4 h-4" />
            Email
          </a>
          
          {/* Cart Header Button */}
          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-primary hover:bg-slate-100 rounded-full transition-all group"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.services.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cart.services.length}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {isCartOpen && (
              <div className="absolute top-full -right-4 sm:right-0 mt-4 w-[90vw] sm:w-80 bg-white rounded-[2rem] shadow-elegant-xl border border-border p-6 animate-fade-in-up z-[60]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-primary font-outfit text-lg">Mi Carrito</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cart.services.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                    <p className="text-sm font-medium text-muted-foreground">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-hide mb-6">
                      {cart.services.map((sTitle) => {
                        const service = findService(sTitle);
                        return (
                          <div key={sTitle} className="flex gap-3 group/item">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 relative">
                              <Image 
                                src={service?.img || ''} 
                                alt={sTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-primary truncate leading-tight">{sTitle}</p>
                              <p className="text-xs font-bold text-success mt-0.5">€{service?.price}</p>
                            </div>
                            <button 
                              onClick={() => {}} 
                              className="opacity-0 group-hover/item:opacity-100 p-2 text-muted-foreground hover:text-danger transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="pt-6 border-t border-border/50">
                      <div className="flex justify-between items-end mb-6">
                        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">Total</span>
                        <span className="text-2xl font-black text-primary">€{calculateTotal().toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => { setIsCheckoutOpen(true); setIsCartOpen(false); }}
                        className="block w-full py-4 bg-success text-white rounded-2xl font-black text-center text-sm shadow-xl shadow-success/10 hover:scale-105 active:scale-[0.98] transition-all"
                      >
                        Finalizar Reserva
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/34674571497" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-success text-white text-sm font-bold hover:opacity-90 transition-all active:scale-[0.98] shadow-sm shadow-success/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            WhatsApp
          </a>
        </nav>

        <button className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-full transition-colors" aria-label="Toggle menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
