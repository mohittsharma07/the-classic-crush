import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  AlertCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    taxes,
    grandTotal,
    deliverySettings,
    setIsCheckoutOpen,
    setCurrentView,
    coupons,
    orderType,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold =
    deliverySettings.freeDeliveryThreshold;

  const amountNeededForFreeDelivery = Math.max(
    0,
    freeDeliveryThreshold - subtotal
  );

  const progressPercent =
    freeDeliveryThreshold > 0
      ? Math.min(
          100,
          Math.round((subtotal / freeDeliveryThreshold) * 100)
        )
      : 100;

  const isMinOrderMet =
    subtotal >= deliverySettings.minimumOrderValue;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;

    if (!code.trim()) return;

    const result = applyCoupon(code);

    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end overflow-hidden bg-[#11140D]/75 backdrop-blur-sm">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 cursor-default"
      />

      {/* Main drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-[#B9A064]/30 bg-[#F4EBDD] shadow-2xl">
        {/* Header */}
        <div className="shrink-0 border-b border-[#D8CCB7] bg-[#292D1D] px-4 py-4 text-[#FFFCF6] sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#B9A064]/50 bg-[#202318] text-[#D4BD85]">
                <ShoppingBag className="h-5 w-5" />

                {cart.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#292D1D] bg-[#B9A064] px-1 text-[10px] font-bold text-[#202318]">
                    {cart.length}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
                  The Classic Crush
                </p>

                <h2 className="font-serif text-2xl font-bold leading-tight text-[#FFFCF6]">
                  Your Cart
                </h2>

                <p className="mt-0.5 text-[11px] text-[#E0D5BD]">
                  {cart.length}{' '}
                  {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full px-2.5 py-2 text-[10px] font-semibold text-[#E4C9A1] transition-colors hover:bg-white/10 hover:text-white"
                >
                  Clear all
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#F4EBDD] transition-colors hover:bg-white/10 hover:text-[#D4BD85]"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Free delivery progress */}
        {cart.length > 0 && orderType === 'delivery' && (
          <div className="shrink-0 border-b border-[#D8CCB7] bg-[#EAE0CE] px-4 py-3.5 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B9A064]/40 bg-[#FFFCF6] text-[#244536]">
                  <Truck className="h-4 w-4" />
                </span>

                <div className="min-w-0">
                  <p className="text-xs leading-5 text-[#292D1D]">
                    {amountNeededForFreeDelivery === 0 ? (
                      <span className="font-bold text-[#244536]">
                        Free delivery unlocked!
                      </span>
                    ) : (
                      <>
                        Add{' '}
                        <span className="font-bold">
                          ₹{amountNeededForFreeDelivery}
                        </span>{' '}
                        more for free delivery
                      </>
                    )}
                  </p>

                  <p className="text-[10px] text-[#615B4D]">
                    Fresh food, delivered with care
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full border border-[#D8CCB7] bg-[#FFFCF6] px-2.5 py-1.5 text-[10px] font-bold text-[#292D1D]">
                ₹{subtotal} / ₹{freeDeliveryThreshold}
              </span>
            </div>

            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#D8CCB7]"
              role="progressbar"
              aria-label="Free delivery progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#244536] to-[#B9A064] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#D8CCB7] bg-[#FFFCF6] text-[#244536]">
                <ShoppingBag className="h-10 w-10" />

                <span className="absolute -right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#B9A064] text-[#292D1D]">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7446]">
                A little something delicious?
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#292D1D]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#615B4D]">
                Discover our freshly baked desserts, café favourites
                and comforting bites.
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('menu');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#B9A064] bg-[#292D1D] px-6 py-3 text-xs font-bold text-[#FFFCF6] transition-colors hover:bg-[#244536]"
              >
                Browse Menu
                <ArrowRight className="h-4 w-4 text-[#D4BD85]" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-3 rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] p-3.5 transition-colors hover:border-[#B9A064]"
                >
                  {/* Product image */}
                  <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-[#EAE0CE]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 border border-black/5" />
                  </div>

                  {/* Product details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#292D1D]">
                          {item.product.name}
                        </h4>

                        {item.product.subCategory && (
                          <p className="mt-1 truncate text-[9px] font-bold uppercase tracking-[0.12em] text-[#8C7446]">
                            {item.product.subCategory}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#817969] transition-colors hover:bg-[#F5E7DF] hover:text-[#9D4036]"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Selected customizations */}
                    {item.selectedCustomizations.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {item.selectedCustomizations.map(
                          (customization, index) => (
                            <div
                              key={`${customization.optionId}-${index}`}
                              className="flex items-center justify-between gap-2 text-[10px] text-[#615B4D]"
                            >
                              <span className="truncate">
                                {customization.optionName}
                              </span>

                              {customization.price > 0 && (
                                <span className="shrink-0">
                                  +₹{customization.price}
                                </span>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <p className="mt-1 truncate text-[10px] italic text-[#8C7446]">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#EAE0CE] pt-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-[#817969]">
                          Item total
                        </p>

                        <p className="mt-0.5 text-base font-bold text-[#292D1D]">
                          ₹{item.totalPrice}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-[#D8CCB7] bg-[#F4EBDD] px-2 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#292D1D] transition-colors hover:bg-[#FFFCF6]"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>

                        <span
                          className="w-5 text-center text-xs font-bold text-[#292D1D]"
                          aria-label={`Quantity ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#292D1D] transition-colors hover:bg-[#FFFCF6]"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout section */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-[#D8CCB7] bg-[#FFFCF6] px-4 py-4 sm:px-6">
            {/* Coupon */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C7446]" />

                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(event) => {
                      setCouponInput(event.target.value);
                      setCouponError('');
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleApplyCoupon();
                    }}
                    aria-label="Coupon code"
                    className="h-11 w-full rounded-xl border border-[#D8CCB7] bg-[#F4EBDD] pl-10 pr-3 text-xs font-semibold uppercase text-[#292D1D] outline-none placeholder:normal-case placeholder:font-normal placeholder:text-[#817969] focus:border-[#B9A064] focus:bg-white focus:ring-2 focus:ring-[#B9A064]/20"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyCoupon()}
                  className="h-11 rounded-xl bg-[#244536] px-4 text-xs font-bold text-white transition-colors hover:bg-[#292D1D]"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p
                  role="alert"
                  className="flex items-center gap-1.5 text-[10px] font-medium text-[#9D4036]"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {couponError}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-[#244536]/20 bg-[#244536]/5 px-3 py-2.5">
                  <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-[#244536]">
                    <Check className="h-4 w-4 shrink-0" />

                    <span className="truncate">
                      {appliedCoupon.code} applied
                    </span>

                    <span className="shrink-0 font-normal">
                      (−₹{discount})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="shrink-0 text-[10px] font-bold text-[#615B4D] hover:text-[#9D4036]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {!appliedCoupon && coupons.some((coupon) => coupon.isActive) && (
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-[#817969]">
                    Offers
                  </span>

                  {coupons
                    .filter((coupon) => coupon.isActive)
                    .map((coupon) => (
                      <button
                        type="button"
                        key={coupon.code}
                        onClick={() => handleApplyCoupon(coupon.code)}
                        className="shrink-0 rounded-full border border-[#B9A064]/60 bg-[#F4EBDD] px-3 py-1.5 text-[9px] font-bold text-[#65502C] transition-colors hover:bg-[#EAE0CE]"
                      >
                        {coupon.code}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Bill breakdown */}
            <div className="mt-4 border-t border-[#EAE0CE] pt-3">
              <div className="space-y-2 text-xs text-[#615B4D]">
                <div className="flex justify-between gap-3">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#292D1D]">
                    ₹{subtotal}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between gap-3 font-semibold text-[#244536]">
                    <span>Coupon discount</span>
                    <span>−₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between gap-3">
                  <span>
                    Delivery fee
                    {orderType === 'pickup' && ' · Pickup'}
                  </span>

                  <span className="font-semibold text-[#292D1D]">
                    {orderType === 'pickup' || deliveryFee === 0 ? (
                      <span className="text-[#244536]">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span>Taxes & packaging</span>
                  <span className="font-semibold text-[#292D1D]">
                    ₹{taxes}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between gap-3 border-t border-[#D8CCB7] pt-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8C7446]">
                    Total payable
                  </p>

                  <p className="mt-1 font-serif text-2xl font-bold text-[#292D1D]">
                    ₹{grandTotal}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D8CCB7] bg-[#F4EBDD] px-3 py-2 text-[9px] font-semibold text-[#292D1D]">
                  {orderType === 'pickup' ? (
                    <>
                      <ShoppingBag className="h-3.5 w-3.5 text-[#244536]" />
                      Café Pickup
                    </>
                  ) : (
                    <>
                      <Truck className="h-3.5 w-3.5 text-[#244536]" />
                      Delivery Order
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Minimum order warning */}
            {!isMinOrderMet && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#B9A064]/50 bg-[#F7EEDB] px-3 py-2.5 text-[10px] leading-4 text-[#65502C]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                <span>
                  Minimum order is ₹{deliverySettings.minimumOrderValue}.
                  Add ₹
                  {Math.max(
                    0,
                    deliverySettings.minimumOrderValue - subtotal
                  )}{' '}
                  more to continue.
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                disabled={!isMinOrderMet}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#B9A064] bg-[#292D1D] px-4 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#FFFCF6] transition-colors hover:bg-[#244536] disabled:cursor-not-allowed disabled:border-[#D8CCB7] disabled:bg-[#D8CCB7] disabled:text-[#817969]"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 text-[#D4BD85]" />
              </button>

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full py-2 text-center text-[11px] font-semibold text-[#615B4D] transition-colors hover:text-[#244536]"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
