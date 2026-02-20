'use client';

import React from "react"

import { useState } from 'react';
import { Footer } from '@/components/footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="w-full overflow-hidden">
      {/* Hero section */}
      <section className="relative py-20 md:py-32 bg-background overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#5FD1B6]/10 to-transparent float-shapes-slow" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-gradient-to-tl from-[#39B89B]/10 to-transparent float-shapes" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 slide-up">
            Let's Talk
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            Have a project in mind? Get in touch and let's create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 md:py-32 bg-[#f5f5f5] relative overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-gradient-to-bl from-[#1AA089]/5 to-transparent float-shapes" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8 slide-up">
                Get In Touch
              </h2>

              {/* Contact methods */}
              <div className="space-y-6">
                <div className="flex gap-4 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1AA089]/10 group-hover:bg-[#1AA089]/20 transition-all duration-300">
                    <Mail className="text-[#1AA089]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Email</h3>
                    <a href="mailto:creatives@ketasegroup.com" className="text-muted-foreground hover:text-[#1AA089] transition-colors">
                     creatives@ketasegroup.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1AA089]/10 group-hover:bg-[#1AA089]/20 transition-all duration-300">
                    <Phone className="text-[#1AA089]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Phone</h3>
                    <a href="tel:+265985375552" className="text-muted-foreground hover:text-[#1AA089] transition-colors">
                      +265 (0) 985 375 552
                    </a>
                </div>
              </div>
                  
                <a
                  href="https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=Art+Business+Park,+Off+Kaunda+Road,+Lilongwe&travelmode=driving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1AA089]/10 group-hover:bg-[#1AA089]/20 transition-all duration-300">
                    <MapPin className="text-[#1AA089]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-[#1AA089] transition-colors">
                      Office
                    </h3>
                    <p className="text-muted-foreground group-hover:text-[#1AA089] transition-colors">
                      Next to Gatewall Mall, <br /> Art Business Park, Off <br />
                      Kaunda Road, Lilongwe
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="bg-white p-8 rounded-xl border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors duration-300"
                    placeholder="Your company"
                  />
                </div>

                {/* <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="branding">Branding Project</option>
                    <option value="digital">Digital Design</option>
                    <option value="campaign">Marketing Campaign</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div> */}

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#1AA089] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center px-8 py-4 bg-[#1AA089] text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Send Message
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>

                {submitted && (
                  <div className="p-4 bg-[#1AA089]/10 border border-[#1AA089] rounded-lg text-[#1AA089] font-semibold text-center animate-in fade-in-50 duration-300">
                    Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
