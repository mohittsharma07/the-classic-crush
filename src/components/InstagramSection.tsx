import React, { useState } from 'react';
import {
  Instagram,
  QrCode,
  Heart,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
}

const INSTAGRAM_URL = 'https://instagram.com';

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image:
      'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=900&q=88',
    caption:
      'Fresh out of the oven: our favourite bakery creations, made fresh every day.',
    likes: 482,
  },
  {
    id: 'post-2',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=88',
    caption: 'A little chocolate moment from behind the counter.',
    likes: 620,
  },
  {
    id: 'post-3',
    image:
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=88',
    caption:
      'Coffee, conversation and a slow afternoon at The Classic Crush.',
    likes: 315,
  },
  {
    id: 'post-4',
    image:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=88',
    caption: 'Fresh bites made for sharing with friends.',
    likes: 540,
  },
];

export const InstagramSection: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <section className="border-t border-[#D8CCB7] bg-[#F4EBDD] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-6 border-b border-[#D8CCB7] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#B9A064]" />

              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#615B4D]">
                <Instagram className="h-3.5 w-3.5" />
                @theclassiccrush.official
              </span>
            </div>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-[#292D1D] sm:text-4xl lg:text-5xl">
              From our counter
              <br />
              <span className="text-[#8B7546]">to your feed.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#615B4D]">
              Fresh bakes, coffee moments and little pieces of café life.
              Follow along for what’s coming out of the kitchen.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#B9A064]/60 bg-[#FFFCF6] px-5 text-xs font-bold text-[#292D1D] transition-colors hover:border-[#B9A064] hover:bg-[#EAE0CD]"
            >
              <QrCode className="h-4 w-4 text-[#8B7546]" />
              Connect with us
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#292D1D] px-5 text-xs font-bold text-[#FFFCF6] transition-colors hover:bg-[#244536]"
            >
              <Instagram className="h-4 w-4 text-[#D4BD85]" />
              Follow Us
              <ExternalLink className="h-3.5 w-3.5 text-white/60" />
            </a>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Instagram: ${post.caption}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-[#E8DECA]"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#202318]/90 via-[#202318]/20 to-transparent p-3 opacity-100 sm:p-5 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D4BD85]">
                  <Heart className="h-3 w-3 fill-[#D4BD85]" />
                  {post.likes}
                </div>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white">
                  {post.caption}
                </p>
              </div>

              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFCF6]/90 text-[#292D1D] sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                <Instagram className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <Sparkles className="h-3.5 w-3.5 text-[#8B7546]" />

          <p className="text-[10px] font-medium text-[#615B4D] sm:text-xs">
            Tag @theclassiccrush.official to be featured
          </p>
        </div>
      </div>

      {/* Connect Modal */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#202318]/75 p-4 backdrop-blur-sm"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="instagram-modal-title"
            className="relative w-full max-w-sm rounded-3xl border border-[#D8CCB7] bg-[#F4EBDD] p-6 text-center shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#615B4D] transition-colors hover:bg-[#E8DECA] hover:text-[#292D1D]"
              aria-label="Close Instagram modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#292D1D] text-[#D4BD85]">
              <Instagram className="h-5 w-5" />
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7546]">
              Connect with us
            </p>

            <h3
              id="instagram-modal-title"
              className="mt-1 font-serif text-2xl font-semibold text-[#292D1D]"
            >
              The Classic Crush
            </h3>

            <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#615B4D]">
              Visit our Instagram page to discover bakery creations and café
              moments.
            </p>

            <div className="mx-auto mt-6 inline-block rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] p-4">
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-xl bg-[#292D1D] p-3 text-white sm:h-48 sm:w-48">
                <QrCode className="h-32 w-32 text-[#D4BD85]" />

                <span className="mt-1 font-mono text-[9px] font-bold text-white/70">
                  @theclassiccrush
                </span>
              </div>
            </div>

            <p className="mt-3 text-[10px] text-[#615B4D]">
              Note: This is a decorative QR icon, not a scannable code.
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#292D1D] px-5 text-xs font-bold text-[#FFFCF6] transition-colors hover:bg-[#244536]"
            >
              <Instagram className="h-4 w-4 text-[#D4BD85]" />
              Open Instagram
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-[#615B4D]">
              <Sparkles className="h-3.5 w-3.5 text-[#8B7546]" />
              Freshly baked. Simply shared.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
