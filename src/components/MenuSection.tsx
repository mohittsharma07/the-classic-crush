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

  // Keep unavailable products visible so customers can see their status.
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory;

      const matchesVeg = !onlyVeg || product.isVeg;

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
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
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
    () => filteredProducts.filter((product) => product.isBestSeller),
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
        <div className="col-span-full rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAE0CC] text-[#80683D]">
            <Search className="h-6 w-6" />
          </div>

          <h3 className="mt-5 font-serif text-2xl font-semibold text-[#292D1D]">
            Nothing found here
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#615B4D]">
            Try another search or clear the filters to explore
            the complete menu.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#292D1D] px-5 py-2.5 text-sm font-semibold text-[#F4EBDD] transition-colors hover:bg-[#244536]"
          >
            Clear filters
            <ArrowRight className="h-4 w-4 text-[#D4BD85]" />
          </button>
        </div>
      );
    }

    return items.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const filterButtonClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
      active
        ? 'border-[#292D1D] bg-[#292D1D] text-[#F4EBDD]'
        : 'border-[#D8CCB7] bg-[#FFFCF6] text-[#292D1D] hover:border-[#B9A064] hover:bg-[#EAE0CC]'
    }`;

  return (
    <section id="menu-products" className="bg-[#F4EBDD]">
      {/* Search and filters */}
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <div className="border-y border-[#D8CCB7] py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#80683D]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search cakes, coffee, fries..."
                aria-label="Search menu"
                className="h-11 w-full rounded-full border border-[#D8CCB7] bg-[#FFFCF6] pl-11 pr-10 text-sm text-[#292D1D] outline-none placeholder:text-[#827967] focus:border-[#B9A064] focus:ring-1 focus:ring-[#B9A064]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#615B4D] hover:bg-[#EAE0CC]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Desktop filters */}
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => setOnlyVeg(!onlyVeg)}
                aria-pressed={onlyVeg}
                className={filterButtonClass(onlyVeg)}
              >
                Veg Only
              </button>

              <button
                type="button"
                onClick={() => setOnlyBestSeller(!onlyBestSeller)}
                aria-pressed={onlyBestSeller}
                className={`inline-flex items-center gap-1.5 ${filterButtonClass(onlyBestSeller)}`}
              >
                <Flame className="h-3.5 w-3.5" />
                Best Sellers
              </button>

              <label className="relative">
                <span className="sr-only">Sort menu</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  className="h-10 appearance-none rounded-full border border-[#D8CCB7] bg-[#FFFCF6] pl-4 pr-9 text-xs font-semibold text-[#292D1D] outline-none hover:border-[#B9A064] focus:border-[#B9A064]"
                >
                  <option value="default">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#80683D]" />
              </label>

              {isFiltering && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-2 text-xs font-semibold text-[#80683D] hover:text-[#292D1D]"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Mobile filters toggle */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D8CCB7] bg-[#FFFCF6] px-4 py-2.5 text-sm font-semibold text-[#292D1D] hover:border-[#B9A064] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#80683D]" />
              {showFilters ? 'Hide filters' : 'Filters'}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Mobile filter panel */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#D8CCB7] pt-4 lg:hidden">
              <button
                type="button"
                onClick={() => setOnlyVeg(!onlyVeg)}
                aria-pressed={onlyVeg}
                className={filterButtonClass(onlyVeg)}
              >
                Veg Only
              </button>

              <button
                type="button"
                onClick={() => setOnlyBestSeller(!onlyBestSeller)}
                aria-pressed={onlyBestSeller}
                className={`inline-flex items-center gap-1.5 ${filterButtonClass(onlyBestSeller)}`}
              >
                <Flame className="h-3.5 w-3.5" />
                Best Sellers
              </button>

              <label>
                <span className="sr-only">Sort menu</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  className="rounded-full border border-[#D8CCB7] bg-[#FFFCF6] px-4 py-2 text-xs font-semibold text-[#292D1D] outline-none focus:border-[#B9A064]"
                >
                  <option value="default">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>

              {isFiltering && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-[#80683D] hover:text-[#292D1D]"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filtered results */}
      {isFiltering && (
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#615B4D]">
              Showing{' '}
              <span className="font-semibold text-[#292D1D]">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-[#80683D] hover:text-[#292D1D]"
            >
              Clear all filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderGrid(filteredProducts)}
          </div>
        </div>
      )}

      {/* Complete catalogue */}
      {!isFiltering && (
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Best sellers */}
          {bestSellerProducts.length > 0 && (
            <section className="border-b border-[#D8CCB7] pb-16">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#80683D]">
                    Customer favourites
                  </p>

                  <h3 className="mt-2 font-serif text-3xl font-semibold text-[#292D1D] sm:text-4xl">
                    Best Sellers
                  </h3>
                </div>

                <p className="max-w-sm text-sm leading-6 text-[#615B4D] sm:text-right">
                  The items our customers keep coming back for.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {renderGrid(bestSellerProducts)}
              </div>
            </section>
          )}

          {/* Category sections */}
          <div className="space-y-16 pt-16">
            {categorySections.map((category) => {
              if (category.products.length === 0) return null;

              return (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className="scroll-mt-32"
                >
                  <div className="mb-8 flex flex-col gap-4 border-b border-[#D8CCB7] pb-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <span className="pt-1 text-xs font-semibold tracking-[0.18em] text-[#80683D]">
                        {category.number}
                      </span>

                      <div className="min-w-0">
                        <h3 className="font-serif text-3xl font-semibold leading-tight text-[#292D1D] sm:text-4xl">
                          {category.name}
                        </h3>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#615B4D]">
                          {category.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#80683D]">
                        {category.products.length}{' '}
                        {category.products.length === 1 ? 'item' : 'items'}
                      </span>

                      <button
                        type="button"
                        onClick={() => openCategory(category.id)}
                        className="hidden items-center gap-1.5 text-xs font-semibold text-[#292D1D] hover:text-[#80683D] sm:inline-flex"
                      >
                        View category
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

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
