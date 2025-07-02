import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [animatingHeart, setAnimatingHeart] = useState(false);

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
      scale: [1,1.05, 1],
    },
    transition: { 
      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
      scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    }
  } : {};

  const rightReelAnimation = isPlaying ? {
    animate: { 
      rotate: 360,
      scale: [1, 1.05, 1],
    },
    transition: { 
      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
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
    setAnimatingHeart(true);
    onSaveToggle?.();
    setTimeout(() => setAnimatingHeart(false), 750);
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
      {/* Save button with enhanced animation */}
      <div className="absolute -right-2 -top-2 z-10">
        <motion.button
          className="relative p-2 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg"
          onClick={handleSaveClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={animatingHeart ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          } : {}}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
          }}
        >
          <AnimatePresence mode="wait">
            {isSaved ? (
              <motion.div
                key="filled"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="outline"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hover:text-red-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particle burst effect */}
          <AnimatePresence>
            {animatingHeart && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-red-500"
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [1, 0],
                      x: [0, Math.cos(i * 60 * (Math.PI / 180)) * 20],
                      y: [0, Math.sin(i * 60 * (Math.PI / 180)) * 20],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

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
            className="w-12 h-12 rounded-full relative flex items-center justify-center"
            style={{ 
              background: `radial-gradient(circle at 60% 40%, #e5e7eb 60%, #b0b3b8 90%, #444 100%)`,
              boxShadow: `inset 0 0 10px ${accentColor}60, 0 0 15px ${accentColor}30, 0 2px 8px #0002`
            }}
            animate={isPlaying ? { rotate: -360, scale: [1,1.05,1] } : {}}
            transition={isPlaying ? { rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 1, repeat: Infinity, ease: "easeInOut" } } : {}}
          >
            {/* Outer ring for separation */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-700/80" style={{boxShadow:'0 0 4px #0006'}} />
            {/* Metallic hub with gradient */}
            <div className="relative w-6 h-6 rounded-full border-2 border-gray-400 shadow-inner flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 60% 40%, #f3f4f6 60%, #b0b3b8 90%, #444 100%)',
                boxShadow: '0 1px 4px #0004, 0 -1px 2px #fff4 inset'
              }}
            >
              {/* Reel holes, smaller and closer to center */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gray-700 rounded-full shadow-md"
                  style={{
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 1px 2px #000a',
                    border: '1px solid #222',
                    background: 'radial-gradient(circle, #222 60%, #444 100%)',
                    transform: `translate(-50%, -50%) rotate(${i * 60 + (i%2===0?2:-2)}deg) translateY(-1.2em)`
                  }}
                />
              ))}
              {/* Center pin with metallic shine */}
              <div className="absolute w-2.5 h-2.5 bg-gradient-to-br from-gray-400 via-gray-200 to-gray-600 rounded-full border border-gray-700 shadow-inner" style={{left:'50%',top:'50%',transform:'translate(-50%,-50%)', boxShadow:'0 0 4px #fff8'}} />
            </div>
            {/* Subtle highlight and shadow for depth */}
            <div className="absolute left-2 top-2 w-5 h-2 rounded-full bg-white/30 blur-sm opacity-70" />
            <div className="absolute right-2 bottom-2 w-5 h-2 rounded-full bg-black/20 blur-sm opacity-60" />
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
            className="w-12 h-12 rounded-full relative flex items-center justify-center"
            style={{ 
              background: `radial-gradient(circle at 60% 40%, #e5e7eb 60%, #b0b3b8 90%, #444 100%)`,
              boxShadow: `inset 0 0 10px ${accentColor}60, 0 0 15px ${accentColor}30, 0 2px 8px #0002`
            }}
            animate={isPlaying ? { rotate: 360, scale: [1,1.05,1] } : {}}
            transition={isPlaying ? { rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 } } : {}}
          >
            <div className="absolute inset-0 rounded-full border-2 border-gray-700/80" style={{boxShadow:'0 0 4px #0006'}} />
            <div className="relative w-6 h-6 rounded-full border-2 border-gray-400 shadow-inner flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 60% 40%, #f3f4f6 60%, #b0b3b8 90%, #444 100%)',
                boxShadow: '0 1px 4px #0004, 0 -1px 2px #fff4 inset'
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gray-700 rounded-full shadow-md"
                  style={{
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 1px 2px #000a',
                    border: '1px solid #222',
                    background: 'radial-gradient(circle, #222 60%, #444 100%)',
                    transform: `translate(-50%, -50%) rotate(${i * 60 + (i%2===0?2:-2)}deg) translateY(-1.2em)`
                  }}
                />
              ))}
              <div className="absolute w-2.5 h-2.5 bg-gradient-to-br from-gray-400 via-gray-200 to-gray-600 rounded-full border border-gray-700 shadow-inner" style={{left:'50%',top:'50%',transform:'translate(-50%,-50%)', boxShadow:'0 0 4px #fff8'}} />
            </div>
            <div className="absolute left-2 top-2 w-5 h-2 rounded-full bg-white/30 blur-sm opacity-70" />
            <div className="absolute right-2 bottom-2 w-5 h-2 rounded-full bg-black/20 blur-sm opacity-60" />
          </motion.div>
        </div>
        
        {/* Label */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/80 rounded-sm px-3 py-1 backdrop-blur-sm">
          <div className="text-gray-900 text-sm font-bold truncate">{label}</div>
          <div className="text-gray-600 text-xs truncate">{artist}</div>
        </div>
      </div>
    </motion.div>
  );
}
