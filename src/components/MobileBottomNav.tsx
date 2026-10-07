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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5DCD3] bg-[#FBF8F3]/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(44,24,16,0.08)] backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        
        {/* HOME */}
        <button
          type="button"
          onClick={() => goToView('home')}
          className={`flex min-w-0 flex-col items-center rounded-xl py-1.5 ${
            currentView === 'home'
              ? 'font-bold text-[#2C1810]'
              : 'font-medium text-[#8A7C72] hover:text-[#2C1810]'
          }`}
        >
          <Home
            className={`mb-0.5 h-5 w-5 ${
              currentView === 'home' ? 'text-[#8C5D36]' : ''
            }`}
          />

          <span className="text-[9px] tracking-[0.08em]">
            HOME
          </span>
        </button>

        {/* MENU */}
        <button
          type="button"
          onClick={() => goToView('menu')}
          className={`flex min-w-0 flex-col items-center rounded-xl py-1.5 ${
            currentView === 'menu'
              ? 'font-bold text-[#2C1810]'
              : 'font-medium text-[#8A7C72] hover:text-[#2C1810]'
          }`}
        >
          <Utensils
            className={`mb-0.5 h-5 w-5 ${
              currentView === 'menu' ? 'text-[#8C5D36]' : ''
            }`}
          />

          <span className="text-[9px] tracking-[0.08em]">
            MENU
          </span>
        </button>

        {/* CART */}
        <button
          type="button"
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex min-w-0 flex-col items-center rounded-xl py-1.5 font-bold text-[#2C1810]"
        >
          <div className="relative">
            <ShoppingBag className="mb-0.5 h-5 w-5 text-[#8C5D36]" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-[#FBF8F3] bg-[#B64532] px-1 text-[8px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </div>

          <span className="text-[9px] tracking-[0.08em]">
            CART
          </span>
        </button>

        {/* ORDERS */}
        <button
          type="button"
          onClick={() => goToView('track')}
          className={`flex min-w-0 flex-col items-center rounded-xl py-1.5 ${
            currentView === 'track'
              ? 'font-bold text-[#2C1810]'
              : 'font-medium text-[#8A7C72] hover:text-[#2C1810]'
          }`}
        >
          <Clock
            className={`mb-0.5 h-5 w-5 ${
              currentView === 'track' ? 'text-[#8C5D36]' : ''
            }`}
          />

          <span className="text-[9px] tracking-[0.08em]">
            ORDERS
          </span>
        </button>

        {/* PROFILE / ADMIN */}
        <button
          type="button"
          onClick={() => {
            if (isAdmin) {
              goToView('admin');
            } else {
              goToView('account');
            }
          }}
          className={`flex min-w-0 flex-col items-center rounded-xl py-1.5 ${
            currentView === 'account' || currentView === 'admin'
              ? 'font-bold text-[#2C1810]'
              : 'font-medium text-[#8A7C72] hover:text-[#2C1810]'
          }`}
        >
          {isAdmin ? (
            <ShieldCheck className="mb-0.5 h-5 w-5 text-[#C69214]" />
          ) : (
            <User
              className={`mb-0.5 h-5 w-5 ${
                currentView === 'account' ? 'text-[#8C5D36]' : ''
              }`}
            />
          )}

          <span className="text-[9px] tracking-[0.08em]">
            {isAdmin ? 'ADMIN' : 'PROFILE'}
          </span>
        </button>
      </div>
    </div>
  );
};