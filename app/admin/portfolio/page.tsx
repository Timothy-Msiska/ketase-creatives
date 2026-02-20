'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const mockPortfolio = [
  {
    id: 1,
    title: 'Luxury Brand Identity',
    year: 2024,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5fa?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Digital Platform Redesign',
    year: 2024,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    year: 2023,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop',
  },
];

export default function PortfolioManagementPage() {
  const [items, setItems] = useState(mockPortfolio);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Portfolio Management
          </h1>
          <p className="text-muted-foreground">
            Manage portfolio projects and case studies
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1AA089] text-white font-semibold rounded-lg hover:shadow-lg transition-all">
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="h-48 overflow-hidden bg-[#f5f5f5]">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.year}</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                  Published
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <button className="flex-1 p-2 flex items-center justify-center gap-2 hover:bg-[#f5f5f5] rounded-lg transition-colors text-[#1AA089]">
                  <Edit2 size={18} />
                  <span className="text-sm font-semibold">Edit</span>
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
