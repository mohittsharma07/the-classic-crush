import React, { useEffect, useState } from 'react';
import {
  X,
  Star,
  Heart,
  Plus,
  Minus,
  Flame,
  Sparkles,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { Product, SelectedCustomization } from '../types';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductForModal,
    setActiveProductForModal,
    addToCart,
    favorites,
    toggleFavorite,
    setIsCheckoutOpen,
  } = useStore();

  const product = activeProductForModal;

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] =
    useState<SelectedCustomization[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    if (!product) return;

    setQuantity(1);
    setSpecialInstructions('');

    const initialSelections: SelectedCustomization[] = [];

    product.customizationGroups?.forEach((group) => {
      if (group.type === 'radio' && group.options.length > 0) {
        const defaultOption = group.options[0];

        initialSelections.push({
          groupId: group.id,
          groupName: group.name,
          optionId: defaultOption.id,
          optionName: defaultOption.name,
          price: defaultOption.price,
        });
      }
    });

    setSelectedCustomizations(initialSelections);
  }, [product]);

  if (!product) return null;

  const isFav = favorites.includes(product.id);

  const handleRadioSelect = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    price: number
  ) => {
    setSelectedCustomizations((prev) => [
      ...prev.filter((item) => item.groupId !== groupId),
      { groupId, groupName, optionId, optionName, price },
    ]);
  };

  const handleCheckboxToggle = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    price: number
  ) => {
    setSelectedCustomizations((prev) => {
      const exists = prev.some(
        (item) => item.groupId === groupId && item.optionId === optionId
      );

      if (exists) {
        return prev.filter(
          (item) =>
            !(item.groupId === groupId && item.optionId === optionId)
        );
      }

      return [
        ...prev,
        { groupId, groupName, optionId, optionName, price },
      ];
    });
  };

  const extraTotal = selectedCustomizations.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const unitPrice = product.price + extraTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedCustomizations,
      specialInstructions.trim()
    );
    setActiveProductForModal(null);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      quantity,
      selectedCustomizations,
      specialInstructions.trim()
    );
    setActiveProductForModal(null);
    setIsCheckoutOpen(true);
  };

  const closeModal = () => setActiveProductForModal(null);

  const inputClass =
    'h-11 w-full rounded-xl border border-[#D8CCB7] bg-[#FFFCF6] px-3.5 text-xs text-[#292D1D] outline-none placeholder:text-[#817969] transition focus:border-[#B9A064] focus:ring-2 focus:ring-[#B9A064]/20';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[#202318]/80 p-2 backdrop-blur-sm sm:p-5"
      onClick={closeModal}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} product details`}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[26px] border border-[#B9A064]/50 bg-[#FFFCF6] shadow-[0_25px_80px_rgba(32,35,24,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CCB7] bg-[#FFFCF6]/95 text-[#292D1D] shadow-sm transition hover:border-[#B9A064] hover:bg-[#EAE0CE] sm:right-4 sm:top-4"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-12">
          {/* Product image */}
          <div className="relative min-h-[260px] overflow-hidden bg-[#EAE0CE] md:col-span-5 md:min-h-[620px]">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#202318]/85 via-[#202318]/10 to-transparent" />

            <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8CCB7] bg-[#FFFCF6] shadow-sm">
                {product.isVeg ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-emerald-700 bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                  </span>
                ) : (
                  <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-red-800 bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-800" />
                  </span>
                )}
              </span>

              {product.isBestSeller && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#D4BD85]/60 bg-[#292D1D]/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#D4BD85] shadow-md">
                  <Flame className="h-3.5 w-3.5" />
                  Best Seller
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
                The Classic Crush
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold text-[#FFFCF6] sm:text-3xl">
                Made for your moments
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#FFFCF6]/90">
                <Star className="h-4 w-4 fill-[#D4BD85] text-[#D4BD85]" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[#FFFCF6]/70">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CCB7]/70 shadow-md transition active:scale-95 ${
                isFav
                  ? 'bg-[#FFFCF6] text-red-700'
                  : 'bg-[#FFFCF6]/95 text-[#292D1D] hover:text-red-700'
              }`}
              aria-label={
                isFav
                  ? `Remove ${product.name} from favorites`
                  : `Add ${product.name} to favorites`
              }
            >
              <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Product details */}
          <div className="flex max-h-[85vh] flex-col overflow-y-auto md:col-span-7">
            <div className="p-5 sm:p-7">
              <div className="pr-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C7446]">
                  {product.subCategory || 'Handcrafted Fresh'}
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-[#292D1D] sm:text-3xl">
                  {product.name}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#292D1D]">
                    ₹{unitPrice}
                  </span>

                  {extraTotal > 0 && (
                    <span className="text-[11px] text-[#615B4D]">
                      Base ₹{product.price} + ₹{extraTotal} extras
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#615B4D]">
                {product.description}
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#D8CCB7] bg-[#F4EBDD] p-3.5">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#8C7446]" />
                <div>
                  <p className="text-xs font-bold text-[#292D1D]">
                    A little something special
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#615B4D]">
                    Carefully prepared with attention to taste and detail.
                  </p>
                </div>
              </div>

              {/* Customization groups */}
              {product.customizationGroups &&
                product.customizationGroups.length > 0 && (
                  <div className="mt-6 space-y-5">
                    {product.customizationGroups.map((group) => (
                      <section
                        key={group.id}
                        className="border-t border-[#D8CCB7] pt-5"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#292D1D]">
                            {group.name}
                          </h3>
                          <span className="rounded-full border border-[#D8CCB7] bg-[#F4EBDD] px-2.5 py-1 text-[9px] font-semibold text-[#615B4D]">
                            {group.type === 'radio' ? 'Select one' : 'Optional'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {group.options.map((option) => {
                            const isSelected = selectedCustomizations.some(
                              (item) =>
                                item.groupId === group.id &&
                                item.optionId === option.id
                            );

                            return (
                              <button
                                type="button"
                                key={option.id}
                                aria-pressed={isSelected}
                                onClick={() => {
                                  if (group.type === 'radio') {
                                    handleRadioSelect(
                                      group.id,
                                      group.name,
                                      option.id,
                                      option.name,
                                      option.price
                                    );
                                  } else {
                                    handleCheckboxToggle(
                                      group.id,
                                      group.name,
                                      option.id,
                                      option.name,
                                      option.price
                                    );
                                  }
                                }}
                                className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors ${
                                  isSelected
                                    ? 'border-[#B9A064] bg-[#F4EBDD]'
                                    : 'border-[#D8CCB7] bg-[#FFFCF6] hover:border-[#B9A064]'
                                }`}
                              >
                                <span className="flex min-w-0 items-center gap-3">
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                                      group.type === 'radio'
                                        ? 'rounded-full'
                                        : 'rounded-[5px]'
                                    } ${
                                      isSelected
                                        ? 'border-[#292D1D] bg-[#292D1D]'
                                        : 'border-[#B9AD98] bg-white'
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3 text-[#D4BD85]" />
                                    )}
                                  </span>

                                  <span
                                    className={`text-xs ${
                                      isSelected
                                        ? 'font-semibold text-[#292D1D]'
                                        : 'text-[#615B4D]'
                                    }`}
                                  >
                                    {option.name}
                                  </span>
                                </span>

                                <span className="shrink-0 text-[11px] font-semibold text-[#615B4D]">
                                  {option.price > 0
                                    ? `+₹${option.price}`
                                    : 'Included'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                )}

              {/* Special instructions */}
              <div className="mt-6 border-t border-[#D8CCB7] pt-5">
                <label
                  htmlFor="product-special-instructions"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#292D1D]"
                >
                  Special Instructions
                  <span className="ml-1 font-normal normal-case tracking-normal text-[#817969]">
                    (Optional)
                  </span>
                </label>

                <input
                  id="product-special-instructions"
                  type="text"
                  maxLength={200}
                  placeholder="Any preferences for your order?"
                  value={specialInstructions}
                  onChange={(event) =>
                    setSpecialInstructions(event.target.value)
                  }
                  className={inputClass}
                />
                <p className="mt-1.5 text-[10px] text-[#817969]">
                  Up to 200 characters.
                </p>
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="sticky bottom-0 mt-auto border-t border-[#D8CCB7] bg-[#FFFCF6]/95 p-4 backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[#615B4D]">
                  Quantity
                </span>

                <div className="flex items-center gap-1 rounded-full border border-[#D8CCB7] bg-[#FFFCF6] p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#292D1D] transition-colors hover:bg-[#EAE0CE] disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span
                    className="w-8 text-center text-sm font-bold text-[#292D1D]"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.min(99, current + 1))
                    }
                    disabled={quantity >= 99}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#292D1D] transition-colors hover:bg-[#EAE0CE] disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#292D1D] bg-[#FFFCF6] px-3 text-[10px] font-bold uppercase tracking-wide text-[#292D1D] transition-colors hover:bg-[#F4EBDD] sm:text-xs"
                >
                  <ShoppingBag className="h-4 w-4 text-[#8C7446]" />
                  Add · ₹{totalPrice}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#B9A064] bg-[#292D1D] px-3 text-[10px] font-bold uppercase tracking-wide text-[#FFFCF6] transition-colors hover:bg-[#244536] sm:text-xs"
                >
                  Order Now · ₹{totalPrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};