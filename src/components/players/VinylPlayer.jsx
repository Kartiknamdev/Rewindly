import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VinylPlayer({
  cassette,
  playerColor = '#598cb7', // Default blue from poster
  accentColor = '#e05c31', // Default terracotta from poster
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrevious,
  volume = 0.5,
  onVolumeChange
}) {
  const [prevDialRotation, setPrevDialRotation] = useState(0);
  const [nextDialRotation, setNextDialRotation] = useState(0);
  const [isChangingTrack, setIsChangingTrack] = useState(false);

  // Trigger temporary reset when cassette (track) changes
  useEffect(() => {
    if (cassette?.id) {
      setIsChangingTrack(true);
      const timer = setTimeout(() => {
        setIsChangingTrack(false);
      }, 700); // 700ms aligns with disk sliding into place
      return () => clearTimeout(timer);
    }
  }, [cassette?.id]);

  // Dial click animations
  const handlePrevClick = (e) => {
    e.stopPropagation();
    setPrevDialRotation(prev => prev - 120);
    if (onPrevious) onPrevious();
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    setNextDialRotation(prev => prev + 120);
    if (onNext) onNext();
  };

  // Convert volume (0-1) to slider Y offset (0px to 80px)
  // 0 volume is at the bottom (80px), 1 volume is at the top (0px)
  const sliderHeight = 80;
  const thumbY = (1 - volume) * sliderHeight;

  return (
    <motion.div
      className="relative w-80 h-[480px] rounded-2xl shadow-2xl p-6 overflow-hidden select-none flex flex-col justify-between"
      style={{
        backgroundColor: '#f2ebe1', // Textured paper background
        border: '1px solid #e0dacb',
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* SVG Grain filter to mimic high-quality screen-print paper texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay z-50">
        <filter id="vinyl-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vinyl-grain)" />
      </svg>

      {/* Top Section: Stamp Branding & Metadata */}
      <div className="flex justify-between items-start w-full z-10">
        {/* Mountain Stamp Logo */}
        <div className="flex flex-col items-start opacity-80">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 text-[#f2ebe1] p-1.5">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 15 L20 70 L40 70 L50 50 L60 70 L80 70 Z" />
              <path d="M50 15 L80 70 A 45 45 0 0 0 50 5 A 45 45 0 0 0 20 70" opacity="0.3" />
            </svg>
          </div>
          <span className="text-[10px] tracking-[0.25em] font-bold text-gray-700 mt-2 font-sans">Rewindly</span>
          <span className="text-[6px] tracking-[0.1em] text-gray-500 font-sans uppercase">❤️❤️❤️❤️</span>
        </div>

        {/* Dynamic Song Info Stamps */}
        <div className="text-right max-w-[170px] opacity-80">
          <div className="text-gray-800 text-xs font-mono font-bold truncate">
            {cassette?.title || 'No Record Loaded'}
          </div>
          <div className="text-gray-600 text-[10px] font-mono truncate mt-0.5">
            {cassette?.artist || 'Select a Track'}
          </div>
          <div className="text-[8px] text-gray-400 font-mono tracking-widest uppercase mt-1">
            {isPlaying ? '• Playing 33 RPM' : '• Player Stopped'}
          </div>
        </div>
      </div>

      {/* Middle Section: Spinning Record & Arm */}
      <div className="relative w-[280px] h-[280px] mx-auto my-auto flex items-center justify-center">
        
        {/* Record Base Shadow Layer (Screen-printed Offset style) */}
        <div 
          className="absolute w-[240px] h-[240px] rounded-full pointer-events-none"
          style={{ 
            backgroundColor: `${accentColor}cc`,
            transform: 'translate(4px, 4px)'
          }} 
        />

        {/* Spinning Vinyl Record Group */}
        <AnimatePresence mode="popLayout">
          {cassette && (
            <motion.div
              key={cassette.id}
              layoutId={`vinyl-disk-${cassette.id}`}
              className="absolute w-[240px] h-[240px] rounded-full cursor-pointer shadow-lg z-10 flex items-center justify-center"
              style={{
                backgroundColor: playerColor,
              }}
              initial={{ x: 320, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                rotate: (isPlaying && !isChangingTrack) ? 360 : 0
              }}
              exit={{ x: -320, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 120, damping: 20 },
                opacity: { duration: 0.3 },
                rotate: (isPlaying && !isChangingTrack) ? {
                  repeat: Infinity,
                  ease: "linear",
                  duration: 2.2, // ~33 RPM rotation speed
                } : { duration: 0.3 },
                layout: {
                  type: "spring",
                  stiffness: 150,
                  damping: 25
                }
              }}
              onClick={onPlayPause}
            >
          {/* Micro-groove texture */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: `repeating-radial-gradient(circle, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 1px, rgba(0, 0, 0, 0.12) 2px, rgba(0, 0, 0, 0.12) 3px)`
            }}
          />

          {/* Vinyl Shine Effect */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none opacity-30"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.15) 25%, transparent 50%, rgba(255,255,255,0.15) 75%, transparent 100%)'
            }}
          />

          {/* Center Orange Label */}
          <div 
            className="relative w-[84px] h-[84px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            {/* Stamp styling on center label */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <path id="label-curve-top" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
              <path id="label-curve-bottom" d="M 85 50 A 35 35 0 0 1 15 50" fill="none" />
              
              <text className="text-[5.5px] fill-white/80 font-mono tracking-[0.2em] font-semibold uppercase">
                <textPath href="#label-curve-top" startOffset="50%" textAnchor="middle">
                  REWINDLY
                </textPath>
              </text>
              <text className="text-[4px] fill-white/60 font-mono tracking-[0.1em] font-semibold uppercase">
                <textPath href="#label-curve-bottom" startOffset="50%" textAnchor="middle">
                  STEREO RECORD
                </textPath>
              </text>

              {/* White outer spindle hole ring */}
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
              {/* Spindle hole center shadow */}
              <circle cx="50" cy="50" r="2.5" fill="#374151" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

        {/* Dynamic Stylus / Tonearm Assembly */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            top: '15px',
            right: '15px',
            width: '100px',
            height: '240px',
            transformOrigin: '50px 35px', // Center of pivot
          }}
          animate={{
            rotate: (isPlaying && !isChangingTrack) ? 22 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 45,
            damping: 11
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 240">
            {/* Orange base ring */}
            <circle cx="50" cy="35" r="18" fill={accentColor} />
            
            {/* Pivot support housing (grey metallic) */}
            <circle cx="50" cy="35" r="10" fill="#4b5563" />
            <circle cx="50" cy="35" r="5" fill="#1f2937" />

            {/* Counterweight extension (rear) */}
            <rect x="47" y="5" width="6" height="15" fill="#9ca3af" rx="1" />
            <rect x="43" y="2" width="14" height="10" fill="#374151" rx="2" />

            {/* Tonearm wand (White finish matching poster) */}
            {/* The arm starts at pivot (50, 35) goes straight to (50, 150), then bends to (35, 175) */}
            <path 
              d="M 50 35 L 50 150 L 32 190" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {/* Metal inner core detail */}
            <path 
              d="M 50 35 L 50 150 L 32 190" 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />

            {/* Headshell / Cartridge (Orange angled block) */}
            <g transform="translate(32, 190) rotate(-16)">
              {/* Cartridge base */}
              <rect x="-8" y="0" width="16" height="24" rx="2" fill={accentColor} />
              
              {/* Highlight and screws */}
              <circle cx="-3" cy="6" r="1.5" fill="#ffffff" />
              <circle cx="3" cy="6" r="1.5" fill="#ffffff" />
              
              {/* Metal stylus finger lift */}
              <path 
                d="M 8 6 Q 14 6 12 14" 
                fill="none" 
                stroke="#d1d5db" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
              />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Bottom Section: Controls & Sliders */}
      <div className="flex justify-between items-end w-full z-10">
        
        {/* Left Side: Volume Slider */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[7px] font-mono tracking-widest text-gray-500 uppercase">Volume</span>
          
          {/* Vertical Slider Shell */}
          <div 
            className="relative w-7 h-[112px] rounded-full border shadow-inner flex flex-col items-center py-2"
            style={{ 
              backgroundColor: playerColor, // Matches poster styling
              borderColor: `${playerColor}33`
            }}
          >
            {/* Deep Slider Track */}
            <div className="w-[3px] h-[92px] bg-gray-900/35 rounded-full" />
            
            {/* Orange Custom Volume Handle */}
            <motion.div
              className="absolute w-[21px] h-3.5 rounded-sm shadow-md cursor-grab active:cursor-grabbing border border-black/10"
              style={{
                top: `${thumbY + 8}px`, // Offset to match track top
                backgroundColor: accentColor,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />

            {/* Invisible native range slider to handle drags cleanly */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange?.(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Volume Slider"
            />
          </div>
        </div>

        {/* Right Side: Tactile Skip Dials */}
        <div className="flex flex-col items-end gap-3.5">
          
          {/* Small Dial (Top) - Previous Track */}
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono tracking-widest text-gray-500 uppercase">Prev</span>
            <button 
              onClick={handlePrevClick}
              className="relative w-6 h-6 rounded-full flex items-center justify-center focus:outline-none"
              style={{ backgroundColor: accentColor }}
            >
              {/* Dial rotation knob */}
              <motion.div 
                className="w-4 h-4 rounded-full bg-gray-300 shadow-sm relative flex items-center justify-center"
                animate={{ rotate: prevDialRotation }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              >
                {/* indicator pointer */}
                <div className="absolute top-0.5 w-0.5 h-1.5 bg-gray-800 rounded-full" />
              </motion.div>
            </button>
          </div>

          {/* Large Dial (Bottom) - Next Track */}
          <div className="flex items-center gap-2.5">
            <span className="text-[7px] font-mono tracking-widest text-gray-500 uppercase">Next</span>
            <button 
              onClick={handleNextClick}
              className="relative w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
              style={{ backgroundColor: playerColor }}
            >
              {/* Dial rotation knob */}
              <motion.div 
                className="w-5.5 h-5.5 rounded-full bg-gray-300 shadow-md relative flex items-center justify-center"
                animate={{ rotate: nextDialRotation }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              >
                {/* indicator pointer */}
                <div className="absolute top-0.5 w-0.5 h-2 bg-gray-800 rounded-full" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
