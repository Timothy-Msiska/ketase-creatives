'use client';

import { useState, useEffect } from 'react';
import { getPagesData } from '@/lib/admin-pages';
import { useAdmin } from '@/lib/admin-context';
import { Edit2, Plus, Archive } from 'lucide-react';
import Link from 'next/link';

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  content: string;
  lastModified: string;
  modifiedBy: string;
  version: number;
}

export default function PagesManagementPage() {
  const [pages, setPages] = useState<PageData[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const { user } = useAdmin();

  useEffect(() => {
    const allPages = getPagesData();
    setPages(allPages);
  }, []);

  const filteredPages =
    filter === 'all'
      ? pages
      : pages.filter((page) => page.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Page Management
          </h1>
          <p className="text-muted-foreground">
            Manage and edit website pages
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1AA089] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          New Page
        </Link>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['all', 'draft', 'review', 'approved', 'published'].map((status) => (
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

      {/* Pages table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-[#f5f5f5]">
                <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground">
                  Version
                </th>
                <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground">
                  Modified
                </th>
                <th className="px-6 py-4 text-left text-sm font-heading font-bold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No pages found
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="border-b border-border hover:bg-[#f5f5f5] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{page.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-[#f5f5f5] px-2 py-1 rounded text-muted-foreground">
                        /{page.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(page.status)}`}>
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">
                      v{page.version}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div>
                        <p>{new Date(page.lastModified).toLocaleDateString()}</p>
                        <p className="text-xs">{page.modifiedBy}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/pages/${page.id}`}
                          className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                          title="Edit page"
                        >
                          <Edit2 size={18} className="text-[#1AA089]" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
