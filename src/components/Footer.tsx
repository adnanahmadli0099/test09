import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { ProductCategory } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface FooterProps {
  onNavigate: (view: string, categoryFilter?: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <BrandLogo variant="dark" size="md" />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              Decent School Furniture is a premier manufacturer and supplier of ergonomic student desks, classroom chairs, institutional benches, and customized school furniture.
            </p>
            <div className="text-xs text-slate-500 pt-2 space-y-1">
              <div>Factory: {COMPANY_INFO.contact.address}</div>
              <div>Inquiries: {COMPANY_INFO.contact.phone}</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('products', 'student-desks')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Student Desks & Chairs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'classroom-furniture')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Classroom Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'school-benches')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  School Benches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'teacher-tables')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Teacher Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'office-furniture')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Office Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'custom-furniture')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Custom Furniture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Follow Us */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 mb-6">
              <li>
                <button
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-orders')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Custom Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2025 Decent School Furniture. All rights reserved.
          </div>
          <div className="text-slate-400 font-medium">
            Quality Furniture. Better Learning.
          </div>
        </div>
      </div>
    </footer>
  );
};
