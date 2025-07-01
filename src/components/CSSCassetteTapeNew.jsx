import React from 'react';
import { motion } from 'framer-motion';

const spinAnimation = {
  animate: { rotate: 360 },
  transition: { duration: 2, repeat: Infinity, ease: "linear" }
};

export function CSSCassetteTape({ 
  color = '#222', 
  label = 'Untitled', 
  artist = 'Unknown', 
  onClick,
  isPlaying = false,
  layoutId
}) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="relative w-40 h-24 rounded-sm shadow-xl cursor-pointer transform-gpu"
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cassette Body */}
      <motion.div className="absolute inset-1 bg-gray-800 bg-opacity-30 rounded-sm">
        {/* Reels */}
        <motion.div 
          className="absolute top-2 left-4 w-8 h-8 rounded-full border-4 border-gray-700"
          animate={isPlaying ? spinAnimation.animate : {}}
          transition={isPlaying ? spinAnimation.transition : {}}
        >
          <motion.div className="absolute inset-1 rounded-full bg-gray-600" />
        </motion.div>
        <motion.div 
          className="absolute top-2 right-4 w-8 h-8 rounded-full border-4 border-gray-700"
          animate={isPlaying ? spinAnimation.animate : {}}
          transition={isPlaying ? spinAnimation.transition : {}}
        >
          <motion.div className="absolute inset-1 rounded-full bg-gray-600" />
        </motion.div>
        
        {/* Label */}
        <div className="absolute bottom-2 left-2 right-2 h-8 bg-white bg-opacity-90 rounded px-2 py-1">
          <div className="text-black text-xs font-bold truncate">{label}</div>
          <div className="text-gray-600 text-xs truncate">{artist}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
