import React from 'react';
import { Award, Sparkles, Settings2, Building2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Quality Manufacturing',
      desc: 'Consistent and reliable quality',
    },
    {
      icon: Sparkles,
      title: 'Modern Designs',
      desc: 'Functional and stylish',
    },
    {
      icon: Settings2,
      title: 'Custom Solutions',
      desc: 'Built around your needs',
    },
    {
      icon: Building2,
      title: 'Trusted by Institutions',
      desc: 'Supporting better learning',
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] tracking-tight">
            Why Choose Decent School Furniture
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            Decades of specialized craftsmanship dedicated to safety, ergonomics, and institutional reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center group hover:border-orange-200"
              >
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0B60D4] group-hover:bg-orange-50 group-hover:text-orange-500 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-7 h-7 stroke-[1.8]" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
