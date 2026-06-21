import { 
  Sliders, 
  Briefcase, 
  Plus, 
  Calendar, 
  LogOut, 
  ChevronDown, 
  Users, 
  BarChart2, 
  Settings, 
  Target,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Sliders },
    { id: 'services', label: 'Active Services', icon: Briefcase },
    { id: 'add-service', label: 'Add Service', icon: Plus },
    { id: 'bookings', label: 'Bookings Log', icon: Calendar },
  ];

  const dummyMenuItems = [
    { label: 'Customers', icon: Users },
    { label: 'Campaigns', icon: Target },
    { label: 'Inbox', icon: Inbox },
    { label: 'Analytics', icon: BarChart2 },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex shrink-0 h-full">
      {/* 1. MINI LEFT SIDEBAR (Dark Blue Toolbar) */}
      <aside className="w-16 bg-[#0c2a52] flex flex-col justify-between items-center py-6 border-r border-[#ffffff]/10 shrink-0">
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Logo Circle */}
          <div className="w-9 h-9 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-display font-black text-lg shadow-lg">
            C
          </div>

          {/* Vertical Menu Icons */}
          <div className="flex flex-col gap-4 items-center w-full pt-6">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                activeTab === 'overview' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                activeTab === 'bookings' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4.5 h-4.5" />
            </button>
            <button 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              title="Customers (View Mode)"
            >
              <Users className="w-4.5 h-4.5" />
            </button>
            <button 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              title="Analytics (View Mode)"
            >
              <BarChart2 className="w-4.5 h-4.5" />
            </button>
            <button 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              title="System Settings"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Bottom Expand Arrow */}
        <div className="text-slate-400 hover:text-white cursor-pointer p-1">
          <ChevronDown className="w-5 h-5 rotate-180" />
        </div>
      </aside>

      {/* 2. INNER GLASS SIDEBAR (Lighter Blue/Glass Panel) */}
      <aside className="w-56 bg-white/45 backdrop-blur-md border-r border-white/20 flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Header Brand */}
          <div className="flex items-center gap-2.5">
            <span className="font-display font-black text-xl tracking-wide text-slate-800 uppercase">
              CCRM
            </span>
            <span className="text-[10px] text-cyan-600 bg-cyan-100/50 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
              Pro
            </span>
          </div>

          {/* Active Navigation List */}
          <div className="space-y-5">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-3">
                Main Control
              </span>
              <nav className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                        activeTab === item.id
                          ? 'bg-white/90 text-[#085f56] shadow-md border border-white/40 font-bold'
                          : 'hover:bg-white/40 hover:text-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Decorative items to match the reference mockup style */}
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-3">
                CRM Modules
              </span>
              <nav className="flex flex-col gap-1 text-xs font-semibold text-slate-400/80">
                {dummyMenuItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-not-allowed hover:text-slate-600 transition-colors"
                      title={`${item.label} feature integrates with your CRM API`}
                    >
                      <Icon className="w-4 h-4 text-slate-400/60" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Profile Card at bottom of sidebar */}
        <div className="border-t border-slate-200/50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#085f56] border border-white/20 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
              AD
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-800 leading-tight">
                Admin Manager
              </h5>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                <LogOut className="w-3 h-3" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
