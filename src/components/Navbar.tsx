import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Search, ChevronDown, ShoppingBag, Menu, X, ArrowRight, User, Heart, LogOut, FileText, Building, UserCheck } from 'lucide-react';
import { ProductCategory, UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, categoryFilter?: ProductCategory) => void;
  onOpenSearch: () => void;
  onOpenQuoteDrawer: () => void;
  quoteItemCount: number;
  currentUser: UserProfile | null;
  wishlistCount: number;
  onNavigateToAuth: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToWishlist: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenQuoteDrawer,
  quoteItemCount,
  currentUser,
  wishlistCount,
  onNavigateToAuth,
  onNavigateToDashboard,
  onNavigateToWishlist,
  onSignOut,
}) => {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productCategories: { name: string; id: ProductCategory; desc: string }[] = [
    { name: 'Student Desks & Chairs', id: 'student-desks', desc: 'Single & dual student workstations' },
    { name: 'Classroom Furniture', id: 'classroom-furniture', desc: 'Modular group tables & stackable chairs' },
    { name: 'School Benches', id: 'school-benches', desc: 'Heavy-duty integrated steel benches' },
    { name: 'Teacher Tables', id: 'teacher-tables', desc: 'Lockable faculty desks & executive tables' },
    { name: 'Office Furniture', id: 'office-furniture', desc: 'Administrative seating & conference rooms' },
    { name: 'Custom Furniture', id: 'custom-furniture', desc: 'Student lockers, STEM lab benches & bespoke sizes' },
  ];

  const handleCategoryClick = (catId: ProductCategory) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('products', catId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo Zone */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Home */}
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-semibold transition-colors cursor-pointer relative py-2 ${
                currentView === 'home'
                  ? 'text-orange-500'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                className={`text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 py-2 ${
                  currentView === 'products'
                    ? 'text-orange-500'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {productsDropdownOpen && (
                <div
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                  className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-3 mt-1 grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Categories</span>
                    <button
                      onClick={() => {
                        setProductsDropdownOpen(false);
                        onNavigate('products');
                      }}
                      className="text-xs text-orange-500 hover:text-orange-600 font-semibold cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                  {productCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-orange-600">
                        {cat.name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-semibold transition-colors cursor-pointer relative py-2 ${
                currentView === 'about'
                  ? 'text-orange-500'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              About Us
              {currentView === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* Projects */}
            <button
              onClick={() => onNavigate('projects')}
              className={`text-sm font-semibold transition-colors cursor-pointer relative py-2 ${
                currentView === 'projects'
                  ? 'text-orange-500'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Projects
              {currentView === 'projects' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* Custom Orders */}
            <button
              onClick={() => onNavigate('custom-orders')}
              className={`text-sm font-semibold transition-colors cursor-pointer relative py-2 ${
                currentView === 'custom-orders'
                  ? 'text-orange-500'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Custom Orders
              {currentView === 'custom-orders' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* FAQs */}
            <button
              onClick={() => onNavigate('faqs')}
              className={`text-sm font-semibold transition-colors cursor-pointer relative py-2 ${
                currentView === 'faqs'
                  ? 'text-orange-500'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              FAQs
              {currentView === 'faqs' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-semibold transition-colors cursor-pointer relative py-2 ${
                currentView === 'contact'
                  ? 'text-orange-500'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Contact
              {currentView === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Action Zone: Search + Quote Cart + Primary CTA */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Search school furniture (Ctrl+K)"
              aria-label="Search furniture catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onNavigateToWishlist}
              className="relative p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="View Saved Wishlist"
              aria-label="Saved wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Quote Cart Badge */}
            <button
              onClick={onOpenQuoteDrawer}
              className="relative p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="View Quotation Request List"
              aria-label="Quotation list"
            >
              <ShoppingBag className="w-5 h-5" />
              {quoteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {quoteItemCount}
                </span>
              )}
            </button>

            {/* Account / User Profile Dropdown */}
            {currentUser ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="hidden md:flex items-center gap-2 p-1.5 pl-2.5 pr-3 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-colors cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0E2954] text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.fullName.slice(0, 1)}
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-[110px]">
                      {currentUser.fullName.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[110px]">
                      {currentUser.institutionName}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="font-bold text-slate-900">{currentUser.fullName}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser.institutionName}</div>
                      <div className="text-[10px] text-orange-600 font-semibold">{currentUser.city}</div>
                    </div>
                    <button
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onNavigateToDashboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-orange-500" />
                      <span>My Quotations & Inquiries</span>
                    </button>
                    <button
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onNavigateToWishlist();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Wishlist ({wishlistCount})</span>
                    </button>
                    <button
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onNavigateToDashboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Building className="w-4 h-4 text-blue-500" />
                      <span>School Profile</span>
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onNavigateToAuth}
                className="hidden md:inline-flex items-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-700 hover:text-[#0E2954] hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span>Login / Account</span>
              </button>
            )}

            {/* Primary "Get a Quote →" CTA Button */}
            <button
              onClick={onOpenQuoteDrawer}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-sm shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'home' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                onNavigate('products');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'products' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Products & Catalog
            </button>

            <div className="pl-4 py-1 flex flex-col gap-1 border-l-2 border-slate-100 ml-3">
              {productCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategoryClick(c.id)}
                  className="text-left text-xs font-medium text-slate-600 hover:text-orange-600 py-1"
                >
                  {c.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'about' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => {
                onNavigate('projects');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'projects' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Projects & Portfolios
            </button>

            <button
              onClick={() => {
                onNavigate('custom-orders');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'custom-orders' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Custom Orders & Bulk
            </button>

            <button
              onClick={() => {
                onNavigate('faqs');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'faqs' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              FAQs
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg font-semibold text-sm ${
                currentView === 'contact' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToDashboard();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-100 text-xs font-bold text-slate-800 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    <span>{currentUser.fullName} ({currentUser.institutionName})</span>
                  </span>
                  <span className="text-orange-600">Portal →</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToAuth();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-100 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-orange-500" />
                  <span>Login / Register School Account</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToWishlist();
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Saved Wishlist ({wishlistCount})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteDrawer();
                }}
                className="w-full py-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Get a Fast Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
