import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BeforeAfterSlider({
  isAfter,
  setIsAfter,
  beforeImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  afterImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
}) {
  const [sliderPosition, setSliderPosition] = useState(isAfter ? 0 : 100);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const wasDraggedRef = useRef(false);

  // Sync slider position when isAfter changes externally (e.g. clicking the tabs)
  useEffect(() => {
    if (isDragging) return;
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    setIsTransitioning(true);
    setSliderPosition(isAfter ? 0 : 100);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [isAfter, isDragging]);

  // Perform position updates and notify parent of active tab state
  const updatePosition = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
      wasDraggedRef.current = true;

      // Sync active tab if slider crosses the midpoint
      if (position < 50 && !isAfter) {
        setIsAfter(true);
      } else if (position >= 50 && isAfter) {
        setIsAfter(false);
      }
    },
    [isAfter, setIsAfter]
  );

  // Drag listeners registered on window to handle mouse movements outside the box
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length === 0) return;
      updatePosition(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsTransitioning(false); // Cancel transitions immediately on manual drag
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsTransitioning(false);
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  // Math to fade labels smoothly as the slider handle approaches them
  const beforeTextOpacity = Math.max(0, Math.min(1, (sliderPosition - 20) / 25));
  const afterTextOpacity = Math.max(0, Math.min(1, (80 - sliderPosition) / 25));

  const beforeBadgeOpacity = sliderPosition < 15 ? 0 : 1;
  const afterBadgeOpacity = sliderPosition > 85 ? 0 : 1;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="group relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-100 cursor-ew-resize select-none hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out"
    >
      {/* ================= AFTER STATE (Background Layer) ================= */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt="After professional cleaning"
          className="absolute inset-0 w-full h-full object-cover filter saturate-[1.15] brightness-[1.08] contrast-[1.02]"
        />
        {/* Shadow Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Dynamic sparkles revealing on the "After" side */}
        <div className="absolute top-[15%] right-[20%] w-8 h-8 animate-pulse text-amber-300 pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-[28%] right-[38%] w-6 h-6 animate-bounce text-yellow-200 pointer-events-none [animation-delay:0.3s] drop-shadow-[0_0_6px_rgba(254,240,138,0.7)]">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-[48%] right-[15%] w-5 h-5 animate-pulse text-white pointer-events-none [animation-delay:0.6s] drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
          <Sparkles className="w-full h-full" />
        </div>

        {/* AFTER BADGE */}
        <span
          style={{ opacity: afterBadgeOpacity }}
          className="absolute top-5 right-5 px-3 py-1.5 rounded-lg bg-brand-green text-white text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg z-10 pointer-events-none transition-opacity duration-300"
        >
          After ✨
        </span>

        {/* AFTER TEXT OVERLAY */}
        <div
          style={{ opacity: afterTextOpacity }}
          className="absolute right-6 bottom-6 md:right-8 md:bottom-8 text-right max-w-[45%] pointer-events-none transition-opacity duration-200"
        >
          <h3 className="text-lg md:text-2xl font-black text-white font-display drop-shadow-md">
            Sanitized & Sparkling
          </h3>
          <p className="text-slate-200 text-[11px] md:text-sm mt-1 font-medium drop-shadow-sm line-clamp-2 leading-relaxed">
            Disinfected surfaces, organized rooms, and pristine, fresh air.
          </p>
        </div>
      </div>

      {/* ================= BEFORE STATE (Clipped Foreground Layer) ================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isTransitioning ? 'clip-path 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
      >
        <img
          src={beforeImage}
          alt="Before professional cleaning"
          className="absolute inset-0 w-full h-full object-cover filter saturate-[0.62] brightness-[0.68] contrast-[0.98] sepia-[0.2]"
        />
        {/* Subtle grimy/dusty overlay filter */}
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply pointer-events-none" />
        {/* Shadow Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

        {/* BEFORE BADGE */}
        <span
          style={{ opacity: beforeBadgeOpacity }}
          className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-brand-orange text-white text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg z-10 pointer-events-none transition-opacity duration-300"
        >
          Before
        </span>

        {/* BEFORE TEXT OVERLAY */}
        <div
          style={{ opacity: beforeTextOpacity }}
          className="absolute left-6 bottom-6 md:left-8 md:bottom-8 text-left max-w-[45%] pointer-events-none transition-opacity duration-200"
        >
          <h3 className="text-lg md:text-2xl font-black text-white font-display drop-shadow-md">
            Messy & Dusty Spaces
          </h3>
          <p className="text-slate-300 text-[11px] md:text-sm mt-1 font-medium drop-shadow-sm line-clamp-2 leading-relaxed">
            Stained surfaces, cluttered corners, and accumulated dust layers.
          </p>
        </div>
      </div>

      {/* ================= DIVIDER LINE ================= */}
      <div
        className="absolute top-0 bottom-0 w-[2.5px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] z-20 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          transition: isTransitioning ? 'left 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
      />

      {/* ================= DRAG HANDLE ================= */}
      <div
        className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-white border-2 border-brand-green/80 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.3)] z-25 pointer-events-none top-1/2 group-hover:scale-110 group-hover:border-brand-orange group-hover:shadow-[0_0_20px_rgba(255,114,76,0.4)] transition-all duration-300"
        style={{
          left: `${sliderPosition}%`,
          transition: isTransitioning ? 'left 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
      >
        <div className="flex items-center gap-0.5 text-brand-green group-hover:text-brand-orange transition-colors duration-300">
          <ChevronLeft className="w-4 h-4 animate-pulse" />
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
