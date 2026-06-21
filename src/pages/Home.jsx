import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Phone,
  Star,
  Sparkles,
  Check,
  ArrowRight,
  Shield,
  Clock,
  Leaf,
  Users,
  Award,
  ChevronDown,
  MapPin,
  Zap,
  Heart,
  Briefcase,
  Home as HomeIcon,
  Droplets,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';
import heroImg from '../assets/hero_clean_space.png';
import residentialImg from '../assets/residential_clean.png';
import officeImg from '../assets/office_clean.png';
import deepImg from '../assets/deep_clean.png';
import washroomImg from '../assets/washroom_clean.png';

/* ─── Stat Counter Component ─── */
function StatCard({ value, label, icon: Icon, suffix = '' }) {
  return (
    <div className="flex flex-col items-center text-center p-6 group">
      <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl md:text-4xl font-display font-black text-brand-green">
        {value}<span className="text-brand-orange">{suffix}</span>
      </div>
      <div className="text-sm text-slate-500 font-semibold mt-1">{label}</div>
    </div>
  );
}

/* ─── Service Card Component ─── */
function ServiceCard({ title, desc, image, badge, price, formatPrice, icon: Icon, to }) {
  return (
    <Link
      to={to || '/services'}
      className="group relative rounded-3xl overflow-hidden shadow-md border border-brand-border bg-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
        {price && (
          <span className="absolute bottom-4 right-4 bg-white/95 text-brand-green text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
            From {formatPrice(price)}
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-slate-800">{title}</h3>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
        <div className="flex items-center gap-1.5 text-brand-orange text-xs font-bold mt-4 group-hover:gap-3 transition-all">
          Book Now <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ name, role, text, rating, initials, color }) {
  return (
    <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-white text-sm`}>
            {initials}
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm">{name}</div>
            <div className="text-slate-400 text-xs font-medium">{role}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">"{text}"</p>
    </div>
  );
}

/* ─── Process Step ─── */
function ProcessStep({ step, title, desc, icon: Icon }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-brand-green flex items-center justify-center text-white shadow-lg shadow-brand-green/25 mb-5 mx-auto">
          <Icon className="w-7 h-7" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-orange text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
          {step}
        </div>
      </div>
      <h3 className="font-display font-bold text-slate-800 text-base mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed max-w-[180px]">{desc}</p>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-brand-border rounded-2xl overflow-hidden cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
        <span className="font-bold text-slate-800 text-sm pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-green shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-brand-border bg-slate-50/50">
          <div className="pt-4">{a}</div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN HOME PAGE COMPONENT
   ══════════════════════════════════════════════════ */
export default function Home({ services, formatPrice, isAfter, setIsAfter }) {
  const featuredServices = [
    {
      title: 'Residential Cleaning',
      desc: 'Detailed dusting, scrubbing, and sanitizing for apartments, villas, and family homes across Dubai.',
      image: residentialImg,
      badge: 'Most Popular',
      price: 150,
      icon: HomeIcon,
    },
    {
      title: 'Commercial Cleaning',
      desc: 'Organized and disinfected offices, restrooms, and reception halls to keep your business pristine.',
      image: officeImg,
      badge: 'Business Ready',
      price: 300,
      icon: Briefcase,
    },
    {
      title: 'Deep Cleaning',
      desc: 'Heavy-duty restore cleaning targeting baseboards, filters, and behind appliances for a fresh start.',
      image: deepImg,
      badge: 'Full Restoration',
      price: 250,
      icon: Sparkles,
    },
    {
      title: 'Washroom Sanitization',
      desc: 'Complete wall-to-floor bleaching, grout scrubbing, and biological sanitization for hygienic restrooms.',
      image: washroomImg,
      badge: 'Hygiene First',
      price: 120,
      icon: Droplets,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Al-Rashid',
      role: 'Villa Owner, Dubai Marina',
      text: 'Absolutely outstanding service! The team was professional, punctual, and left my villa spotless. The deep cleaning exceeded all my expectations. Highly recommended!',
      rating: 5,
      initials: 'SA',
      color: 'bg-brand-green',
    },
    {
      name: 'Marcus Thompson',
      role: 'Office Manager, DIFC',
      text: 'We use Cleaning.Web for our entire office complex weekly. The staff are vetted, reliable, and the quality is consistently excellent. Our employees love coming to a clean environment.',
      rating: 5,
      initials: 'MT',
      color: 'bg-brand-orange',
    },
    {
      name: 'Priya Sharma',
      role: 'Property Manager, JBR',
      text: 'Managed several properties and this is by far the best cleaning company I\'ve worked with. Always on time, great communication, and fair pricing. 5 stars every time!',
      rating: 5,
      initials: 'PS',
      color: 'bg-purple-500',
    },
    {
      name: 'Ahmed Al-Farsi',
      role: 'Restaurant Owner, Downtown',
      text: 'The commercial kitchen deep clean was phenomenal — passed our hygiene inspection with flying colors. Professional equipment and eco-friendly products. A game changer!',
      rating: 5,
      initials: 'AF',
      color: 'bg-teal-600',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Apartment Resident, Business Bay',
      text: 'Booked a move-out clean and was blown away. My landlord actually returned my full security deposit. Worth every dirham. Will definitely book again at my new place!',
      rating: 5,
      initials: 'ER',
      color: 'bg-pink-500',
    },
    {
      name: 'James Wilson',
      role: 'Facilities Director, Jumeirah',
      text: 'Their municipal and outdoor cleaning service is second to none. Efficient team, right equipment, and they handle large-scale jobs without any hassle. Truly professional.',
      rating: 5,
      initials: 'JW',
      color: 'bg-indigo-500',
    },
  ];

  const faqs = [
    {
      q: 'What areas in Dubai do you serve?',
      a: 'We serve all major areas across Dubai including Dubai Marina, JBR, DIFC, Downtown, Business Bay, Jumeirah, Palm Jumeirah, Al Barsha, Deira, Bur Dubai, and all other communities.',
    },
    {
      q: 'How long does a standard cleaning session take?',
      a: 'A standard residential cleaning for a 2–3 bedroom apartment typically takes 3–4 hours. Deep cleaning can take 6–8 hours depending on the size and condition of the property.',
    },
    {
      q: 'Do you use eco-friendly cleaning products?',
      a: 'Yes! We exclusively use certified biodegradable, non-toxic, and plant-based cleaning formulas that are safe for your family, children, and pets while still delivering a deep clean.',
    },
    {
      q: 'Are your cleaners background-checked and insured?',
      a: 'Absolutely. Every member of our team undergoes thorough background verification, professional training, and is fully insured. Your safety and property are our top priority.',
    },
    {
      q: 'How do I book a cleaning service?',
      a: 'You can book instantly via our Contact page, WhatsApp us at +971 56 231 4576, or call us directly. We offer same-day and next-day availability in most areas.',
    },
    {
      q: 'Do you offer recurring service discounts?',
      a: 'Yes! We offer 20% off for weekly bookings, 15% off for bi-weekly, and 10% off for monthly recurring plans. Consistency saves you money and maintains your space perfectly.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Professional Cleaning Services in Dubai | Cleaning.Web</title>
        <meta
          name="description"
          content="Dubai's #1 professional cleaning company. Expert residential, commercial, deep cleaning, and maintenance services. Eco-friendly, vetted staff, same-day booking available."
        />
      </Helmet>

      {/* ── HERO SECTION ── */}
      <section className="relative max-w-7xl mx-auto px-6 py-14 md:py-24 grid md:grid-cols-12 gap-12 items-center overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="md:col-span-6 space-y-7">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-brand-green/8 text-brand-green text-xs font-bold px-4 py-2 rounded-full border border-brand-green/15">
            <Shield className="w-3.5 h-3.5" />
            <span>Dubai's Most Trusted Cleaning Company</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-brand-green leading-[1.1]">
            Professional <br />
            <span className="text-brand-orange">Cleaning &</span> <br />
            Maintenance
          </h1>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
            Reliable, eco-friendly cleaning, maintenance, painting, and plumbing services for homes, offices, apartments, villas, and commercial properties across Dubai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-brand-green text-white hover:bg-brand-green-hover shadow-lg shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971562314576"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold border border-[#25D366] bg-[#25D366] text-white hover:bg-[#128C7E] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <a
              href="tel:+971562314576"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold border border-brand-orange bg-brand-orange text-white hover:bg-brand-orange-hover transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>

          {/* Social Proof Bar */}
          <div className="flex items-center gap-4 pt-5 border-t border-brand-border max-w-sm">
            <div className="flex -space-x-2.5">
              {['SA', 'MT', 'AM', 'ER'].map((init, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                  style={{
                    backgroundColor: ['#085f56', '#ff724c', '#7c3aed', '#0d9488'][i],
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-slate-800 font-bold text-xs ml-1.5">4.9 / 5.0</span>
              </div>
              <span className="text-slate-400 text-xs font-medium">10,000+ satisfied customers</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:col-span-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-2xl bg-slate-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-brand-green/8 rounded-full blur-3xl pointer-events-none" />
            <img
              src={heroImg}
              alt="Professional cleaning service in Dubai"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-green flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800">100% Satisfaction</div>
                  <div className="text-[10px] text-slate-400 font-medium">Guaranteed or Free Reclean</div>
                </div>
              </div>
            </div>
            {/* Top floating tag */}
            <div className="absolute top-5 right-5 bg-brand-orange/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
              ✦ Available Today
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-border">
          <StatCard value="10,000" label="Spaces Cleaned" icon={Sparkles} suffix="+" />
          <StatCard value="98" label="Client Satisfaction" icon={Heart} suffix="%" />
          <StatCard value="200" label="Trained Professionals" icon={Users} suffix="+" />
          <StatCard value="8" label="Years in Dubai" icon={Award} suffix="+" />
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green mb-4">
              Tailored Services for Every Space
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              From daily home care to large-scale commercial maintenance — we have the expertise, equipment, and team to handle any cleaning challenge in Dubai.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredServices.map((s, i) => (
              <ServiceCard key={i} {...s} formatPrice={formatPrice} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-brand-green text-brand-green font-bold hover:bg-brand-green hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white py-20 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side — text */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-3">
                Why Cleaning.Web?
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green mb-4">
                The Standard Others <br /> Can't Match
              </h2>
              <p className="text-slate-500 leading-relaxed">
                With 8+ years serving Dubai's most demanding properties, we've built a reputation for quality, reliability, and honesty that our competitors simply cannot replicate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Leaf,
                  title: 'Eco-Friendly Products',
                  desc: 'Certified biodegradable, plant-based formulas — safe for children, pets, and the environment.',
                },
                {
                  icon: Shield,
                  title: 'Fully Insured & Bonded',
                  desc: 'Every team member is background-checked, insured, and trained to the highest standards.',
                },
                {
                  icon: Clock,
                  title: 'Always On Time',
                  desc: 'We respect your schedule. Our teams arrive on time, every time — guaranteed.',
                },
                {
                  icon: Award,
                  title: 'Satisfaction Guarantee',
                  desc: 'Not happy? We\'ll return and re-clean the area absolutely free of charge.',
                },
                {
                  icon: Zap,
                  title: 'Same-Day Booking',
                  desc: 'Need a clean urgently? We offer same-day and next-day availability across Dubai.',
                },
                {
                  icon: MapPin,
                  title: 'All Dubai Areas',
                  desc: 'We cover all areas — Marina, JBR, Downtown, Business Bay, Palm, and beyond.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="flex gap-3.5 p-4 rounded-2xl border border-brand-border bg-brand-bg hover:border-brand-green/30 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm mb-1">{title}</div>
                    <div className="text-slate-500 text-xs leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — before/after visual */}
          <div className="space-y-5">
            <div className="flex gap-3 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setIsAfter(false)}
                className={`flex-grow py-3 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                  !isAfter ? 'bg-white text-brand-green shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Before Cleaning
              </button>
              <button
                onClick={() => setIsAfter(true)}
                className={`flex-grow py-3 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                  isAfter ? 'bg-brand-green text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                After Cleaning ✨
              </button>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-xl bg-slate-100">
              {/* BEFORE */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-end p-8 ${
                  isAfter ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase tracking-widest">
                  Before
                </span>
                <h3 className="text-2xl font-bold text-white font-display">Messy & Dusty Environments</h3>
                <p className="text-slate-300 text-sm mt-1">Stained surfaces, cluttered rooms, and accumulated dust.</p>
              </div>

              {/* AFTER */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-end p-8 ${
                  isAfter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'saturate(1.15) brightness(1.1)',
                }}
              >
                <div className="absolute top-5 left-1/3 w-7 h-7 animate-pulse text-yellow-300">
                  <Sparkles className="w-full h-full" />
                </div>
                <div className="absolute top-10 right-1/4 w-8 h-8 animate-bounce text-yellow-200">
                  <Sparkles className="w-full h-full" />
                </div>
                <span className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-brand-green text-white text-xs font-bold uppercase tracking-widest">
                  After ✨
                </span>
                <h3 className="text-2xl font-bold text-white font-display">Sanitized & Sparkling Clean</h3>
                <p className="text-slate-200 text-sm mt-1">Disinfected counters, organized furniture, completely dust-free air.</p>
              </div>
            </div>

            {/* Mini price list */}
            <div className="bg-brand-bg border border-brand-border rounded-2xl p-5 space-y-3">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Starting Prices</div>
              {(services || []).slice(0, 4).map((s) => (
                <div key={s.id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">{s.title}</span>
                  <span className="text-brand-green font-extrabold">{formatPrice(s.price)}</span>
                </div>
              ))}
              <Link
                to="/contact"
                className="flex items-center justify-center gap-1.5 w-full mt-3 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orange-hover transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Get Custom Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-brand-bg border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-3">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Booking a professional clean in Dubai has never been easier. Get started in minutes.
            </p>
          </div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {/* Connecting line (desktop) */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent hidden lg:block" />

            <ProcessStep
              step={1}
              icon={MessageCircle}
              title="Contact Us"
              desc="Call, WhatsApp, or fill our quick online form to describe your space and needs."
            />
            <ProcessStep
              step={2}
              icon={CheckCircle}
              title="Get Free Quote"
              desc="We'll provide a transparent, no-obligation quote tailored to your requirements."
            />
            <ProcessStep
              step={3}
              icon={Users}
              title="Team Arrives"
              desc="Our vetted, uniformed professionals arrive on time with all required equipment."
            />
            <ProcessStep
              step={4}
              icon={Sparkles}
              title="Enjoy Clean Space"
              desc="Inspect the results with our quality checklist and enjoy your spotless environment."
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-green text-white font-bold hover:bg-brand-green-hover shadow-lg shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Book Your Clean Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-3">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Over 10,000 satisfied clients across Dubai trust us to maintain their homes and businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>

          {/* Review summary bar */}
          <div className="mt-12 bg-brand-bg border border-brand-border rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="text-5xl font-display font-black text-brand-green">4.9</div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-slate-500 text-sm font-medium">Based on 1,200+ reviews</div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {['Google', 'Trustpilot', 'Facebook'].map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2 bg-white border border-brand-border rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2"
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {platform}
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white font-bold text-sm hover:bg-brand-orange-hover transition-all hover:scale-[1.02] shrink-0"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 bg-brand-bg border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-3">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto">
              Everything you need to know before booking your first clean with us.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-500 text-sm mb-4">Still have questions? We're here to help.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/971562314576"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#128C7E] transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+971562314576"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-brand-green text-brand-green font-bold text-sm hover:bg-brand-green hover:text-white transition-all"
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
