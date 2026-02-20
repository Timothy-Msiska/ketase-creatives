'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Lightbulb,
  Target,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/* ---------------- TYPES ---------------- */

type Person = {
  name: string;
  image: string;
};

type TeamRole = {
  role: string;
  icon: any;
  people: Person[];
};

/* ---------------- DATA ---------------- */

const principles = [
  {
    title: 'Clarity Before Creativity',
    text: 'We define before we design. Insight always leads aesthetics.',
  },
  {
    title: 'Human Over Hype',
    text: 'We build for people — not algorithms, not trends.',
  },
  {
    title: 'Systems, Not Surfaces',
    text: 'Our work evolves. It scales. It lasts.',
  },
];

const team: TeamRole[] = [
  {
    role: 'Creative Director',
    icon: Lightbulb,
    people: [
      {
        name: 'John Doe',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    role: 'Graphic Designer',
    icon: Target,
    people: [
      {
        name: 'Jane Doe',
        image:
          'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    role: 'Brand Strategist',
    icon: Award,
    people: [
      {
        name: 'Mary Phiri',
        image:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    role: 'Marketing Lead',
    icon: Users,
    people: [
      {
        name: 'Chris Banda',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
];

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TeamRole | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  const close = () => {
    setActive(null);
    setIndex(0);
  };

  const next = () => active && setIndex((i) => (i + 1) % active.people.length);
  const prev = () =>
    active && setIndex((i) => (i === 0 ? active.people.length - 1 : i - 1));

  return (
    <main className="overflow-hidden bg-white text-[#1AA089]">

      {/* ---------------- HERO ---------------- */}
      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="uppercase tracking-[0.4em] text-xs text-muted-foreground">
            Creative Studio
          </p>

          <h1 className="mt-8 text-6xl md:text-8xl font-heading font-bold leading-[0.9]">
            We design<br />with intention.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground">
            Strategy-driven branding and digital systems crafted with clarity,
            precision, and purpose.
          </p>
        </motion.div>
      </section>

      {/* ---------------- PHILOSOPHY ---------------- */}
      <section className="relative py-36 bg-[#1AA089] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.4em] text-xs text-white/70 mb-4">
              Philosophy
            </p>
            <h2 className="text-5xl md:text-6xl font-bold">
              Philosophy for Creatives
            </h2>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center relative">

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl leading-relaxed text-white/90 relative z-10"
            >
              Design is not decoration — it is direction, positioning, and structure. 
              We treat every project like architecture, mapping the blueprint before shaping the aesthetic. 
              Clarity comes first. Form follows intention. Strategy guides expression, 
              and every visual decision serves a purpose larger than appearance.
            </motion.p>

            {/* Image + Creative Elements */}
            <div className="relative h-[32rem] rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80"
                alt="Creative workspace"
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Floating Shapes */}
              <motion.div
                animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-16 h-16 rounded-full bg-white/10 top-10 left-10"
              />
              <motion.div
                animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-24 h-24 rounded-full bg-white/5 bottom-20 right-16"
              />

              {/* Floating Words */}
              <motion.span
                animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute text-3xl font-bold text-white/20 top-32 left-1/4 pointer-events-none"
              >
                CLARITY
              </motion.span>
              <motion.span
                animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute text-3xl font-bold text-white/20 bottom-24 right-1/3 pointer-events-none"
              >
                INTENTION
              </motion.span>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- PRINCIPLES ---------------- */}
      <section className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-heading font-bold text-center mb-20">
            Our Core Principles
          </h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-14"
          >
            {principles.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                {/* Animated blue line — now extends longer on hover */}
                <motion.div
                  className="h-1 bg-[#1AA089] mb-6"
                  initial={{ width: "4rem" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <h3 className="text-2xl font-heading font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- COLLECTIVE ---------------- */}
      <section className="py-40 bg-[#f6f6f6] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">The Collective</h2>
          <p className="text-muted-foreground mb-20">Designers. Thinkers. Builders.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {team.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(item)}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                  whileHover={{ y: -25, scale: 1.05 }}
                  className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition"
                >
                  <Icon size={36} className="mx-auto mb-6 text-[#1AA089]" />
                  <p className="font-heading font-bold text-sm">{item.role}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- TEAM MODAL ---------------- */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-black rounded-3xl overflow-hidden"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 bg-white/20 p-2 rounded-full"
            >
              <X size={18} className="text-white" />
            </button>

            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
              {active.people.map((person, i) => (
                <div key={i} className="min-w-full h-[26rem] relative">
                  <img src={person.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-heading font-bold">{person.name}</h3>
                      <p className="text-sm text-gray-300">{active.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {active.people.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full">
                  <ChevronLeft size={18} className="text-white" />
                </button>
                <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full">
                  <ChevronRight size={18} className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
