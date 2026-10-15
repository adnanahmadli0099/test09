import React, { useState, useEffect } from 'react';
import productsData from './data/products.json';
import { Product, ProductCategory, QuoteItem, UserProfile } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuotationDrawer } from './components/QuotationDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { CustomOrdersView } from './views/CustomOrdersView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { AuthView } from './views/AuthView';
import { AccountDashboardView } from './views/AccountDashboardView';
import {
  auth,
  onAuthStateChanged,
  getUserProfileFromFirestore,
  signOutFirebase,
} from './services/firebase';

export default function App() {
  const products: Product[] = productsData as unknown as Product[];

  // App navigation state: 'home' | 'products' | 'product-detail' | 'about' | 'projects' | 'custom-orders' | 'faqs' | 'contact' | 'auth' | 'account'
  const [currentView, setCurrentView] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | undefined>(undefined);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product>(products[0]);

  // Current logged in school/user profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('dsf_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Wishlist product IDs
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dsf_wishlist_ids');
      return stored ? JSON.parse(stored) : ['dsf-001', 'dsf-003'];
    } catch {
      return ['dsf-001', 'dsf-003'];
    }
  });

  // Quote cart state loaded from localStorage
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('dsf_quote_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal and drawer visibility
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Quick toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save quote items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dsf_quote_items', JSON.stringify(quoteItems));
    } catch {
      // Ignore
    }
  }, [quoteItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dsf_wishlist_ids', JSON.stringify(wishlistIds));
    } catch {
      // Ignore
    }
  }, [wishlistIds]);

  // Global Ctrl+K shortcut for search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleNavigate = (view: string, catFilter?: ProductCategory) => {
    setCurrentView(view);
    setCategoryFilter(catFilter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetailPage = (prod: Product) => {
    setSelectedProductForDetail(prod);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast('Removed item from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved item to School Wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleAddToQuote = (product: Product, quantity = 10, color?: string) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (color) updated[existingIndex].selectedColor = color;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: Math.max(product.minOrderQuantity || 1, quantity),
            selectedColor: color || product.colorOptions[0],
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to Quotation List`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const profile = await getUserProfileFromFirestore(fbUser.uid);
          if (profile) {
            setCurrentUser(profile);
            localStorage.setItem('dsf_current_user', JSON.stringify(profile));
          }
        } catch (e) {
          console.warn('Auth listener profile fetch notice:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.fullName}!`);
    setCurrentView('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    try {
      await signOutFirebase();
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem('dsf_current_user');
    setCurrentUser(null);
    showToast('Signed out of school account');
    setCurrentView('home');
  };

  const quoteItemCount = quoteItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        onOpenCustomOrders={() => handleNavigate('custom-orders')}
        onOpenQuote={() => setIsQuoteDrawerOpen(true)}
      />

      {/* 2. Primary Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        quoteItemCount={quoteItems.length}
        currentUser={currentUser}
        wishlistCount={wishlistIds.length}
        onNavigateToAuth={() => handleNavigate('auth')}
        onNavigateToDashboard={() => handleNavigate('account')}
        onNavigateToWishlist={() => handleNavigate('account')}
        onSignOut={handleSignOut}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0E2954] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700/80 animate-in slide-in-from-top-2 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="ml-2 text-orange-400 hover:text-orange-300 underline font-bold cursor-pointer"
          >
            View Quote →
          </button>
        </div>
      )}

      {/* 3. Main Page Routing */}
      <main className="flex-1">
        {/* HOMEPAGE */}
        {currentView === 'home' && (
          <HomeView
            products={products}
            onViewProduct={handleOpenProductDetailPage}
            onAddToQuote={(p) => handleAddToQuote(p, p.minOrderQuantity || 10)}
            onNavigate={handleNavigate}
            onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
          />
        )}

        {/* PRODUCTS CATALOGUE */}
        {currentView === 'products' && (
          <CatalogView
            products={products}
            initialCategory={categoryFilter}
            onViewProduct={handleOpenProductDetailPage}
            onAddToQuote={(p, qty) => handleAddToQuote(p, qty || p.minOrderQuantity || 10)}
            onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {/* DEDICATED PRODUCT DETAIL PAGE (Matching Screenshot) */}
        {currentView === 'product-detail' && (
          <ProductDetailView
            product={selectedProductForDetail}
            allProducts={products}
            onNavigate={handleNavigate}
            onSelectProduct={handleOpenProductDetailPage}
            onAddToQuote={(p, qty, col) => handleAddToQuote(p, qty, col)}
            onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
            isWishlisted={wishlistIds.includes(selectedProductForDetail.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* LOGIN & CREATE NEW ACCOUNT PAGE */}
        {currentView === 'auth' && (
          <AuthView
            initialMode="login"
            onLoginSuccess={handleLoginSuccess}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* INSTITUTIONAL ACCOUNT & QUOTATIONS DASHBOARD */}
        {currentView === 'account' && (
          currentUser ? (
            <AccountDashboardView
              user={currentUser}
              products={products}
              wishlistIds={wishlistIds}
              onRemoveFromWishlist={handleToggleWishlist}
              onAddToQuote={(p) => handleAddToQuote(p, 10)}
              onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
              onExploreProducts={() => handleNavigate('products')}
              onSignOut={handleSignOut}
            />
          ) : (
            <AuthView
              initialMode="login"
              onLoginSuccess={handleLoginSuccess}
              onNavigateHome={() => handleNavigate('home')}
            />
          )
        )}

        {/* ABOUT US */}
        {currentView === 'about' && (
          <AboutView
            onNavigateToCatalog={() => handleNavigate('products')}
            onOpenQuote={() => setIsQuoteDrawerOpen(true)}
          />
        )}

        {/* PROJECTS & PORTFOLIO GALLERY */}
        {currentView === 'projects' && (
          <ProjectsView
            onOpenQuote={() => setIsQuoteDrawerOpen(true)}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {/* CUSTOM ORDERS & BESPOKE SOLUTIONS */}
        {currentView === 'custom-orders' && (
          <CustomOrdersView
            onOpenQuote={() => setIsQuoteDrawerOpen(true)}
            onNavigateToProjects={() => handleNavigate('projects')}
          />
        )}

        {/* FAQS */}
        {currentView === 'faqs' && <FaqView />}

        {/* CONTACT US */}
        {currentView === 'contact' && <ContactView />}
      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 6. Quotation Request Drawer */}
      <QuotationDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
        onBrowseCatalog={() => handleNavigate('products')}
      />

      {/* 7. Quick Product Detail Modal (Optional popup helper) */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToQuote={(prod, qty, col) => handleAddToQuote(prod, qty, col)}
      />

      {/* 8. Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        onSelectProduct={(p) => handleOpenProductDetailPage(p)}
        onSelectCategory={(cat) => handleNavigate('products', cat)}
      />
    </div>
  );
}
