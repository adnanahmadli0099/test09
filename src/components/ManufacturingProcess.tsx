import React from 'react';
import { ArrowRight, Layers, Cog, CheckCircle, Package } from 'lucide-react';

interface ManufacturingProcessProps {
  onLearnMore: () => void;
}

export const ManufacturingProcess: React.FC<ManufacturingProcessProps> = ({ onLearnMore }) => {
  const steps = [
    {
      number: '1',
      title: 'Raw Materials',
      desc: 'Carefully selected',
      icon: Layers,
    },
    {
      number: '2',
      title: 'Production',
      desc: 'Precision manufacturing',
      icon: Cog,
    },
    {
      number: '3',
      title: 'Quality Check',
      desc: 'Strict inspection',
      icon: CheckCircle,
    },
    {
      number: '4',
      title: 'Final Product',
      desc: 'Ready for schools',
      icon: Package,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left info */}
          <div className="lg:col-span-4 text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] tracking-tight">
              Our Manufacturing Process
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              From raw materials to final product, we ensure quality at every step.
            </p>
            <div className="mt-6">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right 4 Steps with connecting arrows */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center text-center p-3 w-full sm:w-auto">
                      <div className="w-14 h-14 rounded-full bg-[#0E2954] text-white flex items-center justify-center shadow-md mb-3 transition-transform hover:scale-105">
                        <Icon className="w-6 h-6 text-blue-200" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1">
                        {step.number}. {step.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {step.desc}
                      </div>
                    </div>

                    {/* Connecting Arrow (hidden on mobile and after last item) */}
                    {idx < steps.length - 1 && (
                      <div className="hidden sm:flex text-slate-300">
                        <ArrowRight className="w-5 h-5 text-slate-400 stroke-[2]" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
