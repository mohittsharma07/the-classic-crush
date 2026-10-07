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
    setSelectedCustomizations((prev) => {
      const filtered = prev.filter(
        (item) => item.groupId !== groupId
      );

      return [
        ...filtered,
        {
          groupId,
          groupName,
          optionId,
          optionName,
          price,
        },
      ];
    });
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
        (item) =>
          item.groupId === groupId &&
          item.optionId === optionId
      );

      if (exists) {
        return prev.filter(
          (item) =>
            !(
              item.groupId === groupId &&
              item.optionId === optionId
            )
        );
      }

      return [
        ...prev,
        {
          groupId,
          groupName,
          optionId,
          optionName,
          price,
        },
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
      specialInstructions
    );

    setActiveProductForModal(null);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      quantity,
      selectedCustomizations,
      specialInstructions
    );

    setActiveProductForModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[#1C100B]/70 p-3 backdrop-blur-sm sm:p-5"
      onClick={() => setActiveProductForModal(null)}
    >
      <div
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[26px] border border-[#E4D9CE] bg-[#FBF8F3] shadow-[0_25px_80px_rgba(28,16,11,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setActiveProductForModal(null)}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#5F5148] shadow-md backdrop-blur transition-all hover:bg-white hover:text-[#2C1810] hover:scale-105 sm:right-4 sm:top-4"
          aria-label="Close product details"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-12">
          {/* Product image */}
          <div className="relative min-h-[250px] overflow-hidden bg-[#EEE7E0] md:col-span-5 md:min-h-[620px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-transparent" />

            {/* Product labels */}
            <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/70 bg-white/90 shadow-sm backdrop-blur">
                {product.isVeg ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-emerald-600 bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  </span>
                ) : (
                  <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-[#8B3E2F] bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8B3E2F]" />
                  </span>
                )}
              </span>

              {product.isBestSeller && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-[#2C1810]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#F3D18A] shadow-md backdrop-blur">
                  <Flame className="h-3 w-3" />
                  Best Seller
                </span>
              )}
            </div>

            {/* Image bottom info */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E7C27B]">
                The Classic Crush
              </p>

              <p className="mt-1 font-serif text-xl font-semibold text-white sm:text-2xl">
                Freshly prepared
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                <Star className="h-3.5 w-3.5 fill-[#E6B85C] text-[#E6B85C]" />
                <span className="font-semibold">
                  {product.rating}
                </span>
                <span className="text-white/50">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Favourite */}
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 shadow-md backdrop-blur transition-all active:scale-90 ${
                isFav
                  ? 'bg-white text-[#B64532]'
                  : 'bg-white/90 text-[#6F625A] hover:text-[#B64532]'
              }`}
              aria-label={
                isFav
                  ? `Remove ${product.name} from favorites`
                  : `Add ${product.name} to favorites`
              }
            >
              <Heart
                className={`h-4 w-4 ${
                  isFav ? 'fill-[#B64532]' : ''
                }`}
              />
            </button>
          </div>

          {/* Details */}
          <div className="flex max-h-[82vh] flex-col overflow-y-auto md:col-span-7">
            <div className="p-5 sm:p-7">
              {/* Title */}
              <div className="pr-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A6B45] sm:text-[10px]">
                  {product.subCategory || 'Handcrafted Fresh'}
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight text-[#2C1810] sm:text-3xl">
                  {product.name}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-2xl font-bold text-[#2C1810]">
                    ₹{unitPrice}
                  </span>

                  {extraTotal > 0 && (
                    <span className="text-[10px] text-[#8A7C72]">
                      Base ₹{product.price} + ₹{extraTotal} extras
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs leading-5 text-[#71645B] sm:text-sm sm:leading-6">
                {product.description}
              </p>

              {/* Freshness message */}
              <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-[#E4D8CA] bg-[#F6EEE5] p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#B98A5B]" />

                <div>
                  <p className="text-xs font-semibold text-[#4D382C]">
                    Prepared fresh to order
                  </p>
                  <p className="mt-0.5 text-[10px] leading-4 text-[#7C6C61]">
                    Carefully prepared using quality ingredients.
                  </p>
                </div>
              </div>

              {/* Customizations */}
              {product.customizationGroups &&
                product.customizationGroups.length > 0 && (
                  <div className="mt-6 space-y-5">
                    {product.customizationGroups.map((group) => (
                      <div
                        key={group.id}
                        className="border-t border-[#EAE1D9] pt-5"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#40332B]">
                            {group.name}
                          </label>

                          <span className="rounded-full bg-[#F1E8DF] px-2 py-1 text-[9px] font-semibold text-[#8A6A52]">
                            {group.type === 'radio'
                              ? 'Select 1'
                              : 'Optional'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {group.options.map((option) => {
                            const isSelected =
                              selectedCustomizations.some(
                                (item) =>
                                  item.groupId === group.id &&
                                  item.optionId === option.id
                              );

                            return (
                              <button
                                type="button"
                                key={option.id}
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
                                className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'border-[#B98A5B] bg-[#F7EEE5] shadow-[0_3px_12px_rgba(44,24,16,0.04)]'
                                    : 'border-[#E3D9D0] bg-white hover:border-[#CBB095] hover:bg-[#FCFAF7]'
                                }`}
                              >
                                <span className="flex min-w-0 items-center gap-2.5">
                                  <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                                      group.type === 'radio'
                                        ? 'rounded-full'
                                        : 'rounded-[4px]'
                                    } ${
                                      isSelected
                                        ? 'border-[#2C1810] bg-[#2C1810]'
                                        : 'border-[#C9BDB2] bg-white'
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="h-2.5 w-2.5 text-white" />
                                    )}
                                  </span>

                                  <span
                                    className={`truncate text-xs ${
                                      isSelected
                                        ? 'font-semibold text-[#2C1810]'
                                        : 'text-[#62554C]'
                                    }`}
                                  >
                                    {option.name}
                                  </span>
                                </span>

                                <span className="shrink-0 text-[10px] font-semibold text-[#6F5B4C]">
                                  {option.price > 0
                                    ? `+₹${option.price}`
                                    : 'Free'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {/* Instructions */}
              <div className="mt-6 border-t border-[#EAE1D9] pt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#40332B]">
                  Special Instructions
                </label>

                <input
                  type="text"
                  placeholder="Less spicy, extra crispy, birthday note..."
                  value={specialInstructions}
                  onChange={(event) =>
                    setSpecialInstructions(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-[#DED4CA] bg-white px-3.5 text-xs text-[#2C1810] outline-none transition focus:border-[#B98A5B] focus:ring-2 focus:ring-[#B98A5B]/10"
                />
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="sticky bottom-0 mt-auto border-t border-[#E4D9CE] bg-[#FBF8F3]/95 p-4 backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[#5D5048]">
                  Quantity
                </span>

                <div className="flex items-center gap-1 rounded-full border border-[#DDD2C8] bg-white p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    disabled={quantity <= 1}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#5D5048] transition-colors hover:bg-[#F1E9E1] disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>

                  <span className="w-7 text-center text-xs font-bold text-[#2C1810]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#5D5048] transition-colors hover:bg-[#F1E9E1]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#2C1810] bg-white px-3 text-[10px] font-bold uppercase tracking-[0.05em] text-[#2C1810] transition-all hover:bg-[#F5EEE6] sm:text-xs"
                >
                  <ShoppingBag className="h-4 w-4 text-[#8C5D36]" />
                  Add · ₹{totalPrice}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2C1810] px-3 text-[10px] font-bold uppercase tracking-[0.05em] text-white shadow-[0_6px_18px_rgba(44,24,16,0.15)] transition-all hover:bg-[#43271C] hover:shadow-[0_8px_22px_rgba(44,24,16,0.20)] sm:text-xs"
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
