'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Menu, Star, Check, Send, Sofa, Home as HomeIcon, Sparkles, ShoppingCart, Trash2, X, Zap, Gift, ShieldCheck, Mail } from 'lucide-react';
import { ConnectEmbeddedComponent } from '@/components/ConnectEmbeddedComponent';

export default function Home() {
  const categories = [
    { id: 'hogar', label: 'Limpieza de Hogar', icon: HomeIcon },
    { id: 'tapiceria', label: 'Tapicería y Especiales', icon: Sofa },
  ];

  type Extra = { name: string; price: string; oldPrice?: string };
  type Service = {
    title: string;
    desc: string;
    price: string;
    unit: string;
    img: string;
    extras: Extra[];
    popular?: boolean;
    feature?: string;
    oldPrice?: string;
  };

  const services: Record<'hogar' | 'tapiceria', Service[]> = {
    hogar: [
      {
        title: "Limpieza de Casa (Básica)",
        desc: "Limpieza estándar para mantener tu hogar impecable. Incluye 2 habitaciones.",
        price: "22,00",
        oldPrice: "35,00",
        unit: "2 habitaciones",
        img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
        extras: [
          { name: "1 habitación más", price: "+€6.99", oldPrice: "12,99" },
          { name: "Tienes mascotas", price: "+€1.99", oldPrice: "5,99" },
          { name: "Requiere aspiradora", price: "+€4.99", oldPrice: "9,99" },
          { name: "Fuera de Barcelona ciudad", price: "+€4.99", oldPrice: "9,99" },
          { name: "Requiere productos limpieza", price: "+€4.99", oldPrice: "8,99" },
        ]
      },
      {
        title: "Limpieza Profunda de Casa",
        desc: "Limpieza profunda: Hornos, ventanas, 3 habs, sala, 1 baño, cocina, puertas y entrada.",
        price: "39.99",
        oldPrice: "55,00",
        unit: "3 horas",
        img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
        popular: true,
        extras: [
          { name: "1 baño más", price: "+€6.99", oldPrice: "10,99" },
          { name: "1 habitación más", price: "+€5.99", oldPrice: "9,99" },
          { name: "Lavar platos y organizar (20u)", price: "+€4.99", oldPrice: "8,99" },
          { name: "Balcón", price: "+€5.99", oldPrice: "9,99" },
          { name: "Planchar ropa (20u)", price: "+€19,99", oldPrice: "29,99" },
          { name: "Limpieza de moho", price: "+€8.99", oldPrice: "14,99" }
        ]
      },
      {
        title: "Limpieza Fin de Obra",
        desc: "Todo lo de profunda más: Limpieza de paredes, polvo, despegar pintura de suelo y tirar basuras.",
        price: "49.99",
        oldPrice: "75,00",
        unit: "3 horas",
        img: "/fin-de-obra.png",
        feature: "Plus",
        extras: [
          { name: "Limpieza de paredes", price: "+€14.99", oldPrice: "24,99" },
          { name: "Despegar pintura", price: "+€9.99", oldPrice: "15,99" },
          { name: "Retirada de escombros", price: "+€19.99", oldPrice: "35,00" }
        ]
      }
    ],
    tapiceria: [
      {
        title: "Limpieza de Sofás",
        desc: "Devolvemos el esplendor a tus sofás y sillas con limpieza profunda de tapicería.",
        price: "55,00",
        oldPrice: "85,00",
        unit: "Desde 2 plazas",
        img: "/sofa-verde.png",
        extras: [
          { name: "Sofá 3 plazas", price: "€85,00", oldPrice: "115,00" },
          { name: "Sofá 4 plazas", price: "€100,00", oldPrice: "140,00" },
          { name: "Sillas comedor", price: "€8,00/u" },
          { name: "Sillas reclinables", price: "€20,00/u" },
        ]
      },
      {
        title: "Limpieza de Alfombras",
        desc: "Tratamiento especializado para alfombras de todo tipo. Desinfección completa.",
        price: "40.00",
        oldPrice: "60,00",
        unit: "2-4 metros",
        img: "/alfombra-premium.png",
        extras: [
          { name: "Alfombra 4-7 metros", price: "€70,00", oldPrice: "100,00" }
        ]
      },
      {
        title: "Limpieza de Colchones",
        desc: "Limpieza profunda por ambas caras. Higiene total para un descanso saludable.",
        price: "45,00",
        oldPrice: "75,00",
        unit: "140x190",
        img: "/colchon-higiene.png",
        extras: [
          { name: "Colchón 140x190", price: "€45,00", oldPrice: "55,00" },
          { name: "Colchón 160x190", price: "€65,00", oldPrice: "85,00" },
          { name: "Pack ambas caras", price: "Incluido" }
        ]
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState<'hogar' | 'tapiceria'>('hogar');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{
    services: string[];
    extras: Record<string, string[]>;
  }>({
    services: [],
    extras: {}
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('limpiamax-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('limpiamax-cart', JSON.stringify(cart));
  }, [cart]);

  const toggleService = (serviceTitle: string) => {
    setCart(prev => {
      const isSelected = prev.services.includes(serviceTitle);
      if (isSelected) {
        const newServices = prev.services.filter(s => s !== serviceTitle);
        const { [serviceTitle]: _, ...newExtras } = prev.extras;
        return { services: newServices, extras: newExtras };
      } else {
        return { ...prev, services: [...prev.services, serviceTitle] };
      }
    });
  };

  const toggleExtra = (serviceTitle: string, extraName: string) => {
    setCart(prev => {
      const serviceExtras = prev.extras[serviceTitle] || [];
      const isSelected = serviceExtras.includes(extraName);
      const newServiceExtras = isSelected 
        ? serviceExtras.filter(e => e !== extraName)
        : [...serviceExtras, extraName];
      
      return {
        ...prev,
        extras: {
          ...prev.extras,
          [serviceTitle]: newServiceExtras
        }
      };
    });
  };

  // Helper to find service data by title
  const findService = (title: string) => {
    return [...services.hogar, ...services.tapiceria].find(s => s.title === title);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.services.forEach(sTitle => {
      const service = findService(sTitle);
      if (service) {
        total += parseFloat(service.price.replace(',', '.'));
        const selectedExtras = cart.extras[sTitle] || [];
        selectedExtras.forEach(eName => {
          const extra = service.extras.find(e => e.name === eName);
          if (extra) {
            // Handle formats like "+€6.99", "€85,00", "€8,00/u"
            const priceStr = extra.price.replace(/[^\d.,]/g, '').replace(',', '.');
            total += parseFloat(priceStr) || 0;
          }
        });
      }
    });
    return total;
  };
  const generateWhatsAppLink = () => {
    let message = "¡Hola LimpiaMax! 👋 Me gustaría reservar los siguientes servicios:\n\n";
    cart.services.forEach(sTitle => {
      const service = findService(sTitle);
      if (service) {
        message += `✅ *${service.title}* (€${service.price})\n`;
        const selectedExtras = cart.extras[sTitle] || [];
        selectedExtras.forEach(eName => {
          const extra = service.extras.find(e => e.name === eName);
          if (extra) message += `   + ${extra.name} (${extra.price})\n`;
        });
        message += "\n";
      }
    });
    message += `💰 *TOTAL ESTIMADO: €${calculateTotal().toFixed(2)}*`;
    return `https://wa.me/34674571497?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    const subject = "Solicitud de Presupuesto Limpieza - LimpiaMax";
    let body = "¡Hola LimpiaMax! 👋 Me gustaría reservar los siguientes servicios:\n\n";
    cart.services.forEach(sTitle => {
      const service = findService(sTitle);
      if (service) {
        body += `✅ ${service.title} (€${service.price})\n`;
        const selectedExtras = cart.extras[sTitle] || [];
        selectedExtras.forEach(eName => {
          const extra = service.extras.find(e => e.name === eName);
          if (extra) body += `   + ${extra.name} (${extra.price})\n`;
        });
        body += "\n";
      }
    });
    body += `💰 TOTAL ESTIMADO: €${calculateTotal().toFixed(2)}`;
    return `mailto:limpiamaxbarcelona00@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleStripeCheckout = async () => {
    try {
      const selectedItems = cart.services.map(sTitle => {
        const service = findService(sTitle);
        return {
          title: service?.title,
          description: service?.desc,
          price: service?.price,
        };
      });

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err: unknown) {
      console.error('Stripe Checkout Error:', err);
      // Fallback to WhatsApp if Stripe fails
      window.open(generateWhatsAppLink(), '_blank');
    }
  };
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10">
      {/* Promo Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-white py-2 text-center text-xs font-black uppercase tracking-[0.2em] animate-pulse">
        ✨ Oferta de Inauguración: Precios Especiales por Tiempo Limitado ✨
      </div>

      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
            <span className="text-2xl font-bold font-outfit text-primary tracking-tight">Limpia</span>
            <span className="text-2xl font-bold font-outfit text-accent tracking-tight">MAX</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#contacto" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Contacto
            </a>
            <a href="tel:+34674571497" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +34 674 571 497
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
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                    {cart.services.length}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-elegant-xl border border-border p-6 animate-fade-in-up z-[60]">
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
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                <img src={service?.img} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-primary truncate leading-tight">{sTitle}</p>
                                <p className="text-xs font-bold text-success mt-0.5">€{service?.price}</p>
                              </div>
                              <button 
                                onClick={() => toggleService(sTitle)}
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
                        <a 
                          href={generateWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-4 bg-success text-white rounded-2xl font-black text-center text-sm shadow-xl shadow-success/10 hover:scale-105 active:scale-[0.98] transition-all"
                        >
                          Reservar por WhatsApp
                        </a>
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

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 bg-card overflow-hidden">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors mb-6 bg-success/10 text-success border-success/20 font-bold uppercase tracking-wider">
                ✨ Limpieza Profesional en Barcelona
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold font-outfit text-primary leading-[1.05] mb-8 tracking-tighter">
                Limpiezas de <span className="text-accent">casas</span> y sofás.
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium">
                Recupera tu tiempo. Resultados impecables con precios transparentes desde <span className="font-bold text-primary text-2xl">€22,00</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <a 
                  href="#servicios" 
                  className="inline-flex items-center justify-center px-10 py-5 bg-accent text-white rounded-full font-extrabold text-xl shadow-orange-glow hover:shadow-elegant-xl transition-all active:scale-[0.98] hover:-translate-y-0.5"
                >
                  Reserva tu limpieza ahora
                </a>
                <a 
                  href="mailto:limpiamaxbarcelona00@gmail.com?subject=Solicitud de Presupuesto Limpieza" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 border-2 border-primary text-primary rounded-full font-black text-lg hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
                >
                  <Mail className="w-6 h-6" />
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

            <div className="relative animate-scale-in">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-elegant-xl border-[12px] border-white bg-muted">
                <img 
                  src="/hero-image.jpg" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                  alt="Limpieza profesional de apartamentos modernos en Barcelona" 
                  loading="eager" 
                />
              </div>
              
              {/* Review Badge */}
              <div className="absolute bottom-4 -left-8 bg-white p-6 rounded-3xl shadow-elegant-xl border border-border max-w-[240px] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <circle cx="20" cy="20" r="15" fill="url(#grad1)" />
              <circle cx="80" cy="80" r="20" fill="url(#grad1)" />
              <circle cx="50" cy="10" r="10" fill="url(#grad1)" />
              <circle cx="10" cy="90" r="12" fill="url(#grad1)" />
            </svg>
          </div>
        </section>

        {/* Featured Promo Bar */}
        <section className="relative z-20 mt-16 mb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-elegant-xl border border-border/50 flex items-center gap-6 group hover:border-accent/30 transition-all animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-black text-primary uppercase tracking-tighter text-lg">Reserva Flash</h4>
                  <p className="text-muted-foreground text-sm font-bold">Listos en <span className="text-primary italic">24h o menos</span></p>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-[2.5rem] shadow-orange-glow border border-white/10 flex items-center gap-6 group hover:scale-[1.02] transition-all animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
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

        {/* Services Section */}
        <section id="servicios" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-5xl lg:text-6xl font-extrabold font-outfit text-primary mb-6 tracking-tight">Nuestros Servicios</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
                Selecciona una categoría para ver nuestros precios transparentes y sin sorpresas.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-center justify-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as 'hogar' | 'tapiceria')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-primary text-white shadow-elegant-xl scale-105' 
                      : 'bg-card text-muted-foreground hover:bg-slate-100 border border-border'
                  }`}
                >
                  <cat.icon className="w-5 h-5" />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services[activeCategory].map((service, idx) => {
                const isServiceSelected = cart.services.includes(service.title);
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleService(service.title)}
                    className={`group rounded-[2.5rem] border overflow-hidden transition-all duration-500 h-full flex flex-col hover:-translate-y-2 relative animate-fade-in-up cursor-pointer ${
                      isServiceSelected ? 'border-accent shadow-elegant-xl ring-2 ring-accent/20' : 'bg-white border-border shadow-elegant hover:shadow-elegant-xl'
                    }`} 
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {service.popular && <div className="absolute top-6 right-6 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-lg flex items-center gap-2"><Sparkles className="w-3 h-3" />Más popular</div>}
                    {service.feature && <div className="absolute top-6 right-6 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-lg">{service.feature}</div>}
                    
                    <div className="h-64 overflow-hidden relative">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      {isServiceSelected && (
                        <div className="absolute inset-0 bg-accent/20 backdrop-blur-[2px] flex items-center justify-center">
                          <div className="bg-white rounded-full p-4 shadow-xl">
                            <Check className="w-10 h-10 text-accent stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-10 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold font-outfit text-primary mb-3 leading-tight">{service.title}</h3>
                      <p className="text-muted-foreground mb-8 line-clamp-2 font-medium">{service.desc}</p>
                      
                      <div className="flex items-baseline gap-2 mb-8">
                        {service.oldPrice && (
                          <span className="text-xl font-bold text-muted-foreground/40 line-through mr-2">€{service.oldPrice}</span>
                        )}
                        <span className="text-5xl font-black text-primary tabular-nums tracking-tighter">€{service.price}</span>
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{service.unit}</span>
                      </div>
                      
                      <div className="space-y-4 mb-10 pt-6 border-t border-border/50">
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">Extras Opcionales</p>
                        {service.extras.map((extra, eidx) => {
                          const isExtraSelected = (cart.extras[service.title] || []).includes(extra.name);
                          return (
                            <div 
                              key={eidx} 
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                if (!isServiceSelected) toggleService(service.title);
                                toggleExtra(service.title, extra.name);
                              }}
                              className="flex items-center justify-between group/extra"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  isExtraSelected ? 'bg-accent border-accent' : 'border-primary/10 bg-slate-50 group-hover/extra:border-accent'
                                }`}>
                                    <Check className={`w-4 h-4 text-white transition-opacity ${isExtraSelected ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                                <span className={`text-sm font-bold transition-colors ${isExtraSelected ? 'text-primary' : 'text-primary/60 group-hover/extra:text-primary'}`}>{extra.name}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-4">
                                {extra.oldPrice && (
                                  <span className="text-xs font-bold text-muted-foreground/50 line-through tabular-nums">€{extra.oldPrice}</span>
                                )}
                                <span className={`text-sm font-black italic tabular-nums ${isExtraSelected ? 'text-accent' : 'text-success'}`}>{extra.price}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-auto">
                        <button className={`w-full py-5 text-center rounded-2xl font-black text-lg transition-all active:scale-[0.98] ${
                          isServiceSelected ? 'bg-success text-white shadow-success/20' : 'bg-accent text-white shadow-orange-glow hover:bg-accent/90'
                        }`}>
                          {isServiceSelected ? 'Servicio Seleccionado' : 'Añadir al Carrito'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Floating Cart Panel */}
        {cart.services.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[95%] xl:w-max max-w-5xl animate-fade-in-up">
            <div className="bg-primary/95 backdrop-blur-xl rounded-[2.5rem] p-6 lg:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <p className="text-xs font-black uppercase tracking-widest text-accent/80 mb-1">Tu Selección</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black tabular-nums tracking-tighter">€{calculateTotal().toFixed(2)}</span>
                  <span className="text-sm font-bold text-white/60">{cart.services.length} {cart.services.length === 1 ? 'servicio' : 'servicios'}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setCart({ services: [], extras: {} })}
                  className="px-6 py-4 rounded-2xl bg-white/5 text-white/60 font-bold hover:bg-white/10 transition-colors"
                >
                  Limpiar
                </button>
                <button 
                  onClick={handleStripeCheckout}
                  className="flex-1 md:flex-none px-10 py-4 bg-accent text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-glow hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Pagar con Stripe
                </button>
                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex px-4 py-4 bg-success/20 text-success rounded-2xl font-black text-sm hover:bg-success/30 transition-all items-center justify-center gap-2 border border-success/30"
                >
                  <MessageCircle className="w-5 h-5 fill-success" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <a 
                  href={generateEmailLink()}
                  className="flex px-4 py-4 bg-accent/20 text-accent rounded-2xl font-black text-sm hover:bg-accent/30 transition-all items-center justify-center gap-2 border border-accent/30"
                >
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline">Email</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
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
                    className="flex items-center gap-6 p-8 rounded-[2rem] bg-accent/5 border border-accent/10 shadow-elegant hover:shadow-elegant-lg hover:bg-accent/10 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                      <Mail className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-accent/60 uppercase tracking-widest mb-1">Presupuesto por Email</p>
                      <span className="text-xl sm:text-2xl font-black text-primary truncate max-w-[250px] sm:max-w-none">
                        limpiamaxbarcelona00@gmail.com
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="animate-scale-in">
                <form className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-border shadow-high-density space-y-8 relative">
                   <div className="absolute -top-6 -right-6 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white font-black text-xs uppercase tracking-tighter -rotate-12 shadow-xl border-4 border-white">
                     Rápido
                   </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-primary uppercase tracking-widest ml-1" htmlFor="name">Nombre</label>
                    <input 
                      className="flex h-16 w-full rounded-2xl border-2 border-slate-100 bg-white px-6 py-2 text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/10 focus-visible:border-accent" 
                      id="name" 
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
        {/* Professional Onboarding Section */}
        <section className="py-32 bg-primary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-[3rem] p-12 border border-white/10 text-center">
              {!showOnboarding ? (
                <>
                  <h2 className="text-4xl lg:text-5xl font-extrabold font-outfit text-white mb-6">¿Eres un profesional de la limpieza?</h2>
                  <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
                    Únete a LimpiaMAX Pro y gestiona tus cobros de forma segura con Stripe Connect. Recibe pagos directamente en tu cuenta bancaria.
                  </p>
                  <button 
                    onClick={() => setShowOnboarding(true)}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white rounded-full font-extrabold text-xl shadow-orange-glow hover:shadow-elegant-xl transition-all"
                  >
                    Conectar con Stripe
                  </button>
                </>
              ) : (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-white">Configuración de Cuenta Pro</h3>
                    <button 
                      onClick={() => setShowOnboarding(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <ConnectEmbeddedComponent componentName="onboarding" />
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-2 bg-accent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16">
            <div className="max-w-sm">
              <span className="text-4xl font-black font-outfit tracking-tighter">
                Limpia<span className="text-accent">MAX</span>
              </span>
              <p className="text-white/60 text-lg mt-6 font-medium leading-relaxed">
                Expertos en limpieza profesional en Barcelona. Transformamos tu hogar con tecnología de vanguardia y personal certificado.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 w-full md:w-auto">
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-accent">Servicios</p>
                <ul className="space-y-4 font-bold text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">Casas</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sofás</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Eventos</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-accent">Contacto</p>
                <div className="space-y-4 font-bold text-white/80">
                   <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent" /> +34 674 571 497</p>
                   <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> Barcelona, ES</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-20 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-bold text-white/30">
            <p>© {new Date().getFullYear()} Limpia MAX. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
