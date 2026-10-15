import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Printer, CheckCircle2, MessageCircle, FileText, Building2, CloudCheck } from 'lucide-react';
import { QuoteItem, QuoteFormData } from '../types';
import { COMPANY_INFO, getWhatsAppQuoteUrl } from '../data/companyInfo';
import { auth, submitQuotationToFirestore } from '../services/firebase';

interface QuotationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
  onBrowseCatalog: () => void;
}

export const QuotationDrawer: React.FC<QuotationDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  onBrowseCatalog,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    institutionName: '',
    institutionType: 'School',
    city: 'Lahore',
    projectTimeline: 'Within 1 Month',
    additionalRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState<'review' | 'details' | 'success'>('review');

  if (!isOpen) return null;

  // Calculate estimated totals
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const estimatedMinTotal = items.reduce((sum, item) => {
    const minPrice = item.product.estimatedPriceRange?.min || 5000;
    return sum + minPrice * item.quantity;
  }, 0);

  const estimatedMaxTotal = items.reduce((sum, item) => {
    const maxPrice = item.product.estimatedPriceRange?.max || 7000;
    return sum + maxPrice * item.quantity;
  }, 0);

  const handlePrintQuote = () => {
    window.print();
  };

  const handleSendToWhatsApp = () => {
    const itemSummary = items
      .map((i) => `• ${i.product.name} (Qty: ${i.quantity}) ${i.selectedColor ? `[Color: ${i.selectedColor}]` : ''}`)
      .join('\n');

    let text = `*FORMAL QUOTATION REQUEST*\n*Decent School Furniture*\n\n`;
    text += `*Institution:* ${formData.institutionName || 'Educational Institution'}\n`;
    text += `*Contact Person:* ${formData.fullName || 'Purchaser'}\n`;
    text += `*Phone:* ${formData.phone || 'N/A'}\n`;
    text += `*City:* ${formData.city}\n`;
    text += `*Timeline:* ${formData.projectTimeline}\n\n`;
    text += `*Requested Products (${totalUnits} total units):*\n${itemSummary}\n\n`;
    if (formData.additionalRequirements) {
      text += `*Custom Requirements:* ${formData.additionalRequirements}\n\n`;
    }
    text += `Please send an official stamped proforma invoice and sample delivery details.`;

    const url = `https://wa.me/${COMPANY_INFO.contact.whatsappClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const quoteId = `quote-${Date.now()}`;

    // 1. Save to Firebase Firestore
    try {
      await submitQuotationToFirestore({
        id: quoteId,
        userId: auth.currentUser?.uid || null,
        customerName: formData.fullName,
        institutionName: formData.institutionName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        deliveryAddress: formData.additionalRequirements || '',
        notes: formData.additionalRequirements || '',
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          color: i.selectedColor,
        })),
        totalEstimatedUnits: totalUnits,
        status: 'Pending Review',
        createdAt: new Date().toISOString(),
      });
    } catch (fsErr) {
      console.warn('Notice: Firestore quotation sync fallback:', fsErr);
    }

    // 2. Save to local storage for instant dashboard reflection
    try {
      const stored = JSON.parse(localStorage.getItem('dsf_saved_quotes') || '[]');
      stored.unshift({
        id: quoteId,
        quoteNumber: `DSF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        items,
        formData,
        date: new Date().toISOString(),
        status: 'Pending Review',
      });
      localStorage.setItem('dsf_saved_quotes', JSON.stringify(stored));
    } catch {
      // Ignore
    }
    setActiveStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-900">
                Institutional Quotation Request
              </h2>
              <p className="text-xs text-slate-500">
                {items.length === 0 ? 'No items in quote' : `${items.length} items (${totalUnits} total units)`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer"
            aria-label="Close quote drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-800">Your quotation list is empty</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                Explore our student desks, classroom chairs, and school benches to add items and request formal institutional pricing.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseCatalog();
                }}
                className="mt-6 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 cursor-pointer shadow-sm"
              >
                Explore Product Catalog
              </button>
            </div>
          ) : activeStep === 'review' ? (
            /* Review Step */
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs flex gap-3 items-center"
                  >
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Min. order: {item.product.minOrderQuantity} units
                      </p>
                      {item.product.estimatedPriceRange && (
                        <p className="text-xs font-semibold text-blue-900 mt-1">
                          Est. PKR {item.product.estimatedPriceRange.min.toLocaleString()} – {item.product.estimatedPriceRange.max.toLocaleString()} / unit
                        </p>
                      )}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(item.product.minOrderQuantity, item.quantity - 5))}
                        className="w-6 h-6 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer text-xs font-bold"
                        title="Reduce by 5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-8 text-center font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 5)}
                        className="w-6 h-6 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer text-xs font-bold"
                        title="Increase by 5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Estimate Summary Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Total Ordered Quantity</span>
                  <span className="font-bold text-slate-900 font-mono">{totalUnits} Units</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Estimated Price Range</span>
                  <span className="font-bold text-blue-900 font-mono">
                    PKR {estimatedMinTotal.toLocaleString()} – {estimatedMaxTotal.toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 italic">
                  * Note: Official quotes include bulk volume discounts, freight options, and institutional tax exemptions.
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={onClearQuote}
                  className="text-xs text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  Clear all items
                </button>
                <button
                  onClick={() => setActiveStep('details')}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Proceed to Institution Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : activeStep === 'details' ? (
            /* Institution Details Form */
            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Institution & Contact Information
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  School / College / Institution Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  placeholder="e.g. Army Public School & College"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Mr. Tariq Mehmood"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@school.edu"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Campus Location <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Lahore, Islamabad, Karachi"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Required Timeline
                </label>
                <select
                  value={formData.projectTimeline}
                  onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value as any })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="Within 3 Months">Within 3 Months</option>
                  <option value="Planning/Budgeting">Planning / Budgeting for upcoming academic year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Customization / Delivery Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="e.g. Include school logo silk-screen print, custom navy frame paint, delivery to 2nd floor..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveStep('review')}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  ← Back to Items
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm cursor-pointer"
                >
                  Generate Official Quote
                </button>
              </div>
            </form>
          ) : (
            /* Success Step with WhatsApp & Print */
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900">Quotation Ready!</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your quotation inquiry for <strong>{formData.institutionName || 'your institution'}</strong> ({totalUnits} units) has been prepared.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
                <div className="font-bold text-slate-800">Quotation Summary:</div>
                <div className="text-slate-600">Institution: {formData.institutionName}</div>
                <div className="text-slate-600">Contact: {formData.fullName} ({formData.phone})</div>
                <div className="text-slate-600 font-semibold text-blue-900">
                  Est. Budget: PKR {estimatedMinTotal.toLocaleString()} – {estimatedMaxTotal.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                {/* Instant WhatsApp Dispatch */}
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3 px-4 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quotation to WhatsApp (+92 300 0000000)</span>
                </button>

                {/* Print Proforma */}
                <button
                  onClick={handlePrintQuote}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Proforma Estimate Slip</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClearQuote();
                  setActiveStep('review');
                  onClose();
                }}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer underline pt-2"
              >
                Close and return to store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
