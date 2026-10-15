import React from 'react';
import { ShieldCheck, Award, Factory, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

interface AboutViewProps {
  onNavigateToCatalog: () => void;
  onOpenQuote: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateToCatalog,
  onOpenQuote,
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
            About Decent School Furniture
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E2954] mt-2 tracking-tight">
            Crafting Ergonomic, Durable Educational Furniture Since {COMPANY_INFO.foundedYear}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            We believe that a well-designed classroom directly transforms learning outcomes. For nearly two decades, Decent School Furniture has engineered commercial-grade school benches, student desks, faculty tables, and educational storage that endure decades of intense institutional use.
          </p>
        </div>
      </section>

      {/* Story & Factory Capabilities */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954]">
                Our Factory & Manufacturing Excellence
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating from our specialized industrial facility, Decent School Furniture houses advanced CNC pipe-bending units, robotic MIG welding cells, and automated electrostatic powder-coating conveyor systems.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every batch of steel tubing is tested for tensile strength, and all wooden laminate edges are sealed using German edge-banding technology with non-toxic, impact-resistant polyurethane to eliminate peeling and sharp corners.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Heavy 16-gauge cold-rolled mild steel tubing for virtually indestructible frames',
                  'High-pressure melamine surfaces resistant to scratches, moisture, and chemical spills',
                  'ISO 9001 quality management compliant manufacturing line',
                  'Ergonomic contouring designed in consultation with pediatric orthopedics',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/src/assets/images/hero_classroom_spaces_1792007659376.jpg"
                  alt="Decent School Furniture classroom installation"
                  className="w-full h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-base text-slate-900">10-Year Frame Warranty</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Our solid welded chassis are built to outlast generations of students. We stand behind every weld with a 10-year warranty.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <Award className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-bold text-base text-slate-900">Child-Safe Ergonomics</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Zero sharp edges. Non-toxic lead-free coatings. Lumbar supporting back curves prevent fatigue during 6-8 hour school days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
              <Factory className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-base text-slate-900">Direct Institutional Pricing</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Buy directly from the manufacturer without middlemen markups. Transparent quantity discount tiers for small and large campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-[#0E2954]">
            Ready to upgrade your school’s classrooms?
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Speak directly with our educational procurement specialists or request a formal quotation today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={onNavigateToCatalog}
              className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm cursor-pointer"
            >
              Browse Catalog
            </button>
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 rounded-lg text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs cursor-pointer"
            >
              Request Custom Quotation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
