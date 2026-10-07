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
    <section className="sticky top-[78px] z-30 border-b border-[#E7DDD3] bg-[#FBF8F3]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
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
                className={`group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
                  isSelected
                    ? 'border-[#2C1810] bg-[#2C1810] text-white'
                    : 'border-[#DED3C8] bg-white text-[#5F5148] hover:border-[#B98A5B] hover:bg-[#F7F0E8] hover:text-[#2C1810]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isSelected
                      ? 'bg-white/10'
                      : 'bg-[#F2E9E0] group-hover:bg-[#EBDDCF]'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isSelected
                        ? 'text-[#D9A441]'
                        : 'text-[#8C5D36]'
                    }`}
                  />
                </span>

                <span>{cat.name}</span>

                {isSelected && (
                  <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                )}
              </button>
            );
          })}

        </div>
      </div>
    </section>
  );
};

