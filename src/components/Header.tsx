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
  const [adminError, setAdminError] = useState('');

  const goTo = (view: typeof currentView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setShowSearchModal(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (loginAdmin(adminPassInput)) {
      setIsAdminAuthModalOpen(false);
      setAdminPassInput('');
      setCurrentView('admin');
    } else {
      setAdminError('Incorrect passkey. Please try again.');
    }
  };

  const openAdminLogin = () => {
    setIsMobileMenuOpen(false);

    if (isAdmin) {
      goTo('admin');
    } else {
      setAdminError('');
      setIsAdminAuthModalOpen(true);
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

  const navLinkClass = (active: boolean) =>
    `relative whitespace-nowrap px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
      active
        ? 'text-[#D4BD85]'
        : 'text-[#F4EBDD]/75 hover:text-[#D4BD85]'
    }`;

  return (
    <>
      {/* Announcement Bar */}
      <div className="relative z-50 bg-[#202318] text-[#F4EBDD]">
        <div className="mx-auto flex min-h-[34px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-[#F4EBDD]/80 sm:text-[10px] sm:tracking-[0.18em]">
            Freshly baked · Crafted with care · Served with love
          </p>

          <div className="hidden items-center gap-5 sm:flex">
            <span className="flex items-center gap-1.5 text-[10px] text-[#F4EBDD]/75">
              <Clock className="h-3 w-3 text-[#B9A064]" />
              10 AM – 11 PM
            </span>

            <button
              onClick={openAdminLogin}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-[#D4BD85] transition-colors hover:text-white"
            >
              <ShieldCheck className="h-3 w-3" />
              {isAdmin ? 'Admin Console' : 'Café Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="relative z-40 border-b border-[#B9A064]/30 bg-[#292D1D] text-[#F4EBDD]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="flex min-h-[78px] items-center justify-between gap-3 lg:gap-5">

            {/* Brand */}
            <button
              onClick={() => goTo('home')}
              className="flex min-w-0 shrink-0 items-center gap-2.5 text-left sm:gap-3"
              aria-label="The Classic Crush home"
            >
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#B9A064] bg-[#F4EBDD] sm:h-14 sm:w-14">
                <img
                  src={tccLogo}
                  alt="The Classic Crush logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="font-serif text-[12px] font-bold tracking-[0.04em] text-[#F4EBDD] sm:text-[17px] sm:tracking-[0.08em]">
                  THE CLASSIC CRUSH
                </div>
                <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.2em] text-[#D4BD85] sm:text-[9px] sm:tracking-[0.28em]">
                  Bakery &amp; Café
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden items-center xl:flex">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => goTo(item.view)}
                  className={navLinkClass(currentView === item.view)}
                >
                  {item.label}
                  {currentView === item.view && (
                    <span className="absolute bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 bg-[#B9A064]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

              {/* Desktop Search */}
              <div className="relative hidden 2xl:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#F4EBDD]/50" />
                <input
                  type="text"
                  placeholder="Search menu"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== 'menu') setCurrentView('menu');
                  }}
                  className="h-9 w-32 rounded-full border border-[#B9A064]/35 bg-[#F4EBDD]/5 pl-9 pr-8 text-[11px] text-[#F4EBDD] outline-none placeholder:text-[#F4EBDD]/45 focus:border-[#D4BD85]"
                  aria-label="Search menu"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#F4EBDD]/60 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#F4EBDD]/80 transition-colors hover:bg-[#F4EBDD]/10 hover:text-[#D4BD85] 2xl:hidden"
                aria-label="Search menu"
              >
                <Search className="h-[17px] w-[17px]" />
              </button>

              {/* Veg Filter */}
              <button
                onClick={() => setOnlyVeg(!onlyVeg)}
                aria-pressed={onlyVeg}
                className={`hidden h-9 items-center gap-1.5 rounded-full border px-3 text-[10px] font-semibold transition-colors sm:flex ${
                  onlyVeg
                    ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-200'
                    : 'border-[#F4EBDD]/20 text-[#F4EBDD]/75 hover:border-emerald-300/60 hover:text-white'
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
                aria-pressed={onlyBestSeller}
                className={`hidden h-9 items-center gap-1.5 rounded-full border px-3 text-[10px] font-semibold transition-colors 2xl:flex ${
                  onlyBestSeller
                    ? 'border-[#B9A064] bg-[#B9A064]/15 text-[#D4BD85]'
                    : 'border-[#F4EBDD]/20 text-[#F4EBDD]/75 hover:border-[#B9A064] hover:text-[#D4BD85]'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                Best
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex h-10 items-center gap-2 rounded-full border border-[#B9A064]/60 bg-[#244536] px-3 sm:px-3.5"
                aria-label={`Open shopping cart, ${cartCount} items`}
              >
                <ShoppingBag className="h-4 w-4 text-[#D4BD85]" />
                <div className="hidden text-left leading-none sm:block">
                  <span className="block text-[8px] uppercase tracking-[0.14em] text-[#F4EBDD]/60">
                    Cart
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold text-[#F4EBDD]">
                    ₹{subtotal}
                  </span>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#292D1D] bg-[#B9A064] px-1 text-[9px] font-bold text-[#292D1D]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#F4EBDD]/85 transition-colors hover:bg-[#F4EBDD]/10 hover:text-[#D4BD85] xl:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
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
          <div className="border-t border-[#B9A064]/25 bg-[#292D1D] xl:hidden">
            <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8">

              <div className="relative mb-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B9A064]" />
                <input
                  type="text"
                  placeholder="Search the menu..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== 'menu') setCurrentView('menu');
                  }}
                  className="h-11 w-full rounded-xl border border-[#B9A064]/35 bg-[#F4EBDD]/5 pl-10 pr-4 text-sm text-[#F4EBDD] outline-none placeholder:text-[#F4EBDD]/45 focus:border-[#D4BD85]"
                  aria-label="Search the menu"
                />
              </div>

              <nav className="grid grid-cols-2 border-l border-t border-[#F4EBDD]/10">
                {navItems.map((item) => {
                  const active = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => goTo(item.view)}
                      className={`border-b border-r border-[#F4EBDD]/10 px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                        active
                          ? 'bg-[#B9A064] text-[#292D1D]'
                          : 'bg-[#244536]/40 text-[#F4EBDD]/80 hover:bg-[#244536] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOnlyVeg(!onlyVeg)}
                  aria-pressed={onlyVeg}
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold ${
                    onlyVeg
                      ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200'
                      : 'border-[#F4EBDD]/15 bg-[#F4EBDD]/5 text-[#F4EBDD]/80'
                  }`}
                >
                  {onlyVeg ? '✓ Veg Only' : 'Veg Only'}
                </button>

                <button
                  onClick={() => setOnlyBestSeller(!onlyBestSeller)}
                  aria-pressed={onlyBestSeller}
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold ${
                    onlyBestSeller
                      ? 'border-[#B9A064]/70 bg-[#B9A064]/10 text-[#D4BD85]'
                      : 'border-[#F4EBDD]/15 bg-[#F4EBDD]/5 text-[#F4EBDD]/80'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" />
                    Best Sellers
                  </span>
                </button>
              </div>

              <button
                onClick={openAdminLogin}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#B9A064]/60 bg-[#244536] px-4 py-3 text-xs font-bold text-[#F4EBDD]"
              >
                <ShieldCheck className="h-4 w-4 text-[#D4BD85]" />
                {isAdmin ? 'Open Admin Console' : 'Café Staff & Admin Login'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Admin Login Modal */}
      {isAdminAuthModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171A11]/75 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAdminAuthModalOpen(false);
              setAdminPassInput('');
              setAdminError('');
            }
          }}
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-[#B9A064]/50 bg-[#F4EBDD] p-6 text-[#292D1D] shadow-2xl">
            <button
              onClick={() => {
                setIsAdminAuthModalOpen(false);
                setAdminPassInput('');
                setAdminError('');
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#615B4D] hover:bg-[#E7DCC8]"
              aria-label="Close admin login"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#B9A064]/50 bg-[#292D1D] text-[#D4BD85]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#74613C]">
              Staff access
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#292D1D]">
              Café Admin
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#615B4D]">
              Access the café management console for orders and menu controls.
            </p>

            <form onSubmit={handleAdminAuthSubmit} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="admin-passkey"
                  className="mb-1.5 block text-xs font-semibold text-[#292D1D]"
                >
                  Admin Passkey
                </label>
                <input
                  id="admin-passkey"
                  type="password"
                  placeholder="Enter passkey"
                  value={adminPassInput}
                  onChange={(e) => {
                    setAdminPassInput(e.target.value);
                    setAdminError('');
                  }}
                  autoFocus
                  required
                  className="h-11 w-full rounded-xl border border-[#D8CCB7] bg-white px-3.5 text-sm text-[#292D1D] outline-none focus:border-[#B9A064]"
                />

                {adminError && (
                  <p role="alert" className="mt-2 text-xs font-medium text-red-700">
                    {adminError}
                  </p>
                )}

                <p className="mt-2 text-[10px] text-[#746C5E]">
                  Demo: <span className="font-mono font-semibold">classic2026</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuthModalOpen(false);
                    setAdminPassInput('');
                    setAdminError('');
                  }}
                  className="h-10 flex-1 rounded-xl border border-[#D8CCB7] text-xs font-semibold text-[#615B4D] hover:bg-[#E7DCC8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 flex-1 rounded-xl bg-[#292D1D] text-xs font-semibold text-[#F4EBDD] hover:bg-[#244536]"
                >
                  Enter Console
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-[70] bg-[#171A11]/75 p-4 pt-16 backdrop-blur-sm 2xl:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSearchModal(false);
          }}
        >
          <div className="mx-auto w-full max-w-md rounded-2xl border border-[#B9A064]/50 bg-[#F4EBDD] p-4 text-[#292D1D] shadow-2xl">
            <div className="flex items-center gap-2 rounded-xl border border-[#D8CCB7] bg-white px-3">
              <Search className="h-4 w-4 shrink-0 text-[#746C5E]" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'menu') setCurrentView('menu');
                }}
                autoFocus
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#292D1D] outline-none placeholder:text-[#8A8274]"
                aria-label="Search menu"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#615B4D] hover:bg-[#F4EBDD]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[10px] leading-4 text-[#615B4D]">
                Search brownies, pastries, coffee and more.
              </p>
              <button
                onClick={() => goTo('menu')}
                className="shrink-0 text-xs font-semibold text-[#244536] hover:text-[#74613C]"
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
