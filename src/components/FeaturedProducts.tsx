import React from 'react';
import { ArrowRight, Eye, Plus } from 'lucide-react';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onViewProduct,
  onAddToQuote,
  onViewAllProducts,
}) => {
  // Take top 4 featured products
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              High-quality school furniture designed for comfort, durability and modern learning environments.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer group shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-orange-200"
            >
              {/* Product Image Area */}
              <div
                onClick={() => onViewProduct(product)}
                className="relative aspect-[4/3] bg-white p-4 flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100"
              >
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Subtle Hover Action overlay button */}
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-md shadow-md inline-flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-orange-500" />
                    Quick Specs
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3
                    onClick={() => onViewProduct(product)}
                    className="font-bold text-base text-slate-900 hover:text-blue-900 transition-colors cursor-pointer line-clamp-1"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {/* "Get a Quote" orange button */}
                  <button
                    onClick={() => onAddToQuote(product)}
                    className="flex-1 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Get a Quote</span>
                  </button>

                  {/* "View Details →" text button */}
                  <button
                    onClick={() => onViewProduct(product)}
                    className="py-2 px-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
