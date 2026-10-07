import React from 'react';
import {
  CheckCircle2,
  MapPin,
  Phone,
  Truck,
  Store,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

const DELIVERY_STEPS: OrderStatus[] = [
  'Order Received',
  'Confirmed',
  'Being Prepared',
  'Out for Delivery',
  'Delivered',
];

const PICKUP_STEPS: OrderStatus[] = [
  'Order Received',
  'Confirmed',
  'Being Prepared',
  'Ready for Pickup',
  'Delivered',
];

export const OrderTrackerView: React.FC = () => {
  const {
    activeTrackingOrder,
    orders,
    setActiveTrackingOrderId,
    updateOrderStatus,
    setCurrentView,
    reorder,
  } = useStore();

  const order = activeTrackingOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-serif font-bold text-[#2C1810]">
          No Active Orders Found
        </h2>

        <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
          You haven't placed an order yet. Select from our delicious bakery
          menu to get started!
        </p>

        <button
          onClick={() => setCurrentView('menu')}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#2C1810] text-[#FAF6F0] text-xs font-bold shadow-md hover:bg-[#3E2319]"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  const steps =
    order.orderType === 'pickup' ? PICKUP_STEPS : DELIVERY_STEPS;

  const currentStepIndex = steps.indexOf(order.status as OrderStatus);

  const handleAdvanceStatus = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStatus = steps[currentStepIndex + 1];
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const orderNumber = order.id.replace(/^CC-\d{4}-/, '');

  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  const formattedTime = new Date(order.createdAt).toLocaleTimeString(
    'en-IN',
    {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-8">
      {/* Header */}
      <div className="pb-7 border-b border-stone-200">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C5D36]">
                Live Order Tracking
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1810] leading-tight">
              Track Your Order
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs sm:text-sm text-stone-500">
              <span>
                Order ID:{' '}
                <span className="font-bold text-[#2C1810]">
                  {orderNumber}
                </span>
              </span>

              <span className="hidden sm:inline text-stone-300">•</span>

              <span>
                {formattedDate} · {formattedTime}
              </span>
            </div>
          </div>

          {orders.length > 1 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500">View order:</span>

              <select
                value={order.id}
                onChange={(e) => setActiveTrackingOrderId(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-300 bg-white font-semibold text-stone-800 outline-none"
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    Order {o.id.replace(/^CC-\d{4}-/, '')} ({o.status})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Status Card */}
      <div className="bg-gradient-to-br from-[#2C1810] to-[#3E2319] rounded-3xl p-6 sm:p-8 text-[#FAF6F0] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E5B869] text-[#2C1810] font-bold text-xs">
              Status: {order.status}
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              {order.status === 'Delivered'
                ? 'Order Delivered! Enjoy your meal 🍰'
                : order.status === 'Out for Delivery'
                ? 'On the way to your doorstep! 🛵'
                : order.status === 'Ready for Pickup'
                ? 'Order Ready for Pickup at Counter! 🛍️'
                : order.status === 'Being Prepared'
                ? 'Chefs are baking & preparing with love 👨‍🍳'
                : 'Order Confirmed & Queued! ✨'}
            </h2>

            <p className="text-xs text-[#FAF6F0]/80">
              Estimated completion in approx{' '}
              <span className="font-bold text-[#E5B869]">
                {order.estimatedDeliveryTime}
              </span>
            </p>
          </div>

          {/* Test Pipeline */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center space-y-2">
            <span className="text-[11px] font-bold text-[#E5B869] block">
              Test Pipeline Demo:
            </span>

            <button
              onClick={handleAdvanceStatus}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-4 py-2 bg-[#E5B869] hover:bg-[#D4AF37] disabled:bg-stone-600 disabled:opacity-50 text-[#2C1810] rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              Advance to Next Status →
            </button>

            <p className="text-[10px] text-[#FAF6F0]/60">
              (Admin updates reflect here in real-time)
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <h3 className="text-base font-serif font-bold text-[#2C1810]">
          Preparation & Delivery Progress
        </h3>

        {/* Desktop */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-2 relative">
          {steps.map((st, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={st}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    isCurrent
                      ? 'bg-[#2C1810] text-[#E5B869] ring-4 ring-[#D4AF37]/30 shadow-md'
                      : isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-400 border border-stone-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <span
                  className={`text-xs font-bold mt-2.5 ${
                    isCurrent
                      ? 'text-[#2C1810]'
                      : isCompleted
                      ? 'text-emerald-800'
                      : 'text-stone-400'
                  }`}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="sm:hidden space-y-4">
          {steps.map((st, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={st} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCurrent
                      ? 'bg-[#2C1810] text-[#E5B869] ring-2 ring-[#D4AF37]'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <div className="flex-1">
                  <span
                    className={`text-xs font-bold block ${
                      isCurrent
                        ? 'text-[#2C1810]'
                        : isCompleted
                        ? 'text-emerald-800'
                        : 'text-stone-400'
                    }`}
                  >
                    {st}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity History */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Activity History
          </h4>

          <div className="space-y-2.5">
            {order.timeline.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-[#8C5D36] mt-1.5 shrink-0" />

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-stone-800">
                      {event.status}
                    </span>

                    <span className="text-[11px] text-stone-400 font-mono">
                      {event.timestamp}
                    </span>
                  </div>

                  <p className="text-stone-600 text-[11px] mt-0.5">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery + Order */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left */}
        <div className="md:col-span-5 space-y-4">
          {order.orderType === 'delivery' &&
            order.assignedDeliveryPartner && (
              <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Delivery Partner
                  </span>

                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
                    Assigned
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E8DFC8] flex items-center justify-center text-[#2C1810]">
                    <Truck className="w-6 h-6 text-[#8C5D36]" />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#2C1810]">
                      {order.assignedDeliveryPartner.name}
                    </h4>

                    <p className="text-xs text-stone-500">
                      {order.assignedDeliveryPartner.vehicle}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${order.assignedDeliveryPartner.phone}`}
                  className="w-full py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#2C1810] text-[#2C1810] hover:text-[#FAF6F0] border border-[#2C1810]/30 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Delivery Partner</span>
                </a>
              </div>
            )}

          {/* Address */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              {order.orderType === 'pickup'
                ? 'Pickup Location'
                : 'Delivery Destination'}
            </span>

            {order.orderType === 'pickup' ? (
              <div className="flex items-start gap-2.5 text-xs text-stone-700">
                <Store className="w-4 h-4 text-[#8C5D36] shrink-0 mt-0.5" />

                <div>
                  <p className="font-bold text-[#2C1810]">
                    The Classic Crush Bakery Counter
                  </p>

                  <p className="text-stone-500 mt-0.5">
                    School of Hotel Management Complex, North Wing Main Campus.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 text-xs text-stone-700">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />

                <div>
                  <p className="font-bold text-[#2C1810]">
                    {order.deliveryAddress?.houseFlat},{' '}
                    {order.deliveryAddress?.street}
                  </p>

                  <p className="text-stone-500 mt-0.5">
                    {order.deliveryAddress?.area},{' '}
                    {order.deliveryAddress?.city} -{' '}
                    {order.deliveryAddress?.pincode}
                  </p>

                  {order.deliveryAddress?.deliveryInstructions && (
                    <p className="text-[11px] text-amber-800 italic mt-1 bg-amber-50 p-1.5 rounded">
                      Note: {order.deliveryAddress.deliveryInstructions}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="md:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h4 className="font-serif font-bold text-base text-[#2C1810]">
              Ordered Items ({order.items.length})
            </h4>

            <button
              onClick={() => reorder(order)}
              className="text-xs font-bold text-[#8C5D36] hover:text-[#2C1810] flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reorder All</span>
            </button>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 text-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#2C1810] truncate">
                    {item.product.name}
                  </p>

                  <p className="text-[11px] text-stone-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="font-black text-stone-900">
                  ₹{item.totalPrice}
                </span>
              </div>
            ))}
          </div>

          {/* Bill */}
          <div className="pt-3 border-t border-stone-100 text-xs space-y-1.5 text-stone-600">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-bold text-stone-900">
                ₹{order.subtotal}
              </span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount ({order.couponCode})</span>
                <span>-₹{order.discount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Charges</span>

              <span className="font-bold text-stone-900">
                {order.deliveryFee === 0
                  ? 'FREE'
                  : `₹${order.deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Taxes (5% GST)</span>

              <span className="font-bold text-stone-900">
                ₹{order.taxes}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-black text-[#2C1810]">
              <span>Grand Total</span>
              <span>₹{order.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};