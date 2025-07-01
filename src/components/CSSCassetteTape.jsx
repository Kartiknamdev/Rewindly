import React from 'react';
import { motion } from 'framer-motion';

export function CSSCassetteTape({ 
  label = 'Untitled', 
  artist = 'Unknown', 
  onClick,
  isPlaying = false,
  layoutId,
  isSaved = false,
  onSaveToggle,
  playerColor = '#6366f1',
  accentColor = '#ffffff'
}) {
  // Bouncy spring animation for the reels
  const reelSpringConfig = {
    type: "spring",
    stiffness: 100,
    damping: 5,
    mass: 0.5
  };

  const leftReelAnimation = isPlaying ? {
    animate: { 
      rotate: -360,
      scale: [1, 1.05, 1],
    },
    transition: { 
      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
      scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    }
  } : {};

  const rightReelAnimation = isPlaying ? {
    animate: { 
      rotate: 360,
      scale: [1, 1.05, 1],
    },
    transition: { 
      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
      scale: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
    }
  } : {};

  const tapeMovementAnimation = isPlaying ? {
    animate: { 
      pathOffset: [0, 1],
      pathLength: [0.8, 1, 0.8]
    },
    transition: { 
      pathOffset: { duration: 2, repeat: Infinity, ease: "linear" },
      pathLength: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  } : {};

  const handleSaveClick = (e) => {
    e.stopPropagation();
    onSaveToggle?.();
  };

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="relative w-48 h-32 rounded-lg shadow-xl cursor-pointer transform-gpu group"
      style={{ 
        background: `linear-gradient(135deg, ${playerColor}, ${playerColor}dd)`,
        boxShadow: `0 0 20px ${playerColor}40`,
      }}
      layout
      initial={false}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Save button */}
      <motion.button
        className="absolute -right-2 -top-2 p-2 bg-gray-800/90 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleSaveClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={false}
      >
        {isSaved ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </motion.button>

      <div className="absolute inset-2 bg-gray-900/30 backdrop-blur-sm rounded-md overflow-hidden">
        {/* Decorative tape lines */}
        <div className="absolute inset-x-0 top-0 h-16 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-[1px]"
              style={{
                top: `${i * 4}px`,
                background: `${accentColor}20`,
                filter: 'blur(0.5px)'
              }}
              animate={isPlaying ? {
                x: [-10, 10],
                opacity: [0.1, 0.3, 0.1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Reels container */}
        <div className="absolute inset-x-0 top-2 flex justify-between px-6">
          {/* Left reel */}
          <motion.div 
            className="w-12 h-12 rounded-full relative"
            style={{ 
              background: `linear-gradient(45deg, ${accentColor}40, transparent)`,
              boxShadow: `inset 0 0 10px ${accentColor}60, 0 0 15px ${accentColor}30`
            }}
            {...leftReelAnimation}
          >
            {/* Outer ring */}
            <motion.div 
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: `${accentColor}90` }}
              animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Inner circle */}
            <div className="absolute inset-[20%] rounded-full bg-gray-900/50 
                          border-2 border-gray-900/30" />
            
            {/* Reel spokes */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute inset-0 w-[2px] h-full origin-center"
                style={{ 
                  background: `linear-gradient(${accentColor}90, transparent)`,
                  transform: `rotate(${i * 30}deg)`,
                  filter: 'blur(0.5px)'
                }}
                animate={isPlaying ? {
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}

            {/* Decorative dots */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: accentColor,
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 90}deg) translateY(-150%)`,
                }}
              />
            ))}
          </motion.div>
          
          {/* Tape visualization */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 48 20 Q 96 30, 144 20"
              stroke={`${accentColor}80`}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              filter="blur(0.5px)"
              {...tapeMovementAnimation}
            />
          </svg>

          {/* Right reel (mirror of left) */}
          <motion.div 
            className="w-12 h-12 rounded-full relative"
            style={{ 
              background: `linear-gradient(45deg, ${accentColor}40, transparent)`,
              boxShadow: `inset 0 0 10px ${accentColor}60, 0 0 15px ${accentColor}30`
            }}
            {...rightReelAnimation}
          >
            <motion.div 
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: `${accentColor}90` }}
              animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            <div className="absolute inset-[20%] rounded-full bg-gray-900/50 
                          border-2 border-gray-900/30" />
            
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute inset-0 w-[2px] h-full origin-center"
                style={{ 
                  background: `linear-gradient(${accentColor}90, transparent)`,
                  transform: `rotate(${i * 30}deg)`,
                  filter: 'blur(0.5px)'
                }}
                animate={isPlaying ? {
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}

            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: accentColor,
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 90}deg) translateY(-150%)`,
                }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Label */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 rounded-sm px-3 py-2 backdrop-blur-sm">
          <div className="text-gray-900 text-sm font-bold truncate">{label}</div>
          <div className="text-gray-600 text-xs truncate">{artist}</div>
        </div>
      </div>
    </motion.div>
  );
}
