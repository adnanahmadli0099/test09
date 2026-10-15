import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeatureCardsStrip } from '../components/FeatureCardsStrip';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { EducationalSpacesSection } from '../components/EducationalSpacesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ManufacturingProcess } from '../components/ManufacturingProcess';
import { ProjectsGallerySection } from '../components/ProjectsGallerySection';
import { SplitBannerSection } from '../components/SplitBannerSection';
import { ContactSection } from '../components/ContactSection';
import { Product, ProductCategory, ProjectShowcase } from '../types';

interface HomeViewProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  onNavigate: (view: string, categoryFilter?: ProductCategory) => void;
  onOpenQuoteDrawer: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onViewProduct,
  onAddToQuote,
  onNavigate,
  onOpenQuoteDrawer,
}) => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section: Creating Better Learning Spaces */}
      <HeroSection
        onExploreProducts={() => onNavigate('products')}
        onOpenQuote={onOpenQuoteDrawer}
      />

      {/* 2. Four Feature Value Cards Strip */}
      <FeatureCardsStrip
        onSelectFeature={(feat) => {
          if (feat === 'bulk' || feat === 'custom') {
            onNavigate('custom-orders');
          } else {
            onNavigate('about');
          }
        }}
      />

      {/* 3. "Explore Our Furniture" 6-Category Grid */}
      <CategoryGrid
        onSelectCategory={(category) => onNavigate('products', category)}
      />

      {/* 4. "Featured Products" Section */}
      <FeaturedProducts
        products={products}
        onViewProduct={onViewProduct}
        onAddToQuote={onAddToQuote}
        onViewAllProducts={() => onNavigate('products')}
      />

      {/* 5. "Furniture Solutions for Every Educational Space" */}
      <EducationalSpacesSection
        onExploreSolutions={(spaceId) => onNavigate('projects')}
      />

      {/* 6. "Why Choose Decent School Furniture" */}
      <WhyChooseUs />

      {/* 7. "Our Manufacturing Process" 4 Steps */}
      <ManufacturingProcess
        onLearnMore={() => onNavigate('about')}
      />

      {/* 8. "Our Projects & Gallery" */}
      <ProjectsGallerySection
        onViewFullGallery={() => onNavigate('projects')}
      />

      {/* 9. Split Banner: Bulk Orders CTA + Testimonial + FAQs */}
      <SplitBannerSection
        onOpenQuote={onOpenQuoteDrawer}
        onViewAllFaqs={() => onNavigate('faqs')}
      />

      {/* 10. "Get in Touch" Section with Form & Product Render */}
      <ContactSection />
    </div>
  );
};
