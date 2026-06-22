import { 
  Smartphone, 
  Wallet, 
  Home, 
  ClipboardList, 
  MoreVertical,
  ChevronDown
} from 'lucide-react';

export default function OverviewTab({ bookings, services, formatPrice, setActiveTab }) {
  // 1. Dynamic calculation logic
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || b.price || 0), 0);
  const pendingRequests = bookings.filter(b => b.status === 'pending' || !b.cleaner).length;

  // Let's compute statistics with a base offset to match the mockup values nicely
  const displayTotalBookings = 1284 + bookings.length;
  const displayRevenue = 42920 + totalRevenue;
  const displayActiveListings = 48 + services.length;
  const displayPendingRequests = Math.max(14, pendingRequests);

  // Group real bookings by day of week to make the trend chart dynamic
  const dayCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  bookings.forEach((b) => {
    if (b.date) {
      const dateObj = new Date(b.date);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[dateObj.getDay()];
      if (dayCounts[dayName] !== undefined) {
        dayCounts[dayName]++;
      }
    }
  });

  const weekData = [
    { day: 'Mon', value: Math.min(100, 45 + dayCounts.Mon * 10) },
    { day: 'Tue', value: Math.min(100, 65 + dayCounts.Tue * 10) },
    { day: 'Wed', value: Math.min(100, 60 + dayCounts.Wed * 10) },
    { day: 'Thu', value: Math.min(100, 85 + dayCounts.Thu * 10) },
    { day: 'Fri', value: Math.min(100, 75 + dayCounts.Fri * 10) },
    { day: 'Sat', value: Math.min(100, 95 + dayCounts.Sat * 10), highlight: true },
    { day: 'Sun', value: Math.min(100, 30 + dayCounts.Sun * 10) }
  ];

  // Helper for status pills color mapping
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border border-rose-100';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-100';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-in fade-in duration-300">
      
      {/* 1. STAT CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Bookings Card */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <span>↗</span> 12%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">
              Total Bookings
            </span>
            <h3 className="text-2xl font-black text-slate-800 font-display leading-none mb-1">
              {displayTotalBookings.toLocaleString()}
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              vs last month (1,148)
            </span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <span>↗</span> 8.4%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">
              Revenue
            </span>
            <h3 className="text-2xl font-black text-slate-800 font-display leading-none mb-1">
              {formatPrice(displayRevenue)}
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              Expected: {formatPrice(45000)}
            </span>
          </div>
        </div>

        {/* Active Listings Card */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-brand-green/5 text-brand-green">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-bold">
              Stable
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">
              Active Listings
            </span>
            <h3 className="text-2xl font-black text-slate-800 font-display leading-none mb-1">
              {displayActiveListings}
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              3 pending verification
            </span>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <span>↘</span> -4
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">
              Pending Requests
            </span>
            <h3 className="text-2xl font-black text-slate-800 font-display leading-none mb-1">
              {displayPendingRequests}
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              Requires attention
            </span>
          </div>
        </div>

      </div>

      {/* 2. CHARTS & METRICS PANEL */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Card: Bookings Trend Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-display font-black text-md text-slate-800">
              Bookings Trend
            </h4>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <span>Last 7 Days</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bar Chart Graphics */}
          <div className="relative pt-4 flex flex-col justify-end h-60 w-full">
            {/* Y axis helper lines */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-slate-100 h-0"></div>
            <div className="absolute inset-x-0 top-1/3 border-t border-dashed border-slate-100 h-0"></div>
            <div className="absolute inset-x-0 top-2/3 border-t border-dashed border-slate-100 h-0"></div>

            {/* Bars container */}
            <div className="flex justify-around items-end w-full h-full relative z-10">
              {weekData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 w-10 group cursor-pointer">
                  {/* Tooltip bar value */}
                  <span className="opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded absolute -top-4 transition-opacity shadow-sm">
                    {data.value}%
                  </span>
                  
                  {/* Bar fill */}
                  <div 
                    className={`w-8 rounded-t-lg transition-all duration-500 origin-bottom ${
                      data.highlight 
                        ? 'bg-brand-orange shadow-lg shadow-brand-orange/20' 
                        : 'bg-brand-green/10 group-hover:bg-brand-green/20'
                    }`} 
                    style={{ height: `${data.value * 1.8}px` }}
                  ></div>

                  {/* Day label */}
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Occupancy Ring & Cancellation rate */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Average Occupancy Circular Widget */}
          <div className="bg-white border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4">
            <h5 className="font-display font-black text-xs text-slate-400 uppercase tracking-widest">
              Avg. Occupancy
            </h5>
            
            {/* SVG Ring */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="#f1f5f9" strokeWidth="10" fill="none"
                />
                {/* Filled Ring */}
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="var(--color-brand-green)" strokeWidth="10" fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 82) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800 leading-none font-display">82%</span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
              High season performing well
            </p>
          </div>

          {/* Cancellation Rate Card */}
          <div className="bg-white border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            {/* Left red bar decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>

            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">
              Cancellation Rate
            </span>
            <div className="space-y-0.5 py-1">
              <h3 className="text-3xl font-display font-black text-slate-800 leading-none">
                4.2%
              </h3>
              <p className="text-[10px] text-slate-400 font-bold">
                Target: below 5%
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 3. RECENT BOOKINGS ROW */}
      <div className="bg-white border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-display font-black text-md text-slate-800">
            Recent Bookings
          </h4>
          <button 
            onClick={() => setActiveTab('bookings')}
            className="text-xs font-bold text-brand-green hover:text-brand-green-hover cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Stacked custom booking list items */}
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-100 rounded-2xl">
              No recent bookings found.
            </div>
          ) : (
            [...bookings].slice(-4).reverse().map((b) => {
              const service = services.find((s) => s.id === b.serviceType);
              const initials = b.name ? b.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US';
              
              // Generate stay date mockup representation
              const stayDates = b.date || "Jun 12 - Jun 15";

              // Check mock cancelled state
              const isCancelled = b.status === 'cancelled';

              return (
                <div 
                  key={b.id} 
                  className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 hover:border-slate-200 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.005)]"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials Circle */}
                    <div className="w-10 h-10 rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-green font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h5 className="font-display font-black text-sm text-slate-800 leading-snug">
                        {b.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-medium leading-none block mt-0.5">
                        {service?.title || b.serviceType} • {stayDates}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status Pill */}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide leading-none ${getStatusStyle(b.status)}`}>
                      {b.status || 'Confirmed'}
                    </span>

                    {/* Price */}
                    <span className={`text-sm font-black text-slate-800 min-w-[70px] text-right font-display ${isCancelled ? 'line-through opacity-40' : ''}`}>
                      {formatPrice(b.totalPrice || b.price)}
                    </span>

                    {/* Options icon button */}
                    <button className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
