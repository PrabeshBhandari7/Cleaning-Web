import { Search, Bell, Grid, ChevronRight, Sparkles, MessageSquare } from 'lucide-react';
import Sidebar from './Sidebar';
import OverviewTab from './OverviewTab';
import ServicesTab from './ServicesTab';
import AddServiceTab from './AddServiceTab';
import BookingsTab from './BookingsTab';

export default function AdminDashboard({
  onClose,
  activeTab,
  setActiveTab,
  bookings,
  services,
  formatPrice,
  onLogout,
  // services helpers
  onUpdatePrice,
  onSavePrice,
  onDeleteService,
  // add service fields & helpers
  newService,
  setNewService,
  photoSourceType,
  setPhotoSourceType,
  uploadedBase64,
  setUploadedBase64,
  fileInputRef,
  onPhotoUpload,
  onAddServiceSubmit,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-tr from-[#1a3c63] via-[#2d6fa8] to-[#6aa8d9] flex flex-col justify-center items-center overflow-hidden p-0 sm:p-4 select-none">
      
      {/* GLOWING AMBIENT BACKGROUND LIGHTS */}
      <div className="absolute w-[40rem] h-[40rem] rounded-full bg-cyan-300/20 blur-3xl -top-20 -left-20 pointer-events-none animate-pulse"></div>
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-[#ff724c]/10 blur-3xl -bottom-10 -right-10 pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.8)] pointer-events-none"></div>

      {/* FLOATING ACTION GLASS BUBBLES ABOVE THE CARD */}
      <div className="hidden lg:flex items-center gap-6 justify-center mb-4 z-10 w-full max-w-6xl px-8">
        <button
          onClick={() => setActiveTab('overview')}
          className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md shadow-sm transition-all hover:scale-105"
        >
          Activities
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md shadow-sm transition-all hover:scale-105"
        >
          Follow-up
        </button>
        <div className="px-5 py-2 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold backdrop-blur-md shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-current" />
          <span>CCRM Dashboard</span>
        </div>
        <button
          onClick={() => setActiveTab('services')}
          className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md shadow-sm transition-all hover:scale-105"
        >
          Profit Margin
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md shadow-sm transition-all hover:scale-105"
        >
          Exit Dashboard
        </button>
      </div>

      {/* MAIN DASHBOARD PANEL CONTAINER (GLASS CARD) */}
      <div className="bg-white/30 border border-white/40 shadow-[0_30px_90px_-20px_rgba(2,11,20,0.4)] rounded-none sm:rounded-[36px] w-full max-w-6xl h-full sm:h-[85vh] flex flex-row overflow-hidden relative backdrop-blur-2xl">
        
        {/* DUAL SIDEBAR COMPONENT */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        {/* CONTENT CONTAINER AREA */}
        <main className="flex-grow flex flex-col h-full overflow-hidden bg-white/15">
          
          {/* HEADER BAR */}
          <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-md bg-white/10 shrink-0">
            {/* Search Input Field */}
            <div className="relative flex items-center w-64 md:w-80">
              <Search className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search database..."
                onClick={() => {
                  if (activeTab !== 'bookings') setActiveTab('bookings');
                }}
                className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-white/20 bg-white/40 text-slate-800 placeholder-slate-500 focus:outline-none focus:bg-white/80 focus:border-brand-green/20 focus:ring-4 focus:ring-brand-green/5 transition-all"
              />
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-4 text-slate-700">
              <button 
                onClick={() => setActiveTab('bookings')} 
                className="relative p-2 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {bookings.filter(b => !b.cleaner).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff724c] rounded-full animate-bounce"></span>
                )}
              </button>
              
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                title="System grid"
              >
                <Grid className="w-4 h-4" />
              </button>

              <div className="h-6 w-px bg-slate-300/30"></div>

              {/* Avatar circle */}
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                  alt="Admin User"
                  className="w-7 h-7 rounded-xl object-cover border border-white/50"
                />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">
                  J. Jumes
                </span>
              </div>
            </div>
          </header>

          {/* MAIN SCROLLABLE CONTENT BODY */}
          <div className="flex-grow p-6 overflow-y-auto">
            {/* Nav path tracker */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'services' && 'Manage Services'}
                {activeTab === 'add-service' && 'Create Category'}
                {activeTab === 'bookings' && 'Bookings Log'}
              </span>
            </div>

            {/* Dynamic Views */}
            {activeTab === 'overview' && (
              <OverviewTab
                bookings={bookings}
                services={services}
                formatPrice={formatPrice}
              />
            )}

            {activeTab === 'services' && (
              <ServicesTab
                services={services}
                onUpdatePrice={onUpdatePrice}
                onSavePrice={onSavePrice}
                onDeleteService={onDeleteService}
                formatPrice={formatPrice}
              />
            )}

            {activeTab === 'add-service' && (
              <AddServiceTab
                newService={newService}
                setNewService={setNewService}
                photoSourceType={photoSourceType}
                setPhotoSourceType={setPhotoSourceType}
                uploadedBase64={uploadedBase64}
                setUploadedBase64={setUploadedBase64}
                fileInputRef={fileInputRef}
                onPhotoUpload={onPhotoUpload}
                onSubmit={onAddServiceSubmit}
              />
            )}

            {activeTab === 'bookings' && (
              <BookingsTab
                bookings={bookings}
                services={services}
                formatPrice={formatPrice}
              />
            )}
          </div>

        </main>
      </div>
      
      {/* Floating Close Action Button (bottom right on mobile) */}
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 lg:hidden z-50 w-14 h-14 rounded-full bg-[#085f56] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
        title="Close Admin Panel"
      >
        <ChevronRight className="w-6 h-6 rotate-180" />
      </button>

    </div>
  );
}
