import React, { useState } from 'react';
import { X, ShieldCheck, Plus, MessageCircle, Ruler, Layers, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { getWhatsAppQuoteUrl } from '../data/companyInfo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number, color?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [quantity, setQuantity] = useState(product.minOrderQuantity || 10);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0] || '');
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToQuote(product, quantity, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const directWhatsAppUrl = getWhatsAppQuoteUrl({
    productName: product.name,
    quantity: quantity,
    customMessage: `Color: ${selectedColor}`,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200 border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
              {product.category.replace('-', ' ')}
            </span>
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-200 p-4 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {product.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-lg border overflow-hidden p-1 bg-slate-50 cursor-pointer transition-all ${
                        selectedImage === img ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.warrantyYears}-Year Structural Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Ruler className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {product.dimensions.widthCm}cm (W) × {product.dimensions.depthCm}cm (D) × {product.dimensions.heightCm}cm (H)
                  </span>
                </div>
              </div>
            </div>

            {/* Info Column (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Bulk Pricing Range Box */}
              {product.estimatedPriceRange && (
                <div className="bg-gradient-to-r from-blue-50/60 to-slate-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Estimated Factory Price
                    </div>
                    <div className="text-lg font-extrabold text-[#0E2954] font-mono">
                      PKR {product.estimatedPriceRange.min.toLocaleString()} – {product.estimatedPriceRange.max.toLocaleString()}
                      <span className="text-xs font-normal text-slate-500 ml-1">/ unit</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Min. Order: {product.minOrderQuantity} Units
                    </span>
                  </div>
                </div>
              )}

              {/* Color Options */}
              {product.colorOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Available School Finish / Colors:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                          selectedColor === color
                            ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Estimated Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 5))}
                    className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    -5
                  </button>
                  <input
                    type="number"
                    min={product.minOrderQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
                    className="w-16 text-center text-xs font-bold bg-white py-2 focus:outline-none border-x border-slate-200 font-mono"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 5)}
                    className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    +5
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Quotation List!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Quotation List</span>
                    </>
                  )}
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Specifications Table */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-2">Technical Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">{key}</span>
                      <span className="text-slate-800 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
