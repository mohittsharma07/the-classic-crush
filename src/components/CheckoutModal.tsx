import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  User,
  Mail,
  Navigation,
  ShieldCheck,
  CreditCard,
  QrCode,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Store,
  Truck,
  Loader2,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, PaymentStatus } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    deliveryFee,
    taxes,
    grandTotal,
    deliveryAddress,
    setDeliveryAddress,
    updateAddressField,
    orderType,
    setOrderType,
    deliverySettings,
    isOutOfDeliveryRadius,
    placeOrder,
    appliedCoupon,
    showToast,
  } = useStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [locatingState, setLocatingState] = useState(false);

  if (!isCheckoutOpen) return null;

  const isStep1Valid =
    deliveryAddress.fullName.trim().length >= 2 &&
    deliveryAddress.phoneNumber.replace(/\D/g, '').length === 10;

  const isStep2Valid =
    orderType === 'pickup' ||
    (
      deliveryAddress.houseFlat.trim().length > 0 &&
      deliveryAddress.street.trim().length > 0 &&
      deliveryAddress.area.trim().length > 0 &&
      !isOutOfDeliveryRadius
    );

  const inputClass =
    'h-11 w-full rounded-xl border border-[#D8CCB7] bg-[#FFFCF6] px-3 text-sm text-[#292D1D] outline-none transition-colors placeholder:text-[#817969] focus:border-[#B9A064] focus:ring-2 focus:ring-[#B9A064]/20';

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        'Location Unavailable',
        'Your browser does not support location detection.',
        'error'
      );
      return;
    }

    setLocatingState(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocatingState(false);

        setDeliveryAddress((previous) => ({
          ...previous,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        showToast(
          'Location Captured',
          'GPS coordinates captured. Please confirm your delivery address and service availability.',
          'success'
        );
      },
      () => {
        setLocatingState(false);

        showToast(
          'Location Not Available',
          'Allow location access or enter your delivery address manually.',
          'error'
        );
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const handleCompleteOrder = async () => {
    if (!cart.length) {
      showToast('Cart Empty', 'Add items before placing your order.', 'error');
      return;
    }

    if (!isStep1Valid || !isStep2Valid) {
      showToast(
        'Check Your Details',
        'Please complete the required contact and delivery details.',
        'error'
      );
      return;
    }

    setIsProcessingPayment(true);

    try {
      /*
       * Demo checkout:
       * Connect a verified payment gateway before accepting real online
       * payments. This flow does not independently verify a payment.
       */
      await new Promise((resolve) => setTimeout(resolve, 600));

      const status: PaymentStatus =
        paymentMethod === 'cash_on_delivery' ||
        paymentMethod === 'pay_at_cafe'
          ? 'Cash on Delivery'
          : 'Paid';

      await placeOrder(paymentMethod, status);
    } catch {
      showToast(
        'Order Issue',
        'Could not complete the order. Please try again.',
        'error'
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const steps = [
    { number: 1, label: 'Contact' },
    { number: 2, label: 'Delivery' },
    { number: 3, label: 'Payment' },
  ];

  const paymentOptions = [
    { id: 'upi' as PaymentMethod, label: 'UPI', icon: QrCode },
    { id: 'card' as PaymentMethod, label: 'Card', icon: CreditCard },
    { id: 'netbanking' as PaymentMethod, label: 'Net Banking', icon: Store },
    {
      id: (
        orderType === 'pickup'
          ? 'pay_at_cafe'
          : 'cash_on_delivery'
      ) as PaymentMethod,
      label: orderType === 'pickup' ? 'Pay at Café' : 'Cash on Delivery',
      icon: DollarSign,
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#11140D]/75 p-2 backdrop-blur-sm sm:p-5">
      <div className="relative my-auto flex max-h-[96vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#B9A064]/40 bg-[#F4EBDD] shadow-2xl">

        {/* Header */}
        <header className="shrink-0 bg-[#292D1D] px-4 py-4 text-[#FFFCF6] sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B9A064]/50 bg-[#202318] text-[#D4BD85]">
                <Store className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
                  The Classic Crush
                </p>
                <h2 className="font-serif text-xl font-bold sm:text-2xl">
                  Complete Your Order
                </h2>
                <p className="mt-0.5 text-[10px] text-[#E0D5BD] sm:text-xs">
                  Bakery & Café · Made with love
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#F4EBDD] hover:bg-white/10 hover:text-[#D4BD85]"
              aria-label="Close checkout"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Step progress */}
        <div className="shrink-0 border-b border-[#D8CCB7] bg-[#FFFCF6] px-4 py-3 sm:px-7">
          <div className="mx-auto flex max-w-2xl items-center">
            {steps.map((step, index) => {
              const isActive = currentStep === step.number;
              const isComplete = currentStep > step.number;

              const canOpen =
                step.number === 1 ||
                (step.number === 2 && isStep1Valid) ||
                (step.number === 3 && isStep1Valid && isStep2Valid);

              return (
                <React.Fragment key={step.number}>
                  <button
                    type="button"
                    disabled={!canOpen}
                    onClick={() => {
                      if (canOpen) {
                        setCurrentStep(step.number as 1 | 2 | 3);
                      }
                    }}
                    className={`flex shrink-0 items-center gap-2 ${
                      canOpen ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        isActive || isComplete
                          ? 'bg-[#292D1D] text-[#D4BD85]'
                          : 'bg-[#EAE0CE] text-[#615B4D]'
                      }`}
                    >
                      {isComplete ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                    </span>
                    <span
                      className={`hidden text-xs font-bold sm:block ${
                        isActive ? 'text-[#292D1D]' : 'text-[#817969]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-3 h-px flex-1 sm:mx-5 ${
                        currentStep > step.number
                          ? 'bg-[#B9A064]'
                          : 'bg-[#D8CCB7]'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-7">

          {/* STEP 1 — Contact details */}
          {currentStep === 1 && (
            <section className="mx-auto max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7446]">
                Step 01 · Your details
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#292D1D] sm:text-3xl">
                Contact Information
              </h3>
              <p className="mt-2 text-sm text-[#615B4D]">
                Enter your details so the café can identify your order.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkout-name" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C7446]" />
                    <input
                      id="checkout-name"
                      autoComplete="name"
                      type="text"
                      placeholder="Your full name"
                      value={deliveryAddress.fullName}
                      onChange={(event) => updateAddressField('fullName', event.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C7446]" />
                    <input
                      id="checkout-phone"
                      autoComplete="tel"
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      value={deliveryAddress.phoneNumber}
                      onChange={(event) =>
                        updateAddressField(
                          'phoneNumber',
                          event.target.value.replace(/[^\d+\s-]/g, '')
                        )
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="checkout-email" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                    Email Address <span className="font-normal text-[#817969]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C7446]" />
                    <input
                      id="checkout-email"
                      autoComplete="email"
                      type="email"
                      placeholder="For your digital receipt"
                      value={deliveryAddress.email || ''}
                      onChange={(event) => updateAddressField('email', event.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#D8CCB7] bg-[#EAE0CE]/60 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#244536]" />
                  <p className="text-xs leading-5 text-[#615B4D]">
                    Provide a reachable number for order updates. Only enter contact details you are comfortable sharing with the café.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!isStep1Valid}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#B9A064] bg-[#292D1D] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#FFFCF6] hover:bg-[#244536] disabled:cursor-not-allowed disabled:border-[#D8CCB7] disabled:bg-[#D8CCB7] disabled:text-[#817969]"
                >
                  Continue <ArrowRight className="h-4 w-4 text-[#D4BD85]" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 — Delivery or pickup */}
          {currentStep === 2 && (
            <section className="mx-auto max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7446]">
                Step 02 · Receiving your order
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#292D1D] sm:text-3xl">
                Delivery or Pickup?
              </h3>
              <p className="mt-2 text-sm text-[#615B4D]">
                Choose how you would like to receive your order.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    type: 'delivery' as const,
                    label: 'Home Delivery',
                    description: 'Have your order brought to your address.',
                    icon: Truck,
                  },
                  {
                    type: 'pickup' as const,
                    label: 'Pickup From Café',
                    description: 'Collect your order from the café.',
                    icon: Store,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  const selected = orderType === option.type;

                  return (
                    <button
                      type="button"
                      key={option.type}
                      onClick={() => setOrderType(option.type)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-[#B9A064] bg-[#EAE0CE]/70'
                          : 'border-[#D8CCB7] bg-[#FFFCF6] hover:border-[#B9A064]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                          selected ? 'bg-[#292D1D] text-[#D4BD85]' : 'bg-[#EAE0CE] text-[#244536]'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        {selected && <CheckCircle2 className="h-5 w-5 text-[#244536]" />}
                      </div>
                      <h4 className="mt-4 text-sm font-bold text-[#292D1D]">
                        {option.label}
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {orderType === 'pickup' && (
                <div className="mt-4 rounded-2xl border border-[#B9A064]/50 bg-[#FFFCF6] p-4">
                  <div className="flex items-start gap-3">
                    <Store className="mt-0.5 h-5 w-5 shrink-0 text-[#244536]" />
                    <div>
                      <p className="text-sm font-bold text-[#292D1D]">Café Pickup</p>
                      <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                        Check the café's confirmed address and collection instructions before travelling.
                      </p>
                      <p className="mt-2 text-[10px] text-[#817969]">
                        Pickup availability and preparation time should be confirmed by the café.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-col gap-3 rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAE0CE] text-[#244536]">
                        <Navigation className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#292D1D]">Delivery Location</p>
                        <p className="mt-1 text-[11px] text-[#615B4D]">
                          {deliveryAddress.latitude != null &&
                          deliveryAddress.longitude != null
                            ? 'GPS coordinates captured'
                            : 'Enter your address below'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={locatingState}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#D8CCB7] bg-[#F4EBDD] px-3 text-xs font-bold text-[#292D1D] hover:border-[#B9A064] disabled:opacity-60"
                    >
                      {locatingState ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4 text-[#244536]" />
                      )}
                      {locatingState ? 'Detecting...' : 'Use Current Location'}
                    </button>
                  </div>

                  {isOutOfDeliveryRadius && (
                    <div className="rounded-2xl border border-[#B9A064] bg-[#EAE0CE] p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#8C7446]" />
                        <div>
                          <p className="text-sm font-bold text-[#292D1D]">
                            Delivery isn't available at this distance
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                            The configured delivery radius is {deliverySettings.maxDeliveryRadiusKm} km. If the address is correct, choose pickup instead.
                          </p>
                          <button
                            type="button"
                            onClick={() => setOrderType('pickup')}
                            className="mt-3 rounded-full bg-[#292D1D] px-4 py-2 text-xs font-bold text-[#FFFCF6] hover:bg-[#244536]"
                          >
                            Switch to Pickup
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8C7446]">
                      Delivery Address
                    </p>
                    <p className="mt-1 text-xs text-[#615B4D]">
                      Fields marked * are required.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="checkout-house" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          House / Flat / Room *
                        </label>
                        <input
                          id="checkout-house"
                          autoComplete="address-line2"
                          type="text"
                          placeholder="House, flat or room"
                          value={deliveryAddress.houseFlat}
                          onChange={(event) => updateAddressField('houseFlat', event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-street" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          Street / Building *
                        </label>
                        <input
                          id="checkout-street"
                          autoComplete="address-line1"
                          type="text"
                          placeholder="Street or building name"
                          value={deliveryAddress.street}
                          onChange={(event) => updateAddressField('street', event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-area" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          Area / Locality *
                        </label>
                        <input
                          id="checkout-area"
                          autoComplete="address-level3"
                          type="text"
                          placeholder="Area or locality"
                          value={deliveryAddress.area}
                          onChange={(event) => updateAddressField('area', event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-city" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          City
                        </label>
                        <input
                          id="checkout-city"
                          autoComplete="address-level2"
                          type="text"
                          placeholder="City"
                          value={deliveryAddress.city}
                          onChange={(event) => updateAddressField('city', event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-pincode" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          Pincode
                        </label>
                        <input
                          id="checkout-pincode"
                          autoComplete="postal-code"
                          inputMode="numeric"
                          type="text"
                          placeholder="Pincode"
                          value={deliveryAddress.pincode}
                          onChange={(event) => updateAddressField('pincode', event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-landmark" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          Nearby Landmark
                        </label>
                        <input
                          id="checkout-landmark"
                          type="text"
                          placeholder="Nearby landmark (optional)"
                          value={deliveryAddress.landmark || ''}
                          onChange={(event) => updateAddressField('landmark', event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="checkout-instructions" className="mb-1.5 block text-xs font-semibold text-[#292D1D]">
                          Delivery Instructions
                        </label>
                        <input
                          id="checkout-instructions"
                          type="text"
                          placeholder="How can the rider find you?"
                          value={deliveryAddress.deliveryInstructions || ''}
                          onChange={(event) =>
                            updateAddressField('deliveryInstructions', event.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex min-h-10 items-center gap-1 rounded-xl px-3 text-xs font-semibold text-[#615B4D] hover:bg-[#EAE0CE]"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#B9A064] bg-[#292D1D] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#FFFCF6] hover:bg-[#244536] disabled:cursor-not-allowed disabled:border-[#D8CCB7] disabled:bg-[#D8CCB7] disabled:text-[#817969]"
                >
                  Continue to Payment <ArrowRight className="h-4 w-4 text-[#D4BD85]" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 — Payment */}
          {currentStep === 3 && (
            <section className="mx-auto max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7446]">
                Step 03 · Final step
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#292D1D] sm:text-3xl">
                Payment & Order Summary
              </h3>

              <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#B9A064]/50 bg-[#EAE0CE] p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#8C7446]" />
                <p className="text-xs leading-5 text-[#615B4D]">
                  Demo checkout: UPI, card and net-banking selections are not connected to a payment gateway. Do not enter real payment credentials. Connect a verified provider before accepting live online payments.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {paymentOptions.map((method) => {
                  const Icon = method.icon;
                  const selected = paymentMethod === method.id;

                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`rounded-xl border p-3 transition-colors ${
                        selected
                          ? 'border-[#B9A064] bg-[#292D1D] text-[#FFFCF6]'
                          : 'border-[#D8CCB7] bg-[#FFFCF6] text-[#615B4D] hover:border-[#B9A064]'
                      }`}
                    >
                      <Icon className="mx-auto h-5 w-5" />
                      <span className="mt-2 block text-[10px] font-bold">
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] p-4 sm:p-5">
                {paymentMethod === 'upi' && (
                  <div className="flex items-start gap-3">
                    <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-[#244536]" />
                    <div>
                      <p className="text-sm font-bold text-[#292D1D]">UPI Payment</p>
                      <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                        A real UPI payment requires the café's verified UPI ID and a valid payment integration. No scannable payment QR is configured here yet.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#244536]" />
                    <div>
                      <p className="text-sm font-bold text-[#292D1D]">Card Payment</p>
                      <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                        Card payments must be handled through a verified payment provider. Do not collect or store card numbers, expiry dates or CVV in this demo.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="flex items-start gap-3">
                    <Store className="mt-0.5 h-5 w-5 shrink-0 text-[#244536]" />
                    <div>
                      <p className="text-sm font-bold text-[#292D1D]">Net Banking</p>
                      <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                        The bank selection and payment redirect need to be configured through a verified payment gateway.
                      </p>
                    </div>
                  </div>
                )}

                {(paymentMethod === 'cash_on_delivery' ||
                  paymentMethod === 'pay_at_cafe') && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="mt-0.5 h-5 w-5 shrink-0 text-[#244536]" />
                    <div>
                      <p className="text-sm font-bold text-[#292D1D]">
                        {orderType === 'pickup' ? 'Pay at Café' : 'Cash on Delivery'}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                        {orderType === 'pickup'
                          ? `The displayed order total is ₹${grandTotal}. Confirm that the café accepts payment at collection.`
                          : `The displayed order total is ₹${grandTotal}. Confirm cash-on-delivery availability with the café.`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order summary */}
              <div className="mt-5 rounded-2xl border border-[#D8CCB7] bg-[#EAE0CE]/60 p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8C7446]" />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#292D1D]">
                    Your Order
                  </p>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-3 text-xs">
                      <span className="min-w-0 text-[#615B4D]">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="shrink-0 font-semibold text-[#292D1D]">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-[#D8CCB7] pt-3 text-xs">
                  <div className="flex justify-between gap-3 text-[#615B4D]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#292D1D]">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between gap-3 text-[#244536]">
                      <span>
                        Discount {appliedCoupon?.code ? `(${appliedCoupon.code})` : ''}
                      </span>
                      <span className="font-semibold">−₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between gap-3 text-[#615B4D]">
                    <span>{orderType === 'pickup' ? 'Pickup' : 'Delivery fee'}</span>
                    <span className="font-semibold text-[#292D1D]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-[#615B4D]">
                    <span>Taxes & packaging</span>
                    <span className="font-semibold text-[#292D1D]">₹{taxes}</span>
                  </div>

                  <div className="flex items-end justify-between gap-3 border-t border-[#D8CCB7] pt-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C7446]">
                        Total Payable
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold text-[#292D1D]">
                        ₹{grandTotal}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#D8CCB7] bg-[#FFFCF6] px-3 py-2 text-[10px] font-semibold text-[#292D1D]">
                      {orderType === 'pickup' ? 'Café Pickup' : 'Home Delivery'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={isProcessingPayment}
                  className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl px-4 text-xs font-semibold text-[#615B4D] hover:bg-[#EAE0CE] disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to Address
                </button>

                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={
                    isProcessingPayment ||
                    !isStep1Valid ||
                    !isStep2Valid ||
                    cart.length === 0
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#B9A064] bg-[#292D1D] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#FFFCF6] hover:bg-[#244536] disabled:cursor-not-allowed disabled:border-[#D8CCB7] disabled:bg-[#D8CCB7] disabled:text-[#817969]"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#D4BD85]" />
                      Place Order · ₹{grandTotal}
                    </>
                  )}
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
