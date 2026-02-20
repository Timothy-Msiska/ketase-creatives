'use client';

import { useState, useEffect } from 'react';
import { getPageById, updatePage } from '@/lib/admin-pages';
import { useAdmin } from '@/lib/admin-context';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
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

export default function PageEditorPage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState<PageData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    const foundPage = getPageById(params.id);
    if (foundPage) {
      setPage(foundPage);
    }
  }, [params.id]);

  const handleSave = async () => {
    if (!page || !user) return;

    setIsSaving(true);
    try {
      updatePage(page.id, page, user.name);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('[v0] Failed to save page:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!page) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground">
              {page.title}
            </h1>
            <p className="text-muted-foreground">
              Version {page.version} • Last modified {new Date(page.lastModified).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1AA089] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Saved notification */}
      {saved && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-semibold animate-in fade-in-50 duration-300">
          ✓ Page saved successfully
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
              Page Title
            </label>
            <input
              type="text"
              id="title"
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors"
            />
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <label htmlFor="slug" className="block text-sm font-semibold text-foreground mb-2">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <input
                type="text"
                id="slug"
                value={page.slug}
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <label htmlFor="content" className="block text-sm font-semibold text-foreground mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={page.content}
              onChange={(e) => setPage({ ...page, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-border p-6">
            <label htmlFor="status" className="block text-sm font-semibold text-foreground mb-2">
              Status
            </label>
            <select
              id="status"
              value={page.status}
              onChange={(e) => setPage({ ...page, status: e.target.value as any })}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Info */}
          <div className="bg-[#f5f5f5] rounded-xl p-6">
            <h3 className="font-heading font-bold text-foreground mb-4">Page Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Page ID</p>
                <code className="text-xs bg-white px-2 py-1 rounded text-foreground">{page.id}</code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Created</p>
                <p className="text-foreground">{new Date(page.lastModified).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Last Modified By</p>
                <p className="text-foreground">{page.modifiedBy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
