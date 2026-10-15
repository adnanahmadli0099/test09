export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  primaryImage: string;
  galleryImages: string[];
  dimensions: {
    widthCm: number;
    depthCm: number;
    heightCm: number;
    customizable: boolean;
  };
  frameMaterial: string;
  topMaterial: string;
  colorOptions: string[];
  warrantyYears: number;
  gradeLevels: ('Primary (Grades 1-5)' | 'Middle School (Grades 6-8)' | 'High School (Grades 9-12)' | 'College & University' | 'Teacher & Admin')[];
  minOrderQuantity: number;
  leadTimeDays: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  estimatedPriceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  bulkDiscounts: {
    minQuantity: number;
    discountPercent: number;
  }[];
  specifications: Record<string, string>;
  features: string[];
}

export type ProductCategory =
  | 'student-desks'
  | 'classroom-furniture'
  | 'school-benches'
  | 'teacher-tables'
  | 'office-furniture'
  | 'custom-furniture';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  itemCount: number;
  image: string;
  iconName: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customNotes?: string;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  institutionName: string;
  institutionType: 'School' | 'College' | 'University' | 'Academy/Coaching' | 'Government/NGO' | 'Commercial Office';
  city: string;
  projectTimeline: 'Immediate (1-2 weeks)' | 'Within 1 Month' | 'Within 3 Months' | 'Planning/Budgeting';
  additionalRequirements: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  clientName: string;
  location: string;
  category: 'Classrooms' | 'Libraries' | 'Computer Labs' | 'Staff Rooms';
  unitsSupplied: number;
  year: number;
  image: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Orders' | 'Customization' | 'Materials' | 'Delivery' | 'Warranty';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  city: string;
  rating: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institutionName: string;
  institutionType: 'Primary/High School' | 'College & University' | 'Academy/Coaching' | 'Furniture Dealer/Contractor' | 'Corporate Office';
  city: string;
  deliveryAddress?: string;
  ntnOrRegistration?: string;
  createdAt: string;
  role: 'school_buyer' | 'dealer' | 'admin';
}

export interface SavedQuoteRecord {
  id: string;
  quoteNumber: string;
  date: string;
  status: 'Under Review' | 'Proforma Issued' | 'In Production' | 'Delivered';
  items: QuoteItem[];
  estimatedMinTotal: number;
  estimatedMaxTotal: number;
  timeline: string;
  notes?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
