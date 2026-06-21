import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Calendar, Check, AlertCircle } from 'lucide-react';

export default function Contact({
  formData,
  handleInputChange,
  handleBookingSubmit,
  services,
  formHighlight,
  bookingPlaced,
  setBookingPlaced,
  placedBookingDetails,
  setFormData,
  formatPrice,
  nameInputRef,
}) {
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    // Generate new math problem on load
    setCaptchaA(Math.floor(Math.random() * 10) + 1);
    setCaptchaB(Math.floor(Math.random() * 10) + 1);
  }, [bookingPlaced]);

  const onLocalSubmit = (e) => {
    e.preventDefault();
    // Honeypot check for bots
    if (honeypot !== '') {
      return; 
    }
    // Math CAPTCHA check
    if (parseInt(captchaAnswer) !== (captchaA + captchaB)) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    handleBookingSubmit(e);
  };

  const handleAddonToggle = (addonName) => {
    const currentAddons = formData.addons || [];
    if (currentAddons.includes(addonName)) {
      setFormData({ ...formData, addons: currentAddons.filter(a => a !== addonName) });
    } else {
      setFormData({ ...formData, addons: [...currentAddons, addonName] });
    }
  };

  return (
    <>
      <Helmet>
        <title>Book a Cleaning Service | Platinum Smile Dubai</title>
        <meta name="description" content="Get a free quote and book your cleaning service online. 100% Happiness Guaranteed with Platinum Smile." />
      </Helmet>

      <section className="bg-white py-20 border-t border-brand-border">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
            Secure Your Pristine Space Today
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Tell us about your space and select a date. We'll match you with the best professional
            cleaning team.
          </p>
          <div className="flex justify-center gap-6 pt-2 text-xs font-semibold text-brand-green">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-orange" /> 100% Happiness Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-orange" /> Free Cancel up to 24h prior
            </span>
          </div>
        </div>

        <div
          className={`border rounded-3xl p-6 md:p-10 shadow-lg relative transition-all duration-500 ${
            formHighlight
              ? 'bg-brand-orange/5 border-brand-orange scale-[1.01] ring-4 ring-brand-orange/10'
              : 'bg-brand-bg border-brand-border'
          }`}
        >
          {bookingPlaced ? (
            // Success Screen / Booking Receipt Simulation
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-brand-green">
                  Booking Confirmed!
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you, {placedBookingDetails.name}. Your cleaning session has been scheduled
                  successfully.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-white border border-brand-border rounded-2xl p-6 text-left space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Order ID:</span>
                  <strong className="text-slate-700">{placedBookingDetails.id}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Cleaning Type:</span>
                  <strong className="text-slate-700 uppercase">
                    {services.find((s) => s.id === placedBookingDetails.serviceType)?.title ||
                      placedBookingDetails.serviceType}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Property Type:</span>
                  <strong className="text-slate-700 uppercase">
                    {placedBookingDetails.propertyType}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <strong className="text-slate-700">{placedBookingDetails.date}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Assigned Pro:</span>
                  <strong className="text-slate-700">{placedBookingDetails.cleaner}</strong>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400 font-bold">Total Price paid:</span>
                  <strong className="text-brand-orange text-lg font-black">
                    {formatPrice(placedBookingDetails.price)}
                  </strong>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setBookingPlaced(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      serviceType: services[0]?.id || 'residential',
                      propertyType: 'villa',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-green text-white hover:bg-brand-green-hover transition-colors cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          ) : (
            // Form Layout
            <form onSubmit={onLocalSubmit} className="space-y-6">
              {/* HONEYPOT - Hidden from real users, filled by bots */}
              <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                <label htmlFor="website">Website (Leave blank)</label>
                <input 
                  type="text" 
                  id="website" 
                  name="website" 
                  tabIndex="-1" 
                  autoComplete="off" 
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    ref={nameInputRef}
                    placeholder="e.g., John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g., +971 56 231 4576"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g., john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Service Type (Dynamic Option mapping) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 block">
                    Service Required
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 focus:outline-none focus:border-brand-green text-sm"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 block">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 focus:outline-none focus:border-brand-green text-sm"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office</option>
                    <option value="commercial">Commercial Building</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 block">Message</label>
                <textarea
                  name="message"
                  required
                  placeholder="Any specific details?"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-sm"
                />
              </div>

              {/* Add-ons Upsell Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-600 block">Optional Add-ons</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'fridge', label: 'Inside Fridge (+50)', price: 50 },
                    { id: 'oven', label: 'Inside Oven (+50)', price: 50 },
                    { id: 'balcony', label: 'Balcony Wash (+100)', price: 100 },
                    { id: 'windows', label: 'Window Cleaning (+150)', price: 150 },
                  ].map((addon) => (
                    <label 
                      key={addon.id} 
                      className={`flex items-center gap-2 p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                        (formData.addons || []).includes(addon.id) 
                          ? 'border-brand-green bg-brand-green/5 text-brand-green font-semibold' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-green'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={(formData.addons || []).includes(addon.id)} 
                        onChange={() => handleAddonToggle(addon.id)} 
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        (formData.addons || []).includes(addon.id) ? 'bg-brand-green border-brand-green' : 'border-slate-300'
                      }`}>
                        {(formData.addons || []).includes(addon.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {addon.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Math CAPTCHA */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-green" /> Anti-Spam Check
                  </label>
                  <p className="text-xs text-slate-500">Please solve the math problem to prove you are human.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-700 tracking-wider bg-white px-4 py-2 border rounded-lg shadow-sm">
                    {captchaA} + {captchaB} = ?
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="Answer"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className={`w-24 px-4 py-2 rounded-xl border bg-white text-slate-800 focus:outline-none focus:ring-1 text-sm ${
                      captchaError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-brand-green focus:ring-brand-green'
                    }`}
                  />
                </div>
              </div>
              {captchaError && (
                <div className="text-red-500 text-sm font-semibold flex items-center gap-1.5 justify-end">
                  <AlertCircle className="w-4 h-4" /> Incorrect answer. Please try again.
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3.5 rounded-xl font-bold bg-brand-orange text-white hover:bg-brand-orange-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-brand-orange/20"
                >
                  Send Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
    </>
  );
}
