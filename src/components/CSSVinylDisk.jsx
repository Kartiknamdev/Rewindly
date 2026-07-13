import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CSSVinylDisk({
  label = 'Untitled',
  artist = 'Unknown',
  onClick,
  isPlaying = false,
  layoutId,
  isSaved = false,
  onSaveToggle,
  playerColor = '#598cb7',
  accentColor = '#e05c31'
}) {
  const [animatingHeart, setAnimatingHeart] = useState(false);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setAnimatingHeart(true);
    onSaveToggle?.();
    setTimeout(() => setAnimatingHeart(false), 750);
  };

  return (
    <motion.div
      onClick={onClick}
      className="relative w-48 h-32 rounded-lg bg-[#f2ebe1] border border-[#e0dacb] shadow-md cursor-pointer flex items-center overflow-hidden group p-2.5 select-none"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Save Button */}
      <div className="absolute right-1.5 top-1.5 z-30">
        <motion.button
          className="relative p-1.5 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-700/90 transition-colors"
          onClick={handleSaveClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={animatingHeart ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          } : {}}
        >
          {isSaved ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Sleeve (Left Side) */}
      <div 
        className="w-[102px] h-[102px] rounded bg-cover flex flex-col justify-between p-2 shadow-md z-20 border border-black/10 relative overflow-hidden"
        style={{ backgroundColor: playerColor }}
      >
        {/* Subtle circular sleeve ring impression */}
        <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        {/* Sleeve Brand Label */}
        <div className="text-white/60 text-[5px] font-mono tracking-widest uppercase">Rewindly Records</div>
        
        {/* Song Details on Sleeve */}
        <div className="flex flex-col">
          <div className="text-white text-[9px] font-bold font-mono truncate leading-tight">{label}</div>
          <div className="text-white/80 text-[7.5px] font-mono truncate mt-0.5">{artist}</div>
        </div>
      </div>

      {/* Vinyl Record peeking out (Right Side) */}
      <motion.div
        layoutId={layoutId} // Shared layout ID for the slide transition into the player
        className="absolute w-24 h-24 rounded-full flex items-center justify-center shadow-lg border border-black/15"
        style={{
          right: '6px',
          backgroundColor: playerColor,
          zIndex: 10,
        }}
        animate={{
          rotate: isPlaying ? 360 : 0
        }}
        // Slide out slightly when user hovers the card
        whileHover={{ x: 16 }}
        transition={isPlaying ? {
          rotate: { repeat: Infinity, ease: "linear", duration: 3.5 },
          x: { type: "spring", stiffness: 200, damping: 15 }
        } : {
          type: "spring", stiffness: 200, damping: 15
        }}
      >
        {/* Vinyl Concentric Grooves */}
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            backgroundImage: `repeating-radial-gradient(circle, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 1px, rgba(0, 0, 0, 0.12) 2px, rgba(0, 0, 0, 0.12) 3px)`
          }}
        />

        {/* Gloss highlight */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-20"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.15) 25%, transparent 50%, rgba(255,255,255,0.15) 75%, transparent 100%)'
          }}
        />
        
        {/* Center label */}
        <div 
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          {/* Spindle hole */}
          <div className="w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center border border-black/10">
            <div className="w-1 h-1 rounded-full bg-gray-700" />
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
