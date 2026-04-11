'use client';

import dynamic from 'next/dynamic';
import { BookingOrder } from '@/lib/stripe-orders';

const DynamicDashboard = dynamic(
  () => import('./OrdersDashboard').then(mod => mod.OrdersDashboard),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <div className="flex flex-col items-center gap-2">
          <p className="editorial-title text-2xl text-primary font-bold">Iniciando Terminal...</p>
          <p className="text-[10px] text-accent uppercase font-black tracking-widest">Sincronizando con Gahenax Kernel</p>
        </div>
      </div>
    )
  }
);

interface DashboardData {
  kpis: {
    totalRevenue: number;
    totalSales: number;
    totalLeads: number;
    conversionRate: number;
    averageTicket: number;
  };
  chartData: {
    date: string;
    sales: number;
    leads: number;
  }[];
  recentActivity: Record<string, unknown>[];
}

interface AdminDashboardWrapperProps {
  orders: BookingOrder[];
  dashboard: DashboardData | null;
}

export function AdminDashboardWrapper({ orders, dashboard }: AdminDashboardWrapperProps) {
  return (
    <DynamicDashboard 
      initialOrders={orders} 
      dashboardData={dashboard} 
    />
  );
}
