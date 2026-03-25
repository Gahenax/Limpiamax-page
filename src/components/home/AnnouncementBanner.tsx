import { BannerCloseButton } from './BannerCloseButton';

export function AnnouncementBanner() {
  return (
    <div 
      id="announcement-banner"
      className="fixed top-0 left-0 right-0 z-[60] bg-[#BF953F] text-white py-2 text-center text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] group overflow-hidden h-8 flex items-center justify-center transition-all duration-300"
    >
      <div className="container mx-auto px-10 relative flex items-center justify-center">
        <span className="inline-block">✨ Oferta de Inauguración: Precios Especiales por Tiempo Limitado ✨</span>
        <BannerCloseButton />
      </div>
    </div>
  );
}
