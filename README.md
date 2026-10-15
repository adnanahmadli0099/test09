# Decent School Furniture — Better Study. Better Future.

A high-performance educational furniture manufacturer, wholesale supplier, and product catalog web application built for **Decent School Furniture**.

## Brand & Overview
- **Brand Name:** Decent School Furniture
- **Tagline:** Better Study. Better Future.
- **Secondary Motto:** Quality Furniture. Better Learning.
- **Target Audience:** School administrators, college & university procurement officers, academy founders, educational institutions, dealers, and government tender committees.

---

## Key Features & User Workflows

1. **Official Brand Identity:**
   - Vector SVG logo faithfully recreating the official emblem: Mortarboard graduation cap in blue with orange tassel, stylized "D" with classroom desk and chair silhouette, vibrant orange crescent swoosh, and clean typographic hierarchy.

2. **Homepage Matching Design Reference:**
   - **Announcement Bar:** Key highlights and quick links ("Custom Orders", "Get a Quote").
   - **Hero Section:** "Creating Better Learning Spaces" with primary and secondary CTAs and high-resolution classroom photography.
   - **Value Proposition Cards:** 4 trust pillars (Durable Materials, Comfortable Designs, Bulk Order Inquiries, Custom Furniture Options).
   - **"Explore Our Furniture" Categories Grid:** Direct routes into Student Desks & Chairs, Classroom Furniture, School Benches, Teacher Tables, Office Furniture, and Custom Furniture.
   - **"Featured Products" Section:** Top educational items with instant "Get a Quote" and "View Details" actions.
   - **"Furniture Solutions for Every Educational Space":** Dedicated solutions for Schools, Colleges, Classrooms, and Staff Rooms.
   - **"Why Choose Decent School Furniture":** 4 quality assurances.
   - **"Our Manufacturing Process":** 4-step sequence from raw materials to final delivered product.
   - **"Our Projects & Gallery":** Filterable gallery by space (Classrooms, Libraries, Computer Labs, Staff Rooms).
   - **Composite Banner:** Bulk orders promo, client testimonial slider, and interactive FAQ accordion.
   - **"Get in Touch" Section:** Phone, WhatsApp, email, interactive inquiry form with validation, and product showcase.
   - **Global Footer & Floating WhatsApp:** Floating "Chat on WhatsApp" button with pre-filled inquiry dispatch.

3. **Product Catalog & Dynamic Detail Views:**
   - Multi-faceted filtering by Category, Grade Level (Primary to University), and search query.
   - Sort by Featured, Price Low to High, Price High to Low, Name.
   - Technical specifications modal displaying dimensions, frame gauge, load capacities, bulk discount tiers, warranty, and color swatches.

4. **Institutional Login & New Account Portal (`src/views/AuthView.tsx` & `src/views/AccountDashboardView.tsx`):**
   - **Sign In to School Account:** Official email and password authentication with "Remember Me" and "Forgot Password" recovery flow.
   - **Create New Account:** Specialized institutional onboarding form capturing representative full name, official email, phone/WhatsApp, school/college name, institution type (Primary/High School, College & University, Academy, Dealer/Contractor), city, delivery address, and password.
   - **Instant Demo Logins:** 1-click test accounts for *School Administrator (Beacon High)* and *University Procurement Head (Apex College)* for immediate evaluation.
   - **School Dashboard:**
     - Overview of submitted quotations and proformas with status badges (*"Proforma Issued"*, *"Under Review"*, *"In Production"*).
     - Print official proforma slips or share directly via WhatsApp with the factory desk.
     - Saved **Wishlist** management with direct *"Add to Quotation"* action.
     - Official school and campus registration record.

5. **Dedicated Product Detail Page (`src/views/ProductDetailView.tsx`):**
   - Breadcrumbs navigation (`Home > Products > Category > Product Name`).
   - 5-image interactive gallery with previous/next arrows and thumbnail selector.
   - "PKR 0 (Quote Only)" indicator with bulk estimate range.
   - 4 feature tags (Durable Construction, Ergonomic Design, Low Maintenance, Bulk Order Available).
   - Interactive quantity stepper, Available Colors swatches, Materials breakdown, and Dimensions.
   - 4-tab interface (Description & Key Features, Specifications, Shipping & Returns, Reviews).
   - "Related Products" recommendation grid.
   - Heart button for saving to the school's Wishlist.

6. **Institutional Quotation Workflow (`src/components/QuotationDrawer.tsx`):**
   - Global `Ctrl+K` shortcut or search icon trigger with live filtering across all products, materials, and categories.

---

## Project Structure

```
├── index.html                    # HTML entry point with Plus Jakarta Sans & SEO meta
├── metadata.json                 # AI Studio application metadata
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite bundler configuration
├── src/
│   ├── assets/
│   │   └── images/               # High-fidelity educational furniture photography
│   ├── components/
│   │   ├── BrandLogo.tsx         # Official SVG brand emblem & typography
│   │   ├── AnnouncementBar.tsx   # Top announcement strip
│   │   ├── Navbar.tsx            # Sticky navigation with mega dropdown & search
│   │   ├── HeroSection.tsx       # Homepage hero with classroom photo
│   │   ├── FeatureCardsStrip.tsx # 4 trust value proposition cards
│   │   ├── CategoryGrid.tsx      # 6 category cards
│   │   ├── FeaturedProducts.tsx  # Featured furniture items
│   │   ├── EducationalSpacesSection.tsx # Solutions for schools/colleges
│   │   ├── WhyChooseUs.tsx       # 4 manufacturing pillars
│   │   ├── ManufacturingProcess.tsx # 4-step process
│   │   ├── ProjectsGallerySection.tsx # Filterable portfolio gallery
│   │   ├── SplitBannerSection.tsx# Bulk CTA + Testimonials + FAQ accordion
│   │   ├── ContactSection.tsx    # Contact information and inquiry form
│   │   ├── Footer.tsx            # Full website footer with legal & categories
│   │   ├── FloatingWhatsApp.tsx  # Floating quick chat widget
│   │   ├── QuotationDrawer.tsx   # Quotation cart, proforma estimate & WhatsApp
│   │   ├── ProductDetailModal.tsx# Technical specs, bulk discounts & gallery
│   │   └── SearchModal.tsx       # Live search modal with Ctrl+K trigger
│   ├── data/
│   │   ├── companyInfo.ts        # Centralized contact, WhatsApp URLs, factory address
│   │   ├── products.json         # Complete product catalog with dimensions & specs
│   │   ├── categories.ts         # Category taxonomy
│   │   ├── projects.ts           # Completed school projects and case studies
│   │   ├── faqs.ts               # Frequently asked questions
│   │   └── testimonials.ts       # School administrator reviews
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── views/
│   │   ├── HomeView.tsx          # Homepage matching screenshot layout
│   │   ├── CatalogView.tsx       # Dedicated catalog view with multi-facet filters
│   │   ├── AboutView.tsx         # Company history, factory & certifications
│   │   ├── ProjectsView.tsx      # Installation case studies
│   │   ├── CustomOrdersView.tsx  # Bespoke sizing, school branding & bulk orders
│   │   ├── FaqView.tsx           # Searchable FAQs center
│   │   └── ContactView.tsx       # Factory visit info and official form
│   ├── App.tsx                   # Main application router and state store
│   ├── index.css                 # Tailwind CSS styles and theme font definitions
│   └── main.tsx                  # React DOM mount point
```

---

## Local Development & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or bun

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### Typecheck & Build
```bash
npm run build
```

---

## Customizing Company Information
All contact details (phone numbers, WhatsApp numbers, email addresses, and factory address) are centralized in:
`/src/data/companyInfo.ts`

Any unknown information has been clearly marked and can be edited in that single file to automatically reflect across the entire website.
