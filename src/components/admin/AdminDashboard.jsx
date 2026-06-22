import { useState } from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import OverviewTab from './OverviewTab';
import ServicesTab from './ServicesTab';
import AddServiceTab from './AddServiceTab';
import BookingsTab from './BookingsTab';
import RatesTab from './RatesTab';
import SettingsTab from './SettingsTab';

export default function AdminDashboard({
  onClose,
  bookings,
  services,
  formatPrice,
  currency,
  setCurrency,
  onLogout,
  onAddMockBooking,
  onUpdateBooking,
  onDeleteBooking,
  // services helpers
  onToggleActiveState,
  onDeleteService,
  onEditServiceSubmit,
  onUpdatePrice,
  onSavePrice,
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
  getAdminHeaders,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract active path segment for breadcrumbs
  const pathSegments = location.pathname.split('/');
  const currentPath = pathSegments[pathSegments.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9fd] flex flex-col md:flex-row overflow-hidden select-none">
      
      {/* SIDEBAR NAVIGATION */}
      <Sidebar
        onLogout={onLogout}
        onClose={() => navigate('/')}
        currency={currency}
        setCurrency={setCurrency}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-grow flex flex-col h-full overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6 shrink-0 relative z-40">
          
          {/* Left Title & Mobile Menu toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-display font-black text-lg text-slate-800 uppercase md:hidden tracking-wider">
              Management
            </span>
            <span className="font-display font-black text-md text-slate-700 tracking-wide hidden md:inline">
              Console Panel
            </span>
          </div>

          {/* Right Icons Bar - Render Currency Switcher only on mobile/tablet */}
          <div className="flex items-center gap-4 text-slate-700 md:hidden">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'AED' : 'USD')}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-600 cursor-pointer"
            >
              {currency === 'USD' ? '$ USD' : 'د.إ AED'}
            </button>
          </div>
        </header>

        {/* SCROLLABLE VIEW PORT */}
        <div className="flex-grow p-6 overflow-y-auto">
          {/* Path Navigator */}
          <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
            <span>Management</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-brand-green font-extrabold capitalize">
              {currentPath.replace('-', ' ')}
            </span>
          </div>

          {/* Render Active View */}
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            
            <Route path="overview" element={
              <OverviewTab
                bookings={bookings}
                services={services}
                formatPrice={formatPrice}
              />
            } />

            <Route path="services" element={
              <ServicesTab
                services={services}
                onToggleActiveState={onToggleActiveState}
                onDeleteService={onDeleteService}
                onEditServiceSubmit={onEditServiceSubmit}
                onGoToAddTab={() => navigate('/admin/dashboard/add-service')}
                formatPrice={formatPrice}
              />
            } />

            <Route path="rates" element={
              <RatesTab
                services={services}
                onUpdatePrice={onUpdatePrice}
                onSavePrice={onSavePrice}
                formatPrice={formatPrice}
                currency={currency}
              />
            } />

            <Route path="bookings" element={
              <BookingsTab
                bookings={bookings}
                services={services}
                formatPrice={formatPrice}
                onAddMockBooking={onAddMockBooking}
                onUpdateBooking={onUpdateBooking}
                onDeleteBooking={onDeleteBooking}
              />
            } />

            <Route path="add-service" element={
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
            } />

            <Route path="settings" element={
              <SettingsTab getAdminHeaders={getAdminHeaders} onLogout={onLogout} />
            } />
          </Routes>
        </div>

      </main>

    </div>
  );
}
