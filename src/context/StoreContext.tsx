import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_COUPONS,
  INITIAL_DELIVERY_SETTINGS,
  INITIAL_PRODUCTS,
} from '../data/initialData';
import {
  CartItem,
  CategoryId,
  Coupon,
  DeliveryAddress,
  DeliverySettings,
  Order,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
  Product,
  SelectedCustomization,
  ToastMessage,
} from '../types';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedCustomizations?: SelectedCustomization[],
    specialInstructions?: string
  ) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;

  // Pricing
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  deliveryFee: number;
  isOutOfDeliveryRadius: boolean;
  taxes: number;
  grandTotal: number;

  // Checkout
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  deliveryAddress: DeliveryAddress;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
  updateAddressField: <K extends keyof DeliveryAddress>(
    field: K,
    value: DeliveryAddress[K]
  ) => void;

  // Orders
  orders: Order[];
  placeOrder: (
    paymentMethod: PaymentMethod,
    simulatedStatus?: PaymentStatus
  ) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    newStatus: OrderStatus,
    partnerDetails?: Order['assignedDeliveryPartner']
  ) => void;
  lastPlacedOrder: Order | null;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrderId: (orderId: string | null) => void;
  reorder: (order: Order) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;

  // Settings & Coupons
  deliverySettings: DeliverySettings;
  updateDeliverySettings: (settings: DeliverySettings) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  onlyVeg: boolean;
  setOnlyVeg: (val: boolean) => void;
  onlyBestSeller: boolean;
  setOnlyBestSeller: (val: boolean) => void;

  // Modals & Navigation
  activeProductForModal: Product | null;
  setActiveProductForModal: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (val: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (val: boolean) => void;
  isOrderConfirmationOpen: boolean;
  setIsOrderConfirmationOpen: (val: boolean) => void;

  currentView:
    | 'home'
    | 'menu'
    | 'track'
    | 'account'
    | 'admin'
    | 'about'
    | 'contact';

  setCurrentView: (
    view:
      | 'home'
      | 'menu'
      | 'track'
      | 'account'
      | 'admin'
      | 'about'
      | 'contact'
  ) => void;

  // Admin Auth
  isAdmin: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (
    title: string,
    description: string,
    type?: ToastMessage['type']
  ) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'classic_crush_products_v1',
  CART: 'classic_crush_cart_v1',
  ORDERS: 'classic_crush_orders_v1',
  DELIVERY_SETTINGS: 'classic_crush_delivery_settings_v1',
  COUPONS: 'classic_crush_coupons_v1',
  FAVORITES: 'classic_crush_favorites_v1',
  ADDRESS: 'classic_crush_saved_address_v1',
  ADMIN_AUTH: 'classic_crush_admin_auth_v1',
};

const DEFAULT_ADDRESS: DeliveryAddress = {
  fullName: 'Priya Sharma',
  phoneNumber: '9876543210',
  email: 'priya.sharma@example.com',
  houseFlat: 'Flat 402, Sunshine Heights',
  street: 'Café Avenue, Near City Mall',
  area: 'Hotel Management Campus Road',
  city: 'Campus City',
  pincode: '302015',
  landmark: 'Opposite Academic Block 3',
  deliveryInstructions:
    'Ring the doorbell twice. Please leave at door if busy.',
  distanceKm: 2.4,
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --------------------------------------------------
  // Products
  // --------------------------------------------------

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);

      if (!stored) {
        return INITIAL_PRODUCTS;
      }

      const storedProducts: Product[] = JSON.parse(stored);

      if (!Array.isArray(storedProducts)) {
        return INITIAL_PRODUCTS;
      }

      /*
       * IMPORTANT:
       * Old products may already exist in localStorage.
       * We keep those products and add any INITIAL_PRODUCTS
       * that are missing.
       */
      const storedIds = new Set(
        storedProducts.map((product) => product.id)
      );

      const missingInitialProducts = INITIAL_PRODUCTS.filter(
        (product) => !storedIds.has(product.id)
      );

      return [
        ...storedProducts,
        ...missingInitialProducts,
      ];
    } catch (error) {
      console.error('Failed to load products', error);
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.PRODUCTS,
        JSON.stringify(products)
      );
    } catch (error) {
      console.error('Failed to save products', error);
    }
  }, [products]);

  // --------------------------------------------------
  // Cart
  // --------------------------------------------------

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.CART,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error('Failed to save cart', error);
    }
  }, [cart]);

  // --------------------------------------------------
  // Delivery Settings
  // --------------------------------------------------

  const [deliverySettings, setDeliverySettings] =
    useState<DeliverySettings>(() => {
      try {
        const stored = localStorage.getItem(
          STORAGE_KEYS.DELIVERY_SETTINGS
        );

        return stored
          ? JSON.parse(stored)
          : INITIAL_DELIVERY_SETTINGS;
      } catch {
        return INITIAL_DELIVERY_SETTINGS;
      }
    });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.DELIVERY_SETTINGS,
        JSON.stringify(deliverySettings)
      );
    } catch (error) {
      console.error('Failed to save delivery settings', error);
    }
  }, [deliverySettings]);

  // --------------------------------------------------
  // Coupons
  // --------------------------------------------------

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COUPONS);

      return stored
        ? JSON.parse(stored)
        : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.COUPONS,
        JSON.stringify(coupons)
      );
    } catch (error) {
      console.error('Failed to save coupons', error);
    }
  }, [coupons]);

  // --------------------------------------------------
  // Orders
  // --------------------------------------------------

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);

      if (stored) {
        return JSON.parse(stored);
      }

      const sampleOrder: Order = {
        id: 'CC-2026-1024',
        createdAt: new Date(
          Date.now() - 35 * 60 * 1000
        ).toISOString(),

        items: [
          {
            id: 'sample-item-1',
            productId: 'sd-10',
            product:
              INITIAL_PRODUCTS.find(
                (p) => p.id === 'sd-10'
              ) || INITIAL_PRODUCTS[0],
            quantity: 1,
            selectedCustomizations: [],
            unitPrice: 69,
            totalPrice: 69,
          },
          {
            id: 'sample-item-2',
            product:
              INITIAL_PRODUCTS.find(
                (p) => p.id === 'qb-6'
              ) || INITIAL_PRODUCTS[1],
            productId: 'qb-6',
            quantity: 2,
            selectedCustomizations: [],
            unitPrice: 39,
            totalPrice: 78,
          },
          {
            id: 'sample-item-3',
            product:
              INITIAL_PRODUCTS.find(
                (p) => p.id === 'bv-3'
              ) || INITIAL_PRODUCTS[2],
            productId: 'bv-3',
            quantity: 1,
            selectedCustomizations: [],
            unitPrice: 49,
            totalPrice: 49,
          },
        ],

        orderType: 'delivery',
        customerName: 'Priya Sharma',
        customerPhone: '9876543210',
        customerEmail: 'priya.sharma@example.com',

        deliveryAddress: DEFAULT_ADDRESS,

        subtotal: 196,
        deliveryFee: 30,
        discount: 20,
        couponCode: 'CRUSH10',
        taxes: 10,
        grandTotal: 216,

        paymentMethod: 'upi',
        paymentStatus: 'Paid',

        status: 'Out for Delivery',
        estimatedDeliveryTime: '15-20 mins',

        assignedDeliveryPartner: {
          name: 'Rohan Verma',
          phone: '+91 99887 76655',
          vehicle: 'Hero Electric (DL-4S-8921)',
        },

        timeline: [
          {
            status: 'Order Received',
            timestamp: new Date(
              Date.now() - 35 * 60 * 1000
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            description:
              'Your order was received and queued at the kitchen.',
          },
          {
            status: 'Confirmed',
            timestamp: new Date(
              Date.now() - 30 * 60 * 1000
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            description:
              'Bakery kitchen accepted the order.',
          },
          {
            status: 'Being Prepared',
            timestamp: new Date(
              Date.now() - 20 * 60 * 1000
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            description:
              'Chef is baking fresh Korean bun and desserts.',
          },
          {
            status: 'Out for Delivery',
            timestamp: new Date(
              Date.now() - 5 * 60 * 1000
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            description:
              'Order dispatched with delivery partner Rohan.',
          },
        ],
      };

      return [sampleOrder];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.ORDERS,
        JSON.stringify(orders)
      );
    } catch (error) {
      console.error('Failed to save orders', error);
    }
  }, [orders]);

  // --------------------------------------------------
  // Favorites
  // --------------------------------------------------

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(
        STORAGE_KEYS.FAVORITES
      );

      return stored
        ? JSON.parse(stored)
        : ['sd-1', 'qb-6', 'bv-3'];
    } catch {
      return ['sd-1', 'qb-6'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error('Failed to save favorites', error);
    }
  }, [favorites]);

  // --------------------------------------------------
  // Address & Order Type
  // --------------------------------------------------

  const [orderType, setOrderType] =
    useState<OrderType>('delivery');

  const [deliveryAddress, setDeliveryAddress] =
    useState<DeliveryAddress>(() => {
      try {
        const stored = localStorage.getItem(
          STORAGE_KEYS.ADDRESS
        );

        return stored
          ? JSON.parse(stored)
          : DEFAULT_ADDRESS;
      } catch {
        return DEFAULT_ADDRESS;
      }
    });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.ADDRESS,
        JSON.stringify(deliveryAddress)
      );
    } catch (error) {
      console.error('Failed to save address', error);
    }
  }, [deliveryAddress]);

  const updateAddressField = <
    K extends keyof DeliveryAddress
  >(
    field: K,
    value: DeliveryAddress[K]
  ) => {
    setDeliveryAddress((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // --------------------------------------------------
  // Coupon State
  // --------------------------------------------------

  const [appliedCoupon, setAppliedCoupon] =
    useState<Coupon | null>(null);

  // --------------------------------------------------
  // Admin State
  // --------------------------------------------------

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return (
      localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) ===
      'true'
    );
  });

  // --------------------------------------------------
  // Filters & Navigation
  // --------------------------------------------------

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>('all');

  const [onlyVeg, setOnlyVeg] =
    useState(false);

  const [onlyBestSeller, setOnlyBestSeller] =
    useState(false);

  const [activeProductForModal, setActiveProductForModal] =
    useState<Product | null>(null);

  const [isCartDrawerOpen, setIsCartDrawerOpen] =
    useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);

  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] =
    useState(false);

  const [lastPlacedOrder, setLastPlacedOrder] =
    useState<Order | null>(null);

  const [
    activeTrackingOrderId,
    setActiveTrackingOrderIdState,
  ] = useState<string | null>(null);

  const [currentView, setCurrentView] = useState<
    | 'home'
    | 'menu'
    | 'track'
    | 'account'
    | 'admin'
    | 'about'
    | 'contact'
  >('home');

  // --------------------------------------------------
  // Toasts
  // --------------------------------------------------

  const [toasts, setToasts] =
    useState<ToastMessage[]>([]);

  const removeToast = (id: string) => {
    setToasts((previous) =>
      previous.filter(
        (toast) => toast.id !== id
      )
    );
  };

  const showToast = (
    title: string,
    description: string,
    type: ToastMessage['type'] = 'info'
  ) => {
    const id = Math.random()
      .toString(36)
      .substring(2, 9);

    setToasts((previous) => [
      ...previous,
      {
        id,
        title,
        description,
        type,
      },
    ]);

    window.setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  // --------------------------------------------------
  // Pricing
  // --------------------------------------------------

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.totalPrice,
    0
  );

  let discount = 0;

  if (
    appliedCoupon &&
    subtotal >= appliedCoupon.minOrderValue
  ) {
    if (
      appliedCoupon.discountType ===
      'percentage'
    ) {
      const calculated =
        (subtotal *
          appliedCoupon.discountValue) /
        100;

      discount = appliedCoupon.maxDiscount
        ? Math.min(
            calculated,
            appliedCoupon.maxDiscount
          )
        : calculated;
    } else {
      discount =
        appliedCoupon.discountValue;
    }
  }

  const isOutOfDeliveryRadius =
    orderType === 'delivery' &&
    deliveryAddress.distanceKm >
      deliverySettings.maxDeliveryRadiusKm;

  let deliveryFee = 0;

  if (orderType === 'delivery') {
    if (
      subtotal >=
        deliverySettings.freeDeliveryThreshold &&
      subtotal > 0
    ) {
      deliveryFee = 0;
    } else {
      const rule =
        deliverySettings.zoneRules.find(
          (zone) =>
            deliveryAddress.distanceKm >=
              zone.minKm &&
            deliveryAddress.distanceKm <
              zone.maxKm
        );

      deliveryFee = rule
        ? rule.fee
        : deliverySettings.baseDeliveryFee;
    }
  }

  const taxes =
    subtotal > 0
      ? Math.round(subtotal * 0.05)
      : 0;

  const grandTotal = Math.max(
    0,
    Math.round(
      subtotal -
        discount +
        deliveryFee +
        taxes
    )
  );

  // --------------------------------------------------
  // Cart Actions
  // --------------------------------------------------

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedCustomizations: SelectedCustomization[] = [],
    specialInstructions = ''
  ) => {
    const customKey =
      selectedCustomizations
        .map(
          (customization) =>
            `${customization.groupId}:${customization.optionId}`
        )
        .sort()
        .join('|');

    const cartItemId =
      `${product.id}_${customKey}_${specialInstructions.trim()}`;

    const extraPrice =
      selectedCustomizations.reduce(
        (sum, customization) =>
          sum + customization.price,
        0
      );

    const unitPrice =
      product.price + extraPrice;

    setCart((previous) => {
      const existingItem =
        previous.find(
          (item) =>
            item.id === cartItemId
        );

      if (existingItem) {
        return previous.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity:
                  item.quantity +
                  quantity,
                totalPrice:
                  (item.quantity +
                    quantity) *
                  unitPrice,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedCustomizations,
          specialInstructions,
          unitPrice,
          totalPrice:
            unitPrice * quantity,
        },
      ];
    });

    showToast(
      'Added to Cart',
      `${product.name} (x${quantity}) added to your cart.`,
      'success'
    );
  };

  const updateCartQuantity = (
    cartItemId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              quantity,
              totalPrice:
                quantity *
                item.unitPrice,
            }
          : item
      )
    );
  };

  const removeFromCart = (
    cartItemId: string
  ) => {
    setCart((previous) =>
      previous.filter(
        (item) =>
          item.id !== cartItemId
      )
    );

    showToast(
      'Item Removed',
      'The item was removed from your cart.',
      'info'
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (count, item) =>
      count + item.quantity,
    0
  );

  // --------------------------------------------------
  // Coupons
  // --------------------------------------------------

  const applyCoupon = (code: string) => {
    const normalizedCode =
      code.trim().toUpperCase();

    const foundCoupon =
      coupons.find(
        (coupon) =>
          coupon.code.toUpperCase() ===
            normalizedCode &&
          coupon.isActive
      );

    if (!foundCoupon) {
      return {
        success: false,
        message:
          'Invalid or expired coupon code.',
      };
    }

    if (
      subtotal <
      foundCoupon.minOrderValue
    ) {
      return {
        success: false,
        message: `Min order value of ₹${foundCoupon.minOrderValue} required for ${foundCoupon.code}. Add ₹${
          foundCoupon.minOrderValue -
          subtotal
        } more!`,
      };
    }

    setAppliedCoupon(foundCoupon);

    showToast(
      'Coupon Applied',
      `Promo code ${foundCoupon.code} applied successfully.`,
      'success'
    );

    return {
      success: true,
      message: `Coupon ${foundCoupon.code} applied successfully.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);

    showToast(
      'Coupon Removed',
      'The coupon was removed from your order.',
      'info'
    );
  };

  // --------------------------------------------------
  // Place Order
  // --------------------------------------------------

  const placeOrder = async (
    paymentMethod: PaymentMethod,
    simulatedStatus: PaymentStatus = 'Paid'
  ): Promise<Order> => {
    const orderNumber =
      Math.floor(
        1000 +
          Math.random() * 9000
      );

    const newOrderId =
      `CC-2026-${orderNumber}`;

    const newOrder: Order = {
      id: newOrderId,
      createdAt:
        new Date().toISOString(),

      items: [...cart],

      orderType,

      customerName:
        deliveryAddress.fullName,
      customerPhone:
        deliveryAddress.phoneNumber,
      customerEmail:
        deliveryAddress.email,

      deliveryAddress:
        orderType === 'delivery'
          ? {
              ...deliveryAddress,
            }
          : undefined,

      subtotal,
      deliveryFee,
      discount,
      couponCode:
        appliedCoupon?.code,
      taxes,
      grandTotal,

      paymentMethod,
      paymentStatus:
        simulatedStatus,

      status:
        'Order Received',

      estimatedDeliveryTime:
        orderType === 'pickup'
          ? `${deliverySettings.estimatedPrepTimeMinutes} mins`
          : `${
              deliverySettings.estimatedPrepTimeMinutes +
              15
            } mins`,

      assignedDeliveryPartner:
        orderType === 'delivery'
          ? {
              name: 'Arjun Sen',
              phone:
                '+91 98112 34567',
              vehicle:
                'Classic E-Bike (CC-04)',
            }
          : undefined,

      timeline: [
        {
          status:
            'Order Received',
          timestamp:
            new Date().toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',
              }
            ),
          description:
            'Your order was received and sent to the bakery kitchen.',
        },
      ],
    };

    setOrders((previous) => [
      newOrder,
      ...previous,
    ]);

    setLastPlacedOrder(newOrder);

    setActiveTrackingOrderIdState(
      newOrder.id
    );

    clearCart();

    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);

    showToast(
      'Order Placed',
      `Order ${newOrderId} has been placed successfully. Thank you for choosing The Classic Crush.`,
      'success'
    );

    return newOrder;
  };

  // --------------------------------------------------
  // Admin Order Status
  // --------------------------------------------------

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus,
    partnerDetails?: Order['assignedDeliveryPartner']
  ) => {
    setOrders((previous) =>
      previous.map((order) => {
        if (
          order.id !== orderId
        ) {
          return order;
        }

        const description =
          newStatus === 'Confirmed'
            ? 'Order confirmed by kitchen staff.'
            : newStatus ===
              'Being Prepared'
            ? 'Chefs are preparing your order fresh.'
            : newStatus ===
              'Ready for Pickup'
            ? 'Order is hot and packed, ready for pickup.'
            : newStatus ===
              'Out for Delivery'
            ? 'Order dispatched with delivery partner.'
            : newStatus ===
              'Delivered'
            ? 'Order delivered successfully. Enjoy your meal!'
            : 'Order cancelled.';

        return {
          ...order,
          status: newStatus,

          timeline: [
            ...order.timeline,
            {
              status: newStatus,
              timestamp:
                new Date().toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                ),
              description,
            },
          ],

          assignedDeliveryPartner:
            partnerDetails ||
            order.assignedDeliveryPartner,
        };
      })
    );

    showToast(
      'Order Updated',
      `Order ${orderId} status changed to ${newStatus}.`,
      'info'
    );
  };

  // --------------------------------------------------
  // Reorder
  // --------------------------------------------------

  const reorder = (
    order: Order
  ) => {
    order.items.forEach(
      (item) => {
        addToCart(
          item.product,
          item.quantity,
          item.selectedCustomizations,
          item.specialInstructions
        );
      }
    );

    setIsCartDrawerOpen(true);

    showToast(
      'Reordered',
      'Items from your previous order were added to the cart.',
      'success'
    );
  };

  // --------------------------------------------------
  // Tracking
  // --------------------------------------------------

  const activeTrackingOrder =
    orders.find(
      (order) =>
        order.id ===
        activeTrackingOrderId
    ) ||
    orders[0] ||
    null;

  const setActiveTrackingOrderId = (
    orderId: string | null
  ) => {
    setActiveTrackingOrderIdState(
      orderId
    );

    if (orderId) {
      setCurrentView('track');
    }
  };

  // --------------------------------------------------
  // Favorites
  // --------------------------------------------------

  const toggleFavorite = (
    productId: string
  ) => {
    setFavorites((previous) => {
      const exists =
        previous.includes(productId);

      const updated = exists
        ? previous.filter(
            (id) =>
              id !== productId
          )
        : [
            ...previous,
            productId,
          ];

      showToast(
        exists
          ? 'Removed from Favorites'
          : 'Added to Favorites',
        exists
          ? 'Product removed from your favorites.'
          : 'Product saved to your favorites.',
        'info'
      );

      return updated;
    });
  };

  // --------------------------------------------------
  // Product CRUD
  // --------------------------------------------------

  const addProduct = (
    newProduct: Omit<Product, 'id'>
  ) => {
    const id =
      `custom-${Date.now()}`;

    const product: Product = {
      ...newProduct,
      id,
    };

    setProducts((previous) => [
      product,
      ...previous,
    ]);

    showToast(
      'Product Added',
      `${product.name} was added to the menu.`,
      'success'
    );
  };

  const updateProduct = (
    id: string,
    updatedFields: Partial<Product>
  ) => {
    setProducts((previous) =>
      previous.map(
        (product) =>
          product.id === id
            ? {
                ...product,
                ...updatedFields,
              }
            : product
      )
    );

    showToast(
      'Product Updated',
      'Product details updated successfully.',
      'success'
    );
  };

  const deleteProduct = (
    id: string
  ) => {
    setProducts((previous) =>
      previous.filter(
        (product) =>
          product.id !== id
      )
    );

    showToast(
      'Product Deleted',
      'Item removed from the menu.',
      'info'
    );
  };

  // --------------------------------------------------
  // Delivery Settings
  // --------------------------------------------------

  const updateDeliverySettings = (
    settings: DeliverySettings
  ) => {
    setDeliverySettings(
      settings
    );

    showToast(
      'Delivery Settings Saved',
      'Delivery radius, fees and times were updated.',
      'success'
    );
  };

  // --------------------------------------------------
  // Coupons
  // --------------------------------------------------

  const addCoupon = (
    coupon: Coupon
  ) => {
    setCoupons((previous) => [
      coupon,
      ...previous,
    ]);

    showToast(
      'Coupon Created',
      `Promo ${coupon.code} was created.`,
      'success'
    );
  };

  const toggleCouponActive = (
    code: string
  ) => {
    setCoupons((previous) =>
      previous.map(
        (coupon) =>
          coupon.code === code
            ? {
                ...coupon,
                isActive:
                  !coupon.isActive,
              }
            : coupon
      )
    );
  };

  // --------------------------------------------------
  // Admin Authentication
  // --------------------------------------------------

  const loginAdmin = (
    password: string
  ) => {
    if (
      password ===
        'classic2026' ||
      password === 'admin' ||
      password === 'chef'
    ) {
      setIsAdmin(true);

      localStorage.setItem(
        STORAGE_KEYS.ADMIN_AUTH,
        'true'
      );

      showToast(
        'Admin Access Granted',
        'Welcome to The Classic Crush Management Console.',
        'success'
      );

      return true;
    }

    showToast(
      'Authentication Failed',
      'Invalid admin password.',
      'error'
    );

    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);

    localStorage.removeItem(
      STORAGE_KEYS.ADMIN_AUTH
    );

    showToast(
      'Logged Out',
      'Exited Admin Portal.',
      'info'
    );
  };

  // --------------------------------------------------
  // Provider
  // --------------------------------------------------

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,

        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        deliveryFee,
        isOutOfDeliveryRadius,
        taxes,
        grandTotal,

        orderType,
        setOrderType,
        deliveryAddress,
        setDeliveryAddress,
        updateAddressField,

        orders,
        placeOrder,
        updateOrderStatus,
        lastPlacedOrder,
        activeTrackingOrder,
        setActiveTrackingOrderId,
        reorder,

        favorites,
        toggleFavorite,

        deliverySettings,
        updateDeliverySettings,

        coupons,
        addCoupon,
        toggleCouponActive,

        searchQuery,
        setSearchQuery,

        selectedCategory,
        setSelectedCategory,

        onlyVeg,
        setOnlyVeg,

        onlyBestSeller,
        setOnlyBestSeller,

        activeProductForModal,
        setActiveProductForModal,

        isCartDrawerOpen,
        setIsCartDrawerOpen,

        isCheckoutOpen,
        setIsCheckoutOpen,

        isOrderConfirmationOpen,
        setIsOrderConfirmationOpen,

        currentView,
        setCurrentView,

        isAdmin,
        loginAdmin,
        logoutAdmin,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      'useStore must be used within a StoreProvider'
    );
  }

  return context;
};