import React from 'react';
import {
  Home,
  Utensils,
  ShoppingBag,
  Clock,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartDrawerOpen,
    isAdmin,
  } = useStore();

  const goToView = (view: typeof currentView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItemClass = (active: boolean) =>
    `flex min-w-0 flex-col items-center justify-center rounded-xl py-2 transition-colors ${
      active
        ? 'font-bold text-[#292D1D]'
        : 'font-medium text-[#615B4D] hover:text-[#292D1D]'
    }`;

  const iconClass = (active: boolean) =>
    `mb-0.5 h-5 w-5 ${
      active ? 'text-[#A4874E]' : 'text-[#615B4D]'
    }`;

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D8CCB7] bg-[#FFFCF6]/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(41,45,29,0.10)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {/* HOME */}
        <button
          type="button"
          onClick={() => goToView('home')}
          aria-current={currentView === 'home' ? 'page' : undefined}
          className={navItemClass(currentView === 'home')}
        >
          <Home className={iconClass(currentView === 'home')} />
          <span className="text-[9px] tracking-[0.08em]">HOME</span>
        </button>

        {/* MENU */}
        <button
          type="button"
          onClick={() => goToView('menu')}
          aria-current={currentView === 'menu' ? 'page' : undefined}
          className={navItemClass(currentView === 'menu')}
        >
          <Utensils className={iconClass(currentView === 'menu')} />
          <span className="text-[9px] tracking-[0.08em]">MENU</span>
        </button>

        {/* CART */}
        <button
          type="button"
          onClick={() => setIsCartDrawerOpen(true)}
          aria-label={`Open cart, ${cartCount} items`}
          className="relative flex min-w-0 flex-col items-center justify-center rounded-xl py-2 font-bold text-[#292D1D] transition-colors hover:text-[#244536]"
        >
          <div className="relative">
            <ShoppingBag className="mb-0.5 h-5 w-5 text-[#A4874E]" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-[#FFFCF6] bg-[#292D1D] px-1 text-[8px] font-bold text-[#F4EBDD]">
                {cartCount}
              </span>
            )}
          </div>

          <span className="text-[9px] tracking-[0.08em]">CART</span>
        </button>

        {/* ORDERS */}
        <button
          type="button"
          onClick={() => goToView('track')}
          aria-current={currentView === 'track' ? 'page' : undefined}
          className={navItemClass(currentView === 'track')}
        >
          <Clock className={iconClass(currentView === 'track')} />
          <span className="text-[9px] tracking-[0.08em]">ORDERS</span>
        </button>

        {/* PROFILE / ADMIN */}
        <button
          type="button"
          onClick={() => goToView(isAdmin ? 'admin' : 'account')}
          aria-current={
            currentView === 'account' || currentView === 'admin'
              ? 'page'
              : undefined
          }
          className={navItemClass(
            currentView === 'account' || currentView === 'admin'
          )}
        >
          {isAdmin ? (
            <ShieldCheck className="mb-0.5 h-5 w-5 text-[#A4874E]" />
          ) : (
            <User className={iconClass(currentView === 'account')} />
          )}

          <span className="text-[9px] tracking-[0.08em]">
            {isAdmin ? 'ADMIN' : 'PROFILE'}
          </span>
        </button>
      </div>
    </nav>
  );
};
