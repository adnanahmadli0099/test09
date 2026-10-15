import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { EDUCATIONAL_SPACES } from '../data/projects';

interface EducationalSpacesSectionProps {
  onExploreSolutions: (spaceId?: string) => void;
}

export const EducationalSpacesSection: React.FC<EducationalSpacesSectionProps> = ({
  onExploreSolutions,
}) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleNext = () => {
    setScrollIndex((prev) => (prev + 1) % EDUCATIONAL_SPACES.length);
  };

  const handlePrev = () => {
    setScrollIndex((prev) => (prev - 1 + EDUCATIONAL_SPACES.length) % EDUCATIONAL_SPACES.length);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Description & CTA */}
          <div className="lg:col-span-4 text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] tracking-tight leading-snug">
              Furniture Solutions <br />
              for Every Educational Space
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              From classrooms to staff rooms, we provide the right furniture solutions for schools, colleges and institutions.
            </p>
            <div className="mt-6">
              <button
                onClick={() => onExploreSolutions()}
                className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore All Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 4 Spaces Grid / Carousel */}
          <div className="lg:col-span-8 relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {EDUCATIONAL_SPACES.map((space) => (
                <div
                  key={space.id}
                  onClick={() => onExploreSolutions(space.id)}
                  className="group relative rounded-xl overflow-hidden bg-slate-900 aspect-[3/4] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Bottom Text Pill / Banner */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center">
                    <div className="bg-[#0B192C]/90 backdrop-blur-sm text-white font-bold text-xs sm:text-sm py-2 px-3 rounded-lg border border-slate-700/60 group-hover:border-orange-500/80 group-hover:text-orange-300 transition-colors">
                      {space.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel navigation affordance */}
            <div className="hidden sm:flex items-center justify-end gap-2 mt-4">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm cursor-pointer"
                aria-label="Previous spaces"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm cursor-pointer"
                aria-label="Next spaces"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
