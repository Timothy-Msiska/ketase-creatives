'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const galleryItems = [
  { id: 1, title: 'Brand Identity', image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Digital Design', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Campaign Work', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Social Media Content', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Creative Direction', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Illustration', image: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=800&q=80' },
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-20 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1AA089]/10 border border-[#1AA089]/30 transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <Sparkles size={16} className="text-[#1AA089]" />
            <span className="text-sm font-semibold text-[#1AA089]">
              Explore Our Creative Playground
            </span>
          </div>

          <h1
            className={`text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="block text-foreground">Visual Stories That</span>
            <span className="block bg-gradient-to-r from-[#1AA089] via-[#39B89B] to-[#EBE833] bg-clip-text text-transparent">
              Inspire & Engage
            </span>
          </h1>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            Dive into our diverse portfolio of creative work across branding, design, digital experiences, and more.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              animate={{ y: [0, -15, 0] }} // subtle bounce
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 3 + Math.random(),
                ease: 'easeInOut',
              }}
            >
              <div
                className="relative h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)',
                  opacity: hoveredId && hoveredId !== item.id ? 0.6 : 1,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div
                    className={`w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center mb-3 transition-all duration-300 ${
                      hoveredId === item.id ? 'scale-110 border-white' : 'scale-100'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                  </div>
                  <h3 className="font-bold text-center px-2">{item.title}</h3>
                </div>

                {/* Hover Arrow */}
                <div
                  className={`absolute bottom-4 right-4 transition-all duration-300 ${
                    hoveredId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <ArrowRight className="text-white" size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}