import React from 'react';
import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-2xl text-center border-4 border-primary/10">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        
        <h1 className="text-4xl font-black text-primary font-outfit mb-4">
          ¡Reserva Confirmada!
        </h1>
        
        <p className="text-slate-600 font-medium mb-8">
          Tu pago ha sido procesado con éxito. Un equipo de Limpiamax se pondrá en contacto contigo en los próximos minutos para coordinar los detalles.
        </p>

        <div className="space-y-4">
          <Link 
            href="/"
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-elegant-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            <Home className="w-5 h-5" />
            Volver al Inicio
          </Link>
          
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            ID de Transacción Verificado
          </p>
        </div>
      </div>
    </div>
  );
}
