import React, { useState } from 'react';
import tccLogo from '../assets/tcc-logo.png';
import {
  ShoppingBag,
  Search,
  Clock,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  Flame,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    cartCount,
    subtotal,
    setIsCartDrawerOpen,
    onlyVeg,
    setOnlyVeg,
    onlyBestSeller,
    setOnlyBestSeller,
    searchQuery,
    setSearchQuery,
    currentView,
    setCurrentView,
    isAdmin,
    loginAdmin,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const goTo = (view: typeof currentView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginAdmin(adminPassInput)) {
      setIsAdminAuthModalOpen(false);
      setAdminPassInput('');
      setCurrentView('admin');
    }
  };

  const navItems = [
    { label: 'Home', view: 'home' as const },
    { label: 'Menu', view: 'menu' as const },
    { label: 'About Us', view: 'about' as const },
    { label: 'Contact', view: 'contact' as const },
    { label: 'Track Order', view: 'track' as const },
    { label: 'My Account', view: 'account' as const },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="relative z-50 bg-[#24140D] text-[#F7E8D0]">
        <div className="mx-auto flex min-h-[32px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
            Freshly baked · Crafted with care · Served with love
          </p>

          <div className="hidden items-center gap-5 sm:flex">
            <span className="flex items-center gap-1.5 text-[10px] text-white/65">
              <Clock className="h-3 w-3 text-[#D9A441]" />
              10 AM – 11 PM
            </span>

            <button
              onClick={() => {
                if (isAdmin) {
                  goTo('admin');
                } else {
                  setIsAdminAuthModalOpen(true);
                }
              }}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-[#E5C274] transition-colors hover:text-white"
            >
              <ShieldCheck className="h-3 w-3" />
              {isAdmin ? 'Admin Console' : 'Café Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="absolute left-0 right-0 top-[32px] z-40 border-b border-white/15 bg-[#24140D]/70 text-white backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="flex min-h-[78px] items-center justify-between gap-6">

            {/* Logo */}
            <button
              onClick={() => goTo('home')}
              className="flex shrink-0 items-center gap-3 text-left"
              aria-label="The Classic Crush home"
            >
              {/* Actual TCC Logo */}
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#D9A441]/50 bg-white shadow-sm">
                <img
                  src={tccLogo}
                  alt="The Classic Crush"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="font-serif text-[16px] font-bold tracking-[0.08em] text-white sm:text-[18px]">
                  THE CLASSIC CRUSH
                </div>

                <div className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.28em] text-[#E5C274] sm:text-[9px]">
                  Bakery & Café
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden items-center xl:flex">
              {navItems.map((item) => {
                const active = currentView === item.view;

                return (
                  <button
                    key={item.view}
                    onClick={() => goTo(item.view)}
                    className={`relative px-3.5 py-7 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                      active
                        ? 'text-white'
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {item.label}

                    {active && (
                      <span className="absolute bottom-[19px] left-1/2 h-[2px] w-5 -translate-x-1/2 bg-[#D9A441]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

              {/* Desktop Search */}
              <div className="relative hidden 2xl:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/45" />

                <input
                  type="text"
                  placeholder="Search menu"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);

                    if (currentView !== 'menu') {
                      setCurrentView('menu');
                    }
                  }}
                  className="h-9 w-32 rounded-full border border-white/20 bg-white/10 pl-9 pr-3 text-[11px] text-white outline-none placeholder:text-white/45 focus:border-[#D9A441]/70"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile Search */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white 2xl:hidden"
                aria-label="Search"
              >
                <Search className="h-[17px] w-[17px]" />
              </button>

              {/* Veg Filter */}
              <button
                onClick={() => setOnlyVeg(!onlyVeg)}
                className={`hidden h-9 items-center gap-1.5 rounded-full border px-3 text-[10px] font-semibold transition-colors sm:flex ${
                  onlyVeg
                    ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-200'
                    : 'border-white/20 bg-white/5 text-white/70 hover:border-emerald-300/60 hover:text-white'
                }`}
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border border-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Veg
              </button>

              {/* Best Seller Filter */}
              <button
                onClick={() => setOnlyBestSeller(!onlyBestSeller)}
                className={`hidden h-9 items-center gap-1.5 rounded-full border px-3 text-[10px] font-semibold transition-colors 2xl:flex ${
                  onlyBestSeller
                    ? 'border-[#D9A441]/80 bg-[#D9A441]/15 text-[#F1D28D]'
                    : 'border-white/20 bg-white/5 text-white/70 hover:border-[#D9A441]/60 hover:text-white'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                Best
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex h-10 items-center gap-2 rounded-full border border-[#D9A441]/40 bg-[#2C1810] px-3.5 text-white transition-colors hover:bg-[#3A2117]"
                aria-label="Open shopping cart"
              >
                <ShoppingBag className="h-[16px] w-[16px] text-[#D9A441]" />

                <div className="hidden text-left leading-none sm:block">
                  <span className="block text-[8px] uppercase tracking-[0.14em] text-white/45">
                    Cart
                  </span>

                  <span className="mt-0.5 block text-[11px] font-semibold">
                    ₹{subtotal}
                  </span>
                </div>

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#24140D] bg-[#B64532] px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white xl:hidden"
                aria-label={
                  isMobileMenuOpen ? 'Close menu' : 'Open menu'
                }
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#24140D] xl:hidden">
            <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8">

              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

                <input
                  type="text"
                  placeholder="Search the menu..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);

                    if (currentView !== 'menu') {
                      setCurrentView('menu');
                    }
                  }}
                  className="h-11 w-full rounded-xl border border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#D9A441]/60"
                />
              </div>

              {/* Mobile Links */}
              <nav className="grid grid-cols-2 border-l border-t border-white/10">
                {navItems.map((item) => {
                  const active = currentView === item.view;

                  return (
                    <button
                      key={item.view}
                      onClick={() => goTo(item.view)}
                      className={`border-b border-r border-white/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                        active
                          ? 'bg-[#D9A441] text-[#2C1810]'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Filters */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOnlyVeg(!onlyVeg)}
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold ${
                    onlyVeg
                      ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'
                      : 'border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  {onlyVeg ? '✓ Veg Only' : 'Veg Only'}
                </button>

                <button
                  onClick={() =>
                    setOnlyBestSeller(!onlyBestSeller)
                  }
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold ${
                    onlyBestSeller
                      ? 'border-[#D9A441]/60 bg-[#D9A441]/15 text-[#F1D28D]'
                      : 'border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" />
                    Best Sellers
                  </span>
                </button>
              </div>

              {/* Admin */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);

                  if (isAdmin) {
                    goTo('admin');
                  } else {
                    setIsAdminAuthModalOpen(true);
                  }
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-4 py-3 text-xs font-bold text-[#2C1810] transition-colors hover:bg-[#E8C36F]"
              >
                <ShieldCheck className="h-4 w-4" />
                {isAdmin
                  ? 'Open Admin Console'
                  : 'Café Staff & Admin Login'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Admin Login Modal */}
      {isAdminAuthModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1C100B]/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-[#E4D9CD] bg-[#FBF8F3] p-6 shadow-2xl">

            <button
              onClick={() => {
                setIsAdminAuthModalOpen(false);
                setAdminPassInput('');
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#8C7D72] hover:bg-[#EFE7DE] hover:text-[#2C1810]"
              aria-label="Close admin login"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#2C1810] text-[#D9A441]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A6B45]">
              Staff access
            </p>

            <h3 className="mt-1 font-serif text-2xl font-bold text-[#2C1810]">
              Café Admin
            </h3>

            <p className="mt-2 text-xs leading-5 text-[#786A61]">
              Access the café management console for orders and menu
              controls.
            </p>

            <form
              onSubmit={handleAdminAuthSubmit}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#4D4038]">
                  Admin Passkey
                </label>

                <input
                  type="password"
                  placeholder="Enter passkey"
                  value={adminPassInput}
                  onChange={(e) =>
                    setAdminPassInput(e.target.value)
                  }
                  autoFocus
                  className="h-11 w-full rounded-xl border border-[#DCD1C6] bg-white px-3.5 text-sm text-[#2C1810] outline-none focus:border-[#9A6B45] focus:ring-2 focus:ring-[#9A6B45]/10"
                />

                <p className="mt-1.5 text-[10px] text-[#9A8C82]">
                  Demo:{' '}
                  <span className="font-mono font-semibold">
                    classic2026
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuthModalOpen(false);
                    setAdminPassInput('');
                  }}
                  className="h-10 flex-1 rounded-xl border border-[#DDD3C9] text-xs font-semibold text-[#655850] hover:bg-[#F0E8DF]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-10 flex-1 rounded-xl bg-[#2C1810] text-xs font-semibold text-white hover:bg-[#43271C]"
                >
                  Enter Console
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-[70] bg-[#1C100B]/70 p-4 pt-16 backdrop-blur-sm 2xl:hidden">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#FBF8F3] p-4 shadow-2xl">

            <div className="flex items-center gap-2 rounded-xl border border-[#DED4C9] bg-white px-3">
              <Search className="h-4 w-4 shrink-0 text-[#9A8C82]" />

              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);

                  if (currentView !== 'menu') {
                    setCurrentView('menu');
                  }
                }}
                autoFocus
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#2C1810] outline-none placeholder:text-[#9A8C82]"
              />

              <button
                onClick={() => setShowSearchModal(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#8C7D72] hover:bg-[#F0E8DF]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[10px] leading-4 text-[#8A7C72]">
                Search brownies, pastries, coffee and more.
              </p>

              <button
                onClick={() => {
                  setShowSearchModal(false);
                  goTo('menu');
                }}
                className="shrink-0 text-xs font-semibold text-[#8C5D36] hover:text-[#2C1810]"
              >
                View Menu →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};