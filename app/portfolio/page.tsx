'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/service';

const categories = ['All', 'Branding', 'Digital', 'Campaign', 'Design'];

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered: PortfolioItem[] =
    selectedCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((i) => i.category === selectedCategory);

  // Reset visible items when category changes
  useEffect(() => {
    setVisibleItems([]);
  }, [selectedCategory]);

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) =>
              prev.includes(id) ? prev : [...prev, id]
            );
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = Array.from(
      containerRef.current?.querySelectorAll('[data-id]') || []
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filtered]);

  // Scroll to first item after filter change
  useEffect(() => {
    if (filtered.length > 0 && containerRef.current) {
      const firstItem = containerRef.current.querySelector(
        `[data-id="${filtered[0].id}"]`
      );
      firstItem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filtered]);

  return (
    <main className="w-full overflow-hidden">

      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#1AA089]">
          Portfolio
        </h1>
        <p className="mt-4 text-[#1AA089]/70">
          A showcase of our creative work.
        </p>
      </section>

      {/* FILTER */}
      <section className="pb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#1AA089] text-white'
                  : 'border border-[#1AA089] text-[#1AA089]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="pb-32">
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((item, i) => {
            const visible = visibleItems.includes(item.id);

            return (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}?category=${item.category}`}
                data-id={item.id}
                className="block"
              >
                <motion.div
                  animate={visible ? { y: [0, -10, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`rounded-2xl overflow-hidden shadow-md transition duration-500 hover:scale-105 ${
                    visible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    rotate: 0, // Cards upright
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="relative h-72">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />

                    {/* Hover info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition flex items-end p-6">
                      <div className="text-white">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm">
                          {item.client} • {item.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}