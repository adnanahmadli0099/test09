import React, { useState } from 'react';
import { ProjectShowcase } from '../types';
import {
  ChevronRight,
  ChevronLeft,
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

interface ProjectsViewProps {
  onOpenQuote: () => void;
  onNavigateToContact: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onOpenQuote,
  onNavigateToContact,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const categories = [
    'All Projects',
    'Classrooms',
    'Libraries',
    'Computer Labs',
    'School Benches',
    'Staff Rooms',
  ];

  const galleryList = [
    {
      id: 'p-1',
      title: 'Modern Classroom Setup',
      desc: 'Comfortable and durable furniture for better learning environments.',
      category: 'Classrooms',
      image: '/src/assets/images/hero_classroom_spaces_1792007659376.jpg',
      client: 'Army Public School Campus',
      location: 'Lahore, Pakistan',
      units: 420,
      year: 2025,
    },
    {
      id: 'p-2',
      title: 'School Library Furniture',
      desc: 'Well-organized library furniture for focused study and reading.',
      category: 'Libraries',
      image: '/src/assets/images/school_library_interior_1792007693659.jpg',
      client: 'National University of Sciences & Tech',
      location: 'Islamabad, Pakistan',
      units: 180,
      year: 2024,
    },
    {
      id: 'p-3',
      title: 'Computer Lab Setup',
      desc: 'Ergonomic and space-saving furniture for modern computer labs.',
      category: 'Computer Labs',
      image: '/src/assets/images/school_computer_lab_1792007694301.jpg',
      client: 'City Senior Campus',
      location: 'Rawalpindi, Pakistan',
      units: 120,
      year: 2025,
    },
    {
      id: 'p-4',
      title: 'School Bench Installation',
      desc: 'Strong and reliable benches for long-lasting use in schools and colleges.',
      category: 'School Benches',
      image: '/src/assets/images/durable_school_bench_1792007660124.jpg',
      client: 'Government Model College',
      location: 'Faisalabad, Pakistan',
      units: 310,
      year: 2024,
    },
    {
      id: 'p-5',
      title: 'Staff Room Furniture',
      desc: 'Comfortable and professional furniture for teachers and staff.',
      category: 'Staff Rooms',
      image: '/src/assets/images/teacher_executive_desk_1792007660688.jpg',
      client: 'Roots Millennium Campus',
      location: 'Islamabad, Pakistan',
      units: 65,
      year: 2025,
    },
    {
      id: 'p-6',
      title: 'Complete Classroom Solution',
      desc: 'From desks to storage, a complete solution for modern classrooms.',
      category: 'Classrooms',
      image: '/src/assets/images/classroom_modular_tables_1792007659164.jpg',
      client: 'Beaconhouse Junior School',
      location: 'Multan, Pakistan',
      units: 250,
      year: 2025,
    },
  ];

  const filtered = activeCategory === 'All Projects'
    ? galleryList
    : galleryList.filter((p) => p.category === activeCategory);

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
          <span>Home</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900">Projects & Gallery</span>
        </div>
      </div>

      {/* 2. Top Hero Banner matching Decent School Furniture Projects Gallery.png */}
      <div className="relative bg-white overflow-hidden py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-left space-y-3">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                Our Work
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E2954] tracking-tight">
                Projects & Gallery
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Explore our completed school furniture projects and see how we create better learning spaces in schools, colleges and educational institutions.
              </p>

              {/* 4 Trust points */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Real Installations</span>
                  <span className="text-[11px] text-slate-500">From Our Projects</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Quality Craftsmanship</span>
                  <span className="text-[11px] text-slate-500">In Every Setup</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Schools & Colleges</span>
                  <span className="text-[11px] text-slate-500">& Institutions</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Custom Solutions</span>
                  <span className="text-[11px] text-slate-500">For Every Space</span>
                </div>
              </div>
            </div>

            {/* Right Artistic Visual with Real Spaces Real Impact badge */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="/src/assets/images/hero_classroom_spaces_1792007659376.jpg"
                alt="Real classroom installation"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm text-center">
                <span className="font-serif italic text-xs font-bold text-[#0E2954]">
                  Real Spaces · Real Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c
                  ? 'bg-[#0E2954] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 6 Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item as any)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-[#0B192C]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 4 Metric Trust Strip */}
      <div className="bg-white py-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Multiple Projects Completed</h4>
                <p className="text-[11px] text-slate-500">Across schools & institutions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Quality & Durability</h4>
                <p className="text-[11px] text-slate-500">Built to last for years</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Happy Students & Teachers</h4>
                <p className="text-[11px] text-slate-500">Better spaces, better learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Custom Solutions</h4>
                <p className="text-[11px] text-slate-500">Tailored to your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Need Custom Furniture for Your School Banner */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-14">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/hero_classroom_spaces_1792007659376.jpg"
            alt="Classroom background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2954] via-[#0E2954]/95 to-slate-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-left space-y-3">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Let's Build Your Next Project
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Need Custom Furniture for Your School or Institution?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                We offer personalized furniture solutions, bulk orders and custom designs to meet your specific requirements.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Request a Quote →
                </button>
                <button
                  onClick={onNavigateToContact}
                  className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-bold cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right 3 pills */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Custom Sizes & Designs</div>
                  <div className="text-[10px] text-slate-300">As per your requirements</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Bulk Order Discounts</div>
                  <div className="text-[10px] text-slate-300">For schools & institutions</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Expert Support</div>
                  <div className="text-[10px] text-slate-300">From planning to delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Testimonial Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-left">
              <span className="text-xs font-bold uppercase text-orange-600 tracking-wider">
                What Our Clients Say
              </span>
              <h3 className="font-display font-bold text-2xl text-[#0E2954] mt-1">
                Trusted by Educational Institutions
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                We are proud to be a part of many successful projects. Here's what our clients have to say about our work.
              </p>
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <blockquote className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">— {currentTestimonial.author}</div>
                  <div className="text-[11px] text-slate-500">{currentTestimonial.role}, {currentTestimonial.institution}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                    className="w-8 h-8 rounded-full border border-slate-300 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
