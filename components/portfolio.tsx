'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Luxury Brand Identity',
    year: 2024,
    services: ['Branding', 'Visual Design'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5fa?w=600&h=400&fit=crop',
    slug: 'luxury-brand-identity',
  },
  {
    id: 2,
    title: 'Digital Platform Redesign',
    year: 2024,
    services: ['UX/UI', 'Web Design'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    slug: 'digital-platform-redesign',
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    year: 2023,
    services: ['Campaign Design', 'Creative Direction'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    slug: 'marketing-campaign',
  },
  {
    id: 4,
    title: 'Brand Refresh',
    year: 2023,
    services: ['Branding', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5fa?w=600&h=400&fit=crop',
    slug: 'brand-refresh',
  },
  {
    id: 5,
    title: 'Web Application',
    year: 2023,
    services: ['UX/UI', 'Development'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    slug: 'web-application',
  },
  {
    id: 6,
    title: 'Package Design',
    year: 2023,
    services: ['Product Design', 'Branding'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5fa?w=600&h=400&fit=crop',
    slug: 'package-design',
  },
];

export function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-portfolio-id') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll('[data-portfolio-id]');
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#5FD1B6]/5 to-transparent float-shapes" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Explore our latest projects and see how we bring creative visions to life.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-[#1AA089] font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Projects
            <ArrowRight size={20} />
          </Link>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => {
            const isVisible = visibleItems.includes(item.id);

            return (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                data-portfolio-id={item.id}
                className={`group overflow-hidden rounded-xl border border-border hover:border-[#1AA089] transition-all duration-500 cursor-pointer ${
                  isVisible ? 'slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image container */}
                <div className="relative h-64 overflow-hidden bg-[#f5f5f5] image-overlay-reveal">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover image-tilt"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1AA089]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-heading font-bold mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.services.map((service) => (
                          <span
                            key={service}
                            className="text-sm bg-[#39B89B]/80 px-3 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-[#1AA089] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{item.year}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.services.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        className="text-xs font-semibold text-[#1AA089] bg-[#1AA089]/10 px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
