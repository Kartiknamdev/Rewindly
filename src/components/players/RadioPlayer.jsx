import React from 'react';
import { motion } from 'framer-motion';

export function RadioPlayer({ cassette, playerColor, accentColor, isPlaying = false, onPlayPause, volume = 0.5, onVolumeChange }) {
  // Play/Pause icon
  const PlayPauseIcon = ({ playing }) => playing ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <polygon points="6,4 20,12 6,20" fill="currentColor" />
    </svg>
  );

  // Volume knob angle
  const knobAngle = volume * 270 - 135;

  return (
    <motion.div 
      className="relative w-96 h-64 rounded-xl shadow-2xl"
      style={{
        background: `linear-gradient(45deg, ${playerColor}, ${accentColor})`,
        boxShadow: `0 20px 40px -10px ${playerColor}40`
      }}
    >
      {/* Wood-grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 rounded-xl"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${playerColor}10,
            ${playerColor}10 2px,
            transparent 2px,
            transparent 4px
          )`
        }}
      />

      {/* Main body with vintage styling */}
      <div className="absolute inset-2 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/5">
        {/* Top panel with improved layout */}
        <div className="flex gap-4 mb-4">
          {/* Enhanced frequency display */}
          <div className="flex-1 bg-gray-900/60 rounded-lg p-3 relative overflow-hidden">
            {/* Frequency scale background */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-white"
                  style={{ left: `${i * 5}%` }}
                />
              ))}
            </div>
            
            <div className="relative">
              <div className="text-purple-400 font-mono text-lg tracking-wider">
                {cassette ? '98.7 FM' : '87.5 FM'}
              </div>
              <div className="text-gray-400 text-xs truncate mt-1 font-mono">
                {cassette?.title || 'Tuning...'}
              </div>
            </div>

            {/* Frequency indicator light */}
            <motion.div 
              className="absolute right-2 top-2 w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
              animate={cassette ? {
                opacity: [1, 0.4, 1]
              } : {
                opacity: 0.2
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Enhanced speaker grill */}
          <div className="w-16 h-16 rounded-full bg-gray-900/40 relative overflow-hidden">
            {/* Speaker cone effect */}
            <motion.div 
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle at 40% 40%, 
                  ${accentColor}20, 
                  ${playerColor}90
                )`,
                border: `1px solid ${accentColor}30`
              }}
              animate={cassette ? {
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Speaker grill pattern */}
            <div className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: `radial-gradient(${accentColor}50 1px, transparent 1px)`,
                backgroundSize: '4px 4px'
              }}
            />
          </div>
        </div>

        {/* Enhanced tuning slider */}
        <div className="bg-gray-900/40 rounded-lg p-4 mb-4 relative">
          {/* Frequency markers */}
          <div className="absolute inset-x-4 top-2 flex justify-between">
            {['87.5', '92.0', '96.5', '101.0', '105.5'].map((freq) => (
              <span key={freq} className="text-xs text-gray-400 font-mono">{freq}</span>
            ))}
          </div>

          <div className="relative mt-4">
            {/* Tuning bar with gradient */}
            <div 
              className="absolute left-0 right-0 h-1"
              style={{
                background: `linear-gradient(to right, ${playerColor}60, ${accentColor}60, ${playerColor}60)`
              }}
            />

            {/* Tuning indicator */}
            <motion.div
              className="absolute w-4 h-8 rounded"
              style={{
                background: `linear-gradient(to bottom, ${accentColor}, ${playerColor})`,
                boxShadow: `0 0 10px ${accentColor}60`,
                top: '50%',
                transform: 'translateY(-50%)',
                left: cassette ? '70%' : '10%'
}}
              animate={cassette ? {} : {
                x: [0, 100, 200, 300, 0],
                transition: { 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </div>
        </div>

        {/* Controls with vintage styling */}
        <div className="flex justify-between items-center">
          {/* Volume knob with metallic effect */}
          <motion.div 
            className="w-12 h-12 rounded-full relative cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${accentColor}40, ${playerColor}90)`,
              boxShadow: `0 2px 4px ${playerColor}40`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Knob indicator */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  from -45deg,
                  ${accentColor}20,
                  ${accentColor}60,
                  ${accentColor}20
                )`
              }}
            />
            <div 
              className="absolute left-1/2 top-0 w-0.5 h-2 bg-white/80"
              style={{
                transform: `translateX(-50%) rotate(${knobAngle}deg)`,
                transformOrigin: '50% 80%'
              }}
            />
            {/* Hidden range input for volume */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={e => onVolumeChange?.(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Volume"
            />
          </motion.div>

          {/* Play/Pause button */}
          <motion.button
            className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-900/60 border border-white/10 shadow-lg mx-2"
            style={{ color: accentColor }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <PlayPauseIcon playing={isPlaying} />
          </motion.button>

          {/* Preset buttons with improved styling */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(num => (
              <motion.button
                key={num}
                className={`w-8 h-8 rounded-lg relative overflow-hidden`}
                style={{
                  background: cassette && num === 1 
                    ? `linear-gradient(135deg, ${accentColor}80, ${playerColor}80)`
                    : 'rgba(17, 24, 39, 0.4)',
                  boxShadow: cassette && num === 1 
                    ? `0 0 10px ${accentColor}40` 
                    : 'none'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-white text-sm font-medium">
                  {num}
                </span>
                {/* Button highlight effect */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={cassette && num === 1 ? {
                    opacity: [0.2, 0.4, 0.2]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                  style={{
                    background: `linear-gradient(135deg, transparent, ${accentColor}50)`
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Power button */}
          <motion.div 
            className="w-12 h-12 rounded-full bg-gray-900/40 relative"
            style={{
              border: `1px solid ${accentColor}30`
            }}
          >
            <motion.div 
              className={`absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full`}
              style={{
                backgroundColor: cassette ? accentColor : '#4b5563',
                boxShadow: cassette 
                  ? `0 0 10px ${accentColor}60` 
                  : 'none'
              }}
              animate={cassette ? {
                opacity: [1, 0.7, 1]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
