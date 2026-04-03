"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Home, Calendar, Clock, Euro, Tag } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSessionData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching session:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold animate-pulse">Verificando tu reserva...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-success" />
      </div>
      
      <h1 className="text-4xl font-black text-primary font-outfit mb-2">
        ¡Reserva Confirmada!
      </h1>
      <p className="text-slate-500 font-medium mb-8">
        {sessionData?.customer_name ? `¡Gracias ${sessionData.customer_name}! ` : ''}
        Tu pago ha sido procesado con éxito.
      </p>

      {sessionData && (
        <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-left border border-slate-100 shadow-inner">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Resumen del Pedido</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Servicio</p>
                <p className="text-primary font-bold leading-none">{sessionData.category}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Fecha</p>
                  <p className="text-primary font-bold leading-none">{sessionData.service_date || 'Pendiente'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Horario</p>
                  <p className="text-primary font-bold leading-none text-xs">{sessionData.service_time || 'Mañana'}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2 text-primary font-black">
                <Euro className="w-5 h-5 text-accent" />
                <span className="text-xl">Total Pagado</span>
              </div>
              <span className="text-2xl font-black text-primary">€{sessionData.amount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Link 
          href="/"
          className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-elegant-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98]"
        >
          <Home className="w-5 h-5" />
          Volver al Inicio
        </Link>
        
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          ID: {sessionId ? sessionId.substring(0, 15) + '...' : 'TRANSACCIÓN VERIFICADA'}
        </p>
      </div>
    </div>
  );
}

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-2xl text-center border-4 border-primary/10">
        <Suspense fallback={<div>Cargando...</div>}>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
