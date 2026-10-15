import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Armchair,
  Wrench,
  PackageCheck,
  MessageCircle,
  FileText,
  Heart,
  Plus,
  Minus,
  Check,
  Layers,
  Ruler,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getWhatsAppQuoteUrl } from '../data/companyInfo';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (view: string, categoryFilter?: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product, quantity?: number, color?: string) => void;
  onOpenQuoteDrawer: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onNavigate,
  onSelectProduct,
  onAddToQuote,
  onOpenQuoteDrawer,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product.minOrderQuantity || 1);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0] || 'Royal Blue');
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'shipping' | 'reviews'>('description');
  const [inquireSuccess, setInquireSuccess] = useState(false);

  // Gallery array
  const gallery = [
    product.primaryImage,
    ...(product.galleryImages || []),
    '/src/assets/images/hero_classroom_spaces_1792007659376.jpg',
  ].slice(0, 5);

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleInquireNow = () => {
    onAddToQuote(product, quantity, selectedColor);
    setInquireSuccess(true);
    setTimeout(() => {
      setInquireSuccess(false);
      onOpenQuoteDrawer();
    }, 600);
  };

  const directWhatsAppUrl = getWhatsAppQuoteUrl({
    productName: product.name,
    quantity: quantity,
    customMessage: `Finish/Color: ${selectedColor}. Please share proforma pricing and lead time.`,
  });

  // Related products
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Breadcrumbs Bar */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-slate-900 cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={() => onNavigate('products')}
            className="hover:text-slate-900 cursor-pointer"
          >
            Products
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={() => onNavigate('products', product.category)}
            className="hover:text-slate-900 cursor-pointer capitalize"
          >
            {product.category.replace('-', ' ')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900 truncate">{product.name}</span>
        </div>
      </div>

      {/* 2. Top Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 flex items-center justify-center p-6 group">
              <span className="absolute top-4 left-4 bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-md shadow-xs z-10">
                Popular
              </span>

              <img
                src={gallery[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails row */}
            <div className="grid grid-cols-5 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-xl border p-1 bg-slate-50 overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === idx
                      ? 'border-orange-500 ring-2 ring-orange-500/25 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Overview (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="inline-block bg-blue-50 text-[#0B60D4] font-bold text-xs px-3 py-1 rounded-md mb-2">
                {product.category.replace('-', ' ').toUpperCase()}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E2954] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Badge */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
              <span className="font-display font-extrabold text-3xl text-[#0E2954] font-mono">
                PKR 0
              </span>
              <span className="text-sm font-bold text-orange-600">
                (Quote Only)
              </span>
              {product.estimatedPriceRange && (
                <span className="text-xs text-slate-500 ml-2">
                  · Est. PKR {product.estimatedPriceRange.min.toLocaleString()} – {product.estimatedPriceRange.max.toLocaleString()} / unit in bulk
                </span>
              )}
            </div>

            {/* 4 Feature Icons Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100">
              <div className="text-center p-2 rounded-lg bg-slate-50/60">
                <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">Durable</span>
                <span className="text-[10px] text-slate-500">Construction</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-50/60">
                <Armchair className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">Ergonomic</span>
                <span className="text-[10px] text-slate-500">Design</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-50/60">
                <Wrench className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">Low</span>
                <span className="text-[10px] text-slate-500">Maintenance</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-50/60">
                <PackageCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">Bulk Order</span>
                <span className="text-[10px] text-slate-500">Available</span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-slate-700 hover:bg-slate-200 cursor-pointer font-bold"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center text-sm font-bold bg-white py-2 focus:outline-none border-x border-slate-200 font-mono"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-slate-700 hover:bg-slate-200 cursor-pointer font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleInquireNow}
                  className="py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire Now</span>
                </button>

                <button
                  onClick={() => {
                    onAddToQuote(product, quantity, selectedColor);
                    onOpenQuoteDrawer();
                  }}
                  className="py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Get a Quote</span>
                </button>
              </div>

              {/* Bottom WhatsApp + Wishlist links */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-rose-600 font-semibold cursor-pointer transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Horizontal 4-Trust Strip */}
      <div className="bg-slate-50/70 py-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Quality Materials</h4>
                <p className="text-[11px] text-slate-500">Built for long-lasting use</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Armchair className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Comfortable Design</h4>
                <p className="text-[11px] text-slate-500">Supports better learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Bulk Order Inquiries</h4>
                <p className="text-[11px] text-slate-500">For schools & institutions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Custom Furniture Options</h4>
                <p className="text-[11px] text-slate-500">Tailored to your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lower Content: Left Categories & Custom banner + Right Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Product Categories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onNavigate('products', cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      product.category === cat.id
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({cat.itemCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Need Custom Solution banner */}
            <div className="bg-[#0B192C] text-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-display font-bold text-base">Need a Custom Solution?</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                We create furniture that fits your space, needs and budget.
              </p>
              <button
                onClick={() => onNavigate('custom-orders')}
                className="mt-4 w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Detailed Tabs (9 cols) */}
          <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            {/* Tabs Header */}
            <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'description' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Description
                {activeTab === 'description' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('specifications')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'specifications' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications
                {activeTab === 'specifications' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'shipping' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Shipping & Returns
                {activeTab === 'shipping' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'reviews' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Reviews (0)
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Body */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left tab text content (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                {activeTab === 'description' && (
                  <>
                    <h4 className="font-bold text-sm text-slate-900">Product Description</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our {product.name} is designed to provide a comfortable, safe and durable learning environment. Made with high-quality materials, it is ideal for schools, colleges and educational institutions. The ergonomic design supports good posture and helps students stay focused throughout the day.
                    </p>

                    <h4 className="font-bold text-sm text-slate-900 pt-2">Key Features</h4>
                    <div className="space-y-2">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'specifications' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-900">Technical Data Sheet</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specifications).map(([k, v]) => (
                        <div key={k} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">{k}</span>
                          <span className="text-slate-800 font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                    <h4 className="font-bold text-sm text-slate-900">Nationwide Institutional Delivery</h4>
                    <p>
                      Decent School Furniture manages comprehensive logistics across Pakistan. Every item is wrapped in multi-layer corrugated sheets and protective corner protectors.
                    </p>
                    <p>
                      Turnaround for standard catalog items is 5 to 7 days. On-site installation and classroom assembly is handled by our specialized mobile deployment teams.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="py-6 text-center text-xs text-slate-500">
                    No institutional reviews yet for this model. Registered school buyers can submit reviews from their dashboard after order delivery.
                  </div>
                )}
              </div>

              {/* Right Specs Card: Available Colors, Material, Dimensions (5 cols) */}
              <div className="md:col-span-5 bg-slate-50/70 p-5 rounded-xl border border-slate-200/70 space-y-5 text-xs">
                {/* Available Colors */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Available Colors</h4>
                  <div className="flex items-center gap-2">
                    {product.colorOptions.map((c, i) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          selectedColor === c ? 'scale-110 border-orange-500 ring-2 ring-orange-400/30' : 'border-white'
                        }`}
                        style={{
                          backgroundColor:
                            i === 0 ? '#0B60D4' : i === 1 ? '#1E293B' : i === 2 ? '#94A3B8' : i === 3 ? '#FDE68A' : '#F97316',
                        }}
                        title={c}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Selected: {selectedColor}</span>
                </div>

                {/* Material */}
                <div className="pt-3 border-t border-slate-200/60">
                  <h4 className="font-bold text-slate-900 mb-2">Material</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>{product.frameMaterial}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Layers className="w-4 h-4 text-orange-500" />
                      <span>{product.topMaterial}</span>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="pt-3 border-t border-slate-200/60">
                  <h4 className="font-bold text-slate-900 mb-2">Dimensions (Approx.)</h4>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Ruler className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div>Desk: {product.dimensions.widthCm * 10} (L) × {product.dimensions.depthCm * 10} (W) × {product.dimensions.heightCm * 10} (H) mm</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Chair: 420 (L) × 400 (W) × 820 (H) mm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Related Products Grid */}
      <div className="bg-slate-50/60 py-14 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0E2954]">Related Products</h2>
              <p className="text-xs text-slate-500 mt-0.5">You may also like these similar products</p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
            >
              View All Products →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {related.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div
                  onClick={() => onSelectProduct(p)}
                  className="aspect-[4/3] bg-slate-50 rounded-lg p-2 flex items-center justify-center cursor-pointer mb-2"
                >
                  <img
                    src={p.primaryImage}
                    alt={p.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h4
                    onClick={() => onSelectProduct(p)}
                    className="font-bold text-xs text-slate-900 group-hover:text-blue-900 cursor-pointer line-clamp-1"
                  >
                    {p.name}
                  </h4>
                  <div className="text-[11px] font-mono text-[#0E2954] font-bold mt-1">
                    PKR 0 <span className="text-[10px] text-orange-600 font-sans font-normal">(Quote Only)</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onAddToQuote(p, 10);
                      onOpenQuoteDrawer();
                    }}
                    className="flex-1 py-1.5 px-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold cursor-pointer"
                  >
                    Inquire Now
                  </button>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="py-1.5 px-1.5 text-[10px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Questions Banner: Have Questions About This Product? Contact Us */}
      <div className="bg-[#0B192C] text-white py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-orange-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Have Questions About This Product?</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Our team is here to help. Get in touch for more details, pricing and customization options.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold cursor-pointer shadow-sm shrink-0"
          >
            Contact Us →
          </button>
        </div>
      </div>
    </div>
  );
};
