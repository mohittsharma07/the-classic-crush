import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  X,
  Store,
  Truck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CAFE_PHONE = '918090205081';

export const OrderConfirmationModal: React.FC = () => {
  const {
    isOrderConfirmationOpen,
    setIsOrderConfirmationOpen,
    lastPlacedOrder,
    setActiveTrackingOrderId,
    setCurrentView,
  } = useStore();

  useEffect(() => {
    if (!isOrderConfirmationOpen) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B9A064', '#292D1D', '#D4BD85', '#244536', '#F4EBDD'],
      });
    } catch {
      // Ignore confetti errors silently.
    }
  }, [isOrderConfirmationOpen]);

  if (!isOrderConfirmationOpen || !lastPlacedOrder) return null;

  const order = lastPlacedOrder;

  const generateWhatsAppMessage = () => {
    const itemsList = order.items
      .map(
        (item) =>
          `• ${item.product.name} (x${item.quantity}) - ₹${item.totalPrice}`
      )
      .join('\n');

    const addressText =
      order.orderType === 'pickup'
        ? 'Pickup from café counter'
        : [
            order.deliveryAddress?.houseFlat,
            order.deliveryAddress?.street,
            order.deliveryAddress?.area,
          ]
            .filter(Boolean)
            .join(', ');

    const message = [
      '*New Order - The Classic Crush Bakery & Café*',
      '',
      `*Order ID:* ${order.id}`,
      `*Customer:* ${order.customerName} (${order.customerPhone})`,
      '*Items:*',
      itemsList,
      '',
      `*Total Amount:* ₹${order.grandTotal}`,
      `*Payment:* ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})`,
      `*Destination:* ${addressText}`,
      `*Estimated Time:* ${order.estimatedDeliveryTime}`,
    ].join('\n');

    const url = `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTrackOrder = () => {
    setIsOrderConfirmationOpen(false);
    setActiveTrackingOrderId(order.id);
    setCurrentView('track');
  };

  const handleContinueShopping = () => {
    setIsOrderConfirmationOpen(false);
    setCurrentView('menu');
  };

  const paymentLabel = order.paymentMethod.replace(/_/g, ' ');

  return (
    <div
      role="presentation"
      onClick={() => setIsOrderConfirmationOpen(false)}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#202318]/75 p-3 backdrop-blur-sm sm:p-5"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmation-title"
        onClick={(event) => event.stopPropagation()}
        className="relative my-4 w-full max-w-lg overflow-hidden rounded-[28px] border border-[#D8CCB7] bg-[#FFFCF6] shadow-[0_25px_80px_rgba(20,25,15,0.30)] sm:my-8"
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setIsOrderConfirmationOpen(false)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white transition-colors hover:bg-black/35"
          aria-label="Close order confirmation"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Celebration Header */}
        <div className="relative overflow-hidden bg-[#292D1D] px-5 pb-7 pt-8 text-center text-[#FFFCF6] sm:px-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#B9A064]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#244536]/50 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#D4BD85]/40 bg-[#D4BD85] text-[#292D1D] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <CheckCircle className="h-9 w-9" strokeWidth={2.4} />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#B9A064]/35 bg-[#B9A064]/10 px-3 py-1">
              <Sparkles className="h-3 w-3 text-[#D4BD85]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D4BD85]">
                Order Confirmed
              </span>
            </div>

            <h2
              id="order-confirmation-title"
              className="mt-3 font-serif text-2xl font-bold leading-tight sm:text-3xl"
            >
              Your order is on its way!
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/70">
              Thank you for choosing The Classic Crush. Your order details are
              ready, and you can check its status below.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#B9A064]/30 bg-black/15 px-3 py-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/60">
                Order No.
              </span>
              <span className="font-mono text-xs font-bold text-[#D4BD85]">
                #{order.id}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-h-[70vh] space-y-5 overflow-y-auto p-4 sm:p-6">
          {/* Estimated Time */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#D8CCB7] bg-white p-4 shadow-[0_4px_16px_rgba(41,45,29,0.04)]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAE0CC] text-[#80683D]">
                <Clock className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#827967]">
                  Estimated Arrival
                </p>
                <p className="mt-1 truncate text-sm font-bold text-[#292D1D]">
                  {order.estimatedDeliveryTime}
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#E8F0E7] px-2.5 py-1.5 text-[9px] font-bold text-[#244536]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#47764B]" />
              Order Placed
            </span>
          </div>

          {/* Order Items */}
          <section>
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-[#80683D]" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#615B4D]">
                  Items Ordered
                </h3>
              </div>

              <span className="rounded-full bg-[#EAE0CC] px-2 py-1 text-[9px] font-bold text-[#80683D]">
                {order.items.length}{' '}
                {order.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="max-h-40 space-y-1.5 overflow-y-auto rounded-2xl border border-[#D8CCB7] bg-white p-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[#F4EBDD]/60"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-[#EAE0CC] px-1 text-[9px] font-bold text-[#80683D]">
                      ×{item.quantity}
                    </span>
                    <span className="truncate text-xs font-medium text-[#615B4D]">
                      {item.product.name}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-[#292D1D]">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Order Details */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#D8CCB7] bg-white p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAE0CC] text-[#80683D]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#827967]">
                  Payment
                </span>
              </div>

              <p className="mt-3 text-base font-bold text-[#292D1D]">
                ₹{order.grandTotal}
              </p>
              <p className="mt-1 text-[10px] capitalize text-[#615B4D]">
                Via {paymentLabel}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-[#EAE0CC] px-2 py-1 text-[9px] font-semibold text-[#615B4D]">
                {order.paymentStatus}
              </span>
            </div>

            <div className="rounded-2xl border border-[#D8CCB7] bg-white p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAE0CC] text-[#80683D]">
                  {order.orderType === 'pickup' ? (
                    <Store className="h-4 w-4" />
                  ) : (
                    <Truck className="h-4 w-4" />
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#827967]">
                  Order Type
                </span>
              </div>

              <p className="mt-3 text-sm font-bold text-[#292D1D]">
                {order.orderType === 'pickup'
                  ? 'Café Pickup'
                  : 'Home Delivery'}
              </p>

              <div className="mt-1 flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#80683D]" />
                <p className="line-clamp-2 text-[10px] leading-4 text-[#615B4D]">
                  {order.orderType === 'pickup'
                    ? 'Café counter pickup'
                    : order.deliveryAddress?.area || 'Delivery address provided'}
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={generateWhatsAppMessage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#244536] px-4 py-3 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1C382B] hover:shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            Send Order Details on WhatsApp
          </button>

          {/* Main Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleTrackOrder}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#292D1D] py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-[#F4EBDD] shadow-[0_8px_22px_rgba(41,45,29,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#244536] hover:shadow-[0_12px_28px_rgba(41,45,29,0.18)]"
            >
              <span>Track Order</span>
              <ArrowRight className="h-4 w-4 text-[#D4BD85] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={handleContinueShopping}
              className="w-full rounded-full py-2.5 text-xs font-semibold text-[#615B4D] transition-colors hover:bg-[#EAE0CC] hover:text-[#292D1D]"
            >
              Continue Shopping
            </button>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3 border-t border-[#D8CCB7] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#827967]">
                Need help?
              </p>
              <p className="mt-0.5 text-xs text-[#615B4D]">
                Contact the café team for order assistance.
              </p>
            </div>

            <a
              href={`tel:+${CAFE_PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8CCB7] bg-white px-4 py-2 text-xs font-bold text-[#292D1D] transition-all hover:border-[#B9A064] hover:bg-[#F4EBDD]"
            >
              <Phone className="h-3.5 w-3.5 text-[#80683D]" />
              Call Café
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 pb-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#827967]">
            <span className="h-px w-6 bg-[#D8CCB7]" />
            <Sparkles className="h-3 w-3 text-[#A4874E]" />
            <span>The Classic Crush</span>
            <span className="h-px w-6 bg-[#D8CCB7]" />
          </div>
        </div>
      </div>
    </div>
  );
};
