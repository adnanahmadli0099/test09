import React, { useState, useEffect } from 'react';
import { UserProfile, Product, SavedQuoteRecord } from '../types';
import { Building, Phone, Mail, MapPin, FileText, Heart, Clock, LogOut, Plus, Printer, MessageCircle, CheckCircle2, ChevronRight, Download, Cloud } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppQuoteUrl } from '../data/companyInfo';
import { auth, getUserQuotationsFromFirestore } from '../services/firebase';

interface AccountDashboardViewProps {
  user: UserProfile;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToQuote: (product: Product) => void;
  onOpenQuoteDrawer: () => void;
  onExploreProducts: () => void;
  onSignOut: () => void;
}

export const AccountDashboardView: React.FC<AccountDashboardViewProps> = ({
  user,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToQuote,
  onOpenQuoteDrawer,
  onExploreProducts,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'quotations' | 'wishlist' | 'profile'>('quotations');

  // Pre-load mock/saved quotation records for the user
  const [savedQuotes, setSavedQuotes] = useState<SavedQuoteRecord[]>(() => {
    try {
      const stored = localStorage.getItem('dsf_saved_quotes_records');
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore
    }

    // Default demo quotes based on user
    return [
      {
        id: 'qt-101',
        quoteNumber: 'DSF-QT-2026-042',
        date: '2026-03-18',
        status: 'Proforma Issued',
        items: [
          {
            product: products[0] || ({} as any),
            quantity: 45,
            selectedColor: 'Royal Blue',
          },
          {
            product: products[1] || ({} as any),
            quantity: 4,
            selectedColor: 'Natural Oak',
          },
        ],
        estimatedMinTotal: 260500,
        estimatedMaxTotal: 357000,
        timeline: 'Within 1 Month',
        notes: 'Delivery required to junior school campus wing with screen-printed school badge.',
      },
      {
        id: 'qt-102',
        quoteNumber: 'DSF-QT-2026-089',
        date: '2026-04-02',
        status: 'Under Review',
        items: [
          {
            product: products[2] || ({} as any),
            quantity: 120,
            selectedColor: 'Cobalt Blue',
          },
        ],
        estimatedMinTotal: 222000,
        estimatedMaxTotal: 312000,
        timeline: 'Immediate (1-2 weeks)',
        notes: 'High school assembly hall stackable chairs inquiry.',
      },
    ];
  });

  // Sync real-time or remote Firestore quotations for this school account
  useEffect(() => {
    async function fetchRemoteQuotes() {
      // Only fetch if authenticated with Firebase with matching UID or admin
      if (!auth.currentUser || !user?.id || (auth.currentUser.uid !== user.id && auth.currentUser.email !== 'adnanahmadali112233@gmail.com')) {
        return;
      }
      try {
        const firestoreQuotes = await getUserQuotationsFromFirestore(user.id);
        if (firestoreQuotes && firestoreQuotes.length > 0) {
          const mapped: SavedQuoteRecord[] = firestoreQuotes.map((fq) => ({
            id: fq.id,
            quoteNumber: `DSF-${fq.id.slice(-6).toUpperCase()}`,
            date: fq.createdAt ? fq.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
            status: fq.status === 'Approved' ? 'Proforma Issued' : fq.status === 'Dispatched' ? 'Delivered' : 'Under Review',
            items: fq.items.map((i) => {
              const matchedProd = products.find((p) => p.id === i.productId) || {
                id: i.productId,
                name: i.productName,
                primaryImage: '/src/assets/images/student_desk_chair_1792007659142.jpg',
                estimatedPriceRange: { min: 4500, max: 6500, currency: 'PKR' },
              } as any;
              return {
                product: matchedProd,
                quantity: i.quantity,
                selectedColor: i.color || 'Standard Blue',
              };
            }),
            estimatedMinTotal: fq.totalEstimatedUnits * 4500,
            estimatedMaxTotal: fq.totalEstimatedUnits * 6500,
            timeline: 'Standard Bulk Order',
            notes: fq.notes || '',
          }));

          setSavedQuotes((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newOnly = mapped.filter((m) => !existingIds.has(m.id));
            return [...newOnly, ...prev];
          });
        }
      } catch (err) {
        console.warn('Notice: Firestore quote fetch handled:', err);
      }
    }
    fetchRemoteQuotes();
  }, [user?.id, products]);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-[#0E2954] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {user.fullName.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                  Verified Institutional Account
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] mt-0.5">
                {user.institutionName}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Representative: <strong>{user.fullName}</strong> · {user.city} · {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteDrawer}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Quotation</span>
            </button>

            <button
              onClick={onSignOut}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('quotations')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'quotations'
                ? 'bg-[#0E2954] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Quotation Inquiries ({savedQuotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'bg-[#0E2954] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#0E2954] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Institution Profile</span>
          </button>
        </div>

        {/* TAB 1: QUOTATION INQUIRIES */}
        {activeTab === 'quotations' && (
          <div className="space-y-6">
            {savedQuotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
              >
                {/* Quote Header Bar */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {quote.quoteNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          quote.status === 'Proforma Issued'
                            ? 'bg-emerald-100 text-emerald-800'
                            : quote.status === 'In Production'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Submitted on {new Date(quote.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · Required: {quote.timeline}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>Print Proforma</span>
                    </button>

                    <a
                      href={getWhatsAppQuoteUrl({
                        institution: user.institutionName,
                        customMessage: `Inquiry regarding Quotation ${quote.quoteNumber}`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-6 divide-y divide-slate-100">
                  {quote.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.primaryImage || '/src/assets/images/student_desk_chair_1792007659142.jpg'}
                          alt={item.product.name}
                          className="w-12 h-12 object-contain rounded-lg bg-slate-50 border border-slate-100 p-1"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {item.product.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Quantity: <strong>{item.quantity} units</strong> {item.selectedColor ? `· Finish: ${item.selectedColor}` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs font-bold text-slate-800">
                        {item.quantity} Units
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote Footer Summary */}
                <div className="bg-slate-50/70 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 italic">
                    {quote.notes || 'Institutional warranty & delivery terms applied.'}
                  </span>
                  <div className="font-extrabold text-[#0E2954] font-mono">
                    Est. PKR {quote.estimatedMinTotal.toLocaleString()} – {quote.estimatedMaxTotal.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SAVED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-base text-slate-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click the heart icon on any product in our catalogue to save it here for school board review.
                </p>
                <button
                  onClick={onExploreProducts}
                  className="mt-4 px-5 py-2.5 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 cursor-pointer"
                >
                  Explore Products Catalogue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-slate-50 rounded-lg p-2 flex items-center justify-center mb-3">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.subtitle}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onAddToQuote(p)}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
                      >
                        Add to Quotation
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(p.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INSTITUTION PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-2xl">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-4 border-b border-slate-100 pb-3">
              Official School & Campus Record
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Institution Name</span>
                <span className="text-slate-900 font-bold text-sm">{user.institutionName}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Category</span>
                  <span className="text-slate-800 font-medium">{user.institutionType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">City / Location</span>
                  <span className="text-slate-800 font-medium">{user.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Primary Contact Person</span>
                  <span className="text-slate-800 font-medium">{user.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Phone Number</span>
                  <span className="text-slate-800 font-medium">{user.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Campus Delivery Address</span>
                <span className="text-slate-800 font-medium">{user.deliveryAddress || 'Not specified (Standard campus dispatch)'}</span>
              </div>

              {user.ntnOrRegistration && (
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Tax NTN / Registration Number</span>
                  <span className="text-slate-800 font-mono font-medium">{user.ntnOrRegistration}</span>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-xs">Account created on {new Date(user.createdAt).toLocaleDateString()}</span>
              <a
                href={getWhatsAppQuoteUrl({
                  institution: user.institutionName,
                  customMessage: 'Request to update institution profile or billing details',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                Update Profile via WhatsApp Support →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
