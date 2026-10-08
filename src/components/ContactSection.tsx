import React from 'react';
import {
  Phone,
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Store,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  // Confirm these are the official bakery contact details before publishing.
  const phoneNumber = '+918090205081';
  const whatsappNumber = '918090205081';
  const instagramUrl = 'https://instagram.com';

  const locationQuery =
    'The Classic Crush Cafe, CSJMU, Kanpur, Uttar Pradesh';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationQuery
  )}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello The Classic Crush! I would like to enquire about placing an order.'
  )}`;

  const emailAddress = '';

  return (
    <main className="bg-[#F4EBDD]">
      {/* Page heading */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B9A064]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#615B4D]">
              Contact & Visit
            </span>
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#292D1D] sm:text-5xl lg:text-6xl">
            Come by.
            <br />
            Stay for a while.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#615B4D] sm:text-base">
            Whether you are picking up a fresh bake, planning a celebration,
            or simply looking for a relaxed café moment, we are here to help.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-[#D8CCB7] bg-[#D8CCB7] md:grid-cols-3">
          {/* Phone */}
          <div className="bg-[#FFFCF6] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAE0CD] text-[#8B7546]">
              <Phone className="h-5 w-5" />
            </div>

            <h2 className="mt-6 font-serif text-xl font-semibold text-[#292D1D]">
              Call the Bakery
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#615B4D]">
              For custom cakes, party orders, delivery questions or general
              enquiries.
            </p>

            <a
              href={`tel:${phoneNumber}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#292D1D] px-5 py-3 text-sm font-bold text-[#FFFCF6] transition-colors hover:bg-[#244536]"
            >
              <Phone className="h-4 w-4 text-[#D4BD85]" />
              Call Now
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <p className="mt-3 text-xs text-[#615B4D]">
              {phoneNumber}
            </p>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#FFFCF6] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0E9DF] text-[#244536]">
              <MessageCircle className="h-5 w-5" />
            </div>

            <h2 className="mt-6 font-serif text-xl font-semibold text-[#292D1D]">
              WhatsApp Us
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#615B4D]">
              Ask about fresh batches, enquire about an order or share your
              feedback with the bakery.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#244536] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#315A43]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
              <ExternalLink className="h-4 w-4" />
            </a>

            <p className="mt-3 text-xs text-[#615B4D]">
              Opens WhatsApp in a new tab or app.
            </p>
          </div>

          {/* Location */}
          <div className="bg-[#FFFCF6] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAE0CD] text-[#8B7546]">
              <MapPin className="h-5 w-5" />
            </div>

            <h2 className="mt-6 font-serif text-xl font-semibold text-[#292D1D]">
              Find the Café
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#615B4D]">
              The Classic Crush, CSJMU campus, Kanpur, Uttar Pradesh.
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#B9A064]/70 bg-[#F4EBDD] px-5 py-3 text-sm font-bold text-[#292D1D] transition-colors hover:bg-[#EAE0CD]"
            >
              <Navigation className="h-4 w-4 text-[#8B7546]" />
              Open Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Map and visit details */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-[#D8CCB7] bg-[#FFFCF6]">
          <div className="grid lg:grid-cols-2">
            {/* Map */}
            <div className="relative min-h-[320px] overflow-hidden bg-[#EAE0CD] sm:min-h-[430px]">
              <iframe
                title="Search for The Classic Crush near CSJMU, Kanpur"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  locationQuery
                )}&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-[#D8CCB7] bg-[#FFFCF6]/95 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#615B4D] shadow-sm">
                <Store className="h-3.5 w-3.5 text-[#8B7546]" />
                CSJMU · Kanpur
              </div>
            </div>

            {/* Visit details */}
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7546]">
                <Clock className="h-4 w-4" />
                Plan Your Visit
              </div>

              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#292D1D]">
                A little café time
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#615B4D]">
                Stop by for bakery favourites, desserts and coffee. Please
                confirm the café's current opening hours before visiting.
              </p>

              <div className="mt-7 divide-y divide-[#D8CCB7] border-y border-[#D8CCB7]">
                <div className="flex items-start gap-3 py-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8B7546]" />
                  <div>
                    <p className="text-sm font-semibold text-[#292D1D]">
                      Opening Hours
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#615B4D]">
                      Please confirm current timings with the café.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8B7546]" />
                  <div>
                    <p className="text-sm font-semibold text-[#292D1D]">
                      Our Location
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#615B4D]">
                      CSJMU campus, Kanpur, Uttar Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <Store className="mt-0.5 h-4 w-4 shrink-0 text-[#8B7546]" />
                  <div>
                    <p className="text-sm font-semibold text-[#292D1D]">
                      Ordering Options
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#615B4D]">
                      Ask the café about dine-in, takeaway and delivery
                      availability.
                    </p>
                  </div>
                </div>
              </div>

              {emailAddress && (
                <a
                  href={`mailto:${emailAddress}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#292D1D] hover:text-[#8B7546]"
                >
                  <Mail className="h-4 w-4 text-[#8B7546]" />
                  {emailAddress}
                </a>
              )}

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#292D1D] px-5 py-3 text-sm font-bold text-[#FFFCF6] transition-colors hover:bg-[#244536]"
              >
                <Navigation className="h-4 w-4 text-[#D4BD85]" />
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#F4EBDD] p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#8B7546]" />
                <p className="text-xs leading-5 text-[#615B4D]">
                  Planning a celebration or bulk order? Contact the bakery
                  in advance to discuss your requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final contact strip */}
      <section className="border-y border-[#3D422F] bg-[#202318]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4BD85]">
              Made With Love
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#FFFCF6] sm:text-3xl">
              Have an order in mind?
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#F4EBDD] px-5 py-3 text-xs font-bold text-[#292D1D] transition-colors hover:bg-[#EAE0CD]"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-bold text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#B9A064]/60 px-5 py-3 text-xs font-bold text-[#D4BD85] transition-colors hover:border-[#D4BD85] hover:bg-white/5"
            >
              <MapPin className="h-4 w-4" />
              Find Us
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-bold text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <Instagram className="h-4 w-4 text-[#D4BD85]" />
              Instagram
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
