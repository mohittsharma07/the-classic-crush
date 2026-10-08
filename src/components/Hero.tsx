import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const openMenu = () => {
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openDesserts = () => {
    setSelectedCategory('signature-desserts');
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.82,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-[#292D1D] sm:min-h-[740px] lg:min-h-[800px]">
      {/* Café Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2200&q=85"
          alt="Warm and welcoming café interior"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Olive-tinted overlays */}
      <div className="absolute inset-0 bg-[#202318]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#202318]/95 via-[#292D1D]/75 to-[#292D1D]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#202318]/85 via-transparent to-[#202318]/25" />

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[680px] max-w-[1440px] items-center px-5 pb-20 pt-16 sm:min-h-[740px] sm:px-8 lg:min-h-[800px] lg:px-10">
        <div className="max-w-4xl text-[#F4EBDD]">
          {/* Brand Intro */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B9A064] sm:w-14" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4BD85] sm:text-[11px] sm:tracking-[0.3em]">
              The Classic Crush · Bakery & Café
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-[46px] font-medium leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-7xl lg:text-[86px]">
            A little sweetness.
            <br />
            <span className="italic text-[#D4BD85]">
              A lot of love.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#F4EBDD]/85 sm:text-base sm:leading-8">
            From freshly baked favourites to signature desserts and
            comforting café classics, discover something special,
            made with love and served fresh.
          </p>

          {/* Brand Tagline */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B9A064]/80" />
            <span className="font-serif text-lg italic text-[#D4BD85]">
              Made With Love
            </span>
            <span className="h-px w-8 bg-[#B9A064]/80" />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openMenu}
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-[#D4BD85] bg-[#B9A064] px-7 text-sm font-semibold text-[#292D1D] transition-colors hover:bg-[#D4BD85]"
            >
              Explore Our Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={openDesserts}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-[#D4BD85]/65 bg-[#292D1D]/30 px-7 text-sm font-semibold text-[#F4EBDD] transition-colors hover:bg-[#244536]/80"
            >
              Discover Desserts
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-medium uppercase tracking-[0.16em] text-[#F4EBDD]/70 sm:gap-x-5 sm:text-[10px] sm:tracking-[0.2em]">
            <span>Freshly Baked</span>
            <span className="text-[#B9A064]">✦</span>
            <span>Café Favourites</span>
            <span className="text-[#B9A064]">✦</span>
            <span>Signature Desserts</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Discover more sections"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#F4EBDD]/60 transition-colors hover:text-[#D4BD85] sm:flex"
      >
        <span className="text-[8px] font-medium uppercase tracking-[0.3em]">
          Discover
        </span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-[#D4BD85]/50 p-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4BD85]" />
        </span>
        <ArrowDown className="h-3 w-3" />
      </button>

      {/* Bottom Label */}
      <div className="absolute bottom-5 left-0 right-0 sm:bottom-8">
        <div className="mx-auto flex max-w-[1440px] justify-end px-5 sm:px-8 lg:px-10">
          <span className="text-[8px] uppercase tracking-[0.15em] text-[#F4EBDD]/55 sm:text-[9px] sm:tracking-[0.22em]">
            THE CLASSIC CRUSH · MADE WITH LOVE
          </span>
        </div>
      </div>
    </section>
  );
};
