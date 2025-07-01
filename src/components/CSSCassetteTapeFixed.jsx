import React from 'react';
import { motion } from 'framer-motion';

export function CSSCassetteTapeFixed({ 
  color = '#222', 
  label = 'Untitled', 
  artist = 'Unknown', 
  onClick,
  isPlaying = false,
  layoutId,
  playerColor,
  accentColor
}) {
  const reelAnimation = isPlaying ? {
    animate: { rotate: 360 },
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  } : {};

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="relative w-40 h-24 rounded-lg shadow-xl cursor-pointer transform-gpu"
      style={{ 
        background: `linear-gradient(45deg, ${playerColor || '#333'}, ${accentColor || '#666'})` 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-1 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm">
        <motion.div 
          className="absolute top-2 left-4 w-8 h-8 rounded-full border-4"
          style={{ borderColor: accentColor || '#666' }}
          {...reelAnimation}
        >
          <div className="absolute inset-1 rounded-full bg-gray-600" />
        </motion.div>
        
        <motion.div 
          className="absolute top-2 right-4 w-8 h-8 rounded-full border-4"
          style={{ borderColor: accentColor || '#666' }}
          {...reelAnimation}
        >
          <div className="absolute inset-1 rounded-full bg-gray-600" />
        </motion.div>
        
        <div className="absolute bottom-2 left-2 right-2 h-8 bg-white bg-opacity-90 rounded px-2 py-1">
          <div className="text-black text-xs font-bold truncate">{label}</div>
          <div className="text-gray-600 text-xs truncate">{artist}</div>
        </div>
      </div>
    </motion.div>
  );
}
