import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import WhatsAppWidget from './WhatsAppWidget';

export default function Layout({
  CleanLogo,
  handleLogoClick,
  isAdminLoggedIn,
  setShowAdminDashboard,
  setShowAdminLogin,
  currency,
  setCurrency,
  mobileMenuOpen,
  setMobileMenuOpen,
  services,
}) {
  const navigate = useNavigate();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleServiceClick = (serviceId) => {
    // If you need it to set something globally you can,
    // otherwise just navigate to services.
    navigate('/services');
    handleNavClick();
  };

  return (
    <div className="min-h-screen bg-brand-bg text-slate-700 antialiased font-sans flex flex-col">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo with 5-click easter egg detector */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <CleanLogo />
            <span className="font-display font-black text-xl tracking-wide text-brand-green">
              Platinum<span className="text-brand-orange">Smile</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <Link to="/services" className="hover:text-brand-green transition-colors">
              Services
            </Link>
            <Link to="/about" className="hover:text-brand-green transition-colors">
              About Us
            </Link>
            <Link to="/blogs" className="hover:text-brand-green transition-colors">
              Clean Living
            </Link>
            {isAdminLoggedIn && (
              <button
                onClick={() => setShowAdminDashboard(true)}
                className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md border border-brand-orange/20 animate-pulse hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
              >
                Admin Panel
              </button>
            )}
          </nav>

          {/* Call / Book / Currency Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'AED' : 'USD')}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-brand-border bg-slate-50 hover:bg-slate-100 text-xs font-bold text-brand-green hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Currency:</span>
              <span className="text-brand-orange">
                {currency === 'USD' ? 'USD ($)' : 'AED (د.إ)'}
              </span>
            </button>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-orange text-white hover:bg-brand-orange-hover hover:scale-105 active:scale-95 transition-all shadow-md shadow-brand-orange/15"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-border bg-white px-6 py-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3 font-semibold text-slate-600">
              <Link
                to="/services"
                onClick={handleNavClick}
                className="py-2 border-b border-slate-50 hover:text-brand-green"
              >
                Services
              </Link>
              <Link
                to="/about"
                onClick={handleNavClick}
                className="py-2 border-b border-slate-50 hover:text-brand-green"
              >
                About Us
              </Link>
              <Link
                to="/blogs"
                onClick={handleNavClick}
                className="py-2 hover:text-brand-green"
              >
                Clean Living
              </Link>
              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAdminDashboard(true);
                  }}
                  className="py-2 border-t border-slate-100 text-left font-bold text-brand-orange cursor-pointer animate-pulse"
                >
                  Admin Control Panel
                </button>
              )}
            </nav>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency('USD')}
                className={`flex-grow py-2 text-center text-xs font-bold rounded-lg border transition-all ${
                  currency === 'USD'
                    ? 'border-brand-green bg-brand-green/5 text-brand-green'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('AED')}
                className={`flex-grow py-2 text-center text-xs font-bold rounded-lg border transition-all ${
                  currency === 'AED'
                    ? 'border-brand-green bg-brand-green/5 text-brand-green'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                AED (د.إ)
              </button>
            </div>
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="block w-full text-center py-3 rounded-xl font-bold bg-brand-orange text-white"
            >
              Book Now
            </Link>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <WhatsAppWidget />

      {/* FOOTER */}
      <footer className="bg-white border-t border-brand-border py-16 text-slate-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group"
            >
              <CleanLogo />
              <span className="font-display font-black text-xl tracking-wide text-brand-green">
                Platinum<span className="text-brand-orange">Smile</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[16rem]">
              Platinum Smile Building Cleaning Services LLC provides professional cleaning, painting, plumbing, and maintenance solutions across Dubai.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="tel:+971562314576"
                className="p-2 rounded-lg bg-brand-bg hover:bg-brand-green/10 text-brand-green hover:text-brand-green-hover transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@platinumsmilecleaning.com"
                className="p-2 rounded-lg bg-brand-bg hover:bg-brand-green/10 text-brand-green hover:text-brand-green-hover transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-brand-green mb-4">
              Our Services
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              {services.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="hover:text-brand-orange transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-brand-green mb-4">
              Service Areas
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>Dubai, UAE</li>
              <li>Residential Homes</li>
              <li>Commercial Buildings</li>
              <li>Warehouses & Offices</li>
              <li>Villas & Apartments</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-brand-green mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-500">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" /> Dubai, UAE
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" /> +971 56 231 4576
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" /> info@platinumsmilecleaning.com
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" /> account@platinumsmilecleaning.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal links */}
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Platinum Smile Building Cleaning Services LLC. All rights reserved.</p>
            <p className="text-[8px] text-slate-300">
              Dubai DED Trade License No: <span className="text-slate-400 font-bold">[YOUR_LICENSE_NO]</span> | TRN: <span className="text-slate-400 font-bold">[YOUR_TRN_NO]</span>
            </p>
          </div>
          <div className="flex gap-6">
            <a href="http://www.platinumsmilecleaning.com" className="hover:text-slate-600 transition-colors">
              www.platinumsmilecleaning.com
            </a>
            {isAdminLoggedIn && (
              <button
                onClick={() => setShowAdminDashboard(true)}
                className="hover:text-slate-600 transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-wider bg-transparent border-none p-0"
              >
                Admin Portal
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
