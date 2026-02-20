'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/lib/admin-context';
import { LayoutDashboard, FileText, Zap, ImageIcon, MessageSquare, LogOut } from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Pages',
    href: '/admin/pages',
    icon: FileText,
  },
  {
    label: 'Services',
    href: '/admin/services',
    icon: Zap,
  },
  {
    label: 'Portfolio',
    href: '/admin/portfolio',
    icon: ImageIcon,
  },
  {
    label: 'Inquiries',
    href: '/admin/inquiries',
    icon: MessageSquare,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdmin();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] text-white border-r border-[#333] overflow-y-auto">
      {/* Logo area */}
      <div className="p-6 border-b border-[#333]">
        <h2 className="font-heading font-bold text-2xl text-[#1AA089]">KC Admin</h2>
        <p className="text-white/70 text-sm mt-2">Ketase Creatives</p>
      </div>

      {/* User info */}
      <div className="p-6 border-b border-[#333] space-y-2">
        <p className="text-sm text-white/70">Logged in as</p>
        <p className="font-semibold text-white">{user?.name}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1AA089]/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#1AA089]" />
          <span className="text-xs text-[#1AA089] font-semibold capitalize">{user?.role.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-[#1AA089] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#333] bg-[#1a1a1a]">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
