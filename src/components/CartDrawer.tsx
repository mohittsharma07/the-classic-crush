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
          Math.round(
            (subtotal / freeDeliveryThreshold) * 100
          )
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
    <div className="fixed inset-0 z-[60] flex justify-end overflow-hidden bg-[#160B07]/70 backdrop-blur-sm">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 cursor-default"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-[#E2D6CA] bg-[#FBF8F3] shadow-[-25px_0_70px_rgba(44,24,16,0.20)]">
        {/* Header */}
        <div className="shrink-0 border-b border-[#E6DDD4] bg-white/95 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2C1810] text-[#D9A441] shadow-sm">
                <ShoppingBag className="h-5 w-5" />

                {cart.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#B64532] px-1 text-[9px] font-bold text-white">
                    {cart.length}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A6B45]">
                  The Classic Crush
                </p>

                <h2 className="font-serif text-xl font-bold leading-tight text-[#2C1810]">
                  Your Cart
                </h2>

                <p className="mt-0.5 text-[11px] text-[#887A70]">
                  {cart.length}{' '}
                  {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full px-2.5 py-1.5 text-[10px] font-semibold text-[#9B4C3A] transition-colors hover:bg-[#FBEDEA]"
                >
                  Clear all
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#75675E] transition-colors hover:bg-[#F0E8DF] hover:text-[#2C1810]"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Free Delivery Progress */}
        {cart.length > 0 && orderType === 'delivery' && (
          <div className="shrink-0 border-b border-[#E8DED4] bg-[#F6EEE5] px-4 py-3.5 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#8C5D36] shadow-sm">
                  <Truck className="h-3.5 w-3.5" />
                </span>

                <div className="min-w-0">
                  <p className="text-[11px] leading-4 text-[#655950]">
                    {amountNeededForFreeDelivery === 0 ? (
                      <span className="font-bold text-emerald-700">
                        Free delivery unlocked!
                      </span>
                    ) : (
                      <>
                        Add{' '}
                        <span className="font-bold text-[#2C1810]">
                          ₹{amountNeededForFreeDelivery}
                        </span>{' '}
                        more for free delivery
                      </>
                    )}
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#97887D]">
                    Fresh food delivered with care
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[9px] font-bold text-[#81736A]">
                ₹{subtotal} / ₹{freeDeliveryThreshold}
              </span>
            </div>

            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#E0D5CA]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9A6B45] to-[#D9A441] transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Cart Content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#E3D7CC] bg-white text-[#B5A69A] shadow-[0_8px_25px_rgba(44,24,16,0.05)]">
                <ShoppingBag className="h-10 w-10" />

                <span className="absolute -right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#F5ECE2] text-[#B98A5B]">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
                Nothing here yet
              </p>

              <h3 className="mt-1 font-serif text-2xl font-bold text-[#2C1810]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-xs leading-5 text-[#81746B]">
                Discover freshly baked desserts, café favourites,
                Korean buns and comforting bites from our menu.
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('menu');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2C1810] px-6 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#43271C]"
              >
                Browse Menu
                <ArrowRight className="h-3.5 w-3.5 text-[#D9A441]" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-3 rounded-2xl border border-[#E5DCD3] bg-white p-3.5 shadow-[0_4px_16px_rgba(44,24,16,0.035)] transition-shadow duration-300 hover:border-[#D2B79D] hover:shadow-[0_8px_22px_rgba(44,24,16,0.07)]"
                >
                  {/* Product Image */}
                  <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-[#F1ECE6]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/20 to-transparent" />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="truncate font-serif text-sm font-bold text-[#2C1810]">
                          {item.product.name}
                        </h4>

                        {item.product.subCategory && (
                          <p className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9A6B45]">
                            {item.product.subCategory}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#B2A49A] transition-colors hover:bg-[#FBEDEA] hover:text-[#B64532]"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Customizations */}
                    {item.selectedCustomizations.length > 0 && (
                      <div className="mt-1.5 space-y-0.5">
                        {item.selectedCustomizations.map(
                          (customization, index) => (
                            <div
                              key={`${customization.optionId}-${index}`}
                              className="flex items-center justify-between gap-2 text-[10px] text-[#81746B]"
                            >
                              <span className="truncate">
                                • {customization.optionName}
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
                      <p className="mt-1 truncate text-[10px] italic text-[#9A6B45]">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    <div className="mt-2.5 flex items-center justify-between border-t border-[#F0E9E2] pt-2.5">
                      <div>
                        <span className="block text-[8px] font-semibold uppercase tracking-[0.12em] text-[#A1948A]">
                          Item total
                        </span>

                        <span className="text-base font-bold text-[#2C1810]">
                          ₹{item.totalPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-[#DED5CC] bg-[#F7F3EE] px-2 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[#62544B] transition-colors hover:bg-white hover:text-[#2C1810]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="w-4 text-center text-xs font-bold text-[#2C1810]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[#62544B] transition-colors hover:bg-white hover:text-[#2C1810]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-[#E3D9D0] bg-white px-4 py-4 shadow-[0_-8px_25px_rgba(44,24,16,0.06)] sm:px-6">
            {/* Coupon */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9A8C82]" />

                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(event) => {
                      setCouponInput(event.target.value);
                      setCouponError('');
                    }}
                    className="h-10 w-full rounded-xl border border-[#DDD3C9] bg-[#FBF8F3] pl-9 pr-3 text-xs font-semibold uppercase text-[#2C1810] outline-none placeholder:normal-case placeholder:font-normal placeholder:text-[#A0948A] focus:border-[#B98A5B] focus:bg-white focus:ring-2 focus:ring-[#B98A5B]/10"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyCoupon()}
                  className="h-10 rounded-xl bg-[#2C1810] px-4 text-xs font-bold text-white transition-colors hover:bg-[#43271C]"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="flex items-center gap-1 text-[10px] font-medium text-[#B64532]">
                  <AlertCircle className="h-3 w-3" />
                  {couponError}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                  <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-emerald-800">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />

                    <span className="truncate">
                      {appliedCoupon.code} applied
                    </span>

                    <span className="shrink-0 font-normal text-emerald-600">
                      (-₹{discount})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="shrink-0 text-[10px] font-bold text-[#8A7C72] hover:text-[#B64532]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {!appliedCoupon && coupons.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] text-[#A0948A]">
                    Offers
                  </span>

                  {coupons
                    .filter((coupon) => coupon.isActive)
                    .map((coupon) => (
                      <button
                        type="button"
                        key={coupon.code}
                        onClick={() =>
                          handleApplyCoupon(coupon.code)
                        }
                        className="shrink-0 rounded-full border border-[#E6D2B5] bg-[#FFF8EC] px-2.5 py-1 text-[9px] font-bold text-[#79521B] transition-colors hover:bg-[#FFF1D8]"
                      >
                        {coupon.code}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Bill */}
            <div className="mt-3 border-t border-[#EEE7E0] pt-3">
              <div className="space-y-1.5 text-xs text-[#75685F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C1810]">
                    ₹{subtotal}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between font-semibold text-emerald-700">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Delivery Fee
                    {orderType === 'pickup' && ' · Pickup'}
                  </span>

                  <span className="font-semibold text-[#2C1810]">
                    {orderType === 'pickup' ||
                    deliveryFee === 0 ? (
                      <span className="text-emerald-700">
                        FREE
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Packaging</span>

                  <span className="font-semibold text-[#2C1810]">
                    ₹{taxes}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between border-t border-[#E7DED4] pt-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6B45]">
                    Total payable
                  </p>

                  <p className="mt-0.5 font-serif text-xl font-bold text-[#2C1810]">
                    ₹{grandTotal}
                  </p>
                </div>

                <span className="rounded-full bg-[#F5ECE2] px-2.5 py-1 text-[9px] font-semibold text-[#7B5A42]">
                  {orderType === 'pickup'
                    ? 'Café Pickup'
                    : 'Delivery Order'}
                </span>
              </div>
            </div>

            {/* Minimum order warning */}
            {!isMinOrderMet && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[10px] leading-4 text-amber-900">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />

                <span>
                  Minimum order is ₹
                  {deliverySettings.minimumOrderValue}. Add ₹
                  {deliverySettings.minimumOrderValue - subtotal}{' '}
                  more to continue.
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                disabled={!isMinOrderMet}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2C1810] py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_8px_22px_rgba(44,24,16,0.14)] transition-colors hover:bg-[#43271C] disabled:cursor-not-allowed disabled:bg-[#D5CEC7] disabled:shadow-none"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 text-[#D9A441]" />
              </button>

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full py-1 text-center text-[11px] font-semibold text-[#81746B] transition-colors hover:text-[#2C1810]"
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
