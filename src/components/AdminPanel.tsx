import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  Tag,
  Plus,
  Trash2,
  Edit2,
  Truck,
  X,
  Flame,
  Search,
  LogOut,
  RefreshCw,
  Save,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  CategoryId,
  DeliverySettings,
  Order,
  Product,
} from '../types';
import { CATEGORIES } from '../data/initialData';

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
  'w-full px-3 py-2.5 border border-[#D8CCB7] rounded-xl bg-[#FFFCF6] text-[#292D1D] outline-none focus:border-[#B9A064] focus:ring-2 focus:ring-[#B9A064]/15';

const labelClass =
  'block font-bold text-[#615B4D] mb-1.5';

const panelClass =
  'bg-[#FFFCF6] rounded-2xl border border-[#D8CCB7] shadow-sm';

export const AdminPanel: React.FC = () => {
  const {
    isAdmin,
    logoutAdmin,
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    deliverySettings,
    updateDeliverySettings,
    coupons,
    addCoupon,
    toggleCouponActive,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'products' | 'delivery' | 'coupons'
  >('orders');

  const [orderStatusFilter, setOrderStatusFilter] =
    useState<string>('all');

  const [productSearch, setProductSearch] = useState('');

  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] =
    useState<CategoryId>('signature-desserts');
  const [newProdPrice, setNewProdPrice] = useState(49);
  const [newProdDescription, setNewProdDescription] =
    useState('');

  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'
  );

  const [newProdIsVeg, setNewProdIsVeg] = useState(true);
  const [newProdIsBestSeller, setNewProdIsBestSeller] =
    useState(false);

  const [tempDeliverySettings, setTempDeliverySettings] =
    useState<DeliverySettings>({
      ...deliverySettings,
      zoneRules: deliverySettings.zoneRules.map((zone) => ({
        ...zone,
      })),
    });

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] =
    useState(149);

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  const totalRevenue = orders.reduce(
    (sum, order) =>
      order.paymentStatus === 'Paid'
        ? sum + order.grandTotal
        : sum,
    0
  );

  const activeOrdersCount = orders.filter(
    (order) =>
      order.status !== 'Delivered' &&
      order.status !== 'Cancelled'
  ).length;

  const resetProductForm = () => {
    setNewProdName('');
    setNewProdCategory('signature-desserts');
    setNewProdPrice(49);
    setNewProdDescription('');
    setNewProdImage(
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'
    );
    setNewProdIsVeg(true);
    setNewProdIsBestSeller(false);
  };

  const closeProductModal = () => {
    setIsAddProductModalOpen(false);
    setEditingProduct(null);
    resetProductForm();
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newProdName.trim() ||
      !Number.isFinite(newProdPrice) ||
      newProdPrice <= 0
    ) {
      return;
    }

    const productData = {
      name: newProdName.trim(),
      category: newProdCategory,
      price: newProdPrice,
      description: newProdDescription.trim(),
      image: newProdImage.trim(),
      isVeg: newProdIsVeg,
      isBestSeller: newProdIsBestSeller,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct({
        ...productData,
        isAvailable: true,
        rating: 4.8,
        reviewsCount: 1,
      });
    }

    closeProductModal();
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProdName(product.name);
    setNewProdCategory(product.category);
    setNewProdPrice(product.price);
    setNewProdDescription(product.description);
    setNewProdImage(product.image);
    setNewProdIsVeg(product.isVeg);
    setNewProdIsBestSeller(!!product.isBestSeller);
    setIsAddProductModalOpen(true);
  };

  const handleSaveDeliverySettings = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      tempDeliverySettings.maxDeliveryRadiusKm < 0 ||
      tempDeliverySettings.freeDeliveryThreshold < 0 ||
      tempDeliverySettings.minimumOrderValue < 0 ||
      tempDeliverySettings.estimatedPrepTimeMinutes < 0 ||
      tempDeliverySettings.zoneRules.some(
        (zone) => !Number.isFinite(zone.fee) || zone.fee < 0
      )
    ) {
      return;
    }

    updateDeliverySettings(tempDeliverySettings);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();

    const code = newCouponCode.trim().toUpperCase();

    if (
      !code ||
      !Number.isFinite(newCouponValue) ||
      newCouponValue <= 0 ||
      newCouponValue > 100 ||
      !Number.isFinite(newCouponMinOrder) ||
      newCouponMinOrder < 0
    ) {
      return;
    }

    if (
      coupons.some(
        (coupon) => coupon.code.toUpperCase() === code
      )
    ) {
      window.alert('This coupon code already exists.');
      return;
    }

    addCoupon({
      code,
      discountType: 'percentage',
      discountValue: newCouponValue,
      minOrderValue: newCouponMinOrder,
      maxDiscount: 100,
      description: `${newCouponValue}% OFF on orders above ₹${newCouponMinOrder}`,
      isActive: true,
    });

    setNewCouponCode('');
  };

  const handleSimulateIncomingOrder = () => {
    if (products.length === 0) return;

    const availableProducts = products.filter(
      (product) => product.isAvailable
    );

    if (availableProducts.length === 0) {
      window.alert(
        'Please mark at least one product as available before simulating an order.'
      );
      return;
    }

    const randomProduct =
      availableProducts[
        Math.floor(Math.random() * availableProducts.length)
      ];

    const simulatedOrderNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    const itemTotal = randomProduct.price * 2;
    const taxes = Math.round(itemTotal * 0.05);

    const newSimOrder: Order = {
      id: `CC-2026-${simulatedOrderNumber}`,
      createdAt: new Date().toISOString(),
      items: [
        {
          id: `sim-item-${Date.now()}`,
          productId: randomProduct.id,
          product: randomProduct,
          quantity: 2,
          selectedCustomizations: [],
          unitPrice: randomProduct.price,
          totalPrice: itemTotal,
        },
      ],
      orderType: 'delivery',
      customerName: 'Demo Customer',
      customerPhone: '',
      deliveryAddress: {
        fullName: 'Demo Customer',
        phoneNumber: '',
        houseFlat: 'Demo Address',
        street: 'Sample Street',
        area: 'Sample Area',
        city: 'Sample City',
        pincode: '000000',
        distanceKm: 1.8,
      },
      subtotal: itemTotal,
      deliveryFee: 20,
      discount: 0,
      taxes,
      grandTotal: itemTotal + 20 + taxes,
      paymentMethod: 'upi',
      paymentStatus: 'Pending',
      status: 'Order Received',
      estimatedDeliveryTime: '20-25 mins',
      timeline: [
        {
          status: 'Order Received',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description:
            'Demo order created for testing the admin workflow.',
        },
      ],
    };

    try {
      const currentOrders = JSON.parse(
        localStorage.getItem('classic_crush_orders_v1') || '[]'
      );

      if (!Array.isArray(currentOrders)) {
        throw new Error('Invalid stored orders');
      }

      localStorage.setItem(
        'classic_crush_orders_v1',
        JSON.stringify([newSimOrder, ...currentOrders])
      );

      window.location.reload();
    } catch {
      window.alert(
        'Unable to create a demo order. Please check browser storage.'
      );
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div
          className="rounded-3xl p-8 shadow-sm"
          style={{
            backgroundColor: C.cream,
            border: `1px solid ${C.border}`,
          }}
        >
          <ShieldCheck
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: C.gold }}
          />

          <h2
            className="text-2xl font-serif font-black"
            style={{ color: C.olive }}
          >
            Admin Access Required
          </h2>

          <p
            className="text-sm mt-2"
            style={{ color: C.muted }}
          >
            Please sign in with an administrator account to access
            the management console.
          </p>

          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="mt-6 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-colors"
            style={{ backgroundColor: C.olive }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'orders' as const,
      icon: ShoppingBag,
      label: `Kitchen Orders (${orders.length})`,
    },
    {
      id: 'products' as const,
      icon: Package,
      label: `Product Catalog (${products.length})`,
    },
    {
      id: 'delivery' as const,
      icon: Truck,
      label: 'Delivery Zones & Radius',
    },
    {
      id: 'coupons' as const,
      icon: Tag,
      label: `Discount Coupons (${coupons.length})`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* ADMIN HEADER */}
      <section
        className="rounded-3xl p-5 sm:p-7 shadow-lg"
        style={{
          background: `linear-gradient(120deg, ${C.deepOlive}, ${C.green})`,
          border: `1px solid ${C.gold}55`,
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <div
              className="w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${C.gold}20`,
                borderColor: `${C.gold}70`,
                color: C.lightGold,
              }}
            >
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-white">
                  Admin Management Console
                </h1>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-300/30 bg-emerald-400/10 text-emerald-200">
                  Admin Mode
                </span>
              </div>

              <p className="text-xs sm:text-sm mt-1 text-[#F4EBDD]/75">
                The Classic Crush Bakery & Café • School of Hotel Management
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2.5">
            <button
              type="button"
              onClick={handleSimulateIncomingOrder}
              className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              style={{
                backgroundColor: C.lightGold,
                color: C.deepOlive,
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Simulate Demo Order
            </button>

            <button
              type="button"
              onClick={() => {
                logoutAdmin();
                setCurrentView('home');
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Exit Console
            </button>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: 'Total Orders',
            value: orders.length,
            detail: `${activeOrdersCount} active`,
          },
          {
            label: 'Paid Revenue',
            value: `₹${totalRevenue.toLocaleString('en-IN')}`,
            detail: 'Orders marked paid',
          },
          {
            label: 'Menu Catalog',
            value: products.length,
            detail: `${products.filter((p) => p.isAvailable).length} available`,
          },
          {
            label: 'Delivery Radius',
            value: `${deliverySettings.maxDeliveryRadiusKm} km`,
            detail: `Free above ₹${deliverySettings.freeDeliveryThreshold}`,
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="p-4 sm:p-5 rounded-2xl shadow-sm"
            style={{
              backgroundColor: C.cream,
              border: `1px solid ${C.border}`,
            }}
          >
            <span
              className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider block"
              style={{ color: C.muted }}
            >
              {metric.label}
            </span>

            <p
              className="text-xl sm:text-2xl font-black mt-1 break-words"
              style={{ color: C.olive }}
            >
              {metric.value}
            </p>

            <span
              className="text-[10px] sm:text-[11px] font-semibold"
              style={{ color: C.green }}
            >
              {metric.detail}
            </span>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div
        className="flex gap-1 overflow-x-auto no-scrollbar border-b"
        style={{ borderColor: C.border }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className="shrink-0 pb-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors"
              style={{
                borderBottomColor: isActive ? C.gold : 'transparent',
                color: isActive ? C.olive : C.muted,
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {[
              'all',
              'Order Received',
              'Confirmed',
              'Being Prepared',
              'Ready for Pickup',
              'Out for Delivery',
              'Delivered',
              'Cancelled',
            ].map((status) => {
              const selected = orderStatusFilter === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setOrderStatusFilter(status)}
                  className="shrink-0 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap border transition-colors"
                  style={{
                    backgroundColor: selected ? C.olive : C.cream,
                    color: selected ? C.lightGold : C.muted,
                    borderColor: selected ? C.olive : C.border,
                  }}
                >
                  {status === 'all' ? 'All Orders' : status}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <div
                className="rounded-2xl p-8 text-center text-xs"
                style={{
                  backgroundColor: C.cream,
                  border: `1px solid ${C.border}`,
                  color: C.muted,
                }}
              >
                No orders match this status filter.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl p-4 sm:p-5 shadow-sm space-y-4"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3 border-b"
                    style={{ borderColor: `${C.border}90` }}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className="font-mono text-xs sm:text-sm font-black px-2 py-1 rounded-lg shrink-0"
                        style={{
                          backgroundColor: C.ivory,
                          color: C.olive,
                        }}
                      >
                        #{order.id}
                      </span>

                      <div className="min-w-0">
                        <h4
                          className="font-bold text-sm truncate"
                          style={{ color: C.olive }}
                        >
                          {order.customerName}
                        </h4>

                        <span
                          className="text-[11px] sm:text-xs"
                          style={{ color: C.muted }}
                        >
                          {order.customerPhone || 'No phone provided'} •{' '}
                          {new Date(order.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: C.ivory,
                          color: C.olive,
                        }}
                      >
                        {order.orderType === 'pickup'
                          ? '🛍️ Pickup'
                          : '🛵 Delivery'}
                      </span>

                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor:
                            order.status === 'Delivered'
                              ? '#E2EEE2'
                              : order.status === 'Cancelled'
                              ? '#F8E5E1'
                              : '#F3E9D1',
                          color:
                            order.status === 'Delivered'
                              ? '#315E3D'
                              : order.status === 'Cancelled'
                              ? '#963F35'
                              : '#795B1F',
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                    <div className="md:col-span-6 space-y-2">
                      <span
                        className="font-bold uppercase tracking-wider block text-[10px]"
                        style={{ color: C.muted }}
                      >
                        Items Ordered
                      </span>

                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between gap-3"
                            style={{ color: C.olive }}
                          >
                            <span className="min-w-0">
                              <span
                                className="font-bold"
                                style={{ color: C.gold }}
                              >
                                x{item.quantity}
                              </span>{' '}
                              <span>{item.product.name}</span>

                              {item.selectedCustomizations.length > 0 && (
                                <span
                                  className="block text-[10px] mt-0.5"
                                  style={{ color: C.muted }}
                                >
                                  {item.selectedCustomizations
                                    .map((c) => c.optionName)
                                    .join(', ')}
                                </span>
                              )}
                            </span>

                            <span className="font-bold shrink-0">
                              ₹{item.totalPrice}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-3 space-y-1">
                      <span
                        className="font-bold uppercase tracking-wider block text-[10px]"
                        style={{ color: C.muted }}
                      >
                        Destination
                      </span>

                      {order.orderType === 'pickup' ? (
                        <p style={{ color: C.muted }}>
                          Café Counter Pickup
                        </p>
                      ) : order.deliveryAddress ? (
                        <p
                          className="leading-relaxed break-words"
                          style={{ color: C.muted }}
                        >
                          {order.deliveryAddress.houseFlat},{' '}
                          {order.deliveryAddress.street},{' '}
                          {order.deliveryAddress.area}{' '}
                          ({order.deliveryAddress.distanceKm} km)
                        </p>
                      ) : (
                        <p style={{ color: C.muted }}>
                          Delivery address unavailable
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-3 space-y-1 md:text-right">
                      <span
                        className="font-bold uppercase tracking-wider block text-[10px]"
                        style={{ color: C.muted }}
                      >
                        Bill Total
                      </span>

                      <p
                        className="text-base font-black"
                        style={{ color: C.olive }}
                      >
                        ₹{order.grandTotal}
                      </p>

                      <span
                        className="text-[10px] capitalize block"
                        style={{ color: C.muted }}
                      >
                        {String(order.paymentMethod).replace('_', ' ')} (
                        {order.paymentStatus})
                      </span>
                    </div>
                  </div>

                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: `${C.border}90` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <span
                        className="text-xs font-bold"
                        style={{ color: C.olive }}
                      >
                        Update Order Stage
                      </span>

                      <div className="flex flex-wrap gap-1.5">
                        {[
                          {
                            label: 'Confirm',
                            status: 'Confirmed' as const,
                          },
                          {
                            label: 'Preparing',
                            status: 'Being Prepared' as const,
                          },
                          {
                            label: 'Ready',
                            status: 'Ready for Pickup' as const,
                          },
                          {
                            label: 'Dispatch',
                            status: 'Out for Delivery' as const,
                          },
                          {
                            label: 'Delivered ✓',
                            status: 'Delivered' as const,
                          },
                          {
                            label: 'Cancel',
                            status: 'Cancelled' as const,
                          },
                        ].map((action) => (
                          <button
                            key={action.status}
                            type="button"
                            disabled={
                              order.status === 'Delivered' ||
                              order.status === 'Cancelled'
                            }
                            onClick={() =>
                              updateOrderStatus(order.id, action.status)
                            }
                            className="px-3 py-1.5 rounded-lg font-bold text-xs border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            style={{
                              backgroundColor:
                                action.status === 'Delivered'
                                  ? C.green
                                  : action.status === 'Cancelled'
                                  ? '#F8E5E1'
                                  : C.ivory,
                              color:
                                action.status === 'Delivered'
                                  ? '#FFFFFF'
                                  : action.status === 'Cancelled'
                                  ? '#963F35'
                                  : C.olive,
                              borderColor:
                                action.status === 'Delivered'
                                  ? C.green
                                  : action.status === 'Cancelled'
                                  ? '#E8C6BF'
                                  : C.border,
                            }}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search
                className="w-4 h-4 absolute left-3 top-2.5"
                style={{ color: C.muted }}
              />

              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                aria-label="Search products"
                className={`${inputClass} pl-9 text-xs`}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                resetProductForm();
                setIsAddProductModalOpen(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
              style={{
                backgroundColor: C.olive,
                color: C.cream,
              }}
            >
              <Plus className="w-4 h-4" style={{ color: C.lightGold }} />
              Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(productSearch.toLowerCase())
              )
              .map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      style={{ border: `1px solid ${C.border}` }}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-[2px] border shrink-0"
                          style={{
                            borderColor: product.isVeg
                              ? '#287447'
                              : '#98562C',
                            backgroundColor: product.isVeg
                              ? '#287447'
                              : '#98562C',
                          }}
                          aria-label={
                            product.isVeg ? 'Vegetarian' : 'Non-vegetarian'
                          }
                        />

                        <h4
                          className="font-bold text-sm truncate"
                          style={{ color: C.olive }}
                        >
                          {product.name}
                        </h4>
                      </div>

                      <p
                        className="text-xs line-clamp-2 mt-1"
                        style={{ color: C.muted }}
                      >
                        {product.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span
                          className="font-black text-sm"
                          style={{ color: C.olive }}
                        >
                          ₹{product.price}
                        </span>

                        {product.isBestSeller && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{
                              color: C.olive,
                              backgroundColor: '#F3E9D1',
                            }}
                          >
                            Best Seller
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="pt-2 border-t flex items-center justify-between gap-2"
                    style={{ borderColor: `${C.border}90` }}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(product.id, {
                            isAvailable: !product.isAvailable,
                          })
                        }
                        className="px-2 py-1 rounded-lg font-bold text-[11px]"
                        style={{
                          backgroundColor: product.isAvailable
                            ? '#E2EEE2'
                            : C.ivory,
                          color: product.isAvailable
                            ? '#315E3D'
                            : C.muted,
                        }}
                      >
                        {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(product.id, {
                            isBestSeller: !product.isBestSeller,
                          })
                        }
                        className="p-1.5 rounded-lg"
                        style={{
                          color: product.isBestSeller ? C.gold : C.muted,
                          backgroundColor: product.isBestSeller
                            ? '#F3E9D1'
                            : 'transparent',
                        }}
                        title="Toggle Best Seller"
                        aria-label={`Toggle best seller for ${product.name}`}
                      >
                        <Flame className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProduct(product)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: C.muted }}
                        title="Edit details"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete "${product.name}" from the menu?`
                            )
                          ) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-[#963F35] hover:bg-[#F8E5E1]"
                        title="Delete product"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

            {products.filter((product) =>
              product.name
                .toLowerCase()
                .includes(productSearch.toLowerCase())
            ).length === 0 && (
              <div
                className="sm:col-span-2 lg:col-span-3 rounded-2xl p-8 text-center text-sm"
                style={{
                  backgroundColor: C.cream,
                  border: `1px solid ${C.border}`,
                  color: C.muted,
                }}
              >
                No products found. Try another search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* DELIVERY */}
      {activeTab === 'delivery' && (
        <form
          onSubmit={handleSaveDeliverySettings}
          className="rounded-3xl p-5 sm:p-8 max-w-2xl space-y-6 shadow-sm"
          style={{
            backgroundColor: C.cream,
            border: `1px solid ${C.border}`,
          }}
        >
          <div>
            <h3
              className="text-lg font-serif font-bold"
              style={{ color: C.olive }}
            >
              Delivery Zone & Radius Configuration
            </h3>

            <p
              className="text-xs mt-1 leading-relaxed"
              style={{ color: C.muted }}
            >
              Modify delivery charges, distance limit and free delivery
              threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              {
                label: 'Max Delivery Radius (km)',
                value: tempDeliverySettings.maxDeliveryRadiusKm,
                key: 'maxDeliveryRadiusKm' as const,
                min: 0,
              },
              {
                label: 'Free Delivery Threshold (₹)',
                value: tempDeliverySettings.freeDeliveryThreshold,
                key: 'freeDeliveryThreshold' as const,
                min: 0,
              },
              {
                label: 'Minimum Order Value (₹)',
                value: tempDeliverySettings.minimumOrderValue,
                key: 'minimumOrderValue' as const,
                min: 0,
              },
              {
                label: 'Est. Kitchen Prep Time (Minutes)',
                value: tempDeliverySettings.estimatedPrepTimeMinutes,
                key: 'estimatedPrepTimeMinutes' as const,
                min: 0,
              },
            ].map((field) => (
              <div key={field.key}>
                <label className={labelClass}>{field.label}</label>

                <input
                  type="number"
                  min={field.min}
                  step="any"
                  value={field.value}
                  onChange={(e) =>
                    setTempDeliverySettings((current) => ({
                      ...current,
                      [field.key]: Number(e.target.value),
                    }))
                  }
                  className={`${inputClass} text-xs`}
                />
              </div>
            ))}
          </div>

          <div
            className="space-y-3 pt-3 border-t"
            style={{ borderColor: `${C.border}90` }}
          >
            <span
              className="font-bold text-xs uppercase tracking-wider block"
              style={{ color: C.muted }}
            >
              Distance-Based Delivery Fees
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {tempDeliverySettings.zoneRules.map((zone, index) => (
                <div
                  key={`${zone.minKm}-${zone.maxKm}-${index}`}
                  className="p-3 rounded-xl flex items-center justify-between gap-3"
                  style={{
                    backgroundColor: C.ivory,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: C.olive }}
                  >
                    Zone {index + 1}: {zone.minKm}–{zone.maxKm} km
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    <span style={{ color: C.muted }}>₹</span>

                    <input
                      type="number"
                      min="0"
                      value={zone.fee}
                      aria-label={`Delivery fee for zone ${index + 1}`}
                      onChange={(e) => {
                        const updated =
                          tempDeliverySettings.zoneRules.map(
                            (currentZone, zoneIndex) =>
                              zoneIndex === index
                                ? {
                                    ...currentZone,
                                    fee: Number(e.target.value),
                                  }
                                : currentZone
                          );

                        setTempDeliverySettings((current) => ({
                          ...current,
                          zoneRules: updated,
                        }));
                      }}
                      className="w-20 px-2 py-1.5 border rounded-lg font-bold bg-[#FFFCF6] outline-none focus:border-[#B9A064]"
                      style={{
                        borderColor: C.border,
                        color: C.olive,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: C.olive,
              color: C.cream,
            }}
          >
            <Save className="w-4 h-4" style={{ color: C.lightGold }} />
            Save Delivery Settings
          </button>
        </form>
      )}

      {/* COUPONS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <form
            onSubmit={handleCreateCoupon}
            className="md:col-span-5 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4"
            style={{
              backgroundColor: C.cream,
              border: `1px solid ${C.border}`,
            }}
          >
            <h3
              className="text-base font-serif font-bold"
              style={{ color: C.olive }}
            >
              Create Discount Promo Code
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className={labelClass}>Coupon Code</label>

                <input
                  type="text"
                  placeholder="e.g. FESTIVE20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className={`${inputClass} uppercase font-bold`}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Discount Percentage (%)
                </label>

                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newCouponValue}
                  onChange={(e) =>
                    setNewCouponValue(Number(e.target.value))
                  }
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Minimum Order Value (₹)
                </label>

                <input
                  type="number"
                  min="0"
                  value={newCouponMinOrder}
                  onChange={(e) =>
                    setNewCouponMinOrder(Number(e.target.value))
                  }
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                style={{
                  backgroundColor: C.olive,
                  color: C.cream,
                }}
              >
                <Plus className="w-4 h-4" style={{ color: C.lightGold }} />
                Add Promo Code
              </button>
            </div>
          </form>

          <div className="md:col-span-7 space-y-3">
            <h3
              className="text-base font-serif font-bold"
              style={{ color: C.olive }}
            >
              Offers & Coupons
            </h3>

            <div className="space-y-2.5">
              {coupons.length === 0 && (
                <div
                  className="rounded-2xl p-6 text-sm"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                  }}
                >
                  No coupons created yet.
                </div>
              )}

              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="font-mono font-black text-sm px-2.5 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: C.ivory,
                          color: C.olive,
                          borderColor: C.border,
                        }}
                      >
                        {coupon.code}
                      </span>

                      <span
                        className="text-xs font-bold"
                        style={{ color: C.green }}
                      >
                        {coupon.discountValue}% OFF
                      </span>
                    </div>

                    <p
                      className="text-xs mt-1"
                      style={{ color: C.muted }}
                    >
                      {coupon.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCouponActive(coupon.code)}
                    aria-pressed={coupon.isActive}
                    className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border"
                    style={{
                      backgroundColor: coupon.isActive
                        ? '#E2EEE2'
                        : C.ivory,
                      color: coupon.isActive ? '#315E3D' : C.muted,
                      borderColor: coupon.isActive ? '#C4DCC6' : C.border,
                    }}
                  >
                    {coupon.isActive ? 'Active' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeProductModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative my-6 max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: C.cream,
              border: `1px solid ${C.border}`,
            }}
          >
            <button
              type="button"
              onClick={closeProductModal}
              className="absolute top-4 right-4 p-1"
              style={{ color: C.muted }}
              aria-label="Close product modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              id="product-modal-title"
              className="text-lg font-serif font-bold pr-8"
              style={{ color: C.olive }}
            >
              {editingProduct ? 'Edit Product' : 'Add New Menu Item'}
            </h3>

            <form
              onSubmit={handleSaveProduct}
              className="space-y-3.5 mt-4 text-xs"
            >
              <div>
                <label className={labelClass}>Product Name</label>

                <input
                  type="text"
                  placeholder="e.g. Nutella Waffle Dream"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Category</label>

                  <select
                    value={newProdCategory}
                    onChange={(e) =>
                      setNewProdCategory(e.target.value as CategoryId)
                    }
                    className={inputClass}
                  >
                    {CATEGORIES.filter(
                      (category) => category.id !== 'all'
                    ).map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Price (₹)</label>

                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={newProdPrice}
                    onChange={(e) =>
                      setNewProdPrice(Number(e.target.value))
                    }
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Short Description</label>

                <textarea
                  rows={3}
                  placeholder="Describe the ingredients and preparation..."
                  value={newProdDescription}
                  onChange={(e) =>
                    setNewProdDescription(e.target.value)
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>Food Image URL</label>

                <input
                  type="url"
                  placeholder="https://..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label
                  className="flex items-center gap-2 cursor-pointer font-bold"
                  style={{ color: C.olive }}
                >
                  <input
                    type="checkbox"
                    checked={newProdIsVeg}
                    onChange={(e) => setNewProdIsVeg(e.target.checked)}
                    className="w-4 h-4 accent-[#244536]"
                  />
                  <span>100% Pure Veg</span>
                </label>

                <label
                  className="flex items-center gap-2 cursor-pointer font-bold"
                  style={{ color: C.olive }}
                >
                  <input
                    type="checkbox"
                    checked={newProdIsBestSeller}
                    onChange={(e) =>
                      setNewProdIsBestSeller(e.target.checked)
                    }
                    className="w-4 h-4 accent-[#B9A064]"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-3">
                <button
                  type="button"
                  onClick={closeProductModal}
                  className="flex-1 py-2.5 rounded-xl font-bold border"
                  style={{
                    color: C.muted,
                    borderColor: C.border,
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold"
                  style={{
                    backgroundColor: C.olive,
                    color: C.cream,
                  }}
                >
                  {editingProduct ? 'Save Changes' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
