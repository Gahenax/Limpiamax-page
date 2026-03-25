'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function MicroFAQ() {
  const faqs = [
    {
      q: "¿Cuánto tarda el servicio?",
      a: "El tiempo depende del tamaño y estado del espacio, pero una limpieza a fondo estándar suele tomar entre 3 y 5 horas. Nuestros profesionales no se van hasta que todo está impecable."
    },
    {
      q: "¿Qué incluye exactamente?",
      a: "Cada servicio tiene sus detalles en la tarjeta de selección. Incluimos todos los productos de limpieza profesionales, desplazamiento y desinfección profunda. No incluye movimiento de muebles pesados."
    },
    {
      q: "¿Cómo se realiza el pago?",
      a: "Puedes pagar de forma 100% segura con tu tarjeta mediante Stripe al finalizar la reserva, o coordinar con nosotros por WhatsApp si prefieres otra modalidad en casos específicos."
    },
    {
      q: "¿Tienen algún tipo de seguro?",
      a: "Sí, todos nuestros servicios están cubiertos por nuestra póliza de Responsabilidad Civil de Allianz, dándote total tranquilidad mientras estamos en tu hogar o empresa."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold font-outfit text-primary tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground mt-4 font-medium">Todo lo que necesitas saber antes de tu primera limpieza.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-border/30 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-elegant">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-primary focus:outline-none"
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
