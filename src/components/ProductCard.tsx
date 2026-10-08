import React from 'react';
import {
  Plus,
  Flame,
  Heart,
  Star,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    setActiveProductForModal,
    favorites,
    toggleFavorite,
    cart,
  } = useStore();

  const isFav = favorites.includes(product.id);

  const hasCustomizations =
    !!product.customizationGroups &&
    product.customizationGroups.length > 0;

  const cartItem = cart.find(
    (item) => item.productId === product.id
  );

  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const handleCardClick = () => {
    setActiveProductForModal(product);
  };

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!product.isAvailable) return;

    if (hasCustomizations) {
      setActiveProductForModal(product);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[#FFFCF6] ${
        product.isAvailable
          ? 'border-[#D8CCB7] shadow-[0_4px_16px_rgba(41,45,29,0.06)] transition-shadow duration-300 hover:border-[#B9A064] hover:shadow-[0_10px_26px_rgba(41,45,29,0.12)]'
          : 'border-[#D8CCB7] opacity-70'
      }`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE0CC]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover ${
            product.isAvailable
              ? 'transition-transform duration-300 group-hover:scale-[1.025]'
              : 'grayscale'
          }`}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#202318]/40 to-transparent" />

        {/* Vegetarian / Non-vegetarian */}
        <div className="absolute left-3 top-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D8CCB7] bg-[#FFFCF6] shadow-sm">
            {product.isVeg ? (
              <span
                className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-emerald-700 bg-white"
                title="Vegetarian"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
              </span>
            ) : (
              <span
                className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-[#8B3E2F] bg-white"
                title="Non-Vegetarian"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B3E2F]" />
              </span>
            )}
          </span>
        </div>

        {/* Popular badge and Favourite */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#292D1D] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#D4BD85]">
              <Flame className="h-3 w-3" />
              Popular
            </span>
          )}

          {!product.isAvailable && (
            <span className="rounded-full bg-[#292D1D] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#F4EBDD]">
              Sold Out
            </span>
          )}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CCB7] shadow-sm transition-colors ${
              isFav
                ? 'bg-[#F8E6DF] text-[#A33D32]'
                : 'bg-[#FFFCF6]/95 text-[#615B4D] hover:bg-white hover:text-[#A33D32]'
            }`}
            aria-label={
              isFav
                ? `Remove ${product.name} from favorites`
                : `Add ${product.name} to favorites`
            }
          >
            <Heart
              className={`h-4 w-4 ${isFav ? 'fill-[#A33D32]' : ''}`}
            />
          </button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#202318]/85 px-2.5 py-1 text-[10px] font-semibold text-[#FFFCF6]">
            <Star className="h-3 w-3 fill-[#D4BD85] text-[#D4BD85]" />
            {product.rating}
            <span className="text-[#FFFCF6]/65">
              ({product.reviewsCount})
            </span>
          </span>
        </div>

        {/* Product details hint */}
        <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#202318]/80 text-[#F4EBDD] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div>
          {product.subCategory && (
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#80683D]">
              {product.subCategory}
            </p>
          )}

          <h3 className="line-clamp-1 font-serif text-[17px] font-bold leading-tight text-[#292D1D] sm:text-lg">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[36px] text-xs leading-[18px] text-[#615B4D]">
            {product.description}
          </p>
        </div>

        {/* Price and Add Button */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#D8CCB7]/70 pt-4">
          <div>
            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#827967]">
              Price
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#292D1D]">
                ₹{product.price}
              </span>

              {product.id.includes('bv-12') && (
                <span className="text-[10px] font-medium text-[#615B4D]">
                  /kg
                </span>
              )}
            </div>
          </div>

          {product.isAvailable ? (
            <button
              type="button"
              onClick={handleAddClick}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#292D1D] px-3.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#F4EBDD] transition-colors hover:bg-[#244536]"
            >
              <Plus className="h-3.5 w-3.5 text-[#D4BD85]" />

              <span>
                {hasCustomizations ? 'Customize' : 'Add'}
              </span>

              {qtyInCart > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B9A064] px-1.5 text-[9px] font-black text-[#292D1D]">
                  {qtyInCart}
                </span>
              )}
            </button>
          ) : (
            <span className="inline-flex h-9 items-center rounded-full bg-[#EAE0CC] px-3 text-[10px] font-semibold text-[#615B4D]">
              Unavailable
            </span>
          )}
        </div>
      </div>

      {/* In-cart Indicator */}
      {product.isAvailable && qtyInCart > 0 && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[#B9A064]" />

          <div className="pointer-events-none absolute bottom-[70px] right-5 hidden items-center gap-1 text-[9px] font-semibold text-[#244536] sm:flex">
            <Check className="h-3 w-3" />
            In cart
          </div>
        </>
      )}
    </article>
  );
};
