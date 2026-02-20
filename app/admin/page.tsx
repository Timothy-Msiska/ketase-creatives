'use client';

import { useAdmin } from '@/lib/admin-context';
import { getPagesData } from '@/lib/admin-pages';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Zap, ImageIcon, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

interface DashboardStats {
  totalPages: number;
  draftPages: number;
  totalServices: number;
  totalPortfolio: number;
  pendingReviews: number;
}

export default function AdminDashboardPage() {
  const { user } = useAdmin();
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    draftPages: 0,
    totalServices: 0,
    totalPortfolio: 0,
    pendingReviews: 0,
  });

  useEffect(() => {
    const pages = getPagesData();
    setStats({
      totalPages: pages.length,
      draftPages: pages.filter((p) => p.status === 'draft').length,
      totalServices: 6, // Mock data
      totalPortfolio: 6, // Mock data
      pendingReviews: pages.filter((p) => p.status === 'review').length,
    });
  }, []);

  const recentActivity = [
    { id: 1, action: 'Page updated', item: 'Home Page', time: '2 hours ago', icon: FileText },
    { id: 2, action: 'Service created', item: 'Brand Design', time: '5 hours ago', icon: Zap },
    { id: 3, action: 'Portfolio item', item: 'Luxury Brand Identity', time: '1 day ago', icon: ImageIcon },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your content
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Total Pages',
            value: stats.totalPages,
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
          },
          {
            label: 'Draft Pages',
            value: stats.draftPages,
            icon: AlertCircle,
            color: 'from-yellow-500 to-yellow-600',
          },
          {
            label: 'Services',
            value: stats.totalServices,
            icon: Zap,
            color: 'from-purple-500 to-purple-600',
          },
          {
            label: 'Portfolio Items',
            value: stats.totalPortfolio,
            icon: ImageIcon,
            color: 'from-green-500 to-green-600',
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`rounded-xl bg-gradient-to-br ${stat.color} p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-semibold mb-1">{stat.label}</p>
                  <p className="text-4xl font-heading font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icon size={32} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Manage Pages', href: '/admin/pages', icon: FileText },
                { label: 'Edit Services', href: '/admin/services', icon: Zap },
                { label: 'Portfolio', href: '/admin/portfolio', icon: ImageIcon },
                { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="p-4 rounded-lg border border-border hover:border-[#1AA089] hover:bg-[#f5f5f5] transition-all duration-300 flex flex-col items-center gap-2 text-center"
                  >
                    <Icon className="text-[#1AA089]" size={24} />
                    <span className="font-semibold text-sm text-foreground">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                  <div className="p-2 rounded-lg bg-[#1AA089]/10">
                    <Icon className="text-[#1AA089]" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{activity.action}</p>
                    <p className="text-muted-foreground text-xs">{activity.item}</p>
                    <p className="text-muted-foreground text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending approvals */}
      {stats.pendingReviews > 0 && (
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertCircle className="text-blue-600" size={32} />
              <div>
                <h3 className="font-heading font-bold text-blue-900 mb-1">
                  {stats.pendingReviews} items pending approval
                </h3>
                <p className="text-blue-800 text-sm">
                  Review and approve pending content changes
                </p>
              </div>
            </div>
            <Link
              href="/admin/pages?filter=review"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
