import { Coins, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function RatesTab({ services, onUpdatePrice, onSavePrice, formatPrice, currency }) {
  const [saveIndicator, setSaveIndicator] = useState({}); // Track which item price is saving/saved
  const [localPrices, setLocalPrices] = useState({}); // Local state for pricing inputs while typing

  const getDisplayPrice = (service) => {
    // If user is typing in this input, show the local value
    if (localPrices[service.id] !== undefined) {
      return localPrices[service.id];
    }
    // Otherwise, convert the s.price accordingly
    const priceUSD = service.price || 0;
    return currency === 'USD' ? priceUSD : Math.round(priceUSD * 3.67);
  };

  const handlePriceChange = (serviceId, val) => {
    setLocalPrices(prev => ({ ...prev, [serviceId]: val }));
  };

  const handlePriceBlur = async (serviceId, priceValue) => {
    setSaveIndicator(prev => ({ ...prev, [serviceId]: 'saving' }));
    try {
      // Convert AED value back to USD if in AED currency console
      let committedUSD = Number(priceValue) || 0;
      if (currency === 'AED') {
        committedUSD = Number((committedUSD / 3.67).toFixed(2));
      }

      // 1. Update parent state
      onUpdatePrice(serviceId, committedUSD);

      // 2. Persist to Express backend mock DB
      await onSavePrice(serviceId, committedUSD);

      setSaveIndicator(prev => ({ ...prev, [serviceId]: 'saved' }));
      setTimeout(() => {
        setSaveIndicator(prev => {
          const next = { ...prev };
          delete next[serviceId];
          return next;
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      setSaveIndicator(prev => ({ ...prev, [serviceId]: 'error' }));
    } finally {
      // Clear the local state of this input so it syncs back with the backend state
      setLocalPrices(prev => {
        const next = { ...prev };
        delete next[serviceId];
        return next;
      });
    }
  };

  return (
    <div className="bg-white border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] rounded-3xl p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Tab Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 font-display">
            Rates Management
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Manage pricing parameters and base rates for all listings.
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-brand-green/5 text-brand-green">
          <Coins className="w-5 h-5" />
        </div>
      </div>

      {/* Pricing list rows */}
      <div className="space-y-4">
        {services.map((s) => {
          const status = saveIndicator[s.id];
          return (
            <div
              key={s.id}
              className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.005)]"
            >
              {/* Left Details */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200/50 bg-slate-100">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-display font-black text-sm text-slate-800 leading-tight">
                    {s.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5 uppercase tracking-wider">
                    {s.badge || 'Standard Service'}
                  </span>
                </div>
              </div>

              {/* Rate Editing Inputs */}
              <div className="flex items-center gap-4">
                
                {/* Rate Input Card */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Base Rate:</span>
                  <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 flex items-center shadow-inner focus-within:ring-2 focus-within:ring-brand-green/10 focus-within:border-brand-green transition-all w-36">
                    <span className="text-xs text-slate-400 font-bold mr-1.5">
                      {currency === 'USD' ? '$' : 'AED'}
                    </span>
                    <input
                      type="number"
                      value={getDisplayPrice(s)}
                      onChange={(e) => handlePriceChange(s.id, e.target.value)}
                      onBlur={(e) => handlePriceBlur(s.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur();
                        }
                      }}
                      className="w-full bg-transparent text-xs font-black text-slate-700 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Status Save Indicator */}
                <div className="w-16 flex items-center text-[10px] font-bold">
                  {status === 'saving' && (
                    <span className="text-slate-400 animate-pulse">Saving...</span>
                  )}
                  {status === 'saved' && (
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <Check className="w-3.5 h-3.5" /> Saved
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="text-rose-600 flex items-center gap-0.5">
                      <AlertCircle className="w-3.5 h-3.5" /> Error
                    </span>
                  )}
                  {!status && (
                    <span className="text-slate-300 font-medium">Auto-save</span>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
