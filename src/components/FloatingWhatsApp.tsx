import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppQuoteUrl } from '../data/companyInfo';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={getWhatsAppQuoteUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-108 group border border-emerald-400/40 animate-whatsapp-breathe"
        aria-label="Chat with Decent School Furniture on WhatsApp"
      >
        {/* Subtle pulsating outer radar ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none -z-10 duration-1000"
          aria-hidden="true"
        />

        <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366] shrink-0 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-semibold tracking-wide select-none">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
