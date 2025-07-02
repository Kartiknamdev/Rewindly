import React from 'react';
import { motion } from 'framer-motion';

export function WalkmanPlayer({
  cassette,
  playerColor,
  accentColor,
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrevious,
  volume = 0.5,
  onVolumeChange
}) {
  // Play/Pause icon
  const PlayPauseIcon = ({ playing }) => playing ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <polygon points="6,4 20,12 6,20" fill="currentColor" />
    </svg>
  );

  return (
    <motion.div 
      className="relative w-80 h-[420px] rounded-xl shadow-2xl"
      style={{
        background: `linear-gradient(45deg, ${playerColor}, ${accentColor})`,
        boxShadow: `0 20px 40px -10px ${playerColor}40`
      }}
    >
      {/* Main body with retro styling */}
      <div className="absolute inset-2 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/5">
        {/* Retro brand logo */}
        <motion.div 
          className="absolute top-0.5 right-2 text-xs font-bold tracking-widest"
          style={{ color: accentColor }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          WALKMAN
        </motion.div>

        {/* LCD Screen with improved styling */}
        <div className="bg-gray-900/60 rounded-lg p-3 mb-4 relative border border-white/10">
          {/* LCD segments effect */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                ${accentColor},
                ${accentColor} 1px,
                transparent 1px,
                transparent 3px
              )`
            }}
          />
          
          {/* Text with LCD-like effect */}
          <div 
            className="text-sm font-mono"
            style={{ color: accentColor }}
          >
            {cassette?.title || 'No Cassette'}
            <motion.span 
              className="ml-1"
              animate={{ opacity: cassette ? [1, 0] : 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ▶
            </motion.span>
          </div>
          <div className="text-gray-400 text-xs font-mono truncate mt-0.5">
            {cassette?.artist || 'Insert a cassette'}
          </div>
        </div>

        {/* Cassette window with mechanism */}
        <div className="bg-gray-900/40 rounded-lg h-32 mb-4 relative overflow-hidden backdrop-blur-sm border border-white/10">
          {/* Window texture */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                ${accentColor},
                ${accentColor} 1px,
                transparent 1px,
                transparent 4px
              )`
            }}
          />

          {cassette && (
            <div className="absolute inset-4 bg-gray-800/80 rounded flex items-center justify-center">
              {/* Left reel */}
              <motion.div 
                className="absolute left-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${accentColor}20, transparent)`,
                  border: `2px solid ${accentColor}40`,
                  boxShadow: `0 2px 8px ${accentColor}30` // subtle shadow
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {/* Reel outer ring */}
                <div className="absolute inset-2 rounded-full border-2 border-gray-700 bg-gray-900/60" />
                {/* Reel hub with holes */}
                <div className="relative w-7 h-7 rounded-full bg-gray-300/80 border-2 border-gray-400 shadow-inner flex items-center justify-center">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gray-700 rounded-full shadow"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-2.7ch)`
                      }}
                    />
                  ))}
                  {/* Center pin */}
                  <div className="absolute w-2 h-2 bg-gray-500 rounded-full border border-gray-700" style={{left:'50%',top:'50%',transform:'translate(-50%,-50%)'}} />
                </div>
                {/* Subtle highlight */}
                <div className="absolute left-2 top-2 w-6 h-2 rounded-full bg-white/20 blur-sm" />
              </motion.div>

              {/* Right reel */}
              <motion.div 
                className="absolute right-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${accentColor}20, transparent)`,
                  border: `2px solid ${accentColor}40`,
                  boxShadow: `0 2px 8px ${accentColor}30`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {/* Reel outer ring */}
                <div className="absolute inset-2 rounded-full border-2 border-gray-700 bg-gray-900/60" />
                {/* Reel hub with holes */}
                <div className="relative w-7 h-7 rounded-full bg-gray-300/80 border-2 border-gray-400 shadow-inner flex items-center justify-center">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gray-700 rounded-full shadow"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-2.7ch)`
                      }}
                    />
                  ))}
                  {/* Center pin */}
                  <div className="absolute w-2 h-2 bg-gray-500 rounded-full border border-gray-700" style={{left:'50%',top:'50%',transform:'translate(-50%,-50%)'}} />
                </div>
                {/* Subtle highlight */}
                <div className="absolute left-2 top-2 w-6 h-2 rounded-full bg-white/20 blur-sm" />
              </motion.div>

              {/* Tape running animation */}
              <motion.div 
                className="absolute top-1/2 left-12 right-12 h-1 -translate-y-1/2"
                style={{ background: `${accentColor}40` }}
                animate={cassette ? {
                  opacity: [0.2, 0.4, 0.2],
                  scaleY: [1, 1.5, 1]
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}
        </div>

        {/* Controls with retro styling */}
        <div className="grid grid-cols-3 gap-4">
          {/* Previous button */}
          <motion.button 
            className="bg-gray-900/40 rounded-full p-3 text-white relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: `1px solid ${accentColor}20`,
              boxShadow: `0 2px 8px ${playerColor}40`
            }}
            onClick={onPrevious}
            aria-label="Previous"
          >
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{ background: [
                `linear-gradient(45deg, ${accentColor}00, ${accentColor}40)`,
                `linear-gradient(45deg, ${accentColor}40, ${accentColor}00)`
              ]}}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Play/Pause button */}
          <motion.button 
            className="bg-gray-900/40 rounded-full p-3 text-white relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: `1px solid ${accentColor}20`,
              boxShadow: `0 2px 8px ${playerColor}40`
            }}
            onClick={onPlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <motion.div 
              className="absolute inset-0"
              style={{
                background: cassette 
                  ? `radial-gradient(circle at center, ${accentColor}40, transparent)`
                  : 'transparent'
              }}
              animate={cassette ? { opacity: [0.5, 0.8, 0.5] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <PlayPauseIcon playing={isPlaying} />
          </motion.button>

          {/* Next button */}
          <motion.button 
            className="bg-gray-900/40 rounded-full p-3 text-white relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: `1px solid ${accentColor}20`,
              boxShadow: `0 2px 8px ${playerColor}40`
            }}
            onClick={onNext}
            aria-label="Next"
          >
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{ background: [
                `linear-gradient(-45deg, ${accentColor}00, ${accentColor}40)`,
                `linear-gradient(-45deg, ${accentColor}40, ${accentColor}00)`
              ]}}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Volume slider with custom styling */}
        <div className="mt-4 relative">
          <div className="relative">
            <input
              type="range"
              className="w-full h-1.5 rounded-full appearance-none bg-gray-900/40"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}80, ${accentColor}20)`,
                cursor: 'pointer'
              }}
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={e => onVolumeChange?.(parseFloat(e.target.value))}
              aria-label="Volume"
            />
            {/* Volume slider glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: `0 0 10px ${accentColor}40` }}
              animate={cassette ? { opacity: [0.3, 0.6, 0.3] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Headphones connection */}
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
          <div className="w-3 h-20 bg-gray-900 rounded-r-full relative overflow-hidden">
            {/* Metallic texture */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(
                  to bottom,
                  transparent,
                  ${accentColor}40,
                  transparent
                )`
              }}
            />
            {/* Jack connector */}
            <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-gray-600 transform -translate-y-1/2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
