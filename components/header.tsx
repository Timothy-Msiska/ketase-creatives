'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current === 0) {
        setIsScrolled(false);
        setIsVisible(true);
      } else if (current < lastScrollY) {
        setIsScrolled(true);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        setIsVisible(false);
      }
      setLastScrollY(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        flex justify-center
        transition-transform duration-500 ease-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'}
      `}
    >
      <nav
        className={`
          flex items-center justify-between
          transition-all duration-500 ease-out
          w-11/12 md:w-10/12 max-w-4xl px-8 py-4 rounded-full
          ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/ketase-creatives-logo.svg"
            alt="Ketase Creatives"
            width={220}
            height={66}
            priority
            className="w-auto h-11 md:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-black">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold hover:text-[#1AA089] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="h-10 px-6 flex items-center justify-center rounded-full bg-[#1AA089] text-white font-semibold transition-all duration-300 hover:bg-[#13806d] hover:scale-105 shadow-[0_6px_20px_rgba(26,160,137,0.35)]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl overflow-hidden animate-slide-down">
          <div className="flex flex-col items-center py-6 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xl font-semibold text-[#1AA089] hover:text-[#13806d] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#1AA089] text-white rounded-full font-semibold hover:bg-[#13806d] hover:scale-105 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}