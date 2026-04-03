'use client';

import { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsChartProps {
  data: Array<{ date: string; sales: number; leads: number }>;
  title: string;
}

/**
 * Gráfica de Analíticas de Gahenax - Inspiración Excel Dashboard Pro.
 */
export function AnalyticsChart({ data, title }: AnalyticsChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white p-8 rounded-[3rem] shadow-luxe border ultra-thin-border border-accent/10 h-[500px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white p-8 rounded-[3rem] shadow-luxe border ultra-thin-border border-accent/10 flex flex-col gap-6 group hover:border-accent/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-primary tracking-tighter">{title}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent shadow-gold-glow" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ventas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads</span>
          </div>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f3c26a" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f3c26a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '1.5rem', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '1.2rem',
                fontSize: '11px',
                fontWeight: 'bold'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#f3c26a" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={2000}
            />
            <Area 
              type="monotone" 
              dataKey="leads" 
              stroke="#cbd5e1" 
              strokeWidth={3}
              fillOpacity={0.1} 
              fill="#cbd5e1" 
              animationDuration={2500}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Inspirado en Analíticas Excel Pro (Gahenax)</p>
        <button className="text-[10px] font-black text-accent hover:text-primary transition-colors flex items-center gap-1">
          Ver reporte completo
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </button>
      </div>
    </motion.div>
  );
}
