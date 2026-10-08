import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  RotateCcw,
  Phone,
  Mail,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const C = {
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

const inputClass =
  'w-full px-3 py-2.5 border rounded-xl outline-none transition-colors focus:ring-2 focus:ring-[#B9A064]/20 text-xs';

export const CustomerDashboard: React.FC = () => {
  const {
    deliveryAddress,
    updateAddressField,
    orders,
    products,
    favorites,
    toggleFavorite,
    reorder,
    setActiveTrackingOrderId,
    setCurrentView,
    addToCart,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'favorites' | 'address' | 'profile'
  >('orders');

  const favoriteProducts = products.filter((p) =>
    favorites.includes(p.id)
  );

  const tabClass = (tab: typeof activeTab) =>
    `shrink-0 px-3 sm:px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
      activeTab === tab
        ? 'border-[#B9A064] text-[#292D1D]'
        : 'border-transparent text-[#615B4D] hover:text-[#292D1D]'
    }`;

  const fieldClass = `${inputClass} border-[#D8CCB7] bg-[#FFFCF6] text-[#292D1D] placeholder:text-[#817969]`;

  const saveAddress = () => {
    showToast('Address Saved', 'Default address updated.', 'success');
  };

  const saveProfile = () => {
    showToast(
      'Profile Updated',
      'Customer details saved successfully.',
      'success'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-8">
      {/* Profile Header */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 border"
        style={{
          background: `linear-gradient(120deg, ${C.olive}, ${C.green})`,
          color: C.cream,
          borderColor: C.gold,
        }}
      >
        <div
          className="absolute -right-12 -top-16 w-48 h-48 rounded-full border-[24px] opacity-10 pointer-events-none"
          style={{ borderColor: C.lightGold }}
        />

        <div className="relative flex items-center gap-4 min-w-0">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-black text-2xl shadow-lg border-2 border-white/20 shrink-0"
            style={{ backgroundColor: C.lightGold, color: C.olive }}
          >
            {deliveryAddress.fullName?.trim().charAt(0).toUpperCase() || 'C'}
          </div>

          <div className="min-w-0">
            <p
              className="text-[11px] uppercase tracking-[0.18em] font-bold mb-1"
              style={{ color: C.lightGold }}
            >
              My Account
            </p>

            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white truncate">
              {deliveryAddress.fullName || 'Valued Guest'}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mt-2 text-[#F4EBDD]/85">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: C.lightGold }} />
                {deliveryAddress.phoneNumber || 'Phone not added'}
              </span>

              {deliveryAddress.email && (
                <span className="flex items-center gap-1.5 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: C.lightGold }} />
                  {deliveryAddress.email}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative hidden sm:block text-right">
          <p className="text-[10px] uppercase tracking-widest text-white/60">
            Member Since
          </p>
          <p className="text-sm font-semibold mt-1" style={{ color: C.lightGold }}>
            Welcome to TCC
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b gap-1 overflow-x-auto"
        style={{ borderColor: C.border }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={tabClass('orders')}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('favorites')}
          className={tabClass('favorites')}
        >
          <Heart className="w-4 h-4" />
          <span>Favorites ({favoriteProducts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('address')}
          className={tabClass('address')}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Address</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={tabClass('profile')}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div
              className="rounded-3xl p-10 text-center border"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <ShoppingBag
                className="w-10 h-10 mx-auto mb-3"
                style={{ color: C.gold }}
              />

              <h3 className="font-serif font-bold text-base" style={{ color: C.olive }}>
                No orders placed yet
              </h3>

              <p className="text-xs mt-2" style={{ color: C.muted }}>
                Explore our bakery and cafe menu to discover your favourites.
              </p>

              <button
                type="button"
                onClick={() => setCurrentView('menu')}
                className="mt-5 px-6 py-3 rounded-full font-bold text-xs transition-colors hover:opacity-90"
                style={{ backgroundColor: C.olive, color: C.cream }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl p-5 border shadow-sm space-y-4 transition-colors hover:border-[#B9A064]"
                style={{ backgroundColor: C.cream, borderColor: C.border }}
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b"
                  style={{ borderColor: C.border }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded"
                      style={{ backgroundColor: C.ivory, color: C.olive }}
                    >
                      Order {order.id.replace(/^CC-\d{4}-/, '')}
                    </span>

                    <span className="text-xs" style={{ color: C.muted }}>
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full w-fit"
                    style={
                      order.status === 'Delivered'
                        ? { backgroundColor: '#E2EFE4', color: '#285C37' }
                        : { backgroundColor: C.ivory, color: C.green }
                    }
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center gap-3"
                      style={{ color: C.olive }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold shrink-0" style={{ color: C.green }}>
                          ×{item.quantity}
                        </span>
                        <span className="truncate">{item.product.name}</span>
                      </div>

                      <span className="font-bold shrink-0">₹{item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  style={{ borderColor: C.border }}
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span style={{ color: C.muted }}>Total:</span>
                    <span className="font-black text-sm" style={{ color: C.olive }}>
                      ₹{order.grandTotal}
                    </span>
                    <span className="text-[10px]" style={{ color: C.muted }}>
                      ({order.paymentMethod.toUpperCase()} · {order.paymentStatus})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTrackingOrderId(order.id);
                        setCurrentView('track');
                      }}
                      className="px-4 py-2.5 rounded-xl font-bold transition-colors hover:opacity-80"
                      style={{ backgroundColor: C.ivory, color: C.olive }}
                    >
                      Track Order
                    </button>

                    <button
                      type="button"
                      onClick={() => reorder(order)}
                      className="px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors hover:opacity-90"
                      style={{ backgroundColor: C.olive, color: C.cream }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteProducts.length === 0 ? (
            <div
              className="col-span-full rounded-3xl p-10 text-center border"
              style={{ backgroundColor: C.cream, borderColor: C.border }}
            >
              <Heart className="w-10 h-10 mx-auto mb-3" style={{ color: C.gold }} />

              <h3 className="font-serif font-bold text-base" style={{ color: C.olive }}>
                No favorites saved
              </h3>

              <p className="text-xs mt-2" style={{ color: C.muted }}>
                Tap the heart icon on a product to save it here.
              </p>

              <button
                type="button"
                onClick={() => setCurrentView('menu')}
                className="mt-5 px-5 py-2.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: C.olive, color: C.cream }}
              >
                Explore Menu
              </button>
            </div>
          ) : (
            favoriteProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl p-4 border flex items-center justify-between gap-3"
                style={{ backgroundColor: C.cream, borderColor: C.border }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate" style={{ color: C.olive }}>
                    {p.name}
                  </h4>

                  <span className="font-black text-xs" style={{ color: C.green }}>
                    ₹{p.price}
                  </span>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(p, 1)}
                      className="px-3 py-2 rounded-lg text-[11px] font-bold transition-colors hover:opacity-90"
                      style={{ backgroundColor: C.olive, color: C.cream }}
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(p.id)}
                      className="p-2 rounded-lg transition-colors hover:bg-[#F4EBDD]"
                      style={{ color: '#A33D32' }}
                      aria-label={`Remove ${p.name} from favorites`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADDRESS */}
      {activeTab === 'address' && (
        <div
          className="rounded-3xl p-6 sm:p-8 border max-w-xl space-y-5"
          style={{ backgroundColor: C.cream, borderColor: C.border }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold" style={{ color: C.gold }}>
              Delivery Details
            </p>
            <h3 className="font-serif font-bold text-lg mt-1" style={{ color: C.olive }}>
              Primary Delivery Address
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label htmlFor="address-house" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                House / Flat / Hostel Room
              </label>
              <input
                id="address-house"
                type="text"
                value={deliveryAddress.houseFlat}
                onChange={(e) => updateAddressField('houseFlat', e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="address-street" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                Street / Building
              </label>
              <input
                id="address-street"
                type="text"
                value={deliveryAddress.street}
                onChange={(e) => updateAddressField('street', e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="address-area" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                Area / Sector
              </label>
              <input
                id="address-area"
                type="text"
                value={deliveryAddress.area}
                onChange={(e) => updateAddressField('area', e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="address-city" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                  City
                </label>
                <input
                  id="address-city"
                  type="text"
                  value={deliveryAddress.city}
                  onChange={(e) => updateAddressField('city', e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="address-pincode" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                  Pincode
                </label>
                <input
                  id="address-pincode"
                  type="text"
                  inputMode="numeric"
                  value={deliveryAddress.pincode}
                  onChange={(e) => updateAddressField('pincode', e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={saveAddress}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wide transition-colors hover:opacity-90"
              style={{ backgroundColor: C.olive, color: C.cream }}
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {activeTab === 'profile' && (
        <div
          className="rounded-3xl p-6 sm:p-8 border max-w-xl space-y-5"
          style={{ backgroundColor: C.cream, borderColor: C.border }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold" style={{ color: C.gold }}>
              Personal Information
            </p>
            <h3 className="font-serif font-bold text-lg mt-1" style={{ color: C.olive }}>
              Customer Details
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label htmlFor="profile-name" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={deliveryAddress.fullName}
                onChange={(e) => updateAddressField('fullName', e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="profile-phone" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                Mobile Number
              </label>
              <input
                id="profile-phone"
                type="tel"
                value={deliveryAddress.phoneNumber}
                onChange={(e) => updateAddressField('phoneNumber', e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="profile-email" className="block font-bold mb-1.5" style={{ color: C.olive }}>
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                value={deliveryAddress.email || ''}
                onChange={(e) => updateAddressField('email', e.target.value)}
                className={fieldClass}
              />
            </div>

            <button
              type="button"
              onClick={saveProfile}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wide transition-colors hover:opacity-90"
              style={{ backgroundColor: C.olive, color: C.cream }}
            >
              Save Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
