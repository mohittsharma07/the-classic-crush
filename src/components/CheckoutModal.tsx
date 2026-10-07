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

  const [isProcessingPayment, setIsProcessingPayment] =
    useState(false);

  const [upiIdInput, setUpiIdInput] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [locatingState, setLocatingState] = useState(false);

  if (!isCheckoutOpen) return null;

  const isStep1Valid =
    deliveryAddress.fullName.trim().length >= 2 &&
    deliveryAddress.phoneNumber.trim().length >= 10;

  const isStep2Valid =
    orderType === 'pickup' ||
    (deliveryAddress.houseFlat.trim().length > 0 &&
      deliveryAddress.street.trim().length > 0 &&
      deliveryAddress.area.trim().length > 0 &&
      !isOutOfDeliveryRadius);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        'Geolocation Unsupported',
        'Your browser does not support GPS location.',
        'error'
      );
      return;
    }

    setLocatingState(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocatingState(false);

        const simulatedDistance = Number(
          (1.2 + Math.random() * 2.5).toFixed(1)
        );

        setDeliveryAddress((previous) => ({
          ...previous,
          distanceKm: simulatedDistance,
          area: 'Campus Central Enclave (GPS Detected)',
          landmark: 'Identified via GPS',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        showToast(
          'Location Detected',
          `GPS location captured: approx ${simulatedDistance} km from The Classic Crush bakery.`,
          'success'
        );
      },
      () => {
        setLocatingState(false);

        const simulatedDistance = 2.1;

        setDeliveryAddress((previous) => ({
          ...previous,
          distanceKm: simulatedDistance,
        }));

        showToast(
          'GPS Permission Prompted',
          'Using approximate campus distance (2.1 km).',
          'info'
        );
      },
      { timeout: 7000 }
    );
  };

  const handleCompleteOrder = async () => {
    setIsProcessingPayment(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      const status: PaymentStatus =
        paymentMethod === 'cash_on_delivery' ||
        paymentMethod === 'pay_at_cafe'
          ? 'Cash on Delivery'
          : 'Paid';

      await placeOrder(paymentMethod, status);
    } catch {
      showToast(
        'Payment Issue',
        'Could not complete order. Please try again.',
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

  const inputClass =
    'h-11 w-full rounded-xl border border-[#DED4CA] bg-white px-3 text-xs text-[#2C1810] outline-none transition-colors placeholder:text-[#A0948A] focus:border-[#B98A5B] focus:ring-4 focus:ring-[#B98A5B]/10';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#160B07]/75 p-2 backdrop-blur-md sm:p-5">
      <div className="relative my-auto flex max-h-[96vh] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] border border-[#E2D6CA] bg-[#FBF8F3] shadow-[0_30px_100px_rgba(28,16,11,0.32)]">

        {/* Header */}
        <div className="shrink-0 bg-[#2C1810] px-4 py-4 text-white sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#43271C] text-[#D9A441]">
                <Store className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">
                  The Classic Crush
                </p>

                <h2 className="mt-0.5 truncate font-serif text-xl font-bold sm:text-2xl">
                  Complete Your Order
                </h2>

                <p className="mt-0.5 truncate text-[10px] text-white/50 sm:text-xs">
                  Bakery & Café · Freshly prepared with care
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close checkout"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="shrink-0 border-b border-[#E7DED4] bg-white px-4 py-3.5 sm:px-7">
          <div className="mx-auto flex max-w-2xl items-center">
            {steps.map((step, index) => {
              const isActive = currentStep === step.number;
              const isComplete = currentStep > step.number;

              const canOpen =
                step.number === 1 ||
                (step.number === 2 && isStep1Valid) ||
                (step.number === 3 &&
                  isStep1Valid &&
                  isStep2Valid);

              return (
                <React.Fragment key={step.number}>
                  <button
                    type="button"
                    disabled={!canOpen}
                    onClick={() => {
                      if (canOpen) {
                        setCurrentStep(
                          step.number as 1 | 2 | 3
                        );
                      }
                    }}
                    className={`flex shrink-0 items-center gap-2 ${
                      canOpen
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed opacity-35'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                        isActive || isComplete
                          ? 'bg-[#2C1810] text-[#E5B869] shadow-sm'
                          : 'bg-[#EEE8E1] text-[#8B7D73]'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        step.number
                      )}
                    </span>

                    <span
                      className={`hidden text-[10px] font-bold sm:block ${
                        isActive
                          ? 'text-[#2C1810]'
                          : 'text-[#8A7C72]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-px flex-1 sm:mx-4 ${
                        currentStep > step.number
                          ? 'bg-[#B98A5B]'
                          : 'bg-[#E2D9D1]'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-7 sm:py-7">

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="mx-auto max-w-2xl">
              <div className="mb-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
                  Step 01 · Your details
                </p>

                <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#2C1810] sm:text-3xl">
                    Contact Information
                  </h3>

                  <span className="text-[10px] text-[#8A7C72]">
                    Used for order updates
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#51443C]">
                    Full Name <span className="text-[#B64532]">*</span>
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B8D83]" />

                    <input
                      type="text"
                      placeholder="Your full name"
                      value={deliveryAddress.fullName}
                      onChange={(event) =>
                        updateAddressField(
                          'fullName',
                          event.target.value
                        )
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#51443C]">
                    Mobile Number{' '}
                    <span className="text-[#B64532]">*</span>
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B8D83]" />

                    <input
                      type="tel"
                      placeholder="10 digit mobile number"
                      value={deliveryAddress.phoneNumber}
                      onChange={(event) =>
                        updateAddressField(
                          'phoneNumber',
                          event.target.value
                        )
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-[#51443C]">
                    Email Address{' '}
                    <span className="font-normal text-[#9A8C82]">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B8D83]" />

                    <input
                      type="email"
                      placeholder="For digital bill & receipt"
                      value={deliveryAddress.email || ''}
                      onChange={(event) =>
                        updateAddressField(
                          'email',
                          event.target.value
                        )
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#E5D9CE] bg-[#F7F0E8] p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8C5D36]" />

                  <p className="text-[10px] leading-5 text-[#74665D]">
                    Your contact details are used only to process this
                    order and keep you updated about its status.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!isStep1Valid}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#2C1810] px-7 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_22px_rgba(44,24,16,0.14)] transition-colors hover:bg-[#43271C] disabled:cursor-not-allowed disabled:bg-[#D5CEC7] disabled:shadow-none"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 text-[#D9A441]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="mx-auto max-w-2xl">
              <div className="mb-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
                  Step 02 · Receiving your order
                </p>

                <h3 className="mt-1 font-serif text-2xl font-bold text-[#2C1810] sm:text-3xl">
                  Delivery or Pickup?
                </h3>

                <p className="mt-1 text-xs text-[#81746B]">
                  Choose the most convenient way to receive your food.
                </p>
              </div>

              {/* Order Type */}
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`rounded-2xl border p-4 text-left ${
                    orderType === 'delivery'
                      ? 'border-[#2C1810] bg-[#F7EEE5] shadow-[0_8px_24px_rgba(44,24,16,0.08)]'
                      : 'border-[#E1D8D0] bg-white hover:border-[#CDB8A5] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        orderType === 'delivery'
                          ? 'bg-[#2C1810] text-[#D9A441]'
                          : 'bg-[#F2EBE4] text-[#8C5D36]'
                      }`}
                    >
                      <Truck className="h-5 w-5" />
                    </span>

                    {orderType === 'delivery' && (
                      <CheckCircle2 className="h-4 w-4 text-[#8C5D36]" />
                    )}
                  </div>

                  <h4 className="mt-4 text-sm font-bold text-[#2C1810]">
                    Home Delivery
                  </h4>

                  <p className="mt-1 text-[10px] leading-4 text-[#81746B]">
                    Delivered fresh to your doorstep.
                  </p>

                  <p className="mt-2 text-[10px] font-semibold text-[#8C5D36]">
                    Approx. 25–35 mins
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`rounded-2xl border p-4 text-left ${
                    orderType === 'pickup'
                      ? 'border-[#2C1810] bg-[#F7EEE5] shadow-[0_8px_24px_rgba(44,24,16,0.08)]'
                      : 'border-[#E1D8D0] bg-white hover:border-[#CDB8A5] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        orderType === 'pickup'
                          ? 'bg-[#2C1810] text-[#D9A441]'
                          : 'bg-[#F2EBE4] text-[#8C5D36]'
                      }`}
                    >
                      <Store className="h-5 w-5" />
                    </span>

                    {orderType === 'pickup' && (
                      <CheckCircle2 className="h-4 w-4 text-[#8C5D36]" />
                    )}
                  </div>

                  <h4 className="mt-4 text-sm font-bold text-[#2C1810]">
                    Pickup From Café
                  </h4>

                  <p className="mt-1 text-[10px] leading-4 text-[#81746B]">
                    Collect directly from our café counter.
                  </p>

                  <p className="mt-2 text-[10px] font-semibold text-emerald-700">
                    15–20 mins · ₹0 fee
                  </p>
                </button>
              </div>

              {/* Pickup */}
              {orderType === 'pickup' && (
                <div className="mt-4 rounded-2xl border border-[#E6D4AF] bg-[#FFF8EA] p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5E6C7] text-[#8C5D36]">
                      <Store className="h-4 w-4" />
                    </span>

                    <div>
                      <p className="text-xs font-bold text-[#5D4327]">
                        Café Pickup Counter
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-[#78654F]">
                        The Classic Crush Café, School of Hotel
                        Management Complex, North Wing, Main Campus.
                      </p>

                      <p className="mt-1 text-[10px] text-[#9A856C]">
                        Show your order number at the express pickup
                        window.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery */}
              {orderType === 'delivery' && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-col gap-3 rounded-2xl border border-[#E2D9D1] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E8DC] text-[#8C5D36]">
                        <Navigation className="h-4 w-4" />
                      </span>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9A6B45]">
                          Delivery distance
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-[#3F332C]">
                          {deliveryAddress.distanceKm} km from café
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={locatingState}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#D9CFC6] bg-[#FBF8F3] px-3 text-[10px] font-bold text-[#4F4037] transition-colors hover:border-[#B98A5B] hover:bg-white disabled:opacity-60"
                    >
                      {locatingState ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5 text-[#B64532]" />
                      )}

                      {locatingState
                        ? 'Detecting...'
                        : 'Use Current Location'}
                    </button>
                  </div>

                  {isOutOfDeliveryRadius && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />

                        <div>
                          <p className="text-xs font-bold text-rose-900">
                            Delivery isn't available here
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-rose-800/75">
                            Our delivery radius is currently capped at{' '}
                            {deliverySettings.maxDeliveryRadiusKm} km
                            to maintain food quality.
                          </p>

                          <button
                            type="button"
                            onClick={() => setOrderType('pickup')}
                            className="mt-3 rounded-full bg-[#2C1810] px-4 py-2 text-[10px] font-bold text-white transition-colors hover:bg-[#43271C]"
                          >
                            Switch to Café Pickup
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-[#E3D9D0] bg-white p-4">
                    <div className="mb-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6B45]">
                        Delivery address
                      </p>

                      <p className="mt-1 text-xs text-[#81746B]">
                        Tell our rider exactly where to bring your order.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          House / Flat / Hostel Room *
                        </label>

                        <input
                          type="text"
                          placeholder="Flat 304, Block B"
                          value={deliveryAddress.houseFlat}
                          onChange={(event) =>
                            updateAddressField(
                              'houseFlat',
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          Street / Building Name *
                        </label>

                        <input
                          type="text"
                          placeholder="Palm Grove Residency"
                          value={deliveryAddress.street}
                          onChange={(event) =>
                            updateAddressField(
                              'street',
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          Area / Sector *
                        </label>

                        <input
                          type="text"
                          placeholder="University Campus Road"
                          value={deliveryAddress.area}
                          onChange={(event) =>
                            updateAddressField(
                              'area',
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          City & Pincode
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="City"
                            value={deliveryAddress.city}
                            onChange={(event) =>
                              updateAddressField(
                                'city',
                                event.target.value
                              )
                            }
                            className={inputClass}
                          />

                          <input
                            type="text"
                            placeholder="Pincode"
                            value={deliveryAddress.pincode}
                            onChange={(event) =>
                              updateAddressField(
                                'pincode',
                                event.target.value
                              )
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          Nearby Landmark{' '}
                          <span className="font-normal text-[#9A8C82]">
                            (Optional)
                          </span>
                        </label>

                        <input
                          type="text"
                          placeholder="Behind Auditorium / Near North Gate"
                          value={deliveryAddress.landmark || ''}
                          onChange={(event) =>
                            updateAddressField(
                              'landmark',
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          Rider Delivery Instructions
                        </label>

                        <input
                          type="text"
                          placeholder="Call upon arrival, leave at reception..."
                          value={
                            deliveryAddress.deliveryInstructions || ''
                          }
                          onChange={(event) =>
                            updateAddressField(
                              'deliveryInstructions',
                              event.target.value
                            )
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
                  className="inline-flex h-10 items-center gap-1 rounded-xl px-3 text-xs font-semibold text-[#6F625A] transition-colors hover:bg-[#F0E8DF] hover:text-[#2C1810]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#2C1810] px-7 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_22px_rgba(44,24,16,0.14)] transition-colors hover:bg-[#43271C] disabled:cursor-not-allowed disabled:bg-[#D5CEC7] disabled:shadow-none"
                >
                  Payment
                  <ArrowRight className="h-4 w-4 text-[#D9A441]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="mx-auto max-w-2xl">
              <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
                    Step 03 · Final confirmation
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#2C1810] sm:text-3xl">
                    Payment & Review
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Secure checkout
                </div>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  {
                    id: 'upi' as PaymentMethod,
                    icon: QrCode,
                    label: 'UPI',
                  },
                  {
                    id: 'card' as PaymentMethod,
                    icon: CreditCard,
                    label: 'Card',
                  },
                  {
                    id: 'netbanking' as PaymentMethod,
                    icon: Store,
                    label: 'Net Banking',
                  },
                  {
                    id:
                      orderType === 'pickup'
                        ? ('pay_at_cafe' as PaymentMethod)
                        : ('cash_on_delivery' as PaymentMethod),
                    icon: DollarSign,
                    label:
                      orderType === 'pickup'
                        ? 'Pay at Café'
                        : 'Cash on Delivery',
                  },
                ].map((method) => {
                  const Icon = method.icon;
                  const selected =
                    paymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(method.id)
                      }
                      className={`rounded-xl border p-3 ${
                        selected
                          ? 'border-[#2C1810] bg-[#2C1810] text-white shadow-md'
                          : 'border-[#E1D8D0] bg-white text-[#62554C] hover:border-[#CDB8A5]'
                      }`}
                    >
                      <Icon className="mx-auto h-5 w-5" />

                      <span className="mt-1.5 block text-[10px] font-bold">
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Details */}
              <div className="mt-5 rounded-2xl border border-[#E3D9D0] bg-white p-4 sm:p-5">
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E9E0D8] bg-[#FBF8F3] p-4 sm:flex-row">
                      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-[#2C1810] p-3 text-[#E5B869]">
                        <QrCode className="h-20 w-20" />
                      </div>

                      <div className="text-center sm:text-left">
                        <p className="text-xs font-bold text-[#2C1810]">
                          Scan with any UPI app
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-[#81746B]">
                          Google Pay, PhonePe, Paytm, CRED or BHIM UPI.
                        </p>

                        <span className="mt-2 inline-block rounded-lg bg-white px-2.5 py-1 font-mono text-[10px] font-semibold text-[#5F5148] shadow-sm">
                          classiccrush@upi
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                        Or enter UPI ID / VPA
                      </label>

                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upiIdInput}
                        onChange={(event) =>
                          setUpiIdInput(event.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 rounded-xl bg-[#F7F0E8] p-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8C5D36]" />

                      <p className="text-[10px] leading-4 text-[#75675E]">
                        Test-mode payment form. Sensitive card details
                        are not stored by this demo.
                      </p>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                        Cardholder Name
                      </label>

                      <input
                        type="text"
                        placeholder="Your name"
                        value={cardHolder}
                        onChange={(event) =>
                          setCardHolder(event.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                        Card Number
                      </label>

                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        value={cardNumber}
                        onChange={(event) =>
                          setCardNumber(event.target.value)
                        }
                        maxLength={19}
                        className={`${inputClass} font-mono`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          Expiry
                        </label>

                        <input
                          type="text"
                          placeholder="08/28"
                          value={cardExpiry}
                          onChange={(event) =>
                            setCardExpiry(event.target.value)
                          }
                          maxLength={5}
                          className={`${inputClass} font-mono`}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                          CVV
                        </label>

                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(event) =>
                            setCardCvv(event.target.value)
                          }
                          maxLength={3}
                          className={`${inputClass} font-mono`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#51443C]">
                      Select Your Bank
                    </label>

                    <select
                      value={selectedBank}
                      onChange={(event) =>
                        setSelectedBank(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">
                        State Bank of India (SBI)
                      </option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">
                        Kotak Mahindra Bank
                      </option>
                      <option value="Punjab National Bank">
                        Punjab National Bank
                      </option>
                    </select>
                  </div>
                )}

                {(paymentMethod === 'cash_on_delivery' ||
                  paymentMethod === 'pay_at_cafe') && (
                  <div className="rounded-2xl border border-[#E5D8C7] bg-[#F8F0E7] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#8C5D36]">
                        <DollarSign className="h-4 w-4" />
                      </span>

                      <div>
                        <p className="text-xs font-bold text-[#2C1810]">
                          {orderType === 'pickup'
                            ? 'Pay at Counter'
                            : 'Cash on Delivery'}
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-[#7A6A5F]">
                          {orderType === 'pickup'
                            ? `Pay ₹${grandTotal} at the café counter when collecting your order.`
                            : `Keep ₹${grandTotal} ready for the delivery rider.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="mt-5 rounded-2xl border border-[#E3D8CC] bg-[#F7F0E8] p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#B98A5B]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C5D36]">
                    Order Summary
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#70635B]">
                    <span>Items ({cart.length})</span>

                    <span className="font-semibold text-[#2C1810]">
                      ₹{subtotal}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between font-semibold text-emerald-700">
                      <span>
                        Discount
                        {appliedCoupon?.code
                          ? ` (${appliedCoupon.code})`
                          : ''}
                      </span>

                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#70635B]">
                    <span>
                      {orderType === 'pickup'
                        ? 'Café Pickup'
                        : `Delivery · ${deliveryAddress.distanceKm} km`}
                    </span>

                    <span className="font-semibold text-[#2C1810]">
                      {deliveryFee === 0
                        ? 'FREE'
                        : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#70635B]">
                    <span>GST & Packaging</span>

                    <span className="font-semibold text-[#2C1810]">
                      ₹{taxes}
                    </span>
                  </div>

                  <div className="mt-2 flex items-end justify-between border-t border-[#E2D5C8] pt-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9A6B45]">
                        Total Payable
                      </p>

                      <p className="mt-0.5 font-serif text-xl font-bold text-[#2C1810]">
                        ₹{grandTotal}
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-[#78675B]">
                      {orderType === 'pickup'
                        ? 'Pickup'
                        : 'Delivery'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={isProcessingPayment}
                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl px-4 text-xs font-semibold text-[#6F625A] transition-colors hover:bg-[#F0E8DF] hover:text-[#2C1810] disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Address
                </button>

                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={isProcessingPayment}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2C1810] px-7 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(44,24,16,0.16)] transition-colors hover:bg-[#43271C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#D9A441]" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#D9A441]" />
                      Place Order · ₹{grandTotal}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
