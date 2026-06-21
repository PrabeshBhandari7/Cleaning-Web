import { Plus } from 'lucide-react';

export default function AddServiceTab({
  newService,
  setNewService,
  photoSourceType,
  setPhotoSourceType,
  uploadedBase64,
  setUploadedBase64,
  fileInputRef,
  onPhotoUpload,
  onSubmit,
}) {
  return (
    <div className="bg-white/70 border border-white/40 shadow-xl rounded-[28px] p-6 backdrop-blur-md max-w-2xl space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-100 pb-3">
        <h4 className="font-display font-black text-md text-slate-800">
          Add New Cleaning Category
        </h4>
        <p className="text-[10px] text-slate-400 font-medium">
          Expand your public portfolio by adding custom cleaning categories.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 text-xs font-semibold text-slate-600"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Service Name */}
          <div className="space-y-1">
            <label className="text-slate-500">Service Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Washroom Sanitation"
              value={newService.title}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
            />
          </div>

          {/* Base Price */}
          <div className="space-y-1">
            <label className="text-slate-500">Base Price (USD $) *</label>
            <input
              type="number"
              required
              placeholder="e.g., 70"
              value={newService.price}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Sub-Badge */}
          <div className="space-y-1">
            <label className="text-slate-500">Sub-Badge Text</label>
            <input
              type="text"
              placeholder="e.g., Deep sanitize"
              value={newService.badge}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, badge: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
            />
          </div>

          {/* Service Icon */}
          <div className="space-y-1">
            <label className="block text-slate-500">Service Icon</label>
            <select
              value={newService.iconId}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, iconId: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
            >
              <option value="home">Home (Residential)</option>
              <option value="office">Briefcase (Office)</option>
              <option value="deep">Sparkles (Deep)</option>
              <option value="washroom">Droplet (Washroom)</option>
              <option value="city">MapPin (City)</option>
              <option value="road">Trash2 (Road)</option>
            </select>
          </div>

          {/* Image source toggle */}
          <div className="space-y-1">
            <label className="block text-slate-500">Photo Source</label>
            <select
              value={photoSourceType}
              onChange={(e) => setPhotoSourceType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
            >
              <option value="predefined">Predefined Library</option>
              <option value="upload">Upload Custom Photo</option>
            </select>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            onPhotoUpload(e);
            if (e.target.files && e.target.files[0]) {
              setPhotoSourceType('upload');
            }
            e.target.value = '';
          }}
          className="hidden"
        />

        {/* Photo preview/selector */}
        <div className="space-y-1">
          <label className="block text-slate-500 font-bold mb-1">Photo Selection *</label>
          {photoSourceType === 'predefined' ? (
            <div className="flex gap-2">
              <select
                value={newService.imageKey}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, imageKey: e.target.value }))
                }
                className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
              >
                <option value="residential">Cozy Bedroom (Residential)</option>
                <option value="office">Corporate Workplace (Office)</option>
                <option value="deep">Sparkling Counters (Deep Clean)</option>
                <option value="washroom">Clean Bathroom (Washroom)</option>
                <option value="city">Walkway Park (City Clean)</option>
                <option value="road">Street Sweeper (Road Clean)</option>
              </select>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-800 rounded-xl font-bold cursor-pointer text-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4 text-[#ff724c]" />
                Add Photo
              </button>
            </div>
          ) : (
            <div>
              {!uploadedBase64 ? (
                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/20 hover:border-brand-green/45 hover:bg-slate-50/50 transition-all text-center flex flex-col items-center justify-center gap-2 group">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-[#ff724c]" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-700">
                      Upload your custom cleaning category photo
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium">
                      Supports JPG, PNG up to 2MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-[#ff724c] hover:bg-[#e65c36] text-white rounded-lg text-[10px] font-black transition-all shadow-sm cursor-pointer mt-1"
                  >
                    Select Local Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-200 bg-slate-100 shadow-sm">
                    <img
                      src={uploadedBase64}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      Custom Image Loaded
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedBase64('');
                          setPhotoSourceType('predefined');
                        }}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 hover:text-rose-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Remove & Use Library
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-slate-500">Service Description</label>
          <textarea
            placeholder="Brief description of the cleaning scope..."
            rows="3"
            value={newService.desc}
            onChange={(e) =>
              setNewService((prev) => ({ ...prev, desc: e.target.value }))
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#ff724c] text-white font-extrabold hover:bg-[#e65c36] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-orange/15 cursor-pointer text-sm uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Create Category
        </button>
      </form>
    </div>
  );
}
