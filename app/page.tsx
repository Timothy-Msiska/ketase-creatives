'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/hero';
import { Capabilities } from '@/components/capabilities';
import { Gallery } from '@/components/gallery';
import { CTASection } from '@/components/cta-section';

function LoadingLogo() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img
        src="/creatives1.png"
        alt="Ketase Creatives Logo"
        className="logo-loader"
      />
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingLogo />}

      {!loading && (
        <main className="relative w-full overflow-hidden">
          {/* Background brand circles */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className={`
                  absolute rounded-full
                  blur-3xl
                  animate-float
                  ${
                    [
                      'bg-[var(--chart-1)]/14',
                      'bg-[var(--chart-2)]/14',
                      'bg-[var(--chart-3)]/14',
                      'bg-[var(--chart-4)]/12',
                      'bg-[var(--chart-5)]/18',
                    ][i % 5]
                  }
                `}
                style={{
                  width: `${160 + (i % 4) * 110}px`,
                  height: `${160 + (i % 4) * 110}px`,
                  top: `${(i * 17) % 100}%`,
                  left: `${(i * 31) % 100}%`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </div>

          {/* Page sections */}
          <Hero />
          <Capabilities />
          <Gallery />
          <CTASection />
        </main>
      )}

      {/* Loader animation */}
      <style jsx global>{`
        @keyframes logo-spin-grow {
          0% {
            transform: rotate(0deg) scale(0.6);
          }

          70% {
            transform: rotate(252deg) scale(0.6);
          }

          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .logo-loader {
          width: 180px;
          height: 180px;
          animation: logo-spin-grow 2.5s linear forwards;
        }
      `}</style>
    </>
  );
}
