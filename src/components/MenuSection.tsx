import React, { useMemo, useState } from 'react';
import {
  Flame,
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/initialData';
import { CategoryId, Product } from '../types';
import { ProductCard } from './ProductCard';

type SortOption = 'default' | 'price-low' | 'price-high';

const CATEGORY_ORDER: CategoryId[] = [
  'signature-desserts',
  'quick-bites',
  'sandwiches-maggie',
  'beverages-small-eats',
  'burgers',
  'french-fries',
  'momos',
];

const CATEGORY_NUMBERS: Record<Exclude<CategoryId, 'all'>, string> = {
  'signature-desserts': '01',
  'quick-bites': '02',
  'sandwiches-maggie': '03',
  'beverages-small-eats': '04',
  burgers: '05',
  'french-fries': '06',
  momos: '07',
};

export const MenuSection: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    onlyVeg,
    setOnlyVeg,
    onlyBestSeller,
    setOnlyBestSeller,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);

  /*
   * IMPORTANT:
   * Do NOT remove unavailable products here.
   * They should still appear as cards with Sold Out/Unavailable.
   */
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory;

      const matchesVeg =
        !onlyVeg || product.isVeg;

      const matchesBestSeller =
        !onlyBestSeller || Boolean(product.isBestSeller);

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.subCategory?.toLowerCase().includes(query);

      return (
        matchesCategory &&
        matchesVeg &&
        matchesBestSeller &&
        matchesSearch
      );
    });

    if (sortBy === 'price-low') {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === 'price-high') {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [
    products,
    selectedCategory,
    onlyVeg,
    onlyBestSeller,
    searchQuery,
    sortBy,
  ]);

  const categorySections = useMemo(() => {
    return CATEGORY_ORDER.map((categoryId) => {
      const category = CATEGORIES.find(
        (item) => item.id === categoryId
      );

      if (!category) return null;

      const categoryProducts = filteredProducts.filter(
        (product) => product.category === categoryId
      );

      return {
        ...category,
        number:
          CATEGORY_NUMBERS[
            categoryId as Exclude<CategoryId, 'all'>
          ],
        products: categoryProducts,
      };
    }).filter(Boolean) as Array<{
      id: Exclude<CategoryId, 'all'>;
      name: string;
      tagline: string;
      icon: string;
      number: string;
      products: Product[];
    }>;
  }, [filteredProducts]);

  const bestSellerProducts = useMemo(
    () =>
      filteredProducts.filter(
        (product) => product.isBestSeller
      ),
    [filteredProducts]
  );

  const isFiltering =
    Boolean(searchQuery.trim()) ||
    onlyVeg ||
    onlyBestSeller ||
    selectedCategory !== 'all' ||
    sortBy !== 'default';

  const clearFilters = () => {
    setSearchQuery('');
    setOnlyVeg(false);
    setOnlyBestSeller(false);
    setSelectedCategory('all');
    setSortBy('default');
  };

  const openCategory = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);

    window.setTimeout(() => {
      document
        .getElementById(`category-${categoryId}`)
        ?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });
    }, 50);
  };

  const renderGrid = (items: Product[]) => {
    if (items.length === 0) {
      return (
        <div className="col-span-full rounded-2xl border border-[#E5DCD3] bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EBDD] text-[#9A6B45]">
            <Search className="h-6 w-6" />
          </div>

          <h3 className="mt-5 font-serif text-2xl font-semibold text-[#2C1810]">
            Nothing found here
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756960]">
            Try another search or clear the filters to explore
            the complete menu.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2C1810] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#43261A]"
          >
            Clear filters
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      );
    }

    return items.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ));
  };

  return (
    <section
      id="menu-products"
      className="bg-[#FAF6F0]"
    >
      {/* ================= TOOLBAR ================= */}
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <div className="border-y border-[#E5DCD3] py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A6B45]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search cakes, coffee, fries..."
                className="h-11 w-full rounded-full border border-[#DDD1C6] bg-white pl-11 pr-10 text-sm text-[#2C1810] outline-none placeholder:text-[#A89A90] focus:border-[#9A6B45]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#8C7A6E] hover:bg-[#F4EBDD]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => setOnlyVeg(!onlyVeg)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                  onlyVeg
                    ? 'border-[#2C1810] bg-[#2C1810] text-white'
                    : 'border-[#DDD1C6] bg-white text-[#5D4A40] hover:border-[#9A6B45]'
                }`}
              >
                Veg Only
              </button>

              <button
                type="button"
                onClick={() =>
                  setOnlyBestSeller(!onlyBestSeller)
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold ${
                  onlyBestSeller
                    ? 'border-[#2C1810] bg-[#2C1810] text-white'
                    : 'border-[#DDD1C6] bg-white text-[#5D4A40] hover:border-[#9A6B45]'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                Best Sellers
              </button>

              <label className="relative">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value as SortOption
                    )
                  }
                  className="h-10 appearance-none rounded-full border border-[#DDD1C6] bg-white pl-4 pr-9 text-xs font-semibold text-[#5D4A40] outline-none hover:border-[#9A6B45]"
                >
                  <option value="default">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8C7A6E]" />
              </label>

              {isFiltering && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-2 text-xs font-semibold text-[#9A6B45] hover:text-[#2C1810]"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Mobile Filters */}
            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#DDD1C6] bg-white px-4 py-2.5 text-sm font-semibold text-[#5D4A40] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#E5DCD3] pt-4 lg:hidden">
              <button
                type="button"
                onClick={() => setOnlyVeg(!onlyVeg)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                  onlyVeg
                    ? 'border-[#2C1810] bg-[#2C1810] text-white'
                    : 'border-[#DDD1C6] bg-white text-[#5D4A40]'
                }`}
              >
                Veg Only
              </button>

              <button
                type="button"
                onClick={() =>
                  setOnlyBestSeller(!onlyBestSeller)
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold ${
                  onlyBestSeller
                    ? 'border-[#2C1810] bg-[#2C1810] text-white'
                    : 'border-[#DDD1C6] bg-white text-[#5D4A40]'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                Best Sellers
              </button>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as SortOption
                  )
                }
                className="rounded-full border border-[#DDD1C6] bg-white px-4 py-2 text-xs font-semibold text-[#5D4A40] outline-none"
              >
                <option value="default">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>

              {isFiltering && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-[#9A6B45]"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= FILTERED RESULT ================= */}
      {isFiltering && (
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#756960]">
              Showing{' '}
              <span className="font-semibold text-[#2C1810]">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length === 1
                ? 'item'
                : 'items'}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-[#9A6B45] hover:text-[#2C1810]"
            >
              Clear all filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderGrid(filteredProducts)}
          </div>
        </div>
      )}

      {/* ================= COMPLETE CATALOGUE ================= */}
      {!isFiltering && (
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

          {/* Best Sellers */}
          {bestSellerProducts.length > 0 && (
            <section className="border-b border-[#E5DCD3] pb-16">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9A6B45]">
                    Customer favourites
                  </p>

                  <h3 className="mt-2 font-serif text-3xl font-semibold text-[#2C1810] sm:text-4xl">
                    Best Sellers
                  </h3>
                </div>

                <p className="max-w-sm text-sm leading-6 text-[#756960] sm:text-right">
                  The items our customers keep coming back for.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {renderGrid(bestSellerProducts)}
              </div>
            </section>
          )}

          {/* Categories */}
          <div className="space-y-16 pt-16">

            {categorySections.map((category) => {
              if (category.products.length === 0) {
                return null;
              }

              return (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className="scroll-mt-32"
                >
                  {/* Category Header */}
                  <div className="mb-8 flex flex-col gap-4 border-b border-[#E5DCD3] pb-5 md:flex-row md:items-end md:justify-between">

                    <div className="flex min-w-0 items-start gap-4">

                      <span className="pt-1 text-xs font-semibold tracking-[0.18em] text-[#B28A55]">
                        {category.number}
                      </span>

                      <div className="min-w-0">
                        <h3 className="font-serif text-3xl font-semibold leading-tight text-[#2C1810] sm:text-4xl">
                          {category.name}
                        </h3>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#756960]">
                          {category.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A6B45]">
                        {category.products.length}{' '}
                        {category.products.length === 1
                          ? 'item'
                          : 'items'}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          openCategory(category.id)
                        }
                        className="hidden items-center gap-1.5 text-xs font-semibold text-[#2C1810] hover:text-[#9A6B45] sm:inline-flex"
                      >
                        View category
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {renderGrid(category.products)}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};