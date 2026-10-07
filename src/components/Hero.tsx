import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const openMenu = () => {
    setCurrentView('menu');

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 50);
  };

  const openDesserts = () => {
    setSelectedCategory('signature-desserts');
    setCurrentView('menu');

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 50);
  };

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.82,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#24140D] sm:min-h-[780px] lg:min-h-[880px]">

      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2200&q=90"
          alt="The Classic Crush café"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Image Overlay */}
      <div className="absolute inset-0 bg-[#24140D]/25" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#170C07]/90 via-[#24140D]/55 to-[#24140D]/15" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#170C07]/85 via-transparent to-[#24140D]/35" />

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] items-center px-5 pb-20 pt-36 sm:min-h-[780px] sm:px-8 sm:pt-40 lg:min-h-[880px] lg:px-10">

        <div className="max-w-4xl text-white">

          {/* Small Heading */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D9A441] sm:w-14" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E7C47B] sm:text-[11px]">
              Bakery · Café · Desserts
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-[48px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]">
            Good food.
            <br />

            <span className="text-[#E6C47A]">
              Good coffee.
            </span>

            <br />

            Good moments.
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            Freshly prepared bakery favourites, handcrafted
            desserts and café classics — made with care and
            served fresh every day.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={openMenu}
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#D9A441] px-7 text-sm font-semibold text-[#2C1810] shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition-colors duration-200 hover:bg-[#E8C36F]"
            >
              Explore Our Menu

              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={openDesserts}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-black/15 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
            >
              Discover Desserts
            </button>

          </div>

          {/* Small Highlights */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-[10px]">
            <span>Fresh Bakes</span>

            <span className="text-[#D9A441]">•</span>

            <span>Café Favourites</span>

            <span className="text-[#D9A441]">•</span>

            <span>Signature Desserts</span>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:flex"
      >
        <span className="text-[8px] font-medium uppercase tracking-[0.3em]">
          Discover
        </span>

        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
        </span>

        <ArrowDown className="h-3 w-3" />
      </button>

      {/* Bottom Label */}
      <div className="absolute bottom-8 right-0 left-0">
        <div className="mx-auto flex max-w-[1440px] justify-end px-5 sm:px-8 lg:px-10">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
            The Classic Crush · Since 2026
          </span>
        </div>
      </div>

    </section>
  );
};

