import React, { useState } from 'react';
import {
  Edit3,
  ShieldCheck,
  PackageCheck,
  Truck,
  Upload,
  ArrowRight,
  MessageCircle,
  Lightbulb,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { getWhatsAppQuoteUrl } from '../data/companyInfo';
import { TESTIMONIALS } from '../data/testimonials';
import { auth, submitCustomInquiryToFirestore } from '../services/firebase';

interface CustomOrdersViewProps {
  onOpenQuote: () => void;
  onNavigateToProjects: () => void;
}

export const CustomOrdersView: React.FC<CustomOrdersViewProps> = ({
  onOpenQuote,
  onNavigateToProjects,
}) => {
  const [customForm, setCustomForm] = useState({
    name: '',
    institution: '',
    phone: '',
    email: '',
    category: 'Student Desks & Chairs',
    quantity: '100',
    requirements: '',
    city: 'Lahore',
    fileName: '',
    agreeTerms: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const spaces = [
    { name: 'Classrooms', desc: 'Flexible layouts & smart design', image: '/src/assets/images/hero_classroom_spaces_1792007659376.jpg' },
    { name: 'Libraries', desc: 'Functional & organized spaces', image: '/src/assets/images/school_library_interior_1792007693659.jpg' },
    { name: 'Computer Labs', desc: 'Ergonomic & modern setups', image: '/src/assets/images/school_computer_lab_1792007694301.jpg' },
    { name: 'Science Labs', desc: 'Durable & safe furniture', image: '/src/assets/images/classroom_modular_tables_1792007659164.jpg' },
    { name: 'Staff Rooms', desc: 'Comfortable & professional', image: '/src/assets/images/teacher_executive_desk_1792007660688.jpg' },
    { name: 'Special Designs', desc: 'Unique solutions for your needs', image: '/src/assets/images/durable_school_bench_1792007660124.jpg' },
  ];

  const processSteps = [
    { num: '1', title: 'Share Your Requirements', desc: 'Tell us what you need.' },
    { num: '2', title: 'Design & Quotation', desc: 'We create a design and quote.' },
    { num: '3', title: 'Production', desc: 'High-quality manufacturing.' },
    { num: '4', title: 'Delivery', desc: 'On-time and safe delivery.' },
    { num: '5', title: 'Installation', desc: 'Setup at your location.' },
  ];

  const recentProjects = [
    { title: 'Modern Classroom Setup', sub: 'Custom Desks & Chairs', image: '/src/assets/images/hero_classroom_spaces_1792007659376.jpg' },
    { title: 'Library Furniture', sub: 'Bookshelves & Reading Tables', image: '/src/assets/images/school_library_interior_1792007693659.jpg' },
    { title: 'Computer Lab Setup', sub: 'Computer Tables & Chairs', image: '/src/assets/images/school_computer_lab_1792007694301.jpg' },
    { title: 'Science Lab Furniture', sub: 'Lab Tables & Storage', image: '/src/assets/images/classroom_modular_tables_1792007659164.jpg' },
    { title: 'Multipurpose Hall', sub: 'Custom Seating Arrangement', image: '/src/assets/images/durable_school_bench_1792007660124.jpg' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitCustomInquiryToFirestore({
        id: `inq-${Date.now()}`,
        userId: auth.currentUser?.uid || null,
        fullName: customForm.name || 'School Representative',
        schoolName: customForm.institution || 'Educational Institution',
        email: customForm.email || 'info@school.edu.pk',
        phone: customForm.phone || '03001234567',
        city: customForm.city || 'Lahore',
        projectScope: customForm.category,
        estimatedUnits: parseInt(customForm.quantity) || 50,
        notes: customForm.requirements,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Custom inquiry save note:', err);
    }
    setSubmitted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomForm({ ...customForm, fileName: e.target.files[0].name });
    }
  };

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/src/assets/images/hero_classroom_spaces_1792007659376.jpg"
            alt="Custom classroom environment"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2954] via-[#0E2954]/95 to-slate-900/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-left space-y-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Custom Furniture Solutions
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
                Need a Custom Furniture Solution?
              </h1>
              <p className="text-xs sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                We design and manufacture school furniture as per your specific requirements. From unique classroom layouts to bulk orders, we're here to help you build the perfect learning environment.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('custom-form-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onNavigateToProjects}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
                >
                  View Our Projects
                </button>
              </div>
            </div>

            {/* Right Artistic Text Note matching screenshot */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center font-serif text-white rotate-1 shadow-lg">
                <span className="text-xs uppercase tracking-widest font-sans text-orange-400 font-bold block mb-1">
                  Decent Bespoke
                </span>
                <p className="text-2xl font-light italic leading-snug">
                  "Your Vision. <br /> Our Design. <br /> Better Learning."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 4-Pill Value Strip */}
      <div className="bg-white py-5 border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Custom Designs</h4>
                <p className="text-[11px] text-slate-500">Made as per your requirements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">High Quality Materials</h4>
                <p className="text-[11px] text-slate-500">Durable & long-lasting</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Bulk Order Support</h4>
                <p className="text-[11px] text-slate-500">For schools & institutions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">On-Time Delivery</h4>
                <p className="text-[11px] text-slate-500">Across Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Section: Form (Left) vs Solutions For Every Space (Right) */}
      <div id="custom-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <h2 className="font-display text-2xl font-bold text-[#0E2954]">
              Tell Us About Your Custom Requirements
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Fill out the form below and our team will get in touch with you shortly to discuss your requirements and provide a detailed quote.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Custom Request Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, {customForm.name}. Our bespoke manufacturing manager will contact {customForm.institution} with drawings and material options.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  Submit another custom order inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customForm.name}
                      onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Institution Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customForm.institution}
                      onChange={(e) => setCustomForm({ ...customForm, institution: e.target.value })}
                      placeholder="Enter school / college name"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-orange-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-xs font-bold text-slate-600">
                        +92
                      </span>
                      <input
                        type="tel"
                        required
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        placeholder="300 1234567"
                        className="w-full text-xs px-3.5 py-2.5 rounded-r-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customForm.email}
                      onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                      placeholder="Enter email (optional)"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Product Category <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={customForm.category}
                      onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    >
                      <option value="Student Desks & Chairs">Student Desks & Chairs</option>
                      <option value="Classroom Modular Furniture">Classroom Modular Tables</option>
                      <option value="School Benches">Heavy-Duty School Benches</option>
                      <option value="Teacher Tables">Teacher & Faculty Tables</option>
                      <option value="School Lockers">Student Steel Lockers</option>
                      <option value="Science & STEM Lab">Science & STEM Lab Workbenches</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quantity (Approx.)
                    </label>
                    <input
                      type="number"
                      value={customForm.quantity}
                      onChange={(e) => setCustomForm({ ...customForm, quantity: e.target.value })}
                      placeholder="Enter quantity"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Custom Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={customForm.requirements}
                    onChange={(e) => setCustomForm({ ...customForm, requirements: e.target.value })}
                    placeholder="Tell us about your specific needs (dimensions, design, materials, etc.)"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-slate-50/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Delivery City <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={customForm.city}
                      onChange={(e) => setCustomForm({ ...customForm, city: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Other City">Other City (Nationwide)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Attach File (Optional CAD/PDF/Sketch)
                    </label>
                    <label className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 text-xs text-slate-600">
                      <Upload className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{customForm.fileName || 'Choose File'}</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={customForm.agreeTerms}
                      onChange={(e) => setCustomForm({ ...customForm, agreeTerms: e.target.checked })}
                      className="rounded accent-orange-500 text-orange-500"
                    />
                    <span>I agree to the privacy policy and terms & conditions.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Send Custom Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Custom Solutions for Every Space (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0E2954]">
                Custom Solutions for Every Space
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                We create furniture solutions tailored to your space, style and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {spaces.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs group flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                      <span>{s.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Have a Unique Idea? card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Have a Unique Idea?</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Share your concept with us. Our design team will help you turn it into reality.
                  </p>
                </div>
              </div>

              <a
                href={getWhatsAppQuoteUrl({
                  customMessage: 'I have a unique custom furniture idea for my school. Please advise on design feasibility and pricing.',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-slate-300 hover:border-orange-500 hover:text-orange-600 text-xs font-bold text-slate-700 whitespace-nowrap cursor-pointer transition-colors"
              >
                Discuss Your Idea →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. How Our Custom Order Process Works (5 Steps) */}
      <div className="bg-white py-14 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl font-bold text-[#0E2954]">
              How Our Custom Order Process Works
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              From idea to installation — we make the process simple and efficient.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {processSteps.map((step, idx) => (
              <div key={step.num} className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-base flex items-center justify-center shadow-md mb-3">
                  {step.num}
                </div>
                <h4 className="font-bold text-xs text-slate-900">{step.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Recent Custom Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0E2954]">
              Recent Custom Projects
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore some of our completed custom furniture projects for schools and institutions.
            </p>
          </div>
          <button
            onClick={onNavigateToProjects}
            className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
          >
            View All Projects →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {recentProjects.map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs group">
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs text-slate-900 truncate">{p.title}</h4>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Testimonial Quote Banner */}
      <div className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/3 text-left">
            <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">
              What Our Clients Say
            </span>
            <h3 className="font-display font-bold text-xl text-white mt-1">
              We're proud to work with schools and institutions across Pakistan.
            </h3>
          </div>

          <div className="md:w-2/3 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 relative">
            <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-700">
              <div>
                <div className="text-xs font-bold text-white">— {currentTestimonial.author}</div>
                <div className="text-[11px] text-slate-400">{currentTestimonial.role}, {currentTestimonial.institution}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
