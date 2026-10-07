import React from 'react';
import {
  Heart,
  Award,
  ChefHat,
  Users,
  CheckCircle2,
  Clock,
  Coffee,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { setCurrentView } = useStore();

  const openMenu = () => {
    setCurrentView('menu');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pillars = [
    {
      number: '01',
      icon: Coffee,
      title: 'Fresh Every Day',
      description:
        'Fresh bakery favourites and café treats prepared with care throughout the day.',
    },
    {
      number: '02',
      icon: Users,
      title: 'Learning by Doing',
      description:
        'A practical hospitality environment where students gain real-world experience.',
    },
    {
      number: '03',
      icon: Award,
      title: 'Quality First',
      description:
        'Careful preparation, thoughtful recipes and consistent attention to every order.',
    },
    {
      number: '04',
      icon: Clock,
      title: 'Made for Everyone',
      description:
        'Comforting food, quick service and a welcoming café experience for every guest.',
    },
  ];

  return (
    <main className="bg-[#FBF8F3] text-[#2C1810]">
      {/* Brand Introduction */}
      <section className="border-b border-[#E8DED4]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6B45] sm:text-[11px]">
                About The Classic Crush
              </p>

              <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                A bakery and café built around
                <span className="text-[#8C5D36]">
                  {' '}
                  good food and good moments.
                </span>
              </h1>
            </div>

            <div className="lg:pb-1">
              <p className="max-w-xl text-sm leading-7 text-[#71645B] sm:text-base">
                The Classic Crush brings together fresh bakery favourites,
                café comfort and practical hospitality learning in one
                welcoming space.
              </p>

              <button
                type="button"
                onClick={openMenu}
                className="group mt-6 inline-flex items-center gap-2 border-b border-[#8C5D36] pb-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2C1810]"
              >
                Explore Our Menu
                <ArrowRight className="h-4 w-4 text-[#9A6B45] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="overflow-hidden bg-white p-2 shadow-[0_14px_40px_rgba(44,24,16,0.09)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=88"
                    alt="Fresh bakery preparation"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-5 right-4 hidden bg-[#2C1810] px-5 py-4 text-white shadow-lg sm:block">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D9A441]">
                  Our approach
                </p>

                <p className="mt-1 font-serif text-lg">
                  Learn • Create • Serve
                </p>
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
                Our Story
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                More than a bakery counter.
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 text-[#71645B]">
                <p>
                  The Classic Crush combines the creativity of hospitality
                  learners with the warmth of an everyday neighbourhood café.
                </p>

                <p>
                  From desserts and bakery favourites to sandwiches,
                  beverages and quick bites, our menu is created with
                  attention to presentation, consistency and customer
                  experience.
                </p>

                <p>
                  Behind every order is a simple idea — serve food that
                  people enjoy while creating an environment where aspiring
                  hospitality professionals can learn through real experience.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="border border-[#E3D8CE] bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F1E5D8]">
                      <ChefHat className="h-4 w-4 text-[#8C5D36]" />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#2C1810]">
                        Hospitality Learning
                      </h3>

                      <p className="mt-1 text-[10px] text-[#8A7C72]">
                        Practical culinary experience
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-[#E3D8CE] bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F7EAE7]">
                      <Heart className="h-4 w-4 text-[#B64532]" />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#2C1810]">
                        Made with Care
                      </h3>

                      <p className="mt-1 text-[10px] text-[#8A7C72]">
                        Quality in every order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#2C1810] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">
                What matters to us
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                The values behind the counter.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#D7C5B7]">
                Simple principles that shape our food, service and the
                experience we create for every guest.
              </p>
            </div>

            <div className="grid border-l border-[#725548] sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.number}
                    className="border-b border-r border-[#725548] p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.12em] text-[#D9A441]">
                        {pillar.number}
                      </span>

                      <Icon className="h-5 w-5 text-[#D9A441]" />
                    </div>

                    <h3 className="mt-7 text-sm font-bold text-white">
                      {pillar.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#CBB8AA]">
                      {pillar.description}
                    </p>

                    <CheckCircle2 className="mt-5 h-4 w-4 text-[#A98260]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-[#F4EDE5]">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
            The Classic Crush
          </p>

          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#2C1810] sm:text-4xl">
            Come for the food.
            <br />
            Stay for the feeling.
          </h2>

          <button
            type="button"
            onClick={openMenu}
            className="mt-7 inline-flex items-center gap-2 bg-[#2C1810] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#43271C]"
          >
            View Our Menu
            <ArrowRight className="h-4 w-4 text-[#D9A441]" />
          </button>
        </div>
      </section>
    </main>
  );
};
