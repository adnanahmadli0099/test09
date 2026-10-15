import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Eye } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.frameMaterial.toLowerCase().includes(q) ||
          p.topMaterial.toLowerCase().includes(q)
        );
      });

  const categories: { name: string; id: ProductCategory }[] = [
    { name: 'Student Desks & Chairs', id: 'student-desks' },
    { name: 'Classroom Furniture', id: 'classroom-furniture' },
    { name: 'School Benches', id: 'school-benches' },
    { name: 'Teacher Tables', id: 'teacher-tables' },
    { name: 'Office Furniture', id: 'office-furniture' },
    { name: 'Custom Lockers', id: 'custom-furniture' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student desks, benches, teacher tables, materials..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Quick Filter Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0">Categories:</span>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onClose();
                onSelectCategory(c.id);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 transition-colors shrink-0 cursor-pointer"
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type keywords such as "desk", "chair", "bench", "table", "lockers" or select a category above.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No school furniture products matched "{query}". Try browsing all products or contact us for custom manufacturing.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center gap-3 cursor-pointer transition-colors group"
                >
                  <img
                    src={p.primaryImage}
                    alt={p.name}
                    className="w-12 h-12 object-contain rounded-lg bg-slate-100 p-1 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 truncate">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {p.subtitle}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-orange-500">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
