import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenCustomOrders: () => void;
  onOpenQuote: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenCustomOrders,
  onOpenQuote,
}) => {
  return (
    <div className="bg-[#0B192C] text-slate-200 text-xs py-2 px-4 sm:px-6 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Left message */}
        <div className="flex items-center gap-2 font-medium">
          <Megaphone className="w-3.5 h-3.5 text-orange-400 shrink-0 hidden xs:inline" />
          <span>
            <strong className="text-white font-semibold">Better Classrooms. Brighter Futures.</strong>
            <span className="hidden md:inline mx-2 text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">Quality School Furniture for a Stronger Tomorrow.</span>
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          <button
            onClick={onOpenCustomOrders}
            className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
          >
            Custom Orders
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={onOpenQuote}
            className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
