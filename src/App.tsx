/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

import { StoreProvider, useStore } from './context/StoreContext';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackerView } from './components/OrderTrackerView';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { InstagramSection } from './components/InstagramSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [currentView]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF6F0] text-[#2C1810]">
      <Header />

      <main className="min-w-0 flex-1 pb-16 sm:pb-0">

        {/* ================= HOME ================= */}
        {currentView === 'home' && (
          <>
            {/* Hero */}
            <Hero />

            {/* Brand Story */}
            <AboutSection />

            {/* Menu Introduction */}
            <section className="border-y border-[#4A3023] bg-[#2C1810] px-4 py-16 sm:px-6 sm:py-20">
              <div className="mx-auto max-w-5xl text-center">

                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D9A441]">
                  Freshly prepared
                </p>

                <h2 className="mx-auto mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                  Something delicious is always waiting for you.
                </h2>

                <div className="mx-auto mt-6 h-px w-14 bg-[#D9A441]" />

                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  From comforting café favourites to freshly baked treats,
                  discover the flavours that make The Classic Crush special.
                </p>
              </div>
            </section>

            {/* ================= OUR MENU ================= */}
            <section
              id="menu"
              className="scroll-mt-24 bg-[#FAF6F0]"
            >
              {/* Menu Heading */}
              <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
                <div className="mx-auto max-w-3xl text-center">

                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9A6B45]">
                    The Classic Crush
                  </p>

                  <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#2C1810] sm:text-5xl md:text-6xl">
                    Our Menu
                  </h2>

                  <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-[#D9A441]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                    <span className="h-px w-10 bg-[#D9A441]" />
                  </div>

                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756960] sm:text-base">
                    Freshly prepared bakery favourites, café classics,
                    refreshing drinks and desserts made for every craving.
                  </p>
                </div>
              </div>

              {/* Category Navigation */}
              <CategoryNav />

              {/* Products */}
              <MenuSection />
            </section>

            {/* Café Experience */}
            <section className="relative isolate min-h-[520px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=90"
                alt="Warm café experience"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-[#1C100B]/65" />

              <div className="absolute inset-0 bg-gradient-to-r from-[#1C100B]/85 via-[#1C100B]/45 to-transparent" />

              <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-12">
                <div className="max-w-2xl">

                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#E5B65A]">
                    The TCC Experience
                  </p>

                  <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                    More than a bakery.
                    <br />
                    A place for good moments.
                  </h2>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                    Come in for a coffee, stay for the conversation, grab a
                    freshly baked favourite or simply take a moment for
                    yourself.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md">
                      Fresh bakes
                    </div>

                    <div className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md">
                      Café favourites
                    </div>

                    <div className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md">
                      Sweet moments
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <InstagramSection />

            {/* Contact */}
            <ContactSection />
          </>
        )}

        {/* ================= MENU PAGE ================= */}
        {currentView === 'menu' && (
          <>
            <section className="border-b border-[#E5DCD3] bg-[#FAF6F0] px-4 py-16 sm:px-6 sm:py-20">

              <div className="mx-auto max-w-4xl text-center">

                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9A6B45]">
                  The Classic Crush
                </p>

                <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#2C1810] sm:text-5xl md:text-6xl">
                  Our Menu
                </h1>

                <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-[#D9A441]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                  <span className="h-px w-10 bg-[#D9A441]" />
                </div>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#756960] sm:text-base">
                  Bakery favourites, café classics, refreshing drinks,
                  burgers, fries, momos and desserts — all in one place.
                </p>
              </div>
            </section>

            <CategoryNav />

            <MenuSection />
          </>
        )}

        {/* ================= OTHER VIEWS ================= */}

        {currentView === 'track' && <OrderTrackerView />}

        {currentView === 'account' && <CustomerDashboard />}

        {currentView === 'admin' && <AdminPanel />}

        {currentView === 'about' && <AboutSection />}

        {currentView === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal />

      <CartDrawer />

      <CheckoutModal />

      <OrderConfirmationModal />

      {/* Floating Actions */}
      <FloatingWhatsApp />

      <MobileBottomNav />

      {/* Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}