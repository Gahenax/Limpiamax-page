'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Static Data for Services
export const servicesData = {
  hogar: [
    {
      title: "Limpieza de Casa (Básica)",
      desc: "Limpieza estándar para mantener tu hogar impecable.",
      includes: ["Limpieza de polvo superficial", "Aspirado y fregado de suelos", "Limpieza de 1 baño y cocina", "Limpieza de 2 habitaciones"],
      excludes: ["Interior de electrodomésticos", "Limpieza de ventanas por fuera"],
      price: "22,00",
      oldPrice: "35,00",
      idealFor: "Mantenimiento regular y tiempo libre",
      unit: "2 habitaciones",
      img: "/limpieza_casa_oscar_style_1773856637713.png",
      extras: [
        { name: "1 habitación más", price: "+€6.99", oldPrice: "12,99", badge: "Más solicitado" },
        { name: "Pack recomendado (Mascota + Aspiradora)", price: "+€6.99", oldPrice: "15,98", badge: "Ahorra 50%" },
        { name: "Tienes mascotas", price: "+€4.99", oldPrice: "5,99" },
        { name: "Requiere aspiradora", price: "+€4.99", oldPrice: "9,99" },
        { name: "Fuera de Barcelona ciudad", price: "+€4.99", oldPrice: "9,99" },
        { name: "Requiere productos limpieza", price: "+€4.99", oldPrice: "8,99", badge: "Ahorra tiempo" },
      ]
    },
    {
      title: "Limpieza Profunda de Casa",
      desc: "Desinfección a fondo de todas las áreas de tu hogar.",
      includes: ["Interior de horno y microondas", "Ventanas p/dentro y persianas", "Puertas, rodapiés e interruptores", "Fregado a fondo y desinfección"],
      excludes: ["Fachadas exteriores", "Limpieza post-reforma"],
      price: "39.99",
      oldPrice: "55,00",
      idealFor: "Cambios de inquilino o limpiezas anuales",
      unit: "3 horas",
      img: "/limpieza_profunda_oscar_style_1773856692696.png",
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
      desc: "Acondicionamiento total para entrar a vivir tras reformas.",
      includes: ["Desempolvado de paredes y techos", "Eliminación de restos de pintura", "Limpieza de manchas de cemento", "Aspirado industrial de polvo fino"],
      excludes: ["Retirada masiva de escombros pesados"],
      price: "49.99",
      oldPrice: "75,00",
      idealFor: "Mudanzas y post-reformas pesadas",
      unit: "3 horas",
      img: "/hero-premium-4.png", // Using the 8K asset
      feature: "Plus",
      extras: [
        { name: "Limpieza de paredes", price: "+€14.99", oldPrice: "24,99" },
        { name: "Despegar pintura", price: "+€9.99", oldPrice: "15,99" },
        { name: "Retirada de escombros", price: "+€19.99", oldPrice: "35,00" }
      ]
    },
    {
      title: "Limpieza de Mudanza",
      desc: "Preparación experta de tu nuevo hogar o entrega impecable del anterior.",
      includes: ["Desinfección de armarios por dentro", "Higiene profunda de baños y cocina", "Fregado a fondo de suelos", "Limpieza de cristales y marcos"],
      excludes: ["Transporte de bultos o cajas", "Desmontaje de muebles"],
      price: "44.99",
      oldPrice: "65,00",
      idealFor: "Entradas a vivir y entregas de llaves",
      unit: "3 horas",
      img: "/hero-premium-5.png", // Using the new 8K asset
      extras: [
        { name: "1 baño más", price: "+€6.99", oldPrice: "10,99" },
        { name: "1 habitación más", price: "+€5.99", oldPrice: "9,99" },
        { name: "Limpieza de electrodomésticos (Interior)", price: "+€9.99", oldPrice: "18,99", badge: "Ahorra 50%" },
        { name: "Limpieza de moho", price: "+€8.99", oldPrice: "14,99" }
      ]
    }
  ],
  tapiceria: [
    {
      title: "Limpieza de Sofás",
      desc: "Devolvemos el esplendor a tu tapicería.",
      includes: ["Aspirado profundo anti-ácaros", "Desmanchado localizado profesional", "Lavado con inyección-extracción", "Desodorización del tejido"],
      excludes: ["Reparación de roturas de tela"],
      price: "55,00",
      oldPrice: "85,00",
      unit: "Desde 2 plazas",
      img: "/limpieza_sofa_oscar_style_1773856651459.png",
      extras: [
        { name: "Sofá 3 plazas", price: "€85,00", oldPrice: "115,00" },
        { name: "Sofá 4 plazas", price: "€100,00", oldPrice: "140,00" },
        { name: "Sillas comedor", price: "€8,00/u" },
        { name: "Sillas reclinables", price: "€20,00/u" },
      ]
    },
    {
      title: "Limpieza de Alfombras",
      desc: "Tratamiento especializado y desinfección completa.",
      includes: ["Aspirado industrial doble", "Tratamiento de manchas rebeldes", "Higienización y desinfección", "Cepillado para levantar fibras"],
      excludes: ["Restauración de hilos sueltos"],
      price: "40.00",
      oldPrice: "60,00",
      unit: "2-4 metros",
      img: "/limpieza_alfombras_oscar_style_1773856721790.png",
      extras: [
        { name: "Alfombra 4-7 metros", price: "€70,00", oldPrice: "100,00" }
      ]
    },
    {
      title: "Limpieza de Colchones",
      desc: "Higiene total para un descanso saludable y sin ácaros.",
      includes: ["Aspirado con luz UV anti-ácaros", "Limpieza profunda a vapor", "Eliminación de piel muerta", "Tratamiento contra malos olores"],
      excludes: ["Garantía en manchas > 1 año"],
      price: "45,00",
      oldPrice: "75,00",
      unit: "140x190",
      img: "/limpieza_colchones_oscar_style_1773856736297.png",
      extras: [
        { name: "Colchón 140x190", price: "€45,00", oldPrice: "55,00" },
        { name: "Colchón 160x190", price: "€65,00", oldPrice: "85,00" },
        { name: "Pack ambas caras", price: "Incluido" }
      ]
    }
  ],
  empresas: [
    {
      title: "Limpiezas Industriales",
      desc: "Mantenimiento para naves y fábricas con maquinaria especializada.",
      includes: ["Fregado mecánico de superficies", "Desengrase industrial", "Barrido mecánico de naves", "Maquinaria industrial propia"],
      excludes: ["Gestión de residuos tóxicos"],
      price: "150,00",
      unit: "Mínimo",
      img: "/limpieza_industrial_oscar_style_1773856754718.png",
      extras: [
        { name: "Maquinaria pesada", price: "A convenir" },
        { name: "Tratamiento de suelos", price: "+€50,00" }
      ]
    },
    {
      title: "Limpiezas de Oficinas",
      desc: "Mantenimiento integral de tus espacios de trabajo.",
      includes: ["Vaciado de papeleras y reciclaje", "Desinfección de teclados y mesas", "Limpieza y reposición de baños", "Aspirado de moquetas y suelos"],
      excludes: ["Cristales exteriores en altura"],
      price: "80,00",
      oldPrice: "120,00",
      unit: "Desde / mes",
      img: "/limpieza_oficina_oscar_style_1773856666092.png",
      popular: true,
      extras: [
        { name: "Limpieza diaria", price: "Consultar" },
        { name: "Desinfección de equipos", price: "+€20,00" }
      ]
    }
  ]
};

export type ExtraData = {
  name: string;
  price: string;
  oldPrice?: string;
  badge?: string;
};

export type ServiceData = {
  title: string;
  desc: string;
  idealFor?: string;
  includes?: string[];
  excludes?: string[];
  price: string;
  oldPrice?: string;
  unit: string;
  img: string;
  popular?: boolean;
  feature?: string;
  extras: ExtraData[];
};

export type Frequency = 'once' | 'weekly' | 'biweekly' | 'monthly';

interface CartContextType {
  activeCategory: 'hogar' | 'tapiceria' | 'empresas';
  setActiveCategory: (cat: 'hogar' | 'tapiceria' | 'empresas') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCartMinimized: boolean;
  setIsCartMinimized: (open: boolean) => void;
  isBannerVisible: boolean;
  setIsBannerVisible: (visible: boolean) => void;
  cart: { 
    services: string[]; 
    extras: Record<string, string[]>;
    frequency: Frequency;
    daysPerWeek: number;
  };
  setCart: React.Dispatch<React.SetStateAction<{ 
    services: string[]; 
    extras: Record<string, string[]>; 
    frequency: Frequency;
    daysPerWeek: number;
  }>>;
  toggleService: (serviceTitle: string) => void;
  toggleExtra: (serviceTitle: string, extraName: string) => void;
  setFrequency: (freq: Frequency) => void;
  setDaysPerWeek: (days: number) => void;
  findService: (title: string) => ServiceData | undefined;
  calculateTotal: () => number;
  generateWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<'hogar' | 'tapiceria' | 'empresas'>('hogar');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartMinimized, setIsCartMinimized] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [cart, setCart] = useState<{ 
    services: string[]; 
    extras: Record<string, string[]>;
    frequency: Frequency;
    daysPerWeek: number;
  }>({
    services: [],
    extras: {},
    frequency: 'once',
    daysPerWeek: 1
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('limpiamax-cart');
        if (savedCart) {
          try {
            const parsed = JSON.parse(savedCart);
            setCart(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error('Error loading cart:', e);
          }
        }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('limpiamax-cart', JSON.stringify(cart));
  }, [cart]);

  const toggleService = (serviceTitle: string) => {
    setCart(prev => {
      const isSelected = prev.services.includes(serviceTitle);
      if (isSelected) {
        const newServices = prev.services.filter(s => s !== serviceTitle);
        const newExtras = { ...prev.extras };
        delete newExtras[serviceTitle];
        return { ...prev, services: newServices, extras: newExtras };
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

  const setFrequency = (frequency: Frequency) => {
    setCart(prev => ({ ...prev, frequency, daysPerWeek: frequency === 'once' ? 1 : prev.daysPerWeek }));
  };

  const setDaysPerWeek = (daysPerWeek: number) => {
    setCart(prev => ({ ...prev, daysPerWeek }));
  };

  const findService = (title: string) => {
    return [...servicesData.hogar, ...servicesData.tapiceria, ...servicesData.empresas].find(s => s.title === title);
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
            const priceStr = extra.price.replace(/[^\d.,]/g, '').replace(',', '.');
            total += parseFloat(priceStr) || 0;
          }
        });
      }
    });

    // Multiplier for recurring cleanings in a standard month (4 weeks)
    let visitsPerMonth = 1;
    if (cart.frequency === 'weekly') visitsPerMonth = cart.daysPerWeek * 4;
    else if (cart.frequency === 'biweekly') visitsPerMonth = 2;
    else if (cart.frequency === 'monthly') visitsPerMonth = cart.daysPerWeek * 4; // User: "el paquete mensual incluye 4 limpiezas" (1x/week)

    total *= visitsPerMonth;

    // Apply subscription discounts (MRR logic)
    if (cart.frequency === 'weekly') total *= 0.85;      // 15% discount
    else if (cart.frequency === 'biweekly') total *= 0.90; // 10% discount
    else if (cart.frequency === 'monthly') total *= 0.95;  // 5% discount

    return total;
  };

  const generateWhatsAppMessage = () => {
    let message = `Hola LimpiaMAX, me gustaría reservar los siguientes servicios (${cart.frequency === 'once' ? 'Pago único' : 'Suscripción ' + cart.frequency + ' - ' + cart.daysPerWeek + ' días/semana'}):\n\n`;
    cart.services.forEach(sTitle => {
      const service = findService(sTitle);
      message += `* ${sTitle} (€${service?.price})\n`;
      if (cart.extras[sTitle]?.length) {
        cart.extras[sTitle].forEach(e => message += `   - Extra: ${e}\n`);
      }
    });
    
    const visitsPerMonth = cart.frequency === 'once' ? 1 : (cart.frequency === 'biweekly' ? 2 : cart.daysPerWeek * 4);
    if (cart.frequency !== 'once') {
        message += `\n📅 Detalle: ${visitsPerMonth} limpiezas al mes (${cart.daysPerWeek} día/s por semana)`;
    }
    
    message += `\n\n*TOTAL ESTIMADO: €${calculateTotal().toFixed(2)} / ${cart.frequency === 'once' ? 'visita' : 'mes'}*\n\nMe gustaría conocer disponibilidad.`;
    return message;
  };

  return (
    <CartContext.Provider value={{
      activeCategory, setActiveCategory,
      isCartOpen, setIsCartOpen,
      isCheckoutOpen, setIsCheckoutOpen,
      isCartMinimized, setIsCartMinimized,
      isBannerVisible, setIsBannerVisible,
      cart, setCart,
      toggleService, toggleExtra, setFrequency, setDaysPerWeek,
      findService, calculateTotal,
      generateWhatsAppMessage
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
