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
import { CategoryId } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const goTo = (
    view: Parameters<typeof setCurrentView>[0]
  ) => {
    setCurrentView(view);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToCategory = (category: CategoryId) => {
    setSelectedCategory(category);
    setCurrentView('menu');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const menuLinks: { label: string; category: CategoryId }[] = [
    { label: 'Signature Desserts', category: 'signature-desserts' },
    { label: 'Quick Bites', category: 'quick-bites' },
    { label: 'Sandwiches & Maggie', category: 'sandwiches-maggie' },
    { label: 'Beverages & Pastries', category: 'beverages-small-eats' },
    { label: 'Burgers & Fries', category: 'burgers' },
    { label: 'Momos', category: 'momos' },
  ];

  const exploreLinks: {
    label: string;
    view: Parameters<typeof setCurrentView>[0];
  }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Full Menu', view: 'menu' },
    { label: 'Track Order', view: 'track' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
    { label: 'Staff & Admin', view: 'admin' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#B9A064]/35 bg-[#202318] pb-24 pt-14 text-[#F4EBDD] sm:pb-10 sm:pt-16">
      {/* Subtle brand details */}
      <div className="pointer-events-none absolute right-0 top-0 h-px w-1/2 bg-gradient-to-l from-[#B9A064]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-10 border-b border-[#F4EBDD]/15 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => goTo('home')}
              className="group flex items-center gap-3 text-left"
              aria-label="The Classic Crush home"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B9A064]/65 bg-[#292D1D] text-[#D4BD85] transition-colors group-hover:bg-[#244536]">
                <Coffee className="h-5 w-5" />
              </span>

              <span>
                <span className="block font-serif text-xl font-bold tracking-[0.06em] text-[#FFFCF6]">
                  THE CLASSIC CRUSH
                </span>

                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4BD85]">
                  Bakery & Café
                </span>
              </span>
            </button>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#F4EBDD]/70">
              Freshly baked treats, café favourites and handcrafted
              desserts, made with care. An initiative by the School
              of Hotel Management.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9A064]/35 bg-[#292D1D] text-[#D4BD85] transition-colors hover:border-[#D4BD85] hover:bg-[#244536]"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9A064]/35 bg-[#292D1D] text-[#D4BD85] transition-colors hover:border-[#D4BD85] hover:bg-[#244536]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3 text-xs italic text-[#D4BD85]">
              <span className="h-px w-8 bg-[#B9A064]/70" />
              <span className="font-serif text-base">Made With Love</span>
              <span className="h-px w-8 bg-[#B9A064]/70" />
            </div>
          </div>

          {/* Menu links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
              Our Menu
            </h4>

            <ul className="mt-5 space-y-3">
              {menuLinks.map((item) => (
                <li key={item.category}>
                  <button
                    type="button"
                    onClick={() => goToCategory(item.category)}
                    className="group flex items-center gap-1.5 text-left text-xs leading-5 text-[#F4EBDD]/70 transition-colors hover:text-[#D4BD85]"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
              Explore
            </h4>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => goTo(item.view)}
                    className="flex items-center gap-1.5 text-left text-xs text-[#F4EBDD]/70 transition-colors hover:text-[#D4BD85]"
                  >
                    {item.label}
                    {item.label === 'Staff & Admin' && (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
              Visit Us
            </h4>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#B9A064]/30 bg-[#292D1D] text-[#D4BD85]">
                  <MapPin className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#FFFCF6]">
                    Bakery Counter
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#F4EBDD]/65">
                    School of Hotel Management,
                    <br />
                    CSJMU Campus, Kanpur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#B9A064]/30 bg-[#292D1D] text-[#D4BD85]">
                  <Clock className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#FFFCF6]">
                    Opening Hours
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#F4EBDD]/65">
                    Please check with the café for current timings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#B9A064]/30 bg-[#292D1D] text-[#D4BD85]">
                  <Phone className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#FFFCF6]">
                    Call Us
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#F4EBDD]/65">
                    Contact details to be confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[10px] leading-5 text-[#F4EBDD]/55 sm:text-xs">
            © {new Date().getFullYear()} The Classic Crush Bakery & Café.
            All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#F4EBDD]/65 sm:text-xs">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 fill-[#B9A064] text-[#B9A064]" />
            <span>by School of Hotel Management</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
