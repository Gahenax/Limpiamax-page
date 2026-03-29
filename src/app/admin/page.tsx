import { getStripeOrders } from '@/lib/stripe-orders';
import { OrdersDashboard } from '@/components/admin/OrdersDashboard';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

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
