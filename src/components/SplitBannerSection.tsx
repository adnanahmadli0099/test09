import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, Layers, MessageSquareQuote } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { TESTIMONIALS } from '../data/testimonials';

interface SplitBannerSectionProps {
  onOpenQuote: () => void;
  onViewAllFaqs: () => void;
}

export const SplitBannerSection: React.FC<SplitBannerSectionProps> = ({
  onOpenQuote,
  onViewAllFaqs,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[testimonialIndex];

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card 1: Custom Furniture & Bulk Orders (3 cols) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-2xl p-6 border border-orange-200/60 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                Custom Furniture & Bulk Orders
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Need custom sizes, special materials or bulk quantities? We're here to help.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-orange-200/40">
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-orange-600 bg-white hover:bg-orange-500 hover:text-white border border-orange-300 shadow-sm transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: What Our Customers Say (4 cols) */}
          <div className="lg:col-span-4 bg-slate-50/70 rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-full relative">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-base text-[#0E2954]">
                  What Our Customers Say
                </h3>
                <span className="text-amber-500 font-serif text-3xl leading-none select-none">
                  “
                </span>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-700 italic leading-relaxed min-h-[72px] mt-2">
                "{currentTestimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200/60">
                <div className="w-9 h-9 rounded-full bg-[#0E2954] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {currentTestimonial.author.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    — {currentTestimonial.author}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {currentTestimonial.role}, {currentTestimonial.institution}
                  </div>
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 cursor-pointer shadow-xs shrink-0"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Testimonial Dots indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    testimonialIndex === i ? 'w-4 bg-orange-500' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Card 3: Frequently Asked Questions (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-[#0E2954]">
                Frequently Asked Questions
              </h3>
              <button
                onClick={onViewAllFaqs}
                className="text-xs font-semibold text-orange-500 hover:text-orange-600 cursor-pointer"
              >
                View all →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {FAQS.slice(0, 4).map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={faq.id} className="py-2.5">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between gap-3 text-left font-semibold text-xs sm:text-[13px] text-slate-800 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-orange-500' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-xs text-slate-600 leading-relaxed pr-4 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
