import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, Search, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppQuoteUrl } from '../data/companyInfo';

export const FaqView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = ['All', 'Orders', 'Customization', 'Delivery', 'Warranty'];

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((f) => {
    if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
            Institutional Procurement Guide
          </span>
          <h1 className="font-display text-3xl font-bold text-[#0E2954] mt-1 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Find immediate answers regarding orders, warranties, custom sizes, delivery timelines and institutional payment terms.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. warranty, MOQ, delivery)..."
              className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 pt-6 border-t border-slate-100">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === c
                    ? 'bg-[#0E2954] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-xs text-slate-500 border border-slate-200">
              No questions found matching your search. Please reach out to us directly!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-orange-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions? Help card */}
        <div className="mt-10 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 text-center shadow-xs">
          <h3 className="font-bold text-base text-slate-900">
            Still have a specific question about your school?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Our institutional team is available Monday to Saturday to assist with tenders and procurement specs.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <a
              href={getWhatsAppQuoteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <Phone className="w-4 h-4 text-slate-500" />
              <span>Call {COMPANY_INFO.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
