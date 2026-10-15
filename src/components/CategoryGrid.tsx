import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] tracking-tight">
            Explore Our Furniture
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Browse our specialized educational furniture collections engineered for durability and student posture.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="group flex flex-col bg-slate-50/70 hover:bg-white rounded-xl p-3 sm:p-4 border border-slate-200/70 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image Box */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white mb-3 flex items-center justify-center p-2 border border-slate-100 group-hover:border-orange-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Title & Link */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 line-clamp-2 transition-colors">
                    {category.name}
                  </h3>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center gap-1 text-xs font-semibold text-orange-500 group-hover:text-orange-600">
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
