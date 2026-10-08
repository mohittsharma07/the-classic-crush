// import React from 'react';
// import {
//   Heart,
//   Award,
//   ChefHat,
//   Users,
//   CheckCircle2,
//   Clock,
//   Coffee,
//   ArrowRight,
// } from 'lucide-react';
// import { useStore } from '../context/StoreContext';

// export const AboutSection: React.FC = () => {
//   const { setCurrentView } = useStore();

//   const openMenu = () => {
//     setCurrentView('menu');

//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const pillars = [
//     {
//       number: '01',
//       icon: Coffee,
//       title: 'Fresh Every Day',
//       description:
//         'Fresh bakery favourites and café treats prepared with care throughout the day.',
//     },
//     {
//       number: '02',
//       icon: Users,
//       title: 'Learning by Doing',
//       description:
//         'A practical hospitality environment where students gain real-world experience.',
//     },
//     {
//       number: '03',
//       icon: Award,
//       title: 'Quality First',
//       description:
//         'Careful preparation, thoughtful recipes and consistent attention to every order.',
//     },
//     {
//       number: '04',
//       icon: Clock,
//       title: 'Made for Everyone',
//       description:
//         'Comforting food, quick service and a welcoming café experience for every guest.',
//     },
//   ];

//   return (
//     <main className="bg-[#FBF8F3] text-[#2C1810]">
//       {/* Brand Introduction */}
//       <section className="border-b border-[#E8DED4]">
//         <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
//           <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6B45] sm:text-[11px]">
//                 About The Classic Crush
//               </p>

//               <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
//                 A bakery and café built around
//                 <span className="text-[#8C5D36]">
//                   {' '}
//                   good food and good moments.
//                 </span>
//               </h1>
//             </div>

//             <div className="lg:pb-1">
//               <p className="max-w-xl text-sm leading-7 text-[#71645B] sm:text-base">
//                 The Classic Crush brings together fresh bakery favourites,
//                 café comfort and practical hospitality learning in one
//                 welcoming space.
//               </p>

//               <button
//                 type="button"
//                 onClick={openMenu}
//                 className="group mt-6 inline-flex items-center gap-2 border-b border-[#8C5D36] pb-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2C1810]"
//               >
//                 Explore Our Menu
//                 <ArrowRight className="h-4 w-4 text-[#9A6B45] transition-transform duration-200 group-hover:translate-x-1" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Story */}
//       <section>
//         <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
//             {/* Image */}
//             <div className="relative">
//               <div className="overflow-hidden bg-white p-2 shadow-[0_14px_40px_rgba(44,24,16,0.09)]">
//                 <div className="aspect-[4/3] overflow-hidden">
//                   <img
//                     src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=88"
//                     alt="Fresh bakery preparation"
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </div>

//               <div className="absolute -bottom-5 right-4 hidden bg-[#2C1810] px-5 py-4 text-white shadow-lg sm:block">
//                 <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D9A441]">
//                   Our approach
//                 </p>

//                 <p className="mt-1 font-serif text-lg">
//                   Learn • Create • Serve
//                 </p>
//               </div>
//             </div>

//             {/* Copy */}
//             <div className="flex flex-col justify-center">
//               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
//                 Our Story
//               </p>

//               <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
//                 More than a bakery counter.
//               </h2>

//               <div className="mt-6 space-y-4 text-sm leading-7 text-[#71645B]">
//                 <p>
//                   The Classic Crush combines the creativity of hospitality
//                   learners with the warmth of an everyday neighbourhood café.
//                 </p>

//                 <p>
//                   From desserts and bakery favourites to sandwiches,
//                   beverages and quick bites, our menu is created with
//                   attention to presentation, consistency and customer
//                   experience.
//                 </p>

//                 <p>
//                   Behind every order is a simple idea — serve food that
//                   people enjoy while creating an environment where aspiring
//                   hospitality professionals can learn through real experience.
//                 </p>
//               </div>

//               <div className="mt-8 grid gap-3 sm:grid-cols-2">
//                 <div className="border border-[#E3D8CE] bg-white p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F1E5D8]">
//                       <ChefHat className="h-4 w-4 text-[#8C5D36]" />
//                     </div>

//                     <div>
//                       <h3 className="text-xs font-bold text-[#2C1810]">
//                         Hospitality Learning
//                       </h3>

//                       <p className="mt-1 text-[10px] text-[#8A7C72]">
//                         Practical culinary experience
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border border-[#E3D8CE] bg-white p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F7EAE7]">
//                       <Heart className="h-4 w-4 text-[#B64532]" />
//                     </div>

//                     <div>
//                       <h3 className="text-xs font-bold text-[#2C1810]">
//                         Made with Care
//                       </h3>

//                       <p className="mt-1 text-[10px] text-[#8A7C72]">
//                         Quality in every order
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="bg-[#2C1810] text-white">
//         <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
//           <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">
//                 What matters to us
//               </p>

//               <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
//                 The values behind the counter.
//               </h2>

//               <p className="mt-4 max-w-md text-sm leading-6 text-[#D7C5B7]">
//                 Simple principles that shape our food, service and the
//                 experience we create for every guest.
//               </p>
//             </div>

//             <div className="grid border-l border-[#725548] sm:grid-cols-2">
//               {pillars.map((pillar) => {
//                 const Icon = pillar.icon;

//                 return (
//                   <div
//                     key={pillar.number}
//                     className="border-b border-r border-[#725548] p-6"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="text-[10px] font-bold tracking-[0.12em] text-[#D9A441]">
//                         {pillar.number}
//                       </span>

//                       <Icon className="h-5 w-5 text-[#D9A441]" />
//                     </div>

//                     <h3 className="mt-7 text-sm font-bold text-white">
//                       {pillar.title}
//                     </h3>

//                     <p className="mt-2 text-xs leading-5 text-[#CBB8AA]">
//                       {pillar.description}
//                     </p>

//                     <CheckCircle2 className="mt-5 h-4 w-4 text-[#A98260]" />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Closing Statement */}
//       <section className="bg-[#F4EDE5]">
//         <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
//           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6B45]">
//             The Classic Crush
//           </p>

//           <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#2C1810] sm:text-4xl">
//             Come for the food.
//             <br />
//             Stay for the feeling.
//           </h2>

//           <button
//             type="button"
//             onClick={openMenu}
//             className="mt-7 inline-flex items-center gap-2 bg-[#2C1810] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#43271C]"
//           >
//             View Our Menu
//             <ArrowRight className="h-4 w-4 text-[#D9A441]" />
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// };







import React from 'react';
import {
  ArrowRight,
  Award,
  ChefHat,
  Coffee,
  Heart,
  Leaf,
  UtensilsCrossed,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const GOLD = '#B9A064';
const OLIVE = '#292D1D';
const GREEN = '#244536';
const IVORY = '#F4EBDD';

export const AboutSection: React.FC = () => {
  const { setCurrentView } = useStore();

  const openMenu = () => {
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const highlights = [
    {
      icon: Coffee,
      number: '01',
      title: 'Bakery & Café',
      text: 'From signature desserts and pastries to beverages and everyday favourites.',
    },
    {
      icon: ChefHat,
      number: '02',
      title: 'Made With Care',
      text: 'Thoughtful preparation, inviting presentation and attention to every order.',
    },
    {
      icon: Heart,
      number: '03',
      title: 'Made With Love',
      text: 'A welcoming café experience inspired by food, creativity and hospitality.',
    },
  ];

  return (
    <main className="bg-[#F4EBDD] text-[#292D1D]">
      {/* Brand hero */}
      <section className="relative isolate overflow-hidden bg-[#292D1D] text-[#F4EBDD]">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1800&q=85"
            alt="Chocolate cake from a bakery"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[#202317]/75" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#292D1D]/95 via-[#292D1D]/75 to-[#292D1D]/40" />

        <div className="mx-auto grid min-h-[600px] max-w-[1440px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:min-h-[680px] lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#B9A064]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4BD85] sm:text-xs">
                The Classic Crush
              </p>
            </div>

            <h1 className="font-serif text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              A little sweetness.
              <br />
              <span className="italic text-[#D4BD85]">
                A lasting impression.
              </span>
            </h1>

            <p className="mt-7 text-xs font-medium uppercase tracking-[0.22em] text-[#E5D8B9] sm:text-sm">
              Bakery &amp; Café
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#F4EBDD]/85 sm:text-base sm:leading-8">
              Discover freshly prepared desserts, bakery favourites,
              quick bites and beverages — brought together by a love
              for food and hospitality.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openMenu}
                className="inline-flex min-h-12 items-center gap-3 border border-[#B9A064] bg-[#B9A064] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#292D1D] transition-colors hover:bg-[#D4BD85]"
              >
                Explore Our Menu
                <ArrowRight className="h-4 w-4" />
              </button>

              <span className="flex items-center gap-2 text-sm text-[#F4EBDD]/80">
                <Heart className="h-4 w-4 text-[#D4BD85]" />
                Made With Love
              </span>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="flex h-[310px] w-[310px] items-center justify-center rounded-full border border-[#B9A064]/80 p-3">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-[#B9A064]/50 bg-[#292D1D]/65 text-center">
                <span className="font-serif text-6xl tracking-wide text-[#F4EBDD]">
                  TCC
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#D4BD85]">
                  The Classic Crush
                </span>
                <span className="my-5 h-px w-16 bg-[#B9A064]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#F4EBDD]/80">
                  Made With Love
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:col-span-2">
            <span className="h-px w-8 bg-[#B9A064]" />
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#F4EBDD]/65 sm:text-[10px]">
              An Initiative by School of Hotel Management
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-[#D8CCB7]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#74623D]">
              Our Story
            </p>

            <h2 className="mt-5 max-w-lg font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Good food.
              <br />
              Genuine hospitality.
            </h2>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-12 bg-[#B9A064]" />
              <Leaf className="h-4 w-4 text-[#74623D]" />
              <span className="h-px w-12 bg-[#B9A064]" />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-sm leading-7 text-[#615B4D] sm:text-base sm:leading-8">
              The Classic Crush is a bakery and café initiative by the
              School of Hotel Management. It brings together desserts,
              bakery products, quick bites and beverages in one welcoming
              place.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#615B4D] sm:text-base sm:leading-8">
              Alongside the food, the initiative celebrates the value of
              hospitality, creativity and practical learning. Our aim is
              to make every visit feel comfortable and every order feel
              thoughtfully prepared.
            </p>

            <button
              type="button"
              onClick={openMenu}
              className="mt-8 inline-flex items-center gap-3 border-b border-[#74623D] pb-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#292D1D]"
            >
              Discover the Menu
              <ArrowRight className="h-4 w-4 text-[#74623D]" />
            </button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#EAE1D1]">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-10 max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#74623D]">
              The TCC Experience
            </p>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Simple pleasures, thoughtfully served.
            </h2>
          </div>

          <div className="grid border border-[#D3C5AE] md:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className={`bg-[#F8F3E9] p-7 sm:p-9 ${
                    index < highlights.length - 1
                      ? 'border-b border-[#D3C5AE] md:border-b-0 md:border-r'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-[#74623D]">
                      {item.number}
                    </span>
                    <Icon className="h-5 w-5 text-[#74623D]" />
                  </div>

                  <h3 className="mt-8 font-serif text-2xl font-normal">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#615B4D]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#292D1D] text-[#F4EBDD]">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-12 lg:py-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D4BD85]">
              Our Philosophy
            </p>

            <h2 className="mt-5 font-serif text-5xl font-normal leading-tight sm:text-6xl">
              Learn.
              <br />
              Create.
              <br />
              Serve.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#F4EBDD]/75 sm:text-base sm:leading-8">
              Hospitality is about more than what is on the plate. It is
              about care, consistency and the experience shared with
              every guest.
            </p>
          </div>

          <div className="divide-y divide-[#B9A064]/35 border-y border-[#B9A064]/35">
            <div className="flex gap-5 py-6">
              <span className="font-serif text-2xl text-[#D4BD85]">01</span>
              <div>
                <h3 className="font-serif text-xl">Freshly Prepared</h3>
                <p className="mt-2 text-sm leading-6 text-[#F4EBDD]/70">
                  Bakery favourites and café treats prepared with care.
                </p>
              </div>
            </div>

            <div className="flex gap-5 py-6">
              <span className="font-serif text-2xl text-[#D4BD85]">02</span>
              <div>
                <h3 className="font-serif text-xl">Quality &amp; Care</h3>
                <p className="mt-2 text-sm leading-6 text-[#F4EBDD]/70">
                  Thoughtful preparation and attention to the details.
                </p>
              </div>
            </div>

            <div className="flex gap-5 py-6">
              <span className="font-serif text-2xl text-[#D4BD85]">03</span>
              <div>
                <h3 className="font-serif text-xl">A Spirit of Hospitality</h3>
                <p className="mt-2 text-sm leading-6 text-[#F4EBDD]/70">
                  Creating a welcoming experience while celebrating
                  practical hospitality learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#F4EBDD]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B9A064]">
            <UtensilsCrossed className="h-5 w-5 text-[#74623D]" />
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#74623D]">
            The Classic Crush · Bakery &amp; Café
          </p>

          <h2 className="mt-5 font-serif text-4xl font-normal leading-tight sm:text-5xl">
            Made With Love.
            <br />
            <span className="italic text-[#74623D]">
              Shared With You.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#615B4D]">
            Find your next favourite among our desserts, bakery treats
            and café classics.
          </p>

          <button
            type="button"
            onClick={openMenu}
            className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#292D1D] bg-[#292D1D] px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#F4EBDD] transition-colors hover:bg-[#244536]"
          >
            View Our Menu
            <ArrowRight className="h-4 w-4 text-[#D4BD85]" />
          </button>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#B9A064]" />
            <Award className="h-4 w-4 text-[#74623D]" />
            <span className="h-px w-12 bg-[#B9A064]" />
          </div>
        </div>
      </section>
    </main>
  );
};
