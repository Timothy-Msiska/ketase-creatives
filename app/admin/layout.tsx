'use client';

import React from "react"

import { useAdmin } from '@/lib/admin-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAdmin();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, isMounted, router]);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1AA089]/10 mb-4">
            <div className="w-6 h-6 border-2 border-[#1AA089]/20 border-t-[#1AA089] rounded-full animate-spin" />
          </div>
          <p className="text-foreground font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto ml-64">
        {children}
      </main>
    </div>
  );
}
