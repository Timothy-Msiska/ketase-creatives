'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-[#1AA089] to-[#39B89B] relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/5 float-shapes" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-white/5 float-shapes-slow" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 transition-all duration-1000 ${
            isLoaded ? 'fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          Let's Create Something Extraordinary
        </h2>

        <p
          className={`text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
            isLoaded ? 'fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        >
          Ready to elevate your brand? Let's discuss your vision and how we can bring it to life with creative excellence.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${
            isLoaded ? 'fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 bg-[#EBE833] text-[#1AA089] font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Explore Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
