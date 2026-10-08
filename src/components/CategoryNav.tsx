import React from 'react';
import { CATEGORIES } from '../data/initialData';
import { CategoryId } from '../types';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Cake,
  Pizza,
  Sandwich,
  Coffee,
  Utensils,
  Flame,
  Soup,
} from 'lucide-react';

const CATEGORY_ICONS: Record<
  string,
  React.FC<{ className?: string }>
> = {
  Sparkles,
  Cake,
  Pizza,
  Sandwich,
  Coffee,
  Utensils,
  Flame,
  Soup,
};

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <section className="sticky top-0 z-30 border-b border-[#B9A064]/35 bg-[#F4EBDD]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
        <div className="scrollbar-none flex items-center gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(cat.id as CategoryId)
                }
                aria-pressed={isSelected}
                className={`group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
                  isSelected
                    ? 'border-[#292D1D] bg-[#292D1D] text-[#F4EBDD]'
                    : 'border-[#B9A064]/45 bg-[#FFFCF6] text-[#292D1D] hover:border-[#B9A064] hover:bg-[#EAE0CC]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isSelected
                      ? 'bg-[#B9A064]/15'
                      : 'bg-[#EAE0CC] group-hover:bg-[#DCD0B5]'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isSelected
                        ? 'text-[#D4BD85]'
                        : 'text-[#74613C]'
                    }`}
                  />
                </span>

                <span>{cat.name}</span>

                {isSelected && (
                  <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-[#D4BD85]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};