import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Eye } from 'lucide-react';
import { PROJECTS_GALLERY } from '../data/projects';
import { ProjectShowcase } from '../types';

interface ProjectsGallerySectionProps {
  onViewFullGallery: () => void;
  onSelectProject?: (project: ProjectShowcase) => void;
}

export const ProjectsGallerySection: React.FC<ProjectsGallerySectionProps> = ({
  onViewFullGallery,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Classrooms' | 'Libraries' | 'Computer Labs' | 'Staff Rooms'>('All');

  const filteredProjects = activeTab === 'All'
    ? PROJECTS_GALLERY
    : PROJECTS_GALLERY.filter((p) => p.category === activeTab);

  const tabs: ('All' | 'Classrooms' | 'Libraries' | 'Computer Labs' | 'Staff Rooms')[] = [
    'All',
    'Classrooms',
    'Libraries',
    'Computer Labs',
    'Staff Rooms',
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E2954] tracking-tight">
              Our Projects & Gallery
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              See our furniture in real schools and educational institutions across different settings.
            </p>
          </div>

          <button
            onClick={onViewFullGallery}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer group shrink-0"
          >
            <span>View Gallery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Interactive Segmented Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#0E2954] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProjects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject?.(project)}
              className="group relative rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-md shadow-md inline-flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-orange-500" />
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    {project.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1 group-hover:text-blue-900 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {project.clientName} · {project.location}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{project.unitsSupplied} units installed</span>
                  <span className="text-slate-400">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Dots & Next */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer" />
          </div>
          <button
            onClick={onViewFullGallery}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm ml-2 cursor-pointer"
            aria-label="View more projects"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
