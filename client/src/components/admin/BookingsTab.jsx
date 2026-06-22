import { useState } from 'react';
import { 
  Download, 
  Plus, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  AlertCircle,
  X
} from 'lucide-react';

export default function BookingsTab({ bookings, services, formatPrice, onAddMockBooking, onUpdateBooking, onDeleteBooking }) {
  const [activeStatusTab, setActiveStatusTab] = useState('all'); // 'all' | 'confirmed' | 'pending' | 'cancelled'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [manageStatus, setManageStatus] = useState('');
  const [manageCleaner, setManageCleaner] = useState('');

  const handleOpenManageModal = (b) => {
    setSelectedBooking(b);
    setManageStatus(b.status || 'confirmed');
    setManageCleaner(b.cleaner || '');
  };

  const handleCloseManageModal = () => {
    setSelectedBooking(null);
  };

  const handleManageFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;
    const success = await onUpdateBooking(selectedBooking.id || selectedBooking._id, {
      status: manageStatus,
      cleaner: manageCleaner,
    });
    if (success) {
      handleCloseManageModal();
    }
  };

  const handleManageDelete = async () => {
    if (!selectedBooking) return;
    if (window.confirm(`Are you sure you want to delete the booking for ${selectedBooking.name}?`)) {
      const success = await onDeleteBooking(selectedBooking.id || selectedBooking._id);
      if (success) {
        handleCloseManageModal();
      }
    }
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      alert("No bookings available to export.");
      return;
    }
    const headers = ['Booking ID', 'Customer Name', 'Email', 'Service Type', 'Area Size', 'Frequency', 'Date', 'Cleaner', 'Price', 'Status'];
    const rows = bookings.map(b => [
      b.id || b._id,
      `"${b.name}"`,
      b.email,
      b.serviceType,
      b.size,
      b.frequency,
      b.date,
      `"${b.cleaner || 'Unassigned'}"`,
      b.totalPrice || b.price || 0,
      b.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    if (activeStatusTab === 'all') return true;
    
    const status = b.status?.toLowerCase();
    if (activeStatusTab === 'confirmed') {
      return status === 'confirmed' || status === 'scheduled' || status === 'completed';
    }
    return status === activeStatusTab;
  });

  // Pagination logic
  const totalItems = filteredBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [...filteredBookings].reverse().slice(indexOfFirstItem, indexOfLastItem);

  // Financial values
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || b.price || 0), 0);
  const netEarningsDisplay = 42902.40 + totalRevenue;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-in fade-in duration-300">
      
      {/* 1. HEADER TITLE & ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 font-display">
            Bookings Overview
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Manage guest stays and track revenue.
          </p>
        </div>

        <div className="flex items-center gap-3.5 w-full md:w-auto">
          {/* Export to CSV */}
          <button
            onClick={handleExportCSV}
            className="flex-grow md:flex-grow-0 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export to CSV</span>
          </button>
          
          {/* New Booking */}
          <button
            onClick={onAddMockBooking}
            className="flex-grow md:flex-grow-0 px-4 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-green/10 transition-all active:scale-95 animate-pulse"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS & CALENDAR */}
      <div className="bg-brand-green/5 border border-brand-green/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          {['all', 'confirmed', 'pending', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveStatusTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                activeStatusTab === tab
                  ? 'bg-white text-brand-green shadow-sm border border-brand-green/10'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/60 rounded-xl text-xs font-bold text-slate-500">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Oct 01 - Oct 31, 2026</span>
        </div>
      </div>

      {/* 3. BOOKINGS LIST */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="py-3 px-3">Guest</th>
                <th className="py-3 px-3">Stay Dates</th>
                <th className="py-3 px-3 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-1.5">
                      <AlertCircle className="w-5 h-5 text-slate-300" />
                      <span>No guest stays found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((b) => {
                  const service = services.find((s) => s.id === b.serviceType);
                  const initials = b.name ? b.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US';
                  
                  // Compute nights count
                  const nights = b.size === 'studio' ? 2 : b.size === 'large' ? 5 : 3;

                  return (
                    <tr 
                      key={b.id || b._id} 
                      onClick={() => handleOpenManageModal(b)}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-green/5 text-brand-green font-bold text-xs flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <span className="block font-black text-slate-800 leading-tight">{b.name}</span>
                            <span className="block text-[10px] text-slate-400 font-medium mt-0.5">
                              {nights} Adults • {service?.title || b.serviceType}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div>
                          <span className="block font-bold text-slate-700">{b.date}</span>
                          <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                            {nights} Nights • {b.cleaner || 'Staff Allocated'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-slate-800 text-sm font-display">
                            {formatPrice(b.totalPrice || b.price)}
                          </span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 ${
                            b.status === 'scheduled' || b.status === 'completed' || b.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : b.status === 'pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}>
                            {b.status || 'Confirmed'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
            <span className="text-[10px] text-slate-400 font-bold">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} bookings
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. NET EARNINGS & MONTHLY BOOKING COUNT ROW */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Side: Monthly Booking Count Chart placeholder */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 space-y-4 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <h5 className="font-display font-black text-xs text-slate-400 uppercase tracking-widest">
              Monthly Booking Count
            </h5>
            <span className="text-[10px] text-slate-400 font-bold">Year 2026</span>
          </div>

          {/* Simple custom CSS bar chart */}
          <div className="flex justify-around items-end h-28 w-full pt-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((mon, index) => {
              const heights = [20, 35, 45, 60, 50, 75, 80, 95, 65];
              return (
                <div key={index} className="flex flex-col items-center gap-1 flex-1 max-w-[28px]">
                  <div 
                    className="w-full bg-brand-green/10 hover:bg-brand-green rounded-t transition-all origin-bottom"
                    style={{ height: `${heights[index]}px` }}
                  ></div>
                  <span className="text-[9px] text-slate-400 font-bold">{mon}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Net Earnings widget */}
        <div className="lg:col-span-4 bg-brand-green text-white rounded-3xl p-6 flex flex-col justify-between min-h-[220px] shadow-lg shadow-brand-green/15">
          <div className="space-y-1">
            <span className="text-[10px] text-brand-green/60 font-black uppercase tracking-widest">
              Net Earnings
            </span>
            <h3 className="text-3xl font-display font-black leading-none">
              {formatPrice(netEarningsDisplay)}
            </h3>
            <span className="text-[10px] text-emerald-300 font-bold block pt-1">
              ↗ +12.5% from last month
            </span>
          </div>

          <button className="w-full py-3 bg-white text-brand-green font-extrabold text-xs rounded-xl shadow-sm hover:bg-brand-green/5 transition-colors flex items-center justify-center gap-1 cursor-pointer">
            <span>View Detailed Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* MANAGE BOOKING MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-[#020b14]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/50 shadow-2xl rounded-[28px] max-w-md w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h4 className="font-display font-black text-sm text-slate-800">
                  Manage Booking
                </h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  Booking ID: {selectedBooking.id || selectedBooking._id}
                </p>
              </div>
              <button
                onClick={handleCloseManageModal}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleManageFormSubmit} className="p-6 space-y-4 text-xs font-semibold text-slate-600">
              {/* Customer Details info */}
              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="text-slate-800 font-black">{selectedBooking.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-800 font-bold">{selectedBooking.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-slate-800 font-bold capitalize">{selectedBooking.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Price:</span>
                  <span className="text-brand-green font-black">{formatPrice(selectedBooking.totalPrice || selectedBooking.price)}</span>
                </div>
              </div>

              {/* Status Select */}
              <div className="space-y-1">
                <label className="text-slate-500">Booking Status</label>
                <select
                  value={manageStatus}
                  onChange={(e) => setManageStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed / Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Cleaner Assign */}
              <div className="space-y-1">
                <label className="text-slate-500">Assigned Cleaner</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins (⭐️ 4.95)"
                  value={manageCleaner}
                  onChange={(e) => setManageCleaner(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseManageModal}
                    className="flex-grow py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all font-bold text-xs cursor-pointer shadow-sm text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-grow py-3 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white font-extrabold text-xs transition-all shadow-md shadow-brand-green/10 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={handleManageDelete}
                  className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-extrabold text-xs transition-all cursor-pointer border border-rose-100 text-center"
                >
                  Delete Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
