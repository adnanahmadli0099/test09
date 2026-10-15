import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppQuoteUrl } from '../data/companyInfo';
import { submitContactMessageToFirestore } from '../services/firebase';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactMessageToFirestore({
        id: `msg-${Date.now()}`,
        name: formData.name || 'Visitor',
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.institution ? `Inquiry from ${formData.institution}` : 'General Inquiry',
        message: formData.message,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Contact message save note:', err);
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
            Reach Out to Our Institutional Team
          </span>
          <h1 className="font-display text-3xl font-bold text-[#0E2954] mt-1 tracking-tight">
            Contact Decent School Furniture
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Whether you are ordering 20 desks or outfitting an entire university campus of 2,000 students, we are ready to assist with quotations, samples, and facility tours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
                Direct Contact Channels
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Head Office & Inquiries</div>
                  <a
                    href={`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {COMPANY_INFO.contact.phone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Available Mon–Sat: 9 AM to 7 PM</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">WhatsApp Instant Support</div>
                  <a
                    href={getWhatsAppQuoteUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{COMPANY_INFO.contact.whatsapp}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant quotes, photos & video walkthroughs</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Inquiries</div>
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                  >
                    {COMPANY_INFO.contact.email}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Official tender documents & bill of quantities</p>
                </div>
              </div>

              {/* Factory Address */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Manufacturing Plant & Showroom</div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug mt-0.5">
                    {COMPANY_INFO.contact.address}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Visitors welcome by appointment. Experience our full mock classroom displays.
                  </p>
                </div>
              </div>
            </div>

            {/* Factory Visit Notice */}
            <div className="bg-gradient-to-r from-blue-900 to-[#0E2954] text-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-sm">Schedule a Factory Inspection</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                School heads and procurement committees are invited to inspect our raw steel, powder-coating ovens, and load-testing apparatus in person.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Send an Official Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your details and an educational furniture consultant will follow up promptly.
            </p>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-slate-900">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                  Thank you for contacting Decent School Furniture. We have dispatched your request to our regional sales officer.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Institution Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. Oxford Public School"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
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
                      placeholder="admin@school.edu.pk"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Inquiry Details / Furniture Requirements <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on quantities, desired delivery date, campus location, or any specific models you have seen on our site..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry to Sales Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
