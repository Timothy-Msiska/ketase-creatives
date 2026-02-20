'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

type GalleryItem = {
  id: number;
  title: string;
  year: number;
  image: string;
  slug: string;
};

const galleryData: Record<string, GalleryItem[]> = {
  Branding: [
    { id: 1, title: 'Luxury Brand Identity', year: 2024, image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80', slug: 'luxury-brand-identity' },
    { id: 2, title: 'Fashion Label Rebrand', year: 2023, image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80', slug: 'fashion-label-rebrand' },
  ],
  Digital: [
    { id: 3, title: 'SaaS Platform UI', year: 2024, image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80', slug: 'saas-platform-ui' },
    { id: 4, title: 'Creative Agency Website', year: 2023, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', slug: 'creative-agency-website' },
  ],
  Campaign: [
    { id: 5, title: 'Product Launch Campaign', year: 2023, image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', slug: 'product-launch-campaign' },
  ],
  Design: [
    { id: 6, title: 'Packaging Design', year: 2024, image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=1200&q=80', slug: 'packaging-design' },
  ],
};

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Branding');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...Object.keys(galleryData)];
  const allItems = useMemo(() => Object.values(galleryData).flat(), []);
  const items = activeCategory === 'All' ? allItems : galleryData[activeCategory];

  useEffect(() => {
    setVisibleItems([]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const nodes = containerRef.current?.querySelectorAll('[data-id]');
    nodes?.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [activeCategory]);

  const handleShowAll = () => setActiveCategory('All');

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Selected Works</h2>
          <p className="text-muted-foreground text-lg">
            A curated mix of branding, digital experiences, campaigns, and design.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 pb-6 border-b">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#1AA089] to-[#39B89B] text-white'
                  : 'border-2 border-[#1AA089] text-[#1AA089] hover:bg-[#1AA089] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              data-id={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border bg-white/5 backdrop-blur-sm"
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-[350px] object-cover rounded-2xl"
                animate={{
                  y: [0, -15, 0], // continuous bounce
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 3 + Math.random(),
                  ease: 'easeInOut',
                }}
              />
              <div className="absolute bottom-0 left-0 p-4 bg-black/40 w-full text-white">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm">{item.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <button
            onClick={handleShowAll}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#1AA089] to-[#39B89B] text-white font-bold hover:scale-105 transition-all"
          >
            All Projects
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
