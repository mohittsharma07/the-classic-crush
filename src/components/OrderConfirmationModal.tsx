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

export const OrderConfirmationModal: React.FC = () => {
  const {
    isOrderConfirmationOpen,
    setIsOrderConfirmationOpen,
    lastPlacedOrder,
    setActiveTrackingOrderId,
    setCurrentView,
  } = useStore();

  useEffect(() => {
    if (isOrderConfirmationOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#2C1810', '#E5B869', '#1E3A2F', '#F59E0B'],
        });
      } catch {
        // Ignore confetti errors silently.
      }
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
      .join('%0A');

    const addressText =
      order.orderType === 'pickup'
        ? 'Pickup From Café Counter'
        : `${order.deliveryAddress?.houseFlat}, ${order.deliveryAddress?.street}, ${order.deliveryAddress?.area}`;

    const text =
      `*New Order - The Classic Crush Bakery %26 Café*%0A%0A` +
      `*Order ID:* ${order.id}%0A` +
      `*Customer:* ${order.customerName} (${order.customerPhone})%0A` +
      `*Items:*%0A${itemsList}%0A%0A` +
      `*Total Amount:* ₹${order.grandTotal}%0A` +
      `*Payment:* ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})%0A` +
      `*Destination:* ${addressText}%0A` +
      `*Estimated Time:* ${order.estimatedDeliveryTime}`;

    window.open(
      `https://wa.me/919876543210?text=${text}`,
      '_blank'
    );
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

  const paymentLabel = order.paymentMethod.replace('_', ' ');

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#1C100B]/70 p-3 backdrop-blur-sm sm:p-5"
      onClick={() => setIsOrderConfirmationOpen(false)}
    >
      <div
        className="relative my-4 w-full max-w-lg overflow-hidden rounded-[28px] border border-[#E3D7CB] bg-[#FBF8F3] shadow-[0_25px_80px_rgba(20,10,5,0.30)] sm:my-8"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setIsOrderConfirmationOpen(false)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/15 text-white/75 backdrop-blur-md transition-all hover:bg-black/25 hover:text-white"
          aria-label="Close order confirmation"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Celebration Header */}
        <div className="relative overflow-hidden bg-[#2C1810] px-5 pb-7 pt-8 text-center text-white sm:px-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#D9A441]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#8C5D36]/15 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#E5B869]/30 bg-[#E5B869] text-[#2C1810] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <CheckCircle className="h-9 w-9" strokeWidth={2.4} />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D9A441]/30 bg-[#D9A441]/10 px-3 py-1">
              <Sparkles className="h-3 w-3 text-[#E5B869]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E5B869]">
                Order Confirmed
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight sm:text-3xl">
              Your order is on its way!
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/65">
              Thank you for choosing The Classic Crush. Our kitchen has
              received your order and will start preparing it shortly.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#D9A441]/25 bg-black/15 px-3 py-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
                Order No.
              </span>

              <span className="font-mono text-xs font-bold text-[#E5B869]">
                #{order.id}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-h-[70vh] space-y-5 overflow-y-auto p-4 sm:p-6">
          {/* Estimated Time */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E3D7CB] bg-white p-4 shadow-[0_4px_16px_rgba(44,24,16,0.035)]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1E5D8] text-[#8C5D36]">
                <Clock className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9A8C82]">
                  Estimated Arrival
                </p>

                <p className="mt-1 truncate text-sm font-bold text-[#2C1810]">
                  {order.estimatedDeliveryTime}
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[9px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Kitchen Queued
            </span>
          </div>

          {/* Order Items */}
          <section>
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-[#8C5D36]" />

                <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#65574E]">
                  Items Ordered
                </h3>
              </div>

              <span className="rounded-full bg-[#F2E8DE] px-2 py-1 text-[9px] font-bold text-[#8C5D36]">
                {order.items.length}{' '}
                {order.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="max-h-40 space-y-1.5 overflow-y-auto rounded-2xl border border-[#E5DBD1] bg-white p-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[#FBF7F2]"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-[#F2E7DB] px-1 text-[9px] font-bold text-[#8C5D36]">
                      ×{item.quantity}
                    </span>

                    <span className="truncate text-xs font-medium text-[#4D4038]">
                      {item.product.name}
                    </span>
                  </div>

                  <span className="shrink-0 text-xs font-bold text-[#2C1810]">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Order Details */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E5DBD1] bg-white p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2E7DB] text-[#8C5D36]">
                  <CheckCircle className="h-4 w-4" />
                </div>

                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9A8C82]">
                  Payment
                </span>
              </div>

              <p className="mt-3 text-base font-bold text-[#2C1810]">
                ₹{order.grandTotal}
              </p>

              <p className="mt-1 text-[10px] capitalize text-[#81746B]">
                Via {paymentLabel}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                {order.paymentStatus}
              </span>
            </div>

            <div className="rounded-2xl border border-[#E5DBD1] bg-white p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2E7DB] text-[#8C5D36]">
                  {order.orderType === 'pickup' ? (
                    <Store className="h-4 w-4" />
                  ) : (
                    <Truck className="h-4 w-4" />
                  )}
                </div>

                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9A8C82]">
                  Order Type
                </span>
              </div>

              <p className="mt-3 text-sm font-bold text-[#2C1810]">
                {order.orderType === 'pickup'
                  ? 'Café Pickup'
                  : 'Home Delivery'}
              </p>

              <div className="mt-1 flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#9A6B45]" />

                <p className="line-clamp-2 text-[10px] leading-4 text-[#81746B]">
                  {order.orderType === 'pickup'
                    ? 'Main Counter Window'
                    : order.deliveryAddress?.area}
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={generateWhatsAppMessage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            Send Order Details on WhatsApp
          </button>

          {/* Main Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleTrackOrder}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#2C1810] py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_22px_rgba(44,24,16,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#43271C] hover:shadow-[0_12px_28px_rgba(44,24,16,0.18)]"
            >
              <span>Track Live Order</span>
              <ArrowRight className="h-4 w-4 text-[#E5B869] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={handleContinueShopping}
              className="w-full rounded-full py-2.5 text-xs font-semibold text-[#75675E] transition-colors hover:bg-[#F1E9E1] hover:text-[#2C1810]"
            >
              Continue Shopping
            </button>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3 border-t border-[#E7DED4] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A09389]">
                Need help?
              </p>
              <p className="mt-0.5 text-xs text-[#75675E]">
                Our café team is here for you.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8C7B7] bg-white px-4 py-2 text-xs font-bold text-[#4D382C] transition-all hover:border-[#B98A5B] hover:bg-[#F8F0E7]"
            >
              <Phone className="h-3.5 w-3.5 text-[#8C5D36]" />
              Call Café
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 pb-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#A09389]">
            <span className="h-px w-6 bg-[#D9C8B8]" />
            <Sparkles className="h-3 w-3 text-[#B98A5B]" />
            <span>The Classic Crush</span>
            <span className="h-px w-6 bg-[#D9C8B8]" />
          </div>
        </div>
      </div>
    </div>
  );
};