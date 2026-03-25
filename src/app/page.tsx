import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { Hero } from '@/components/home/Hero';
import { WorkingProcess } from '@/components/home/WorkingProcess';
import { PromoBar } from '@/components/home/PromoBar';
import { SocialProof } from '@/components/home/SocialProof';
import { ShopSection } from '@/components/home/ShopSection';
import { MicroFAQ } from '@/components/home/MicroFAQ';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <BannerLayoutWrapper>
      <main>
        <Hero />
        <ShopSection />
        <WorkingProcess />
        <PromoBar />
        <SocialProof />
        <MicroFAQ />
        <ContactSection />

        {/* Floating Action Button (WhatsApp) */}
        <a
          href="https://wa.me/34674571497"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100] w-16 h-16 bg-[#25D366] rounded-full shadow-elegant-xl flex items-center justify-center hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up md:translate-y-0"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-8 h-8 text-white fill-white" />
          <span className="absolute flex h-4 w-4 top-0 right-0 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#128C7E]"></span>
          </span>
        </a>
      </main>

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
