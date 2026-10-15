import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import {
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Armchair,
  Sparkles,
  LayoutGrid,
  List,
  Check,
  RotateCcw,
  MessageCircle,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface CatalogViewProps {
  products: Product[];
  initialCategory?: ProductCategory;
  onViewProduct: (product: Product) => void;
  onAddToQuote: (product: Product, quantity?: number) => void;
  onOpenQuoteDrawer: () => void;
  onNavigate: (view: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory,
  onViewProduct,
  onAddToQuote,
  onOpenQuoteDrawer,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['In Stock', 'Quote Only']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const colors = [
    { id: 'all', bg: '#CBD5E1', name: 'All' },
    { id: 'blue', bg: '#0B60D4', name: 'Blue' },
    { id: 'dark', bg: '#1E293B', name: 'Charcoal' },
    { id: 'grey', bg: '#94A3B8', name: 'Grey' },
    { id: 'oak', bg: '#FDE68A', name: 'Oak/Wood' },
    { id: 'orange', bg: '#F97316', name: 'Orange' },
  ];

  const materialOptions = ['Wood', 'Metal', 'Plastic', 'MDF', 'Combination'];

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(500000);
    setSelectedColor('all');
    setSelectedMaterials([]);
    setSelectedAvailability(['In Stock', 'Quote Only']);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSub = p.subtitle.toLowerCase().includes(q);
        const matchMat = p.frameMaterial.toLowerCase().includes(q) || p.topMaterial.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchMat) return false;
      }
      // Price slider
      if (p.estimatedPriceRange && p.estimatedPriceRange.min > maxPrice) {
        return false;
      }
      // Material filter
      if (selectedMaterials.length > 0) {
        const matCombined = `${p.frameMaterial} ${p.topMaterial}`.toLowerCase();
        const hasMatchedMat = selectedMaterials.some((m) =>
          matCombined.includes(m.toLowerCase())
        );
        if (!hasMatchedMat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.estimatedPriceRange?.min || 0) - (b.estimatedPriceRange?.min || 0);
      if (sortBy === 'price-desc') return (b.estimatedPriceRange?.min || 0) - (a.estimatedPriceRange?.min || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedMaterials, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-900 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900">Products</span>
        </div>
      </div>

      {/* 2. Products Catalogue Hero Banner with Classroom Background */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-12 sm:py-16">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/src/assets/images/hero_classroom_spaces_1792007659376.jpg"
            alt="Classroom background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2954] via-[#0E2954]/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Products Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              Explore our wide range of high-quality school furniture designed for comfort, durability and better learning environments.
            </p>
          </div>
        </div>
      </div>

      {/* 3. 3-Icon Trust Strip */}
      <div className="bg-white py-4 border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Durable Materials</h4>
                <p className="text-[11px] text-slate-500">Built for long-lasting use</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Armchair className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Ergonomic Designs</h4>
                <p className="text-[11px] text-slate-500">Supports better learning</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Sparkles className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Custom Options</h4>
                <p className="text-[11px] text-slate-500">Tailored to your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Body: Left Filter Sidebar + Right Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filters Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-6">
            {/* Search input */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full text-xs pr-8 pl-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Categories</h3>
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs cursor-pointer text-slate-700 hover:text-slate-900">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cat"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="accent-orange-500"
                    />
                    <span>All Products</span>
                  </span>
                  <span className="text-[10px] text-slate-400">({products.length})</span>
                </label>

                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between text-xs cursor-pointer text-slate-700 hover:text-slate-900"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cat"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="accent-orange-500"
                      />
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">({cat.itemCount})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-bold text-slate-900">Price Range</h3>
              </div>
              <input
                type="range"
                min={2000}
                max={500000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>PKR 0</span>
                <span>PKR {maxPrice >= 500000 ? '500,000+' : maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Color</h3>
              <div className="flex items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                      selectedColor === c.id ? 'scale-110 border-orange-500 ring-2 ring-orange-400/30' : 'border-white'
                    }`}
                    style={{ backgroundColor: c.bg }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Material</h3>
              <div className="space-y-1.5">
                {materialOptions.map((mat) => (
                  <label key={mat} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded accent-orange-500 text-orange-500"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Availability</h3>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAvailability.includes('In Stock')}
                    onChange={() => {}}
                    className="rounded accent-orange-500 text-orange-500"
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAvailability.includes('Quote Only')}
                    onChange={() => {}}
                    className="rounded accent-orange-500 text-orange-500"
                  />
                  <span>Quote Only</span>
                </label>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="pt-2">
              <button
                onClick={handleClearFilters}
                className="w-full py-2 px-3 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>

          {/* Right Product Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600">
                Showing <strong>1–{filteredProducts.length}</strong> of {products.length} products
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md ${
                      viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md ${
                      viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <h4 className="font-bold text-slate-800">No products match your filters</h4>
                <p className="text-xs text-slate-500 mt-1">Try resetting the price slider or category selections.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p, idx) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-orange-200"
                  >
                    {/* Image Area with Badge */}
                    <div
                      onClick={() => onViewProduct(p)}
                      className="relative aspect-[4/3] bg-slate-50/60 p-4 flex items-center justify-center cursor-pointer border-b border-slate-100 overflow-hidden"
                    >
                      {idx % 3 === 0 && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded shadow-xs z-10">
                          Popular
                        </span>
                      )}
                      {idx % 3 === 1 && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded shadow-xs z-10">
                          New
                        </span>
                      )}
                      {idx % 3 === 2 && (
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded shadow-xs z-10">
                          Best Seller
                        </span>
                      )}

                      <img
                        src={p.primaryImage}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3
                          onClick={() => onViewProduct(p)}
                          className="font-bold text-sm text-slate-900 group-hover:text-blue-900 cursor-pointer line-clamp-1 transition-colors"
                        >
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {p.subtitle}
                        </p>
                      </div>

                      {/* Pricing: PKR 0 (Quote Only) */}
                      <div className="mt-4 pt-2 flex items-baseline gap-1.5">
                        <span className="font-extrabold text-[#0E2954] text-base font-mono">
                          PKR 0
                        </span>
                        <span className="text-xs font-semibold text-orange-600">
                          (Quote Only)
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onAddToQuote(p, 10);
                            onOpenQuoteDrawer();
                          }}
                          className="flex-1 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Inquire Now</span>
                        </button>
                        <button
                          onClick={() => onViewProduct(p)}
                          className="py-2 px-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-bold flex items-center justify-center hover:bg-slate-50 disabled:opacity-50"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center ${
                  currentPage === 1 ? 'bg-orange-500 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center ${
                  currentPage === 2 ? 'bg-orange-500 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center ${
                  currentPage === 3 ? 'bg-orange-500 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                3
              </button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-bold flex items-center justify-center hover:bg-slate-50"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Need Custom Furniture or Bulk Order? Dark Banner */}
      <div className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Need Custom Furniture or Bulk Order?
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Get a personalized quote for your school, college or institution.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('custom-orders')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer whitespace-nowrap"
          >
            Request a Quote →
          </button>
        </div>
      </div>
    </div>
  );
};
