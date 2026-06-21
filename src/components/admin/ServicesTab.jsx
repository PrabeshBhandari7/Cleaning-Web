import { useState, useRef } from 'react';
import { Search, Plus, Image as ImageIcon, Edit, Trash2, X } from 'lucide-react';

export default function ServicesTab({
  services,
  onToggleActiveState,
  onDeleteService,
  onEditServiceSubmit,
  onGoToAddTab,
  formatPrice,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'inactive' | 'draft'

  // Edit Modal state
  const [editingService, setEditingService] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [editIconId, setEditIconId] = useState('deep');
  const [editDesc, setEditDesc] = useState('');
  const [editPhotoSourceType, setEditPhotoSourceType] = useState('predefined');
  const [editUploadedBase64, setEditUploadedBase64] = useState('');
  const [editImageKey, setEditImageKey] = useState('deep');

  const editFileInputRef = useRef(null);

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setEditTitle(service.title || '');
    setEditPrice(service.price || '');
    setEditBadge(service.badge || '');
    setEditIconId(service.iconId || 'deep');
    setEditDesc(service.desc || '');
    
    // Check image format
    if (service.imageKey?.startsWith('data:image')) {
      setEditPhotoSourceType('upload');
      setEditUploadedBase64(service.imageKey);
      setEditImageKey('');
    } else {
      setEditPhotoSourceType('predefined');
      setEditImageKey(service.imageKey || 'deep');
      setEditUploadedBase64('');
    }
  };

  const handleCloseEditModal = () => {
    setEditingService(null);
  };

  const handleEditPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size exceeds 2MB limit. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUploadedBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (!editTitle || !editPrice) {
      alert('Please fill out all required fields.');
      return;
    }

    const finalImageKey = editPhotoSourceType === 'upload' ? editUploadedBase64 : editImageKey;
    if (editPhotoSourceType === 'upload' && !editUploadedBase64) {
      alert('Please select a photo file to upload or switch to predefined library.');
      return;
    }

    onEditServiceSubmit(editingService.id, {
      title: editTitle,
      price: Number(editPrice) || 0,
      badge: editBadge,
      iconId: editIconId,
      desc: editDesc,
      imageKey: finalImageKey,
    });

    handleCloseEditModal();
  };

  // Filter listings
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.badge?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc?.toLowerCase().includes(searchTerm.toLowerCase());

    const isActive = s.isActive !== false; 
    const isDraft = s.id?.includes('draft') || s.price === 0 || !s.price;

    let matchesTab = true;
    if (activeFilter === 'active') {
      matchesTab = isActive && !isDraft;
    } else if (activeFilter === 'inactive') {
      matchesTab = !isActive && !isDraft;
    } else if (activeFilter === 'draft') {
      matchesTab = isDraft;
    }

    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-white border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] rounded-3xl p-6 space-y-6 relative min-h-[500px] pb-24 animate-in fade-in duration-300">
      
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full">
        <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-xs font-semibold rounded-2xl border border-slate-200/80 bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-green/5 focus:border-brand-green transition-all"
        />
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-wrap gap-2">
        {['all', 'active', 'inactive', 'draft'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === filter
                ? 'bg-brand-green text-white shadow-md shadow-brand-green/10'
                : 'bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {filter === 'all' ? 'All Listings' : filter}
          </button>
        ))}
      </div>

      {/* Listings Card Stack */}
      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No listings match your search criteria.
          </div>
        ) : (
          filteredServices.map((s) => {
            const isActive = s.isActive !== false;
            const isDraft = s.id?.includes('draft') || s.price === 0 || !s.price;
            const categoryType = s.iconId === 'office' ? 'Office' : s.iconId === 'home' ? 'Apartment' : 'Commercial';
            const locationType = s.badge || 'Professional care';

            return (
              <div
                key={s.id}
                className="p-4 bg-white border border-slate-100 hover:border-slate-200 rounded-3xl flex items-center justify-between gap-4 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.005)]"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-slate-100 relative flex items-center justify-center">
                    {isDraft ? (
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    ) : (
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h5 className="font-display font-black text-sm text-slate-800 leading-snug">
                      {isDraft ? s.title || 'Untitled Draft' : s.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5 leading-none">
                      {categoryType} • {locationType}
                    </span>
                    <span className="text-xs font-extrabold text-brand-green block mt-1.5 leading-none">
                      {isDraft ? '--' : formatPrice(s.price)} <span className="text-slate-400 font-bold">/ visit</span>
                    </span>
                  </div>
                </div>

                {/* Edit & Delete Action Panel */}
                <div className="flex items-center gap-3 shrink-0">
                  {isDraft ? (
                    <button
                      onClick={() => handleOpenEditModal(s)}
                      className="px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[10px] font-black uppercase text-brand-green tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Complete Setup
                    </button>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditModal(s)}
                        className="p-2 text-slate-400 hover:text-brand-green hover:bg-brand-green/5 rounded-xl transition-all cursor-pointer"
                        title="Edit listing details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => onDeleteService(s.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                        title="Delete service listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Switch Switcher */}
                      <button
                        type="button"
                        onClick={() => onToggleActiveState && onToggleActiveState(s.id, isActive)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isActive ? 'bg-brand-green' : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Add Plus Action Button */}
      <button
        onClick={onGoToAddTab}
        className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center shadow-lg shadow-brand-green/35 transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
        title="Add new listing category"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* EDIT LISTING MODAL DIALOG */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-[#020b14]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/50 shadow-2xl rounded-[28px] max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h4 className="font-display font-black text-sm text-slate-800">
                  Edit Service Listing
                </h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  Modify details, rate, and listing image
                </p>
              </div>
              <button
                onClick={handleCloseEditModal}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleEditFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-semibold text-slate-600">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Service Name */}
                <div className="space-y-1">
                  <label className="text-slate-500">Service Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Washroom Sanitation"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                  />
                </div>

                {/* Base Price */}
                <div className="space-y-1">
                  <label className="text-slate-500">Base Price (USD $) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 70"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Sub-Badge */}
                <div className="space-y-1">
                  <label className="text-slate-500">Sub-Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Deep sanitize"
                    value={editBadge}
                    onChange={(e) => setEditBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                  />
                </div>

                {/* Service Icon */}
                <div className="space-y-1">
                  <label className="block text-slate-500">Service Icon</label>
                  <select
                    value={editIconId}
                    onChange={(e) => setEditIconId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
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
                    value={editPhotoSourceType}
                    onChange={(e) => setEditPhotoSourceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                  >
                    <option value="predefined">Predefined Library</option>
                    <option value="upload">Upload Custom Photo</option>
                  </select>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={editFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleEditPhotoUpload(e);
                  setEditPhotoSourceType('upload');
                  e.target.value = '';
                }}
                className="hidden"
              />

              {/* Photo preview/selector */}
              <div className="space-y-1">
                <label className="block text-slate-500 font-bold mb-1">Photo Selection *</label>
                {editPhotoSourceType === 'predefined' ? (
                  <div className="flex gap-2">
                    <select
                      value={editImageKey}
                      onChange={(e) => setEditImageKey(e.target.value)}
                      className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
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
                      onClick={() => editFileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-800 rounded-xl font-bold cursor-pointer text-xs transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-4 h-4 text-brand-green" />
                      Add Photo
                    </button>
                  </div>
                ) : (
                  <div>
                    {!editUploadedBase64 ? (
                      <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/20 hover:border-brand-green/45 hover:bg-slate-50/50 transition-all text-center flex flex-col items-center justify-center gap-2 group">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          <Plus className="w-5 h-5 text-brand-green" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-bold text-slate-700">
                            Upload your custom listing photo
                          </p>
                          <p className="text-[9px] text-slate-400 font-medium">
                            Supports JPG, PNG up to 2MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => editFileInputRef.current?.click()}
                          className="px-3.5 py-1.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-lg text-[10px] font-black transition-all shadow-sm cursor-pointer mt-1"
                        >
                          Select Image File
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-200 bg-slate-100 shadow-sm">
                          <img
                            src={editUploadedBase64}
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
                              onClick={() => editFileInputRef.current?.click()}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Change Photo
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditUploadedBase64('');
                                setEditPhotoSourceType('predefined');
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
                <label className="text-slate-500">Service Description *</label>
                <textarea
                  required
                  placeholder="Service details and scope..."
                  rows="3"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="flex-grow py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all font-bold text-xs cursor-pointer shadow-sm"
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
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
