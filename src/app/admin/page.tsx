import { getStripeOrders, BookingOrder } from '@/lib/stripe-orders';
import { getDashboardData } from '@/lib/dashboard-analytics';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { AdminDashboardWrapper } from '@/components/admin/AdminDashboardWrapper';
import { ClientErrorDiagnostic } from '@/components/admin/ClientErrorDiagnostic';

export default async function AdminPage() {
  const session = await getServerSession();

  // Redirección de seguridad triple (Middleware + ServerCheck)
  if (!session) {
    redirect('/admin/login');
  }

  // 🏛️ Fetch de Datos Soberanos con Error Handling
  let orders: BookingOrder[] = [];
  let dashboardData: any = null; // analytics structure is complex, will keep any or refine later if needed

  try {
    const [fetchedOrders, fetchedDashboardData] = await Promise.all([
      getStripeOrders(50),
      getDashboardData()
    ]);
    orders = fetchedOrders;
    dashboardData = fetchedDashboardData;
  } catch (error) {
    console.error('CRITICAL: Failed to fetch dashboard data:', error);
  }

  const dashboard = dashboardData || {
    kpis: { totalRevenue: 0, totalSales: 0, totalLeads: 0, conversionRate: 0, averageTicket: 0 },
    chartData: [],
    recentActivity: []
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <ClientErrorDiagnostic />
      <AdminDashboardWrapper 
        orders={orders} 
        dashboard={dashboard} 
      />
    </div>
  );
}
