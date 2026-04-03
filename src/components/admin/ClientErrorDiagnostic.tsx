'use client';

import React, { useState, useEffect } from 'react';

/**
 * Componente de diagnóstico crítico.
 * Escucha errores globales y los muestra en pantalla para depuración remota.
 */
export function ClientErrorDiagnostic() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const msg = 'reason' in event 
        ? `Unhandled Promise: ${String(event.reason)}` 
        : `Error: ${event.message} at ${event.filename}:${event.lineno}`;
      setErrors(prev => [...prev, msg]);
    };

    const originalConsoleError = console.error;
    console.error = (...args) => {
      setErrors(prev => [...prev, `console.error: ${args.map(a => String(a)).join(' ')}`]);
      originalConsoleError.apply(console, args);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
      console.error = originalConsoleError;
    };
  }, []);

  if (errors.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] bg-red-600 text-white p-4 rounded-xl shadow-2xl overflow-hidden max-h-[80vh]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold uppercase tracking-widest text-xs">⚠️ Gahenax Debug Trace ({errors.length})</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-white/20 px-3 py-1 rounded-lg text-[10px] hover:bg-white/30 transition-colors"
        >
          {isExpanded ? 'Contraer' : 'Ver Detalles'}
        </button>
      </div>
      {isExpanded && (
        <div className="overflow-auto max-h-[60vh] text-[10px] font-mono bg-black/20 p-2 rounded">
          {errors.map((err, i) => (
            <div key={i} className="mb-2 border-b border-white/10 pb-2 last:border-0">
              {err}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
