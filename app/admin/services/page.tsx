'use client';

import { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import Link from 'next/link';

const mockServices = [
  {
    id: 1,
    title: 'Brand Design',
    description: 'Create comprehensive brand identities',
    icon: '🎨',
    status: 'published',
  },
  {
    id: 2,
    title: 'Digital Experience',
    description: 'Design and develop beautiful digital platforms',
    icon: '💻',
    status: 'published',
  },
  {
    id: 3,
    title: 'Strategic Design',
    description: 'Align creative vision with business objectives',
    icon: '🎯',
    status: 'published',
  },
  {
    id: 4,
    title: 'Creative Direction',
    description: 'Lead comprehensive creative campaigns',
    icon: '✨',
    status: 'published',
  },
];

export default function ServicesManagementPage() {
  const [services, setServices] = useState(mockServices);
  const [filter, setFilter] = useState('all');

  const filteredServices =
    filter === 'all'
      ? services
      : services.filter((s) => s.status === filter);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Services Management
          </h1>
          <p className="text-muted-foreground">
            Manage and edit service offerings
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1AA089] text-white font-semibold rounded-lg hover:shadow-lg transition-all">
          <Plus size={20} />
          New Service
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['all', 'draft', 'published'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === status
                ? 'bg-[#1AA089] text-white'
                : 'bg-white border border-border text-foreground hover:border-[#1AA089]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{service.icon}</div>
              <button className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
                <Edit2 size={20} className="text-[#1AA089]" />
              </button>
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                Published
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
