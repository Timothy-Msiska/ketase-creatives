'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/app/data/service';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [caseStudy, setCaseStudy] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (!slug) return;
    const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
    if (!item) router.replace('/portfolio');
    else setCaseStudy(item);
  }, [slug, router]);

  if (!caseStudy) return null;

  return (
    <main className="w-full overflow-hidden bg-white relative">
      {/* PLAYFUL ICON BACK BUTTON */}
      <motion.div
        animate={{ y: ['0%', '-10%', '0%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-8 right-8 z-50"
      >
        <Link href="/portfolio">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            className="bg-[#1AA089] text-white p-4 rounded-full shadow-2xl cursor-pointer flex items-center justify-center"
          >
            <ArrowLeft size={28} />
          </motion.div>
        </Link>
      </motion.div>

      {/* HERO */}
      <section className="relative py-24 md:py-32 text-center bg-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-[#1AA089] drop-shadow-lg"
        >
          {caseStudy.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 text-[#1AA089]/80"
        >
          <span>{caseStudy.year}</span>
          <span>•</span>
          <span>{caseStudy.category}</span>
          <span>•</span>
          <span>{caseStudy.client}</span>
        </motion.div>
      </section>

      {/* FEATURED IMAGE */}
      <section className="px-4 py-20">
        <motion.div
          animate={{ y: ['0%', '-5%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative max-w-6xl mx-auto h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1AA089]"
        >
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        </motion.div>
      </section>

      {/* CONTENT: Vertical zig-zag timeline */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 relative">
          {['Overview', 'Process', 'Outcome'].map((section, idx) => {
            const content = caseStudy.details.find((d) => d.title === section)?.content;
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={section}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`flex flex-col md:flex-row items-center my-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Image circle */}
                <motion.div
                  animate={{ y: ['0%', '-5%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-[#1AA089] flex-shrink-0 md:mx-8 mb-4 md:mb-0"
                >
                  <Image
                    src={caseStudy.image}
                    alt={section}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Text content */}
                <div className="bg-white p-6 rounded-2xl shadow-md md:max-w-xl border-l-4 border-[#1AA089]">
                  <h3 className="text-2xl font-bold mb-2 text-[#39B89B]">{section}</h3>
                  <p className="text-[#1AA089]/90 leading-relaxed">{content}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DETAILS BAR */}
      <section className="py-12 text-center">
        <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#39B89B]">
          <h4 className="text-xl font-bold text-[#39B89B] mb-2">Client</h4>
          <p className="text-[#1AA089]/90">{caseStudy.client}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-[#1AA089] to-[#39B89B]">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg"
        >
          Ready to Start Your Project?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 text-white/90"
        >
          Let’s bring your vision to life with creative excellence.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#1AA089] font-semibold rounded-lg shadow-lg transition"
          >
            Get In Touch
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}