'use client';

import { use } from 'react';
import { SERVICES_CONTENT } from '../service-content';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServicePageProps {
  params: { slug: string };
}

export default async function ServicePage(props: ServicePageProps) {
  // unwrap the async params
  const { slug } = await props.params;

  const slugPath = `/services/${slug}`;

  const service = SERVICES_CONTENT.find((item) => item.slug === slugPath);

  if (!service) {
    return <p className="text-center mt-32 text-xl">Service not found.</p>;
  }

  return (
    <main className="min-h-screen bg-white text-black px-4 md:px-12 py-24">
      <header className="text-center mb-12">
        <h1 className="text-5xl text-[#1AA089] font-bold mb-4">{service.title}</h1>
        <p className="text-lg text-black/60 max-w-3xl mx-auto">{service.overview}</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-80 md:h-full rounded-xl overflow-hidden shadow-lg">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-semibold">Strategic Objective</h2>
          <p className="text-black/80">{service.strategicObjective}</p>

          <h2 className="text-2xl font-semibold mt-6">Execution Summary</h2>
          <p className="text-black/80">{service.executionSummary}</p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 text-[#1AA089] font-semibold hover:underline"
          >
            ← Back to Services
          </Link>
        </div>
      </section>
    </main>
  );
}
