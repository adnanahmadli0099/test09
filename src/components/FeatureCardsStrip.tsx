import React from 'react';
import { ShieldCheck, Armchair, PackageCheck, Sliders } from 'lucide-react';

interface FeatureCardsStripProps {
  onSelectFeature?: (featureKey: string) => void;
}

export const FeatureCardsStrip: React.FC<FeatureCardsStripProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'durable',
      icon: ShieldCheck,
      title: 'Durable Materials',
      description: 'Built for long-lasting use',
    },
    {
      id: 'comfortable',
      icon: Armchair,
      title: 'Comfortable Designs',
      description: 'Supports better learning',
    },
    {
      id: 'bulk',
      icon: PackageCheck,
      title: 'Bulk Order Inquiries',
      description: 'For schools & institutions',
    },
    {
      id: 'custom',
      icon: Sliders,
      title: 'Custom Furniture Options',
      description: 'Tailored to your needs',
    },
  ];

  return (
    <section className="bg-white py-8 border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectFeature?.(item.id)}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-slate-50 cursor-pointer group border border-transparent hover:border-slate-200/60"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B60D4] flex items-center justify-center shrink-0 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
