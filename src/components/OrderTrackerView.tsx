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

const COLORS = {
  olive: '#292D1D',
  deepOlive: '#202318',
  green: '#244536',
  gold: '#B9A064',
  lightGold: '#D4BD85',
  ivory: '#F4EBDD',
  cream: '#FFFCF6',
  border: '#D8CCB7',
  muted: '#615B4D',
};

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
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
          style={{ backgroundColor: COLORS.ivory, color: COLORS.muted }}
        >
          <ShoppingBag className="w-8 h-8" />
        </div>

        <h2
          className="text-xl font-serif font-bold"
          style={{ color: COLORS.olive }}
        >
          No Active Orders Found
        </h2>

        <p className="text-xs mt-2 max-w-sm mx-auto" style={{ color: COLORS.muted }}>
          You haven't placed an order yet. Explore our bakery menu to get started!
        </p>

        <button
          onClick={() => setCurrentView('menu')}
          className="mt-6 px-6 py-3 rounded-full text-xs font-bold transition-colors hover:opacity-90"
          style={{ backgroundColor: COLORS.olive, color: COLORS.cream }}
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
    if (currentStepIndex >= 0 && currentStepIndex < steps.length - 1) {
      updateOrderStatus(order.id, steps[currentStepIndex + 1]);
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
      <div className="pb-7 border-b" style={{ borderColor: COLORS.border }}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: COLORS.gold }}
              >
                Order Tracking
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>

            <h1
              className="text-3xl sm:text-4xl font-serif font-black leading-tight"
              style={{ color: COLORS.olive }}
            >
              Track Your Order
            </h1>

            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs sm:text-sm"
              style={{ color: COLORS.muted }}
            >
              <span>
                Order ID:{' '}
                <span className="font-bold" style={{ color: COLORS.olive }}>
                  {orderNumber}
                </span>
              </span>

              <span className="hidden sm:inline">•</span>
              <span>{formattedDate} · {formattedTime}</span>
            </div>
          </div>

          {orders.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <label htmlFor="tracking-order" style={{ color: COLORS.muted }}>
                View order:
              </label>

              <select
                id="tracking-order"
                value={order.id}
                onChange={(e) => setActiveTrackingOrderId(e.target.value)}
                className="max-w-full px-3 py-2 rounded-xl border font-semibold outline-none"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.cream,
                  color: COLORS.olive,
                }}
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
      <div
        className="rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${COLORS.olive}, ${COLORS.green})`,
          color: COLORS.cream,
        }}
      >
        <div
          className="absolute -top-20 -right-16 w-56 h-56 rounded-full border opacity-10 pointer-events-none"
          style={{ borderColor: COLORS.lightGold, borderWidth: '28px' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span
              className="inline-block px-3 py-1.5 rounded-full font-bold text-xs"
              style={{ backgroundColor: COLORS.lightGold, color: COLORS.olive }}
            >
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
                ? 'Our team is preparing your order with care 👨‍🍳'
                : 'Your Order Is in the Queue'}
            </h2>

            <p className="text-xs" style={{ color: COLORS.ivory }}>
              Estimated completion:{' '}
              <span className="font-bold" style={{ color: COLORS.lightGold }}>
                {order.estimatedDeliveryTime}
              </span>
            </p>
          </div>

          {/* Demo Status Controls */}
          <div
            className="shrink-0 p-4 rounded-2xl border text-center space-y-3"
            style={{
              backgroundColor: 'rgba(255,252,246,0.08)',
              borderColor: 'rgba(255,252,246,0.2)',
            }}
          >
            <span
              className="text-[11px] font-bold block"
              style={{ color: COLORS.lightGold }}
            >
              Demo Status Controls
            </span>

            <button
              onClick={handleAdvanceStatus}
              disabled={currentStepIndex < 0 || currentStepIndex >= steps.length - 1}
              className="px-4 py-3 rounded-xl text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: COLORS.lightGold,
                color: COLORS.olive,
              }}
            >
              Advance to Next Status →
            </button>

            <p className="text-[10px]" style={{ color: COLORS.ivory }}>
              Demo control for testing order progress.
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div
        className="rounded-3xl p-6 sm:p-8 border space-y-6"
        style={{
          backgroundColor: COLORS.cream,
          borderColor: COLORS.border,
        }}
      >
        <h3 className="text-base font-serif font-bold" style={{ color: COLORS.olive }}>
          Preparation & Delivery Progress
        </h3>

        {/* Desktop Progress */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-2">
          {steps.map((st, idx) => {
            const isCompleted = currentStepIndex >= 0 && idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={st}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors"
                  style={
                    isCurrent
                      ? {
                          backgroundColor: COLORS.olive,
                          color: COLORS.lightGold,
                          boxShadow: `0 0 0 4px ${COLORS.ivory}`,
                        }
                      : isCompleted
                      ? { backgroundColor: COLORS.green, color: '#FFFFFF' }
                      : {
                          backgroundColor: COLORS.ivory,
                          color: COLORS.muted,
                          border: `1px solid ${COLORS.border}`,
                        }
                  }
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <span
                  className="text-xs font-bold mt-2.5"
                  style={{
                    color: isCurrent
                      ? COLORS.olive
                      : isCompleted
                      ? COLORS.green
                      : COLORS.muted,
                  }}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden space-y-4">
          {steps.map((st, idx) => {
            const isCompleted = currentStepIndex >= 0 && idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={st} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                  style={
                    isCurrent
                      ? {
                          backgroundColor: COLORS.olive,
                          color: COLORS.lightGold,
                          boxShadow: `0 0 0 2px ${COLORS.lightGold}`,
                        }
                      : isCompleted
                      ? { backgroundColor: COLORS.green, color: '#FFFFFF' }
                      : { backgroundColor: COLORS.ivory, color: COLORS.muted }
                  }
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <span
                  className="text-xs font-bold"
                  style={{
                    color: isCurrent
                      ? COLORS.olive
                      : isCompleted
                      ? COLORS.green
                      : COLORS.muted,
                  }}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>

        {/* Activity History */}
        <div className="pt-4 border-t space-y-3" style={{ borderColor: COLORS.border }}>
          <h4
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: COLORS.muted }}
          >
            Activity History
          </h4>

          <div className="space-y-2.5">
            {order.timeline.map((event, i) => (
              <div
                key={`${event.status}-${i}`}
                className="flex items-start gap-3 p-3 rounded-xl border text-xs"
                style={{
                  backgroundColor: COLORS.ivory,
                  borderColor: COLORS.border,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: COLORS.gold }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold" style={{ color: COLORS.olive }}>
                      {event.status}
                    </span>

                    <span
                      className="text-[11px] font-mono shrink-0"
                      style={{ color: COLORS.muted }}
                    >
                      {event.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] mt-1" style={{ color: COLORS.muted }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery + Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-5 space-y-4">
          {order.orderType === 'delivery' &&
            order.assignedDeliveryPartner && (
              <div
                className="rounded-3xl p-5 border space-y-4"
                style={{
                  backgroundColor: COLORS.cream,
                  borderColor: COLORS.border,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: COLORS.muted }}
                  >
                    Delivery Partner
                  </span>

                  <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Assigned
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: COLORS.ivory,
                      borderColor: COLORS.border,
                      color: COLORS.green,
                    }}
                  >
                    <Truck className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-sm" style={{ color: COLORS.olive }}>
                      {order.assignedDeliveryPartner.name}
                    </h4>

                    <p className="text-xs mt-1" style={{ color: COLORS.muted }}>
                      {order.assignedDeliveryPartner.vehicle}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${order.assignedDeliveryPartner.phone}`}
                  className="w-full py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: COLORS.ivory,
                    color: COLORS.olive,
                    borderColor: COLORS.border,
                  }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Delivery Partner</span>
                </a>
              </div>
            )}

          {/* Address */}
          <div
            className="rounded-3xl p-5 border space-y-3"
            style={{
              backgroundColor: COLORS.cream,
              borderColor: COLORS.border,
            }}
          >
            <span
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: COLORS.muted }}
            >
              {order.orderType === 'pickup'
                ? 'Pickup Location'
                : 'Delivery Destination'}
            </span>

            {order.orderType === 'pickup' ? (
              <div className="flex items-start gap-2.5 text-xs">
                <Store
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: COLORS.green }}
                />

                <div>
                  <p className="font-bold" style={{ color: COLORS.olive }}>
                    The Classic Crush Bakery Counter
                  </p>

                  <p className="mt-1" style={{ color: COLORS.muted }}>
                    School of Hotel Management Complex, North Wing Main Campus.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 text-xs">
                <MapPin
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: COLORS.green }}
                />

                <div className="min-w-0">
                  <p className="font-bold" style={{ color: COLORS.olive }}>
                    {order.deliveryAddress?.houseFlat},{' '}
                    {order.deliveryAddress?.street}
                  </p>

                  <p className="mt-1" style={{ color: COLORS.muted }}>
                    {order.deliveryAddress?.area},{' '}
                    {order.deliveryAddress?.city} -{' '}
                    {order.deliveryAddress?.pincode}
                  </p>

                  {order.deliveryAddress?.deliveryInstructions && (
                    <p
                      className="text-[11px] italic mt-2 p-2 rounded-lg"
                      style={{
                        color: COLORS.olive,
                        backgroundColor: COLORS.ivory,
                      }}
                    >
                      Note: {order.deliveryAddress.deliveryInstructions}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div
          className="md:col-span-7 rounded-3xl p-5 sm:p-6 border space-y-4"
          style={{
            backgroundColor: COLORS.cream,
            borderColor: COLORS.border,
          }}
        >
          <div
            className="flex items-center justify-between gap-3 pb-3 border-b"
            style={{ borderColor: COLORS.border }}
          >
            <h4 className="font-serif font-bold text-base" style={{ color: COLORS.olive }}>
              Ordered Items ({order.items.length})
            </h4>

            <button
              onClick={() => reorder(order)}
              className="text-xs font-bold flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: COLORS.green }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reorder All</span>
            </button>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <div
                  className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                  style={{ backgroundColor: COLORS.ivory }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate" style={{ color: COLORS.olive }}>
                    {item.product.name}
                  </p>

                  <p className="text-[11px] mt-1" style={{ color: COLORS.muted }}>
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="font-black shrink-0" style={{ color: COLORS.olive }}>
                  ₹{item.totalPrice}
                </span>
              </div>
            ))}
          </div>

          {/* Bill */}
          <div
            className="pt-3 border-t text-xs space-y-2"
            style={{ borderColor: COLORS.border, color: COLORS.muted }}
          >
            <div className="flex justify-between gap-3">
              <span>Item Subtotal</span>
              <span className="font-bold" style={{ color: COLORS.olive }}>
                ₹{order.subtotal}
              </span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between gap-3 text-emerald-700 font-semibold">
                <span>Discount ({order.couponCode})</span>
                <span>-₹{order.discount}</span>
              </div>
            )}

            <div className="flex justify-between gap-3">
              <span>Delivery Charges</span>
              <span className="font-bold" style={{ color: COLORS.olive }}>
                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span>Taxes (5% GST)</span>
              <span className="font-bold" style={{ color: COLORS.olive }}>
                ₹{order.taxes}
              </span>
            </div>

            <div
              className="pt-3 border-t flex justify-between gap-3 text-base font-black"
              style={{ borderColor: COLORS.border, color: COLORS.olive }}
            >
              <span>Grand Total</span>
              <span>₹{order.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
