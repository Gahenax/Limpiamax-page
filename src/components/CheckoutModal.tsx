"use client";

import React, { useState } from 'react';
import { CreditCard, Check, X, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useCart } from './CartProvider';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  baseWhatsAppMessage: string;
}

export function CheckoutModal({ isOpen, onClose, totalAmount, baseWhatsAppMessage }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    calle: '',
    piso: '',
    cp: '',
    nombre: '',
    email: '',
    telefono: '',
  });

  const { cart: cartData, findService } = useCart();

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent, nextStep: 2 | 3) => {
    e.preventDefault();
    setStep(nextStep);
  };

  const handleWhatsAppCheckout = () => {
    const finalMessage = `${baseWhatsAppMessage}\n\n*Mis Datos:*\nNombre: ${formData.nombre}\nTeléfono: ${formData.telefono}\nDirección: ${formData.calle}, Piso: ${formData.piso}, CP: ${formData.cp}`;
    window.open(`https://wa.me/34674571497?text=${encodeURIComponent(finalMessage)}`, '_blank');
  };

  const handleStripeCheckout = async () => {
    const items = cartData.services.map((sTitle: string) => {
      const service = findService(sTitle);
      return {
        title: sTitle,
        description: service?.desc,
        price: service?.price
      };
    });
    
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          frequency: cartData.frequency,
          formData, // Enviamos los datos del cliente (nombre, dirección, etc)
          success_url: window.location.origin + '/gracias',
          cancel_url: window.location.href,
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No URL returned');
      }
    } catch (err) {
      console.error('Stripe Checkout Error:', err);
      alert('Error al conectar con Stripe. Intenta con WhatsApp.');
    }
  };

  return (
    <dialog open={isOpen} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in w-full h-full max-w-none max-h-none m-0">
      <div className="bg-white rounded-[2rem] shadow-luxe w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
        {/* Header */}
        <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black font-outfit leading-none">Checkout Seguro</h2>
            <p className="text-white/70 text-sm mt-1 font-medium">Completa tu reserva en 3 pasos</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Accordion Content */}
        <div className="overflow-y-auto p-6 space-y-4 bg-slate-50 flex-1">
          
          {/* STEP 1: DIRECCIÓN */}
          <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${step === 1 ? 'border-accent ring-1 ring-accent/20' : 'border-border'}`}>
            <button 
              onClick={() => step > 1 && setStep(1)}
              className="w-full p-4 flex items-center justify-between text-left font-bold"
              disabled={step === 1}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step > 1 ? 'bg-success text-white' : step === 1 ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                </div>
                <span className={step >= 1 ? 'text-primary' : 'text-slate-400'}>Dirección del Servicio</span>
              </div>
              {step === 1 ? <ChevronUp className="w-5 h-5 text-accent" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            {step === 1 && (
              <form onSubmit={(e) => handleNext(e, 2)} className="p-4 pt-0 border-t border-slate-100 animate-fade-in-up">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Calle y Número</label>
                    <input required type="text" value={formData.calle} onChange={e => setFormData({...formData, calle: e.target.value})} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-colors" placeholder="Carrer de Mallorca, 401" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Piso/Puerta</label>
                      <input type="text" value={formData.piso} onChange={e => setFormData({...formData, piso: e.target.value})} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-colors" placeholder="2º 1ª" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Código Postal</label>
                      <input required type="text" value={formData.cp} onChange={e => setFormData({...formData, cp: e.target.value})} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-colors" placeholder="08013" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 mt-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                    Continuar a Datos de Contacto
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* STEP 2: CONTACTO */}
          <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${step === 2 ? 'border-accent ring-1 ring-accent/20' : 'border-border'}`}>
            <button 
              onClick={() => step > 2 && setStep(2)}
              className="w-full p-4 flex items-center justify-between text-left font-bold"
              disabled={step < 2}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step > 2 ? 'bg-success text-white' : step === 2 ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {step > 2 ? <Check className="w-5 h-5" /> : '2'}
                </div>
                <span className={step >= 2 ? 'text-primary' : 'text-slate-400'}>Datos de Contacto</span>
              </div>
              {step === 2 ? <ChevronUp className="w-5 h-5 text-accent" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            {step === 2 && (
              <form onSubmit={(e) => handleNext(e, 3)} className="p-4 pt-0 border-t border-slate-100 animate-fade-in-up">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Nombre Completo</label>
                    <input required type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-colors" placeholder="Juan Pérez" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Teléfono Móvil</label>
                    <input required type="tel" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-colors" placeholder="+34 600 000 000" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-colors" placeholder="juan@email.com" />
                  </div>
                  <button type="submit" className="w-full py-4 mt-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                    Continuar al Resumen
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* STEP 3: PAGO / RESUMEN */}
          <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${step === 3 ? 'border-accent ring-1 ring-accent/20' : 'border-border'}`}>
            <button className="w-full p-4 flex items-center justify-between text-left font-bold" disabled>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 3 ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                  3
                </div>
                <span className={step === 3 ? 'text-primary' : 'text-slate-400'}>Resumen y Confirmación</span>
              </div>
            </button>
            
            {step === 3 && (
              <div className="p-6 pt-2 border-t border-slate-100 animate-fade-in-up">
                <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-muted-foreground">Subtotal</span>
                    <span className="font-bold">€{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-muted-foreground">Seguro Allianz</span>
                    <span className="font-bold text-success flex items-center gap-2">
                       <span className="text-muted-foreground/30 line-through text-xs">€9.90</span>
                       Incluido
                    </span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-end">
                    <span className="text-sm font-black uppercase tracking-widest text-primary">Total a Pagar</span>
                    <span className="text-3xl font-black text-primary">€{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 flex items-center justify-center gap-3 bg-success text-white rounded-xl font-black text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Confirmar por WhatsApp
                  </button>
                  <button 
                    onClick={handleStripeCheckout}
                    className="w-full py-4 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-black text-lg shadow-elegant-xl hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98] border border-white/10"
                  >
                    <CreditCard className="w-6 h-6 text-accent" />
                    Pagar con Tarjeta (Stripe)
                  </button>
                </div>
                <p className="text-center text-xs font-medium text-muted-foreground mt-4">
                  Sin cargos ocultos. El precio mostrado es final.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </dialog>
  );
}
