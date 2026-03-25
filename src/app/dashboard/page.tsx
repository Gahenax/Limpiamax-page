'use client';

import { useSession, signOut } from 'next-auth/react';
import { PROMOTIONS, SERVICE_STATUS } from '@/lib/constants';
import { LogOut, LayoutDashboard, Gift, History } from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit">
        <div className="text-center">
          <h1 className="text-3xl font-black text-primary mb-4">Acceso Restringido</h1>
          <p className="text-muted-foreground mb-8">Debes iniciar sesión para ver tu panel.</p>
          <a href="/login" className="bg-primary text-white px-8 py-3 rounded-2xl font-bold">Ir al Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-outfit pb-20">
      {/* Header Dashboard */}
      <div className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-primary leading-tight">Hola, {session.user?.name}</h1>
              <p className="text-sm font-medium text-muted-foreground">Bienvenido a tu panel de Limpiamax</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 p-2 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-8">
        {/* Mis Servicios */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-elegant">
            <div className="flex items-center gap-3 mb-8">
              <History className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-black text-primary">Próximas Sesiones</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div>
                  <p className="text-sm font-black text-primary/50 uppercase tracking-widest mb-1">Limpieza Profunda</p>
                  <p className="text-lg font-bold text-primary">24 de Marzo - 10:00 AM</p>
                </div>
                <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-black uppercase tracking-widest">
                  {SERVICE_STATUS.PENDING}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promociones */}
        <div className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <Gift className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-black">Promos VIP</h2>
            </div>
            
            <div className="space-y-4 relative z-10">
              {PROMOTIONS.map(promo => (
                <div key={promo.id} className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="font-black text-lg">{promo.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-accent font-black">{promo.discount} DTO.</span>
                    <span className="text-xs bg-white text-primary px-3 py-1 rounded-full font-black uppercase">{promo.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
