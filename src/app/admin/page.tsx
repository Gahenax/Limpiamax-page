import { getStripeOrders } from '@/lib/stripe-orders';
import { OrdersDashboard } from '@/components/admin/OrdersDashboard';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function AdminPage() {
  const session = await getServerSession();

  // Redirección de seguridad triple (Middleware + ServerCheck)
  if (!session) {
    redirect('/admin/login');
  }

  const orders = await getStripeOrders(50);

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <OrdersDashboard initialOrders={orders} />
    </div>
  );
}
