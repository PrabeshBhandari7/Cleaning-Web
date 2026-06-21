import { Trash2, DollarSign } from 'lucide-react';

export default function ServicesTab({
  services,
  onUpdatePrice,
  onSavePrice,
  onDeleteService,
  formatPrice,
}) {
  return (
    <div className="bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-display font-black text-md text-slate-800">
            Active Services ({services.length})
          </h4>
          <p className="text-[10px] text-slate-400 font-medium">
            Manage cleaning categories and modify base hourly rates in USD.
          </p>
        </div>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Rates in Base USD ($)
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((s) => (
          <div
            key={s.id}
            className="p-4 bg-white/50 border border-white/20 hover:border-brand-green/30 rounded-2xl flex justify-between items-center gap-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200/50 bg-slate-100 relative">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[9px] text-[#ff724c] uppercase font-bold tracking-wider block">
                  {s.badge}
                </span>
                <h5 className="font-display font-bold text-sm text-slate-800 leading-tight">
                  {s.title}
                </h5>
                <p className="text-[10px] text-slate-400 line-clamp-1 max-w-[12rem] font-medium">
                  {s.desc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-20">
                <label className="text-[8px] text-slate-400 uppercase font-bold block mb-0.5">
                  Base ($)
                </label>
                <div className="relative rounded-lg border border-slate-200 bg-white/80 px-2 py-0.5 flex items-center shadow-inner focus-within:ring-2 focus-within:ring-brand-green/10">
                  <span className="text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={s.price}
                    onChange={(e) => onUpdatePrice(s.id, e.target.value)}
                    onBlur={(e) => onSavePrice(s.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.blur();
                      }
                    }}
                    className="w-full pl-0.5 bg-transparent text-xs font-black text-slate-700 focus:outline-none"
                    title="Press Enter or click away to save"
                  />
                </div>
              </div>
              <button
                onClick={() => onDeleteService(s.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
