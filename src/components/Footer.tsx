import React from 'react';
import {
  Coffee,
  Heart,
  Phone,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    setSelectedCategory,
    isAdmin,
  } = useStore();

  const goTo = (view: Parameters<typeof setCurrentView>[0]) => {
    setCurrentView(view);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToCategory = (
    category: Parameters<typeof setSelectedCategory>[0]
  ) => {
    setSelectedCategory(category);
    setCurrentView('menu');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#4A3024] bg-[#25150F] pb-24 pt-14 text-[#F8F1E9] sm:pb-10 sm:pt-16">
      {/* Subtle background details */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D9A441]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#8C5D36]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => goTo('home')}
              className="group flex items-center gap-3 text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B98A5B]/40 bg-[#362017] text-[#D9A441] transition-transform duration-300 group-hover:scale-105">
                <Coffee className="h-5 w-5" />
              </span>

              <span>
                <span className="block font-serif text-xl font-bold tracking-[0.08em] text-white">
                  THE CLASSIC CRUSH
                </span>

                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D9A441]">
                  Bakery & Café
                </span>
              </span>
            </button>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
              Freshly baked treats, café favourites and handcrafted
              desserts made with care. An initiative by the School of
              Hotel Management.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B98A5B]/50 hover:bg-[#3A241A] hover:text-[#E5B869]"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-emerald-600 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
              <span className="h-px w-8 bg-[#B98A5B]/50" />
              Made with love
            </div>
          </div>

          {/* Menu */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A441]">
              Menu
            </h4>

            <ul className="mt-4 space-y-3">
              {[
                ['Signature Desserts', 'signature-desserts'],
                ['Quick Bites', 'quick-bites'],
                ['Sandwiches & Maggie', 'sandwiches-maggie'],
                ['Beverages & Pastries', 'beverages-small-eats'],
                ['Momos', 'momos'],
              ].map(([label, category]) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => goToCategory(category as any)}
                    className="group flex items-center gap-1.5 text-left text-xs text-white/60 transition-colors hover:text-white"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A441]">
              Explore
            </h4>

            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => goTo('home')}
                  className="text-xs text-white/60 transition-colors hover:text-white"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => goTo('menu')}
                  className="text-xs text-white/60 transition-colors hover:text-white"
                >
                  Full Menu
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => goTo('track')}
                  className="text-xs text-white/60 transition-colors hover:text-white"
                >
                  Track Order
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => goTo('about')}
                  className="text-xs text-white/60 transition-colors hover:text-white"
                >
                  About Us
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => goTo('contact')}
                  className="text-xs text-white/60 transition-colors hover:text-white"
                >
                  Contact
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (isAdmin) {
                      goTo('admin');
                    } else {
                      goTo('admin');
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-[#E5B869]"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Staff & Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A441]">
              Visit Us
            </h4>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#362017] text-[#D9A441]">
                  <MapPin className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Bakery Counter
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Hotel Management Complex,
                    <br />
                    North Wing Campus,
                    <br />
                    University Boulevard.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#362017] text-[#D9A441]">
                  <Clock className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Opening Hours
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    10:00 AM – 11:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#362017] text-[#D9A441]">
                  <Phone className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Call Us
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="mt-1 block text-xs text-white/55 transition-colors hover:text-[#E5B869]"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[10px] leading-5 text-white/35 sm:text-xs">
            © 2026 The Classic Crush Bakery & Café. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/40 sm:text-xs">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 fill-[#B64532] text-[#B64532]" />
            <span>by School of Hotel Management</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
