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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#4A2E20] rounded-3xl p-6 sm:p-8 text-[#FAF6F0] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-[#3E2319]">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 rounded-2xl bg-[#E5B869] text-[#2C1810] flex items-center justify-center font-serif font-black text-2xl shadow-lg border-2 border-white/20 shrink-0">
            {deliveryAddress.fullName.charAt(0) || 'C'}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#E5B869] font-bold mb-1">
              My Account
            </p>

            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white truncate">
              {deliveryAddress.fullName || 'Valued Guest'}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#FAF6F0]/75 mt-2">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#E5B869]" />
                {deliveryAddress.phoneNumber || 'Phone not added'}
              </span>

              {deliveryAddress.email && (
                <span className="flex items-center gap-1.5 break-all">
                  <Mail className="w-3.5 h-3.5 text-[#E5B869]" />
                  {deliveryAddress.email}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-[#FAF6F0]/50">
              Member Since
            </p>

            <p className="text-sm font-semibold text-[#E5B869] mt-1">
              Welcome to TCC
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-1 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`shrink-0 pb-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-2 border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#2C1810] text-[#2C1810]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('favorites')}
          className={`shrink-0 pb-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-2 border-b-2 ${
            activeTab === 'favorites'
              ? 'border-[#2C1810] text-[#2C1810]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Favorites ({favoriteProducts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('address')}
          className={`shrink-0 pb-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-2 border-b-2 ${
            activeTab === 'address'
              ? 'border-[#2C1810] text-[#2C1810]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Address</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`shrink-0 pb-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-2 border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#2C1810] text-[#2C1810]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-stone-200">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-2" />

              <h3 className="font-serif font-bold text-base text-[#2C1810]">
                No orders placed yet
              </h3>

              <p className="text-xs text-stone-500 mt-1">
                Explore our bakery & cafe menu to order freshly baked goods!
              </p>

              <button
                type="button"
                onClick={() => setCurrentView('menu')}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#2C1810] text-[#FAF6F0] font-bold text-xs hover:bg-[#3E2319]"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-4 hover:border-stone-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#2C1810] bg-stone-100 px-2 py-0.5 rounded">
                      Order {order.id.replace(/^CC-\d{4}-/, '')}
                    </span>

                    <span className="text-xs text-stone-500 ml-2">
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full w-fit ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center gap-3 text-stone-800"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold text-[#8C5D36] shrink-0">
                          x{item.quantity}
                        </span>

                        <span className="truncate">
                          {item.product.name}
                        </span>
                      </div>

                      <span className="font-bold shrink-0">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-stone-500">Total: </span>

                    <span className="font-black text-sm text-[#2C1810]">
                      ₹{order.grandTotal}
                    </span>

                    <span className="text-stone-400 ml-1">
                      ({order.paymentMethod.toUpperCase()} •{' '}
                      {order.paymentStatus})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTrackingOrderId(order.id);
                        setCurrentView('track');
                      }}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold"
                    >
                      Track Order
                    </button>

                    <button
                      type="button"
                      onClick={() => reorder(order)}
                      className="px-4 py-2 rounded-xl bg-[#2C1810] hover:bg-[#3E2319] text-[#FAF6F0] font-bold flex items-center gap-1.5 shadow-xs"
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
            <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-stone-200">
              <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />

              <h3 className="font-serif font-bold text-base text-[#2C1810]">
                No favorites saved
              </h3>

              <p className="text-xs text-stone-500 mt-1">
                Tap the heart icon on any dessert or quick bite to save it
                here!
              </p>
            </div>
          ) : (
            favoriteProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex items-center justify-between gap-3"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-[#2C1810] truncate">
                    {p.name}
                  </h4>

                  <span className="font-black text-xs text-[#2C1810]">
                    ₹{p.price}
                  </span>

                  <div className="mt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(p, 1)}
                      className="px-2.5 py-1 bg-[#2C1810] hover:bg-[#3E2319] text-[#FAF6F0] rounded-lg text-[11px] font-bold"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(p.id)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                      aria-label={`Remove ${p.name} from favorites`}
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 max-w-xl space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#2C1810]">
            Primary Delivery Address
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                House / Flat / Hostel Room
              </label>

              <input
                type="text"
                value={deliveryAddress.houseFlat}
                onChange={(e) =>
                  updateAddressField('houseFlat', e.target.value)
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Street / Building
              </label>

              <input
                type="text"
                value={deliveryAddress.street}
                onChange={(e) =>
                  updateAddressField('street', e.target.value)
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Area / Sector
              </label>

              <input
                type="text"
                value={deliveryAddress.area}
                onChange={(e) =>
                  updateAddressField('area', e.target.value)
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  City
                </label>

                <input
                  type="text"
                  value={deliveryAddress.city}
                  onChange={(e) =>
                    updateAddressField('city', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Pincode
                </label>

                <input
                  type="text"
                  value={deliveryAddress.pincode}
                  onChange={(e) =>
                    updateAddressField('pincode', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                showToast(
                  'Address Saved',
                  'Default address updated.',
                  'success'
                )
              }
              className="px-6 py-2.5 rounded-full bg-[#2C1810] hover:bg-[#3E2319] text-[#FAF6F0] font-bold text-xs uppercase"
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 max-w-xl space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#2C1810]">
            Customer Details
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                value={deliveryAddress.fullName}
                onChange={(e) =>
                  updateAddressField('fullName', e.target.value)
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Mobile Number
              </label>

              <input
                type="tel"
                value={deliveryAddress.phoneNumber}
                onChange={(e) =>
                  updateAddressField('phoneNumber', e.target.value)
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                value={deliveryAddress.email || ''}
                onChange={(e) =>
                  updateAddressField('email', e.target.value)
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                showToast(
                  'Profile Updated',
                  'Customer details saved successfully.',
                  'success'
                )
              }
              className="px-6 py-2.5 rounded-full bg-[#2C1810] hover:bg-[#3E2319] text-[#FAF6F0] font-bold text-xs uppercase"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};