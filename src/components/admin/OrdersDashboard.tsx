'use client';

import { useState } from 'react';
import { BookingOrder, updateOrderMetadata } from '@/lib/stripe-orders';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  MapPin, 
  User, 
  Calendar, 
  CreditCard,
  ExternalLink,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Target,
  Sparkles,
  MoreVertical,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { sanitizeBarcelonaAddress } from '@/lib/address-sanitizer';

interface OrdersDashboardProps {
  initialOrders: BookingOrder[];
}

export function OrdersDashboard({ initialOrders }: OrdersDashboardProps) {
  const [orders, setOrders] = useState<BookingOrder[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Stats para el "Frappe-style Workspace"
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const pendingWhatsApp = orders.filter(o => !o.whatsappSent).length;
  const completedToday = orders.filter(o => {
    const today = new Date().toISOString().split('T')[0];
    return o.date.startsWith(today);
  }).length;

  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppAction = async (order: BookingOrder) => {
    setIsUpdating(order.id);
    // Simulación de envío o llamada a API real
    try {
      const resp = await updateOrderMetadata(order.id, { whatsappSent: 'true' });
      if (resp.success) {
        setOrders(prev => prev.map(o => o.id === order.id ? { ...o, whatsappSent: true } : o));
      }
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar (Boutique Admin) */}
      <aside className="w-full md:w-72 bg-white border-r ultra-thin-border border-accent/10 flex flex-col shrink-0 z-20">
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-gold-glow border ultra-thin-border border-accent/20">
            <span className="text-accent font-black text-2xl">L</span>
          </div>
          <div className="flex flex-col">
            <span className="editorial-title text-xl text-primary leading-none">Console</span>
            <span className="text-[9px] text-accent/60 uppercase tracking-[0.2em] font-black mt-1">Limpiamax Executive</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#F3F4F6] text-primary rounded-xl font-bold transition-all">
            <Target className="w-5 h-5" />
            Workspace
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#F9FAFB] rounded-xl font-medium transition-all group">
            <Calendar className="w-5 h-5 group-hover:text-accent" />
            Reservas
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#F9FAFB] rounded-xl font-medium transition-all group">
            <Sparkles className="w-5 h-5 group-hover:text-accent" />
            Logística
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden max-h-screen">
        {/* Header / Search */}
        <header className="h-24 bg-white/70 backdrop-blur-xl border-b ultra-thin-border border-accent/10 flex items-center justify-between px-10 shrink-0">
          <div className="flex-1 max-w-2xl relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por cliente o dirección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-[#F9FAFB] border-none rounded-xl focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
             <div className="p-2.5 bg-[#F9FAFB] rounded-xl text-slate-500 hover:text-primary cursor-pointer transition-all border border-transparent hover:border-slate-200">
               <TrendingUp className="w-5 h-5" />
             </div>
             <div className="h-10 w-px bg-slate-200 mx-2 hidden md:block" />
             <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold">
                  JS
                </div>
             </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth">
          {/* Dashboard Stats (Frappe Workspace) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-reveal">
            <div className="bg-white p-8 rounded-[3rem] shadow-luxe border ultra-thin-border border-accent/5 flex items-center gap-6 group hover:border-accent/20 transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-accent/5 text-accent rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-gold-glow">
                <CreditCard className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1">Métrica de Oro</p>
                <p className="text-3xl font-black text-primary tracking-tighter tabular-nums">{totalRevenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-elegant border border-[#E5E7EB] flex items-center gap-5 group hover:border-accent transition-all relative overflow-hidden">
               {pendingWhatsApp > 0 && (
                 <div className="absolute top-4 right-4 flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                 </div>
               )}
              <div className="w-14 h-14 bg-[#FFF9E5] text-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Alertas WhatsApp</p>
                <p className="text-2xl font-black text-slate-800">{pendingWhatsApp} pendientes</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-elegant border border-[#E5E7EB] flex items-center gap-5 group hover:border-green-500 transition-all">
              <div className="w-14 h-14 bg-[#F0FDF4] text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Órdenes Hoy</p>
                <p className="text-2xl font-black text-slate-800">{completedToday} completadas</p>
              </div>
            </div>
          </section>

          {/* Orders List (Twilio Styled Virtualization Pattern) */}
          <section className="bg-white rounded-3xl shadow-elegant border border-[#E5E7EB] overflow-hidden flex flex-col">
             <div className="p-6 border-b border-[#F3F4F6] flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-800">Cola de Operaciones</h2>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                    <Filter className="w-4 h-4" />
                    Filtros
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-accent bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <Clock className="w-4 h-4" />
                    Recientes
                  </button>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Servicios/Monto</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Dirección</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">WhatsApp</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#F9FAFB] transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-200">
                               <User className="w-5 h-5" />
                             </div>
                             <div className="flex flex-col">
                                <span className="font-bold text-slate-800 text-sm truncate max-w-[120px]">{order.customerName}</span>
                                <span className="text-xs text-slate-400 font-medium">{format(new Date(order.date), "d MMM, HH:mm", { locale: es })}</span>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex flex-col gap-1">
                              <div className="flex flex-wrap gap-1">
                                {order.services.slice(0, 2).map((s, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-slate-50 text-[10px] font-black text-slate-500 rounded uppercase border border-slate-100">
                                    {s}
                                  </span>
                                ))}
                                {order.services.length > 2 && <span className="text-[10px] font-bold text-slate-400">+{order.services.length - 2}</span>}
                              </div>
                              <span className="font-black text-primary text-base">{order.amount} €</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 hidden lg:table-cell">
                           <div className="flex flex-col gap-1 max-w-[200px]">
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                                <span className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">{order.address}</span>
                              </div>
                              {(() => {
                                const sanitized = sanitizeBarcelonaAddress(order.address);
                                return (sanitized.district || sanitized.postalCode) && (
                                  <div className="flex gap-1.5 ml-6">
                                    {sanitized.district && (
                                      <span className="px-1.5 py-0.5 bg-accent/10 text-[9px] font-black text-accent rounded uppercase">
                                        {sanitized.district}
                                      </span>
                                    )}
                                    {sanitized.postalCode && (
                                      <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-black text-slate-500 rounded uppercase">
                                        {sanitized.postalCode}
                                      </span>
                                    )}
                                  </div>
                                );
                              })()}
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           {order.whatsappSent ? (
                             <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-wider bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-100 w-fit">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Enviado
                             </div>
                           ) : (
                             <button
                               onClick={() => handleWhatsAppAction(order)}
                               disabled={isUpdating === order.id}
                               className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-wider bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100 w-fit hover:bg-accent hover:text-white transition-all active:scale-95 disabled:opacity-50"
                             >
                                <MessageCircle className="w-3.5 h-3.5" />
                                {isUpdating === order.id ? 'Marcando...' : 'Marcar Despacho'}
                             </button>
                           )}
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <a 
                               href={`https://dashboard.stripe.com/payments/${order.id}`}
                               target="_blank"
                               className="p-2 text-slate-400 hover:text-primary transition-colors"
                             >
                               <ExternalLink className="w-5 h-5" />
                             </a>
                             <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                               <MoreVertical className="w-5 h-5" />
                             </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
             
             {filteredOrders.length === 0 && (
               <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">No se encontraron órdenes</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Intenta ajustar los términos de búsqueda o verifica los filtros de fecha.</p>
               </div>
             )}

             <div className="p-4 border-t border-[#F3F4F6] bg-[#F9FAFB] flex items-center justify-center">
                <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                  Cargar más reservas
                  <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
