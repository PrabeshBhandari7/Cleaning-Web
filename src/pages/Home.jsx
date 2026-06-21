import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Phone, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero_clean_space.png';

export default function Home({ services, formatPrice, isAfter, setIsAfter }) {
  return (
    <>
      <Helmet>
        <title>Professional Cleaning Services in Dubai | Platinum Smile</title>
        <meta name="description" content="Reliable cleaning, maintenance, painting, and plumbing services for homes and offices in Dubai. Get a free quote today!" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-display font-black text-brand-green leading-tight">
            Professional Building Cleaning & <br />
            <span className="text-brand-orange">Maintenance Services</span> in Dubai
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
            Reliable cleaning, maintenance, painting, plumbing, and renovation services for homes, offices, apartments, villas, and commercial properties.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl font-bold bg-brand-green text-white hover:bg-brand-green-hover text-center shadow-lg shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Free Quote
            </Link>
            <a
              href="https://wa.me/971562314576"
              target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-xl font-bold border border-[#25D366] bg-[#25D366] text-white hover:bg-[#128C7E] text-center transition-all shadow-lg flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              WhatsApp Now
            </a>
            <a
              href="tel:+971562314576"
              className="px-8 py-4 rounded-xl font-bold border border-brand-orange bg-brand-orange text-white hover:bg-orange-600 text-center transition-all shadow-lg flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-5 h-5" /> Call Us Today
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4 border-t border-brand-border max-w-md">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">JS</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-700">MT</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">AM</div>
            </div>
            <div className="text-xs">
              <div className="flex items-center text-amber-500 gap-0.5 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-slate-800 ml-1">4.9/5 Rating</span>
              </div>
              <span className="text-slate-500 font-medium">From 10,000+ Cleaned Spaces</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:col-span-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-2xl bg-slate-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
            <img
              src={heroImg}
              alt="Sparkling clean space hero illustration"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* VISUAL TRANSFORMATION & STATS PLAN */}
      <section className="bg-white py-20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Text and stats side */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              Our Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              See the Transformation
            </h2>
            <p className="text-slate-500 leading-relaxed">
              We pay attention to details other cleaners miss. Switch between Before & After modes
              to inspect the high standard of cleanliness our teams deliver in bathrooms, parks, and
              homes.
            </p>

            <div className="flex gap-4 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setIsAfter(false)}
                className={`flex-grow py-3 rounded-lg font-bold text-sm transition-all ${
                  !isAfter
                    ? 'bg-white text-brand-green shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Before Cleaning
              </button>
              <button
                onClick={() => setIsAfter(true)}
                className={`flex-grow py-3 rounded-lg font-bold text-sm transition-all ${
                  isAfter
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                After Cleaning
              </button>
            </div>

            {/* List pricing info dynamically using services state */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              {services.slice(0, 4).map((s) => (
                <div key={s.id} className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">{s.title}</span>
                  <span className="text-brand-green font-extrabold">{formatPrice(s.price)}</span>
                </div>
              ))}
            </div>

            {/* Features checkmarks */}
            <ul className="grid grid-cols-2 gap-3 pt-4 text-xs font-semibold text-brand-green">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Professional Cleaning Solutions
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Residential & Commercial Services
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Quality Materials & Equipment
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Reliable Support
              </li>
              <li className="flex items-center gap-2 col-span-2">
                <Check className="w-4 h-4 text-brand-orange" /> Free Estimates
              </li>
            </ul>
          </div>

          {/* Interactive slider side */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-xl bg-slate-100">
              {/* BEFORE state */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-end p-8 ${
                  isAfter ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase tracking-widest">
                  Before
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Messy & Dusty Environments
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Stained surfaces, cluttered rooms, and accumulated dust.
                </p>
              </div>

              {/* AFTER state */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-end p-8 ${
                  isAfter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'saturate(1.1) brightness(1.15) contrast(1.05)',
                }}
              >
                {/* Simulated sparkles */}
                <div className="absolute top-1/4 left-1/3 w-6 h-6 animate-pulse text-yellow-300">
                  <Sparkles className="w-full h-full" />
                </div>
                <div className="absolute top-12 right-1/4 w-8 h-8 animate-bounce text-yellow-200">
                  <Sparkles className="w-full h-full" />
                </div>

                <span className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-brand-green text-white text-xs font-bold uppercase tracking-widest">
                  After Cleaning.Web
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  ✨ Sanitized & Sparkling Workspace
                </h3>
                <p className="text-slate-200 text-sm mt-1">
                  Disinfected countertops, organized furniture, and completely dust-free air.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
