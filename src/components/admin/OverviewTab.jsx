import { 
  Sparkles, 
  Check, 
  TrendingUp, 
  ArrowUpRight, 
  User, 
  MessageSquare,
  Clock,
  ShieldAlert
} from 'lucide-react';

export default function OverviewTab({ bookings, services, formatPrice }) {
  // Compute analytics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const activeBookings = bookings.filter((b) => b.status === 'scheduled').length;
  
  // Pipeline metrics
  const newBookings = bookings.filter(b => b.status === 'pending' || !b.cleaner).length;
  const inProgress = bookings.filter(b => b.status === 'scheduled' && b.cleaner).length;
  const completed = bookings.filter(b => b.status === 'completed' || b.status === 'done').length;
  
  const pipelineTotal = bookings.length || 1;
  const percentNew = Math.round((newBookings / pipelineTotal) * 100);
  const percentProgress = Math.round((inProgress / pipelineTotal) * 100);
  const percentCompleted = Math.round((completed / pipelineTotal) * 100);

  // Fallback default avatar
  const avatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. ADMIN USER SUMMARY CARD */}
      <div className="bg-white/80 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-2xl">
        <div className="flex items-center gap-5 w-full md:w-auto">
          {/* Avatar with status dot */}
          <div className="relative shrink-0">
            <img 
              src={avatarUrl} 
              alt="Admin Profile" 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
          </div>
          <div>
            <span className="text-[10px] text-cyan-600 font-extrabold uppercase tracking-widest block mb-0.5">
              Workspace Administrator
            </span>
            <h3 className="text-xl font-display font-black text-slate-800 leading-tight">
              Jnain Jumes
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Operations Director • Active session online
            </p>
          </div>
        </div>

        {/* Mini Stats on the right */}
        <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-around md:justify-end border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Total Revenue
            </span>
            <h4 className="text-lg font-black text-slate-800 font-display">
              {formatPrice(totalRevenue)}
            </h4>
            <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
          
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Scheduled
            </span>
            <h4 className="text-lg font-black text-slate-800 font-display">
              {activeBookings}
            </h4>
            <span className="text-[9px] text-slate-400 font-semibold">
              Live Bookings
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Total Jobs
            </span>
            <h4 className="text-lg font-black text-[#085f56] font-display">
              {bookings.length}
            </h4>
            <span className="text-[9px] text-[#085f56] font-bold">
              100% Filled
            </span>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE GRID: PIPELINE & HALES PROFIT CARD */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Card: Quars Pipeline */}
        <div className="lg:col-span-8 bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-display font-black text-md text-slate-800">
                Quars Pipeline
              </h4>
              <p className="text-[10px] text-slate-400 font-medium">Job dispatching workflow breakdown</p>
            </div>
            <span className="text-xs bg-[#085f56]/10 text-[#085f56] font-bold px-2.5 py-1 rounded-xl">
              Active State
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* New Stage */}
            <div className="space-y-2 p-3 bg-white/40 border border-white/20 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">New / Unassigned</span>
                <span className="text-xs font-extrabold text-amber-500">{percentNew || 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${percentNew || 0}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                {newBookings} bookings pending staff
              </div>
            </div>

            {/* In Progress Stage */}
            <div className="space-y-2 p-3 bg-white/40 border border-white/20 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Scheduled / Pro</span>
                <span className="text-xs font-extrabold text-cyan-600">{percentProgress || 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${percentProgress || 0}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                {inProgress} active deployments
              </div>
            </div>

            {/* Completed Stage */}
            <div className="space-y-2 p-3 bg-white/40 border border-white/20 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Completed Jobs</span>
                <span className="text-xs font-extrabold text-emerald-600">{percentCompleted || 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percentCompleted || 0}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                {completed} jobs archived
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Hales Profit Card */}
        <div className="lg:col-span-4 bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[9px] text-[#ff724c] font-black uppercase tracking-widest">
              Revenue Model
            </span>
            <h4 className="font-display font-black text-lg text-slate-800">
              Hales Profitability
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              Average ticket price and operating profit margins
            </p>
          </div>

          <div className="py-2">
            <span className="text-slate-400 text-xs font-bold">Avg Booking Value</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-display font-black text-slate-800">
                {formatPrice(bookings.length ? Math.round(totalRevenue / bookings.length) : 0)}
              </span>
              <span className="text-slate-400 text-xs font-semibold">per ticket</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Goal Target (AED 50k)</span>
              <span>{Math.min(100, Math.round((totalRevenue / 50000) * 100))}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-[#ff724c] h-full rounded-full" style={{ width: `${Math.min(100, Math.round((totalRevenue / 50000) * 100))}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM ROW: PIPFILES (RECENT ACTIVITY & SERVICES LISTS) */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Side: Recent Bookings Activity Log */}
        <div className="lg:col-span-8 bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="font-display font-black text-md text-slate-800">
              Recent Bookings List
            </h4>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              Showing latest logs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5 text-right">Amount</th>
                  <th className="py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 font-medium text-slate-600">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-slate-400">
                      No bookings loaded from database.
                    </td>
                  </tr>
                ) : (
                  bookings
                    .slice(-5)
                    .reverse()
                    .map((b) => {
                      const service = services.find((s) => s.id === b.serviceType);
                      return (
                        <tr key={b.id} className="hover:bg-white/30 transition-colors">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-[10px]">
                                {b.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <span className="block font-bold text-slate-800">{b.name}</span>
                                <span className="block text-[9px] text-slate-400 font-medium">{b.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 capitalize text-slate-500">
                            {service?.title || b.serviceType}
                          </td>
                          <td className="py-3 text-slate-400">{b.date}</td>
                          <td className="py-3 text-right font-bold text-slate-800">
                            {formatPrice(b.totalPrice || b.price)}
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                                b.status === 'scheduled' || b.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                  : 'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Services Summary & Action Center */}
        <div className="lg:col-span-4 bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="font-display font-black text-md text-slate-800">
              Active Category Pricing
            </h4>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              {services.length} items
            </span>
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {services.slice(0, 5).map((s) => (
              <div key={s.id} className="flex justify-between items-center text-xs p-2 bg-white/40 rounded-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block leading-tight">{s.title}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">{s.badge}</span>
                  </div>
                </div>
                <span className="font-black text-[#085f56] bg-[#085f56]/10 px-2 py-0.5 rounded-lg shrink-0">
                  {formatPrice(s.price)}
                </span>
              </div>
            ))}
          </div>

          {/* Quick checklist alert */}
          <div className="bg-[#ff724c]/10 border border-[#ff724c]/20 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-[#e65c36]">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Action Required</span>
              <p className="text-[10px] text-slate-500 font-medium">
                {newBookings} bookings require cleaner allocations. Check Bookings Log.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
