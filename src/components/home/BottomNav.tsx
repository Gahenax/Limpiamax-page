'use client';

import { Home, Sparkles, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../CartProvider';

export function BottomNav() {
  const { cart, setIsCheckoutOpen, setIsCartOpen } = useCart();

  const handleScroll = (id: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = '/' + (id ? '#' + id : '');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border z-50 md:hidden pb-safe">
      <div className="flex items-center justify-around px-2 py-3">
        
        {/* Home */}
        <button 
          onClick={() => handleScroll('')}
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>

        {/* Servicios */}
        <button 
          onClick={() => handleScroll('servicios')}
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
        >
          <Sparkles className="w-6 h-6" />
          <span className="text-[10px] font-bold">Servicios</span>
        </button>

        {/* Cart */}
        <button 
          onClick={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          className="relative flex flex-col items-center gap-1 p-2 text-primary focus:outline-none"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.services.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {cart.services.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-primary">Carrito</span>
        </button>

        {/* Soporte */}
        <a 
          href="https://wa.me/34674571497?text=Hola,%20tengo%20una%20duda%20sobre%20un%20servicio%20de%20limpieza"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-success transition-colors focus:outline-none"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">Soporte</span>
        </a>

      </div>
    </div>
  );
}
