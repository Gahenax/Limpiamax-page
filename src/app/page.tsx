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
import { WhatsAppFAB } from '@/components/home/WhatsAppFAB';

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
        <WhatsAppFAB />
      </main>

      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
