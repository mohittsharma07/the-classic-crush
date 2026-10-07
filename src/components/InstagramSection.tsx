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
    caption:
      'A little chocolate moment from behind the counter.',
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
    caption:
      'Fresh bites made for sharing with friends.',
    likes: 540,
  },
];

export const InstagramSection: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <section className="border-t border-[#E6DDD4] bg-[#FBF8F3] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-6 border-b border-[#E4D9CE] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#D9A441]" />

              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5D36]">
                <Instagram className="h-3.5 w-3.5" />
                @theclassiccrush.official
              </span>
            </div>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-[#2C1810] sm:text-4xl lg:text-5xl">
              From our counter
              <br />
              <span className="text-[#8C5D36]">to your feed.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#756960]">
              Fresh bakes, coffee moments and little pieces of café life.
              Follow along for what's coming out of the kitchen.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#D5C5B5] bg-white px-5 text-xs font-bold text-[#5D4C41] transition-colors hover:border-[#B98A5B] hover:bg-[#F7EFE7]"
            >
              <QrCode className="h-4 w-4 text-[#8C5D36]" />
              Scan QR
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#2C1810] px-5 text-xs font-bold text-white transition-colors hover:bg-[#43271C]"
            >
              <Instagram className="h-4 w-4 text-[#E5B869]" />
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
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[18px] bg-[#E9E0D7]"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Hover information */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1E110C]/90 via-[#1E110C]/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#F0C77B]">
                  <Heart className="h-3 w-3 fill-[#F0C77B]" />
                  {post.likes}
                </div>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white">
                  {post.caption}
                </p>
              </div>

              {/* Instagram icon */}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#2C1810] opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <Sparkles className="h-3.5 w-3.5 text-[#B98A5B]" />

          <p className="text-[10px] font-medium text-[#8A7C72] sm:text-xs">
            Tag @theclassiccrush.official to be featured
          </p>
        </div>
      </div>

      {/* QR Modal */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1C100B]/65 p-4 backdrop-blur-sm"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-[26px] border border-[#E4D9CE] bg-[#FBF8F3] p-6 text-center shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#8C7D72] transition-colors hover:bg-[#EFE7DE] hover:text-[#2C1810]"
              aria-label="Close QR modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#2C1810] text-[#D9A441]">
              <Instagram className="h-5 w-5" />
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A6B45]">
              Connect with us
            </p>

            <h3 className="mt-1 font-serif text-2xl font-semibold text-[#2C1810]">
              The Classic Crush
            </h3>

            <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#81746B]">
              Scan the QR code to connect with The Classic Crush online.
            </p>

            <div className="mx-auto mt-6 inline-block rounded-2xl border border-[#E3D7CB] bg-white p-4 shadow-[0_6px_20px_rgba(44,24,16,0.05)]">
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-xl bg-[#2C1810] p-3 text-white sm:h-48 sm:w-48">
                <QrCode className="h-32 w-32 text-[#E5B869]" />

                <span className="mt-1 font-mono text-[9px] font-bold text-white/55">
                  @theclassiccrush
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-[#7F7168]">
              <Sparkles className="h-3.5 w-3.5 text-[#B98A5B]" />
              Freshly baked. Simply shared.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};