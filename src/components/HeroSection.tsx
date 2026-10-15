import React from 'react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenQuote,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white py-12 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#F97316]">
                Furniture For Better Learning
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#0E2954] tracking-tight leading-[1.12]">
              Creating Better <br className="hidden sm:inline" />
              Learning Spaces
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Modern, durable and comfortable furniture for schools, colleges and educational institutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-lg text-sm font-bold text-[#0E2954] bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Get a Quote</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Factory Direct Pricing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                5–10 Year Warranty
              </span>
              <span className="inline-flex items-center gap-1.5 hidden sm:inline-flex">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Nationwide Delivery
              </span>
            </div>
          </div>

          {/* Right Column: Hero Classroom Photo */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 group">
              <img
                src="/src/assets/images/hero_classroom_spaces_1792007659376.jpg"
                alt="Modern school classroom with ergonomic Decent student desks and chairs"
                className="w-full h-[360px] sm:h-[460px] lg:h-[490px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Subtle Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 font-bold shrink-0">
                  500+
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Schools & Colleges Equipped</div>
                  <div className="text-[11px] text-slate-500">Engineered for comfort and long-lasting durability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
