import { 
  LayoutGrid, 
  ListTodo, 
  CalendarDays, 
  Coins, 
  LogOut,
  Sparkles,
  X,
  Settings
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onLogout, 
  onClose, 
  currency, 
  setCurrency,
  mobileOpen,
  onCloseMobile
}) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutGrid },
    { id: 'services', label: 'Listings', icon: ListTodo },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays },
    { id: 'rates', label: 'Rates', icon: Coins },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* SIDEBAR (Responsive drawer on mobile, static on desktop) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 p-6 transition-transform duration-300 md:static md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-8">
          {/* Header Brand */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-green flex items-center justify-center text-white font-display font-black text-sm">
                M
              </div>
              <span className="font-display font-black text-lg tracking-wide text-slate-800 uppercase">
                Management
              </span>
            </div>
            {/* Mobile Close Button */}
            <button 
              onClick={onCloseMobile}
              className="md:hidden p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 px-3">
              Console Menu
            </span>
            <nav className="flex flex-col gap-1.5 text-xs font-bold text-slate-500">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-brand-green/5 text-brand-green shadow-sm border border-brand-green/10'
                        : 'hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-brand-green' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="border-t border-slate-100 pt-4 mt-auto mb-4 px-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2.5">
            Console Currency
          </span>
          <div className="flex gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button
              onClick={() => setCurrency('USD')}
              className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-brand-green shadow-sm border border-slate-100'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('AED')}
              className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                currency === 'AED'
                  ? 'bg-white text-brand-green shadow-sm border border-slate-100'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              AED (د.إ)
            </button>
          </div>
        </div>

        {/* Profile / Logout section */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-brand-green text-white font-extrabold text-xs flex items-center justify-center shadow-md">
              AD
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-800 leading-tight">
                Admin Manager
              </h5>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-[10px] text-slate-400 font-bold hover:text-red-500 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
                <span className="text-[10px] text-slate-200 font-bold">|</span>
                <button
                  onClick={onClose}
                  className="text-[10px] text-slate-400 font-bold hover:text-brand-green transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM NAVIGATION (Visible on mobile/tablet viewports) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 h-16 flex items-center justify-around px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
              }}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-center cursor-pointer"
            >
              <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-brand-green/5 text-brand-green' : 'text-slate-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[9px] font-bold ${isActive ? 'text-brand-green' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
        {/* Mobile Exit Button */}
        <button
          onClick={onClose}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-center cursor-pointer text-slate-400 hover:text-brand-green"
        >
          <div className="p-1.5 rounded-full transition-all text-slate-400 hover:bg-brand-green/5 hover:text-brand-green">
            <X className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold">
            Exit
          </span>
        </button>
      </nav>
    </>
  );
}
