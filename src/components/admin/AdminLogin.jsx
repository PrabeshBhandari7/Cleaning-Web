import { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onSubmit, onCancel, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020b14]/50 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Glow effects behind login card */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl -top-12 -left-12 pointer-events-none animate-pulse"></div>
      <div className="absolute w-72 h-72 rounded-full bg-brand-green/20 blur-3xl -bottom-12 -right-12 pointer-events-none animate-pulse"></div>

      <div className="bg-white/80 border border-white/40 shadow-2xl rounded-[32px] p-8 max-w-sm w-full space-y-6 relative overflow-hidden backdrop-blur-md">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-100/50 text-[#085f56] flex items-center justify-center mx-auto shadow-inner transition-transform hover:rotate-12 duration-300">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight">
            CCRM Access
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Authorized Personnel Only
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 bg-rose-50/80 border border-rose-100 rounded-2xl text-xs text-rose-600 font-semibold animate-pulse">
            <ShieldCheck className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/60 bg-white/50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/60 bg-white/50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-grow py-3 rounded-xl text-xs font-extrabold border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all cursor-pointer shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-grow py-3 rounded-xl text-xs font-extrabold bg-[#085f56] hover:bg-[#064c45] text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-brand-green/10 cursor-pointer"
            >
              Verify Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
