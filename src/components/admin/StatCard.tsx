'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendType?: 'up' | 'down';
  subtitle?: string;
}

/**
 * Tarjeta de Kpi Premium - Inspiración School Management / Excel Pro.
 */
export function StatCard({ title, value, icon, trend, trendType, subtitle }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[2.5rem] shadow-luxe border ultra-thin-border border-accent/10 flex flex-col gap-4 group hover:border-accent/30 transition-all relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
      
      <div className="flex items-center justify-between">
        <div className="w-14 h-14 bg-accent/5 text-accent rounded-[1.2rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-gold-glow">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
            trendType === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          } border border-transparent hover:border-accent/10 transition-all`}>
            {trend}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1">{title}</p>
        <p className="text-3xl font-black text-primary tracking-tighter tabular-nums">{value}</p>
        {subtitle && (
          <p className="text-[10px] text-slate-400 font-medium mt-2 italic">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
