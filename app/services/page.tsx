'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GalleryItem = {
  id: number;
  title: string;
  image: string;
  category: string;
  slug: string;
  year: number;
  description?: string;
};

const ITEMS: GalleryItem[] = [
  { id: 1, title: 'Brand & Logo Design', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop', category: 'Branding', slug: '/services/brand-identity', year: 2024, description: 'We create unforgettable brand identities that leave a lasting impression.' },
  { id: 2, title: 'Content Creation', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1600&auto=format&fit=crop', category: 'Digital', slug: '/services/digital-experience', year: 2023, description: 'Engaging and tailored content for digital platforms.' },
  { id: 3, title: 'Graphic Design', image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop', category: 'Branding', slug: '/services/corporate-branding', year: 2022, description: 'Creative graphics that communicate your brand vision.' },
  { id: 4, title: 'Marketing', image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1600&auto=format&fit=crop', category: 'Animation', slug: '/services/motion-animation', year: 2024, description: 'Marketing campaigns that make your brand shine.' },
  { id: 5, title: 'Social Media Management', image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1600&auto=format&fit=crop', category: 'Design', slug: '/services/packaging-design', year: 2021, description: 'Manage your social presence for maximum engagement.' },
  { id: 6, title: 'Communications', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop', category: 'Marketing', slug: '/services/event-campaign', year: 2024, description: 'Communications strategies to reach your audience effectively.' },
];

const CATEGORIES = ['All', 'Branding', 'Digital', 'Animation', 'Design', 'Marketing'];

export default function MagicalPortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleItems =
    activeCategory === 'All'
      ? ITEMS
      : ITEMS.filter(item => item.category === activeCategory);

  const selectedItem = selectedIndex !== null ? visibleItems[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + visibleItems.length) % visibleItems.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % visibleItems.length);
  };

  return (
    <main className="min-h-screen bg-white text-[#1AA089]">
      {/* ================= HEADER ================= */}
      <header className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#1AA089]">
          Magical Service
        </h1>
        <p className="text-lg text-[#1AA089] max-w-3xl mx-auto">
          A creative playground of branding, digital experiences, campaigns, and design.
        </p>
      </header>

      {/* ================= FILTERS ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1AA089] text-white'
                  : 'border border-[#1AA089] bg-white text-[#1AA089] hover:bg-[#1AA089] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= GAPLESS GRID ================= */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[20px] gap-6"
          style={{ gridAutoFlow: 'dense' }}
        >
          <AnimatePresence>
            {visibleItems.map((item, index) => {
              const span =
                index % 3 === 0
                  ? 'row-span-20'
                  : index % 3 === 1
                  ? 'row-span-16'
                  : 'row-span-18';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={span}
                >
                  <div
                    onClick={() => setSelectedIndex(index)}
                    className="group relative block h-full cursor-pointer overflow-hidden rounded-xl bg-neutral-900"
                  >
                    {/* Bouncing Image */}
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 3 + Math.random(),
                        ease: 'easeInOut',
                      }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="block text-xs uppercase tracking-wide text-white/70">
                        {item.year}
                      </span>
                      <h3 className="mt-1 mb-3 text-xl font-semibold">{item.title}</h3>
                      <div className="flex items-center gap-2 transition-all group-hover:gap-4 text-sm uppercase tracking-wide font-semibold">
                        View Details
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ================= MODAL CAROUSEL ================= */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-20"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 z-20"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 z-20"
              >
                <ArrowRight size={24} />
              </button>

              {/* Image */}
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-[#1AA089]">
                <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>
                <span className="block mb-2 text-sm uppercase tracking-wide text-gray-500">
                  {selectedItem.year} • {selectedItem.category}
                </span>
                <p className="text-base">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}