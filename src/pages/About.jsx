import React from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Sparkles, Check, Clock, ShieldCheck, Briefcase, MapPin } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Platinum Smile Dubai</title>
        <meta name="description" content="Learn more about Platinum Smile Building Cleaning Services LLC, our reliable team, and why we are trusted across Dubai for quality workmanship." />
      </Helmet>

      {/* ABOUT US */}
      <section className="bg-brand-bg py-20 border-y border-brand-border">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
            About Platinum Smile
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
            Professional Cleaning & Maintenance Solutions
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Platinum Smile Building Cleaning Services LLC delivers professional cleaning and maintenance solutions throughout Dubai. Our experienced team is committed to providing dependable service, quality workmanship, and exceptional customer care for both residential and commercial clients.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US (FEATURES) */}
      <section className="bg-white py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              Why Choose Us?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              Reliable & Trusted Service in Dubai
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Professional & Trained Team</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Our experts are background checked, highly trained, and fully equipped.</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Quality Workmanship</h3>
              <p className="text-sm text-slate-500 leading-relaxed">We deliver top-tier results that exceed expectations on every project.</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Competitive Pricing</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Premium service without the premium price tag. Affordable and transparent.</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Fast Response Time</h3>
              <p className="text-sm text-slate-500 leading-relaxed">We prioritize your requests and provide quick scheduling and support.</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Customer Satisfaction</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Focused entirely on ensuring you are 100% happy with our services.</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Reliable & Trusted Service</h3>
              <p className="text-sm text-slate-500 leading-relaxed">We are dependable partners for both homes and businesses alike.</p>
            </div>
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300 lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">Dubai-Based Company</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Local expertise serving the entire Dubai area with pride and dedication.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
