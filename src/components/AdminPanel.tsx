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

  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');

  // Product modal
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] =
    useState<CategoryId>('signature-desserts');
  const [newProdPrice, setNewProdPrice] = useState(49);
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'
  );
  const [newProdIsVeg, setNewProdIsVeg] = useState(true);
  const [newProdIsBestSeller, setNewProdIsBestSeller] = useState(false);

  // Delivery settings
  const [tempDeliverySettings, setTempDeliverySettings] =
    useState<DeliverySettings>({
      ...deliverySettings,
    });

  // Coupon
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(149);

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.grandTotal,
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

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProdName.trim() || newProdPrice <= 0) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: newProdName,
        category: newProdCategory,
        price: newProdPrice,
        description: newProdDescription,
        image: newProdImage,
        isVeg: newProdIsVeg,
        isBestSeller: newProdIsBestSeller,
      });

      setEditingProduct(null);
    } else {
      addProduct({
        name: newProdName,
        category: newProdCategory,
        price: newProdPrice,
        description: newProdDescription,
        image: newProdImage,
        isVeg: newProdIsVeg,
        isBestSeller: newProdIsBestSeller,
        isAvailable: true,
        rating: 4.8,
        reviewsCount: 1,
      });
    }

    setIsAddProductModalOpen(false);
    resetProductForm();
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
    updateDeliverySettings(tempDeliverySettings);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
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

    const randomProduct =
      products[Math.floor(Math.random() * products.length)];

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
      customerName: 'Aarav Malhotra',
      customerPhone: '9812345678',
      deliveryAddress: {
        fullName: 'Aarav Malhotra',
        phoneNumber: '9812345678',
        houseFlat: 'Room 208, Boys Hostel A',
        street: 'University Campus Road',
        area: 'Hotel Management East Wing',
        city: 'Campus City',
        pincode: '302015',
        distanceKm: 1.8,
      },
      subtotal: itemTotal,
      deliveryFee: 20,
      discount: 0,
      taxes,
      grandTotal: itemTotal + 20 + taxes,
      paymentMethod: 'upi',
      paymentStatus: 'Paid',
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
            'Simulated customer placed order via online checkout.',
        },
      ],
    };

    const currentOrders = JSON.parse(
      localStorage.getItem('classic_crush_orders_v1') || '[]'
    );

    localStorage.setItem(
      'classic_crush_orders_v1',
      JSON.stringify([newSimOrder, ...currentOrders])
    );

    window.location.reload();
  };

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          <ShieldCheck className="w-12 h-12 mx-auto text-[#8C5D36] mb-4" />
          <h2 className="text-2xl font-serif font-black text-[#2C1810]">
            Admin Access Required
          </h2>
          <p className="text-sm text-stone-500 mt-2">
            Please sign in with an administrator account to access
            the management console.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="mt-6 px-5 py-2.5 rounded-full bg-[#2C1810] text-white text-sm font-bold hover:bg-[#3E2319]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* ADMIN HEADER */}
      <div className="bg-[#2C1810] text-[#FAF6F0] rounded-3xl p-5 sm:p-7 border border-[#3E2319] shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-[#3E2319] border border-[#D4AF37]/40 text-[#E5B869] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-white">
                  Admin Management Console
                </h1>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  Live Kitchen
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#FAF6F0]/70 mt-1">
                The Classic Crush Bakery & Café • School of Hotel Management
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2.5">
            <button
              type="button"
              onClick={handleSimulateIncomingOrder}
              className="px-4 py-2.5 bg-[#E5B869] hover:bg-[#D4AF37] text-[#2C1810] rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              Simulate Order
            </button>

            <button
              type="button"
              onClick={() => {
                logoutAdmin();
                setCurrentView('home');
              }}
              className="px-4 py-2.5 bg-[#3E2319] hover:bg-rose-900 text-stone-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-white/10"
            >
              <LogOut className="w-4 h-4" />
              Exit Console
            </button>
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
            Total Orders
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#2C1810] mt-1">
            {orders.length}
          </p>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold">
            {activeOrdersCount} active
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
            Total Revenue
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#2C1810] mt-1">
            ₹{totalRevenue}
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-500">
            Online sales
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
            Menu Catalog
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#2C1810] mt-1">
            {products.length}
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-500">
            {products.filter((p) => p.isAvailable).length} available
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
            Delivery Radius
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#2C1810] mt-1">
            {deliverySettings.maxDeliveryRadiusKm} km
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-500">
            Free above ₹{deliverySettings.freeDeliveryThreshold}
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-stone-200 gap-1 overflow-x-auto no-scrollbar">
        {[
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
        ].map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 pb-3 px-3 sm:px-4 text-xs font-bold flex items-center gap-2 border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#2C1810] text-[#2C1810]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
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
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setOrderStatusFilter(status)}
                className={`shrink-0 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${
                  orderStatusFilter === status
                    ? 'bg-[#2C1810] text-[#E5B869]'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 text-stone-500 text-xs">
                No orders match this status filter.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3 border-b border-stone-100">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="font-mono text-xs sm:text-sm font-black text-[#2C1810] bg-stone-100 px-2 py-1 rounded-lg shrink-0">
                        #{order.id}
                      </span>

                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-[#2C1810] truncate">
                          {order.customerName}
                        </h4>

                        <span className="text-[11px] sm:text-xs text-stone-500">
                          {order.customerPhone} •{' '}
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-800">
                        {order.orderType === 'pickup'
                          ? '🛍️ Pickup'
                          : '🛵 Delivery'}
                      </span>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                    <div className="md:col-span-6 space-y-2">
                      <span className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                        Items Ordered
                      </span>

                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between gap-3 text-stone-800"
                          >
                            <span className="min-w-0">
                              <span className="font-bold text-[#8C5D36]">
                                x{item.quantity}
                              </span>{' '}
                              <span>{item.product.name}</span>

                              {item.selectedCustomizations.length > 0 && (
                                <span className="text-stone-400 block text-[10px] mt-0.5">
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
                      <span className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                        Destination
                      </span>

                      {order.orderType === 'pickup' ? (
                        <p className="text-stone-600">
                          Café Counter Pickup
                        </p>
                      ) : (
                        <p className="text-stone-600 leading-relaxed">
                          {order.deliveryAddress?.houseFlat},{' '}
                          {order.deliveryAddress?.street},{' '}
                          {order.deliveryAddress?.area}{' '}
                          ({order.deliveryAddress?.distanceKm} km)
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-3 space-y-1 md:text-right">
                      <span className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                        Bill Total
                      </span>

                      <p className="text-base font-black text-[#2C1810]">
                        ₹{order.grandTotal}
                      </p>

                      <span className="text-[10px] text-stone-500 capitalize block">
                        {order.paymentMethod.replace('_', ' ')} (
                        {order.paymentStatus})
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <span className="text-xs font-bold text-stone-700">
                        Update Order Stage
                      </span>

                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(order.id, 'Confirmed')
                          }
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 font-bold text-xs text-stone-800"
                        >
                          Confirm
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(order.id, 'Being Prepared')
                          }
                          className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 font-bold text-xs text-amber-900 border border-amber-200"
                        >
                          Preparing
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(order.id, 'Ready for Pickup')
                          }
                          className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 font-bold text-xs text-purple-900 border border-purple-200"
                        >
                          Ready
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(order.id, 'Out for Delivery')
                          }
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 font-bold text-xs text-blue-900 border border-blue-200"
                        >
                          Dispatch
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(order.id, 'Delivered')
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white"
                        >
                          Delivered ✓
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateOrderStatus(order.id, 'Cancelled')
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />

              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-stone-300 rounded-xl bg-white outline-none focus:border-[#8C5D36]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                resetProductForm();
                setIsAddProductModalOpen(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#2C1810] hover:bg-[#3E2319] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4 text-[#E5B869]" />
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
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col justify-between gap-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-3 h-3 rounded-[2px] border shrink-0 ${
                            product.isVeg
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-amber-900 bg-amber-900'
                          }`}
                        />

                        <h4 className="font-bold text-sm text-[#2C1810] truncate">
                          {product.name}
                        </h4>
                      </div>

                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="font-black text-sm text-[#2C1810]">
                          ₹{product.price}
                        </span>

                        {product.isBestSeller && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Best Seller
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(product.id, {
                            isAvailable: !product.isAvailable,
                          })
                        }
                        className={`px-2 py-1 rounded-lg font-bold text-[11px] ${
                          product.isAvailable
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {product.isAvailable
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(product.id, {
                            isBestSeller: !product.isBestSeller,
                          })
                        }
                        className={`p-1.5 rounded-lg ${
                          product.isBestSeller
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-stone-400 hover:text-stone-700'
                        }`}
                        title="Toggle Best Seller"
                      >
                        <Flame className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEditProduct(product)
                        }
                        className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg"
                        title="Edit details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* DELIVERY */}
      {activeTab === 'delivery' && (
        <form
          onSubmit={handleSaveDeliverySettings}
          className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-sm max-w-2xl space-y-6"
        >
          <div>
            <h3 className="text-lg font-serif font-bold text-[#2C1810]">
              Delivery Zone & Radius Configuration
            </h3>

            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Modify delivery charges, distance limit and free
              delivery threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1.5">
                Max Delivery Radius (km)
              </label>

              <input
                type="number"
                value={tempDeliverySettings.maxDeliveryRadiusKm}
                onChange={(e) =>
                  setTempDeliverySettings({
                    ...tempDeliverySettings,
                    maxDeliveryRadiusKm: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">
                Free Delivery Threshold (₹)
              </label>

              <input
                type="number"
                value={tempDeliverySettings.freeDeliveryThreshold}
                onChange={(e) =>
                  setTempDeliverySettings({
                    ...tempDeliverySettings,
                    freeDeliveryThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">
                Minimum Order Value (₹)
              </label>

              <input
                type="number"
                value={tempDeliverySettings.minimumOrderValue}
                onChange={(e) =>
                  setTempDeliverySettings({
                    ...tempDeliverySettings,
                    minimumOrderValue: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">
                Est. Kitchen Prep Time (Minutes)
              </label>

              <input
                type="number"
                value={
                  tempDeliverySettings.estimatedPrepTimeMinutes
                }
                onChange={(e) =>
                  setTempDeliverySettings({
                    ...tempDeliverySettings,
                    estimatedPrepTimeMinutes: Number(
                      e.target.value
                    ),
                  })
                }
                className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-stone-100">
            <span className="font-bold text-xs text-stone-700 uppercase tracking-wider block">
              Distance-Based Delivery Fees
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {tempDeliverySettings.zoneRules.map((zone, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                >
                  <span className="font-semibold text-stone-700">
                    Zone {index + 1}: {zone.minKm}–{zone.maxKm} km
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    <span>₹</span>

                    <input
                      type="number"
                      value={zone.fee}
                      onChange={(e) => {
                        const updated = [
                          ...tempDeliverySettings.zoneRules,
                        ];

                        updated[index].fee = Number(
                          e.target.value
                        );

                        setTempDeliverySettings({
                          ...tempDeliverySettings,
                          zoneRules: updated,
                        });
                      }}
                      className="w-16 px-2 py-1.5 border border-stone-300 rounded-lg font-bold text-stone-900 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2C1810] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3E2319] shadow-md"
          >
            <Save className="w-4 h-4 text-[#E5B869]" />
            Save Delivery Settings
          </button>
        </form>
      )}

      {/* COUPONS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <form
            onSubmit={handleCreateCoupon}
            className="md:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4"
          >
            <h3 className="text-base font-serif font-bold text-[#2C1810]">
              Create Discount Promo Code
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Coupon Code
                </label>

                <input
                  type="text"
                  placeholder="e.g. FESTIVE20"
                  value={newCouponCode}
                  onChange={(e) =>
                    setNewCouponCode(e.target.value)
                  }
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl uppercase font-bold outline-none focus:border-[#8C5D36]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Discount Percentage (%)
                </label>

                <input
                  type="number"
                  value={newCouponValue}
                  onChange={(e) =>
                    setNewCouponValue(Number(e.target.value))
                  }
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Minimum Order Value (₹)
                </label>

                <input
                  type="number"
                  value={newCouponMinOrder}
                  onChange={(e) =>
                    setNewCouponMinOrder(Number(e.target.value))
                  }
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#2C1810] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3E2319] shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#E5B869]" />
                Add Promo Code
              </button>
            </div>
          </form>

          <div className="md:col-span-7 space-y-3">
            <h3 className="text-base font-serif font-bold text-[#2C1810]">
              Active Offers & Coupons
            </h3>

            <div className="space-y-2.5">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-black text-sm bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        {coupon.code}
                      </span>

                      <span className="text-xs font-bold text-emerald-700">
                        {coupon.discountValue}% OFF
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 mt-1">
                      {coupon.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleCouponActive(coupon.code)
                    }
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold ${
                      coupon.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-400'
                    }`}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-stone-200 relative my-6">
            <button
              type="button"
              onClick={() => {
                setIsAddProductModalOpen(false);
                setEditingProduct(null);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
              aria-label="Close product modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-[#2C1810] pr-8">
              {editingProduct
                ? 'Edit Product'
                : 'Add New Menu Item'}
            </h3>

            <form
              onSubmit={handleSaveProduct}
              className="space-y-3.5 mt-4 text-xs"
            >
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Nutella Waffle Dream"
                  value={newProdName}
                  onChange={(e) =>
                    setNewProdName(e.target.value)
                  }
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1.5">
                    Category
                  </label>

                  <select
                    value={newProdCategory}
                    onChange={(e) =>
                      setNewProdCategory(
                        e.target.value as CategoryId
                      )
                    }
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl bg-white outline-none focus:border-[#8C5D36]"
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
                  <label className="block font-bold text-stone-700 mb-1.5">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) =>
                      setNewProdPrice(Number(e.target.value))
                    }
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Short Description
                </label>

                <textarea
                  rows={3}
                  placeholder="Appetizing description of ingredients and preparation..."
                  value={newProdDescription}
                  onChange={(e) =>
                    setNewProdDescription(e.target.value)
                  }
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36] resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Food Image URL
                </label>

                <input
                  type="url"
                  placeholder="https://..."
                  value={newProdImage}
                  onChange={(e) =>
                    setNewProdImage(e.target.value)
                  }
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl outline-none focus:border-[#8C5D36]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={newProdIsVeg}
                    onChange={(e) =>
                      setNewProdIsVeg(e.target.checked)
                    }
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>100% Pure Veg</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={newProdIsBestSeller}
                    onChange={(e) =>
                      setNewProdIsBestSeller(e.target.checked)
                    }
                    className="w-4 h-4 rounded text-amber-600"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2C1810] text-[#FAF6F0] hover:bg-[#3E2319] font-bold"
                >
                  {editingProduct
                    ? 'Save Changes'
                    : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};