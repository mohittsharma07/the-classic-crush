export type CategoryId =
  | 'signature-desserts'
  | 'quick-bites'
  | 'sandwiches-maggie'
  | 'beverages-small-eats'
  | 'burgers'
  | 'french-fries'
  | 'momos'
  | 'all';

export interface ProductCustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface ProductCustomizationGroup {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required?: boolean;
  options: ProductCustomizationOption[];
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  subCategory?: string;
  price: number;
  description: string;
  isVeg: boolean;
  isBestSeller?: boolean;
  isAvailable: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
  customizationGroups?: ProductCustomizationGroup[];
}

export interface SelectedCustomization {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + hash of customizations)
  productId: string;
  product: Product;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  specialInstructions?: string;
  unitPrice: number; // base price + customization prices
  totalPrice: number;
}

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  email?: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  deliveryInstructions?: string;
  distanceKm: number;
  latitude?: number;
  longitude?: number;
}

export type OrderType = 'delivery' | 'pickup';

export type PaymentMethod =
  | 'upi'
  | 'card'
  | 'netbanking'
  | 'cash_on_delivery'
  | 'pay_at_cafe';

export type PaymentStatus =
  | 'Pending'
  | 'Paid'
  | 'Failed'
  | 'Refunded'
  | 'Cash on Delivery';

export type OrderStatus =
  | 'Order Received'
  | 'Confirmed'
  | 'Being Prepared'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string; // CC-2026-XXXX
  createdAt: string;
  items: CartItem[];
  orderType: OrderType;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: DeliveryAddress;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  taxes: number; // 5% GST
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  estimatedDeliveryTime: string; // e.g. "30-40 mins"
  timeline: OrderTimelineEvent[];
  assignedDeliveryPartner?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

export interface DeliveryZoneRule {
  minKm: number;
  maxKm: number;
  fee: number;
}

export interface DeliverySettings {
  maxDeliveryRadiusKm: number;
  minimumOrderValue: number;
  freeDeliveryThreshold: number;
  estimatedPrepTimeMinutes: number;
  baseDeliveryFee: number;
  zoneRules: DeliveryZoneRule[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
