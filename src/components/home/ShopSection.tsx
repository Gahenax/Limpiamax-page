'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Check, X, ChevronUp, ChevronDown, Home as HomeIcon, Sofa, Building2 } from 'lucide-react';
import { useCart, servicesData, ServiceData, Frequency } from '../CartProvider';
import { CheckoutModal } from '../CheckoutModal';
import { ConnectEmbeddedComponent } from '../ConnectEmbeddedComponent';

interface ShopSectionProps {
  initialCategory?: 'hogar' | 'tapiceria' | 'empresas';
  initialServiceTitle?: string;
}

export function ShopSection({ initialCategory, initialServiceTitle }: ShopSectionProps) {
  const { 
    activeCategory, setActiveCategory,
    isCartMinimized, setIsCartMinimized,
    cart, setCart,
    toggleService, toggleExtra,
    calculateTotal, setFrequency, setDaysPerWeek,
    isCheckoutOpen, setIsCheckoutOpen,
    generateWhatsAppMessage
  } = useCart();

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
    if (initialServiceTitle && !cart.services.includes(initialServiceTitle)) {
      toggleService(initialServiceTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory, initialServiceTitle]);

  const [showOnboarding, setShowOnboarding] = useState(false);

  const categories = [
    { id: 'hogar', label: 'Limpieza de Hogar', icon: HomeIcon },
    { id: 'tapiceria', label: 'Tapicería y Especiales', icon: Sofa },
    { id: 'empresas', label: 'Empresas y Locales', icon: Building2 },
  ];



  const currentServices = servicesData[activeCategory];

  return (
    <>
      {/* Services Section */}
      <section id="servicios" className="py-40 bg-white flex-1 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-28 text-reveal">
            <h2 className="editorial-title text-5xl lg:text-[80px] text-primary mb-8 tracking-[-0.04em]">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed">
              Selecciona una categoría para descubrir una experiencia de limpieza sin precedentes en Barcelona.
            </p>
          </div>

          <div className="flex flex-center justify-center gap-4 mb-2 overflow-x-auto pb-4 scrollbar-hide">
             {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as 'hogar' | 'tapiceria' | 'empresas')}
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

          {/* Frequency Selector (MRR) */}
          <div className="flex flex-col items-center mb-16 animate-fade-in-up">
            <div className="bg-slate-100 p-2 rounded-3xl flex gap-1 p-1.5 border border-border/50 mb-6">
              {[
                { id: 'once', label: 'Una vez', discount: null },
                { id: 'weekly', label: 'Semanal', discount: '-15%' },
                { id: 'biweekly', label: 'Quincenal', discount: '-10%' },
                { id: 'monthly', label: 'Mensual', discount: '-5%' },
              ].map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => {
                    setFrequency(freq.id as Frequency);
                  }}
                  className={`px-6 py-3 rounded-2xl font-black text-sm transition-all flex flex-col items-center gap-0.5 ${
                    cart.frequency === freq.id 
                      ? 'bg-white text-primary shadow-elegant border border-border/50 text-accent' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <span>{freq.label}</span>
                  {freq.discount && (
                    <span className={`text-[9px] font-black uppercase tracking-tighter ${cart.frequency === freq.id ? 'text-accent' : 'text-success'}`}>
                      {freq.discount} dto.
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Days Per Week Calculator */}
            {cart.frequency !== 'once' && cart.frequency !== 'biweekly' && (
              <div className="animate-fade-in flex flex-col items-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">¿Cuántos días por semana?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        setDaysPerWeek(day);
                      }}
                      className={`w-12 h-12 rounded-xl font-bold transition-all flex items-center justify-center ${
                        cart.daysPerWeek === day
                          ? 'bg-accent text-white shadow-gold-glow scale-110'
                          : 'bg-slate-100 text-muted-foreground hover:bg-slate-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs font-bold text-primary/40 italic">
                  {cart.frequency === 'monthly' ? '✨ El paquete mensual incluye 4 semanas de limpieza' : '✨ Precio calculado por semana'}
                </p>
              </div>
            )}

            {cart.frequency === 'biweekly' && (
              <p className="animate-fade-in text-xs font-bold text-primary/40 italic">
                ✨ Incluye 2 limpiezas al mes (una cada dos semanas)
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentServices.map((service: ServiceData, idx: number) => {
              const isServiceSelected = cart.services.includes(service.title);
              return (
                <div 
                  key={idx} 
                  onClick={() => toggleService(service.title)}
                  className={`group rounded-[3rem] border ultra-thin-border overflow-hidden transition-all duration-700 h-full flex flex-col hover:-translate-y-4 relative text-reveal cursor-pointer ${
                    isServiceSelected ? 'border-accent shadow-gold-glow ring-[12px] ring-accent/5' : 'bg-white border-border shadow-luxe'
                  }`} 
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {service.popular && <div className="absolute top-6 right-6 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-lg flex items-center gap-2"><Sparkles className="w-3 h-3" />Más popular</div>}
                  {service.feature && <div className="absolute top-6 right-6 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-lg">{service.feature}</div>}
                  
                  <div className="h-64 overflow-hidden relative">
                    <Image 
                      src={service.img} 
                      alt={service.title} 
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
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
                    {service.idealFor && (
                      <div className="mb-3 inline-flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-xl self-start">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Ideal para:</span>
                        <span className="text-xs font-bold text-primary/90">{service.idealFor}</span>
                      </div>
                    )}
                    <p className="text-muted-foreground mb-4 line-clamp-2 font-medium">{service.desc}</p>
                    
                    {(service.includes || service.excludes) && (
                      <div className="flex flex-col gap-2 mb-6">
                         {service.includes?.map((item: string, i: number) => (
                          <div key={`inc-${i}`} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-success shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground/90">{item}</span>
                          </div>
                        ))}
                        {service.excludes?.map((item: string, i: number) => (
                          <div key={`exc-${i}`} className="flex items-start gap-2">
                            <X className="w-5 h-5 text-danger shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground/70 line-through">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-baseline gap-2 mb-8 mt-auto pt-4 border-t border-border/50">
                      {service.oldPrice && (
                        <span className="text-xl font-bold text-muted-foreground/40 line-through mr-2">€{service.oldPrice}</span>
                      )}
                      <span className="text-5xl font-black text-primary tabular-nums tracking-tighter">€{service.price}</span>
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{service.unit}</span>
                    </div>
                    
                    <div className="space-y-4 mb-10 pt-6 border-t border-border/50">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">Extras Opcionales</p>
                       {service.extras?.map((extra: { name: string; price: string; oldPrice?: string; badge?: string }, eidx: number) => {
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
                              <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                                  isExtraSelected ? 'bg-accent border-accent' : 'border-primary/10 bg-slate-50 group-hover/extra:border-accent'
                                }`}>
                                    <Check className={`w-4 h-4 text-white transition-opacity ${isExtraSelected ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                                <span className={`text-sm font-bold transition-colors ${isExtraSelected ? 'text-primary' : 'text-primary/60 group-hover/extra:text-primary'}`}>{extra.name}</span>
                                {extra.badge && (
                                  <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap hidden sm:inline-flex">
                                    {extra.badge}
                                  </span>
                                )}
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
                      <button 
                        data-track="add-to-cart"
                        data-service={service.title}
                        className={`w-full py-5 text-center rounded-2xl font-black text-lg transition-all active:scale-[0.98] ${
                          isServiceSelected ? 'bg-success text-white shadow-success/20' : 'bg-accent text-white shadow-gold-glow hover:bg-accent/90'
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
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[60] w-[95%] xl:w-max max-w-5xl animate-fade-in-up flex flex-col items-center">
          <button 
            onClick={() => setIsCartMinimized(!isCartMinimized)}
            className="bg-primary text-white px-6 py-2 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border border-b-0 border-white/20 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-colors z-10"
          >
            {isCartMinimized ? (
              <>Finalizar Reserva ({cart.services.length}) <ChevronUp className="w-5 h-5 ml-1" /></>
            ) : (
              <>Mínimizar <ChevronDown className="w-5 h-5 ml-1" /></>
            )}
          </button>
          <div className={`glass-gold rounded-[4rem] rounded-b-none lg:rounded-[4rem] border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10 w-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom ${
            isCartMinimized ? 'h-0 max-h-0 p-0 opacity-0 overflow-hidden border-none translate-y-20' : 'max-h-[600px] p-10 lg:p-12 mb-12 opacity-100 shadow-gold-glow animate-blur-reveal'
          }`}>
            <div className="text-white w-full md:w-auto flex justify-between items-center md:block">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent/80 mb-1">
                  Tu Selección
                  <span className="bg-danger/20 text-white border border-danger/50 px-2 py-0.5 rounded-full text-[9px] animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger"></span>
                    Solo 2 slots hoy
                  </span>
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black tabular-nums tracking-tighter">€{calculateTotal().toFixed(2)}</span>
                  <span className="text-sm font-bold text-white/60">{cart.services.length} {cart.services.length === 1 ? 'servicio' : 'servicios'}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <button 
                data-track="checkout-start"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-2xl font-black text-lg shadow-xl shadow-gold-glow hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                Finalizar Reserva
              </button>
              <button 
                onClick={() => setCart({ services: [], extras: {}, frequency: 'once', daysPerWeek: 1 })}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 text-white/60 font-bold text-sm hover:bg-white/10 transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white rounded-full font-extrabold text-xl shadow-gold-glow hover:shadow-elegant-xl transition-all"
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

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        totalAmount={calculateTotal()}
        baseWhatsAppMessage={generateWhatsAppMessage()}
      />
    </>
  );
}
