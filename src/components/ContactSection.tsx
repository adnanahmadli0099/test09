import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppQuoteUrl } from '../data/companyInfo';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus('error');
      return;
    }

    // Save demo inquiry to localStorage as specified in prompt
    try {
      const savedInquiries = JSON.parse(localStorage.getItem('dsf_inquiries') || '[]');
      savedInquiries.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('dsf_inquiries', JSON.stringify(savedInquiries));
    } catch {
      // Ignore storage errors
    }

    setStatus('success');
  };

  return (
    <section className="bg-[#0B192C] text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Subtle school pattern watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-4 text-left">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
              Get in Touch
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Have a question or need a custom quote? We're here to help.
            </p>

            <div className="mt-8 space-y-6">
              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3 text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-orange-400 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Call Us</div>
                  <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {COMPANY_INFO.contact.phone}
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={getWhatsAppQuoteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">WhatsApp</div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {COMPANY_INFO.contact.whatsapp}
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="flex items-start gap-3 text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Us</div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {COMPANY_INFO.contact.email}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Center Column: Interactive Form */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Thank you for contacting Decent School Furniture. Our institutional sales team will reply within 2-4 business hours.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="mt-6 text-xs font-bold text-orange-500 hover:text-orange-600 cursor-pointer underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@school.edu"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your institution, required furniture units or custom requirements..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50 resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please fill in all required fields.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden bg-slate-800/60 p-4 border border-slate-700/80 shadow-xl group max-w-[280px]">
              <img
                src="/src/assets/images/student_desk_chair_1792007659142.jpg"
                alt="Decent Student Desk and Chair Set"
                className="w-full h-auto rounded-xl object-contain bg-white/95 p-3 group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="mt-3 text-center">
                <div className="text-xs font-bold text-white">Classic Single Student Desk</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Heavy gauge steel · 5-yr warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
