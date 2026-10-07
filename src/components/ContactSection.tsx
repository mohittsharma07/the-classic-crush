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
  const phoneNumber = '+919876543210';

  const whatsappUrl =
    'https://wa.me/919876543210?text=Hello%20The%20Classic%20Crush!%20I%20would%20like%20to%20order%20from%20your%20bakery.';

  const locationQuery =
    'The Classic Crush Cafe Open Gym CSJMU Kanpur University Kanpur';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationQuery
  )}`;

  return (
    <main className="bg-[#FBF8F3]">

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D9A441]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5D36]">
              Contact & Visit
            </span>
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#2C1810] sm:text-5xl lg:text-6xl">
            Come by.
            <br />
            Stay for a while.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#71645B] sm:text-base">
            Whether you are picking up a fresh bake, planning a celebration,
            or simply looking for a relaxed café moment, our team is here to
            help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#E4D9CE] bg-[#E4D9CE] md:grid-cols-3">

          {/* Call */}
          <div className="bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E9DC] text-[#8C5D36]">
              <Phone className="h-5 w-5" />
            </div>

            <h2 className="mt-6 font-serif text-xl font-semibold text-[#2C1810]">
              Call the Bakery
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756960]">
              For custom cakes, party orders, delivery questions or general
              enquiries.
            </p>

            <a
              href={`tel:${phoneNumber}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2C1810] transition-colors hover:text-[#9A6B45]"
            >
              +91 98765 43210
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5EC] text-emerald-700">
              <MessageCircle className="h-5 w-5" />
            </div>

            <h2 className="mt-6 font-serif text-xl font-semibold text-[#2C1810]">
              WhatsApp Us
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756960]">
              Ask about today's fresh batches, place an order request or share
              your feedback.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Location */}
          <div className="bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7E9E5] text-[#A04D3D]">
              <MapPin className="h-5 w-5" />
            </div>

            <h2 className="mt-6 font-serif text-xl font-semibold text-[#2C1810]">
              Find the Café
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756960]">
              Inside CSJMU (Kanpur University) campus, near the Open Gym,
              Kanpur, Uttar Pradesh.
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2C1810] transition-colors hover:text-[#9A6B45]"
            >
              Open in Google Maps
              <Navigation className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Location + Hours */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[28px] border border-[#E4D9CE] bg-white">
          <div className="grid lg:grid-cols-2">

            {/* REAL MAP */}
            <div className="relative min-h-[360px] overflow-hidden bg-[#E8E4DE] sm:min-h-[430px]">

              <iframe
                title="The Classic Crush Café location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  locationQuery
                )}&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Label */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#67584E] shadow-sm backdrop-blur">
                <Store className="h-3.5 w-3.5 text-[#9A6B45]" />
                CSJMU · Near Open Gym
              </div>
            </div>

            {/* Details */}
            <div className="p-7 sm:p-10 lg:p-12">

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A6B45]">
                <Clock className="h-4 w-4" />
                Opening Hours
              </div>

              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#2C1810]">
                When to find us
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#756960]">
                Drop in whenever you are around. Fresh bakes, coffee and
                desserts are served throughout the day.
              </p>

              <div className="mt-7 divide-y divide-[#EEE6DE] border-y border-[#EEE6DE]">

                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="text-sm text-[#70625A]">
                    Monday – Friday
                  </span>

                  <span className="text-sm font-bold text-[#2C1810]">
                    10:00 AM – 11:00 PM
                  </span>
                </div>

                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="text-sm text-[#70625A]">
                    Saturday – Sunday
                  </span>

                  <span className="text-sm font-bold text-[#2C1810]">
                    10:00 AM – 11:30 PM
                  </span>
                </div>

                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="text-sm text-[#70625A]">
                    Online Delivery
                  </span>

                  <span className="text-sm font-bold text-emerald-700">
                    Active during open hours
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="mt-7 space-y-4">

                <div className="flex items-center gap-3 text-sm text-[#75675E]">
                  <MapPin className="h-4 w-4 shrink-0 text-[#9A6B45]" />
                  CSJMU Campus · Near Open Gym
                </div>

                <div className="flex items-center gap-3 text-sm text-[#75675E]">
                  <Mail className="h-4 w-4 shrink-0 text-[#9A6B45]" />
                  orders@theclassiccrush.cafe
                </div>

                <div className="flex items-center gap-3 text-sm text-[#75675E]">
                  <Instagram className="h-4 w-4 shrink-0 text-[#9A6B45]" />
                  @theclassiccrush.official
                </div>

                <div className="flex items-center gap-3 text-sm text-[#75675E]">
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#9A6B45]" />
                  Dine-in · Takeaway · Delivery
                </div>
              </div>

              {/* Directions */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2C1810] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#43271C]"
              >
                <Navigation className="h-4 w-4 text-[#D9A441]" />
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#F8F1E9] p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#B98A5B]" />

                <p className="text-xs leading-5 text-[#6F625A]">
                  Planning a celebration or bulk order? Contact us in advance
                  so we can prepare everything fresh for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Contact Strip */}
      <section className="border-y border-[#E4D9CE] bg-[#2C1810]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">
              Let's make something special
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
              Have an order in mind?
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">

            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-bold text-[#2C1810] transition-colors hover:bg-[#F5ECE2]"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-xs font-bold text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#D9A441]/50 px-5 text-xs font-bold text-[#F1D28D] transition-colors hover:border-[#D9A441] hover:bg-[#D9A441]/10"
            >
              <MapPin className="h-4 w-4" />
              Find Us
            </a>

          </div>
        </div>
      </section>
    </main>
  );
};