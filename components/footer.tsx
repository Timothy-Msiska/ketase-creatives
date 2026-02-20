'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#1AA089]/5 float-shapes-slow" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-2xl text-[#1AA089] mb-4">Ketase Creatives</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              A creative and communications subsidiary of Ketase Group, delivering exceptional design and strategic solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#1AA089] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Brand Design',
                'Digital Experience',
                'Strategic Design',
                'Creative Direction',
              ].map((service) => (
                <li key={service}>
                  <span className="text-white/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#1AA089] mt-0.5 flex-shrink-0" />
                <a href="mailto:ketasecreatives@ketasegroup.com" className="text-white/70 hover:text-[#1AA089] transition-colors text-sm break-all">
                  ketasecreatives@ketasegroup.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#1AA089] mt-0.5 flex-shrink-0" />
                <a href="tel:+265985375552" className="text-white/70 hover:text-[#1AA089] transition-colors text-sm">
                  +265 (0) 985 375 552
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#1AA089] mt-0.5 flex-shrink-0" />
                <p className="text-white/70 text-sm">
                  Next to Gatewall Mall, Art Business Park, Off<br />
                  Kaunda Road, Lilongwe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © {currentYear} Ketase Tech. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/70 hover:text-[#1AA089] transition-colors text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
