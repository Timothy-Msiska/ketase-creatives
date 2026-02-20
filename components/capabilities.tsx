'use client';

import { useEffect, useRef, useState } from 'react';
import { Palette, Zap, Layout, Target } from 'lucide-react';

const capabilities = [
  { icon: Palette, title: 'Brand Design', description: 'Crafting visual identities that pop and linger in memory.' },
  { icon: Layout, title: 'Digital Experience', description: 'Interfaces that delight users while telling your story.' },
  { icon: Target, title: 'Strategic Design', description: 'Design that hits the target and moves the needle.' },
  { icon: Zap, title: 'Creative Direction', description: 'Campaigns that spark imagination and get results.' },
];

const rotations = ['-10deg', '6deg', '-4deg', '8deg'];

export function Capabilities() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => cards?.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-[#f5f5f5] to-white">

      {/* ================= BALANCED BACKGROUND CIRCLES ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left empty space */}
        <span className="absolute w-[360px] h-[360px] rounded-full bg-emerald-500/8 -top-32 -left-32 animate-float-slow" />

        {/* Top-right header breathing space */}
        <span className="absolute w-[260px] h-[260px] rounded-full bg-teal-500/8 top-24 right-12 animate-float-fast" />

        {/* Middle-left gap between cards */}
        <span className="absolute w-[220px] h-[220px] rounded-full bg-emerald-400/6 top-1/2 -left-24 animate-float-slow" />

        {/* Bottom-right empty area after grid */}
        <span className="absolute w-[420px] h-[420px] rounded-full bg-teal-400/6 -bottom-48 -right-48 animate-float-fast" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            Our Core Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A messy, chaotic playground of creativity — every card tells a story, every hover surprises.
          </p>
        </div>

        {/* Cards */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                data-index={index}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative p-8 rounded-3xl border shadow-xl cursor-pointer transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  ${hoveredId === index ? 'scale-110 rotate-0 z-20' : `rotate(${rotations[index % rotations.length]})`}
                `}
              >
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-white/30 mb-4">
                    <Icon className="text-[#1AA089]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FLOAT ANIMATION ================= */}
      <style jsx global>{`
        @keyframes floatSlow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0); }
        }

        @keyframes floatFast {
          0% { transform: translateY(0); }
          50% { transform: translateY(-22px); }
          100% { transform: translateY(0); }
        }

        .animate-float-slow {
          animation: floatSlow 20s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: floatFast 26s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
