import { useState } from 'react';
import { Search, User, Filter, AlertCircle, Mail, Send } from 'lucide-react';
import { sendBookingNotification } from '../../services/emailService';

export default function BookingsTab({ bookings, services, formatPrice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [emailStatus, setEmailStatus] = useState({}); // Track individual email send state

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || b.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleResendEmail = async (booking) => {
    const bid = booking.id;
    setEmailStatus((prev) => ({ ...prev, [bid]: 'sending' }));
    try {
      await sendBookingNotification(booking);
      setEmailStatus((prev) => ({ ...prev, [bid]: 'sent' }));
      setTimeout(() => {
        setEmailStatus((prev) => {
          const next = { ...prev };
          delete next[bid];
          return next;
        });
      }, 3000);
    } catch (err) {
      console.error(err);
      setEmailStatus((prev) => ({ ...prev, [bid]: 'error' }));
    }
  };

  return (
    <div className="bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md space-y-6 animate-in fade-in duration-300">
      {/* Tab Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h4 className="font-display font-black text-md text-slate-800">
            Bookings Log ({filteredBookings.length})
          </h4>
          <p className="text-[10px] text-slate-400 font-medium">
            Search, filter, and review customer bookings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Search box */}
          <div className="relative flex items-center w-full md:w-60">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ID, name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/10"
            />
          </div>

          {/* Filter Status Selector */}
          <div className="relative shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Booking ID</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Service Category</th>
              <th className="py-3 px-2">Area Size</th>
              <th className="py-3 px-2">Frequency</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Staff Pro</th>
              <th className="py-3 px-2 text-right">Total Price</th>
              <th className="py-3 px-2 text-center">Status</th>
              <th className="py-3 px-2 text-center">Email Notify</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 font-medium text-slate-600">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-1">
                    <AlertCircle className="w-6 h-6 text-slate-300" />
                    <span>No matching records found.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => {
                const service = services.find((s) => s.id === b.serviceType);
                const isSent = emailStatus[b.id] === 'sent';
                const isSending = emailStatus[b.id] === 'sending';
                const isError = emailStatus[b.id] === 'error';

                return (
                  <tr key={b.id} className="hover:bg-white/30 transition-colors">
                    <td className="py-3.5 px-2 font-mono text-[10px] font-bold text-slate-500">
                      {b.id?.slice(0, 8) || b._id?.slice(-8) || b.id || 'N/A'}
                    </td>
                    <td className="py-3.5 px-2">
                      <div>
                        <span className="block font-bold text-slate-800">{b.name}</span>
                        <span className="block text-[9px] text-slate-400 font-medium">
                          {b.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 capitalize text-slate-500">
                      {service?.title || b.serviceType}
                    </td>
                    <td className="py-3.5 px-2 uppercase text-slate-500 font-bold">
                      {b.size}
                    </td>
                    <td className="py-3.5 px-2 uppercase text-[10px] font-bold text-slate-400">
                      {b.frequency}
                    </td>
                    <td className="py-3.5 px-2 text-slate-400">{b.date}</td>
                    <td className="py-3.5 px-2 text-slate-500">
                      {b.cleaner || <span className="italic text-slate-400">Unassigned</span>}
                    </td>
                    <td className="py-3.5 px-2 text-right font-black text-slate-800">
                      {formatPrice(b.totalPrice || b.price)}
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                          b.status === 'scheduled' || b.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <button
                        onClick={() => handleResendEmail(b)}
                        disabled={isSending}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isSent
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                            : isError
                            ? 'bg-rose-50 border-rose-100 text-rose-600'
                            : 'bg-white border-slate-200 hover:border-brand-green/30 text-slate-500 hover:text-[#085f56] active:scale-95'
                        }`}
                        title="Resend email confirmation to user"
                      >
                        {isSending ? (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#085f56] border-t-transparent animate-spin"></div>
                        ) : isSent ? (
                          <span className="text-[10px] font-bold px-1">Sent!</span>
                        ) : isError ? (
                          <span className="text-[10px] font-bold px-1 text-rose-500">Fail</span>
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
