import React from 'react';
import { motion } from 'framer-motion';

export function SpeakerPlayer({ cassette, playerColor, accentColor, isPlaying = false, onPlayPause, volume = 0.5, onVolumeChange }) {
  // Play/Pause icon
  const PlayPauseIcon = ({ playing }) => playing ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <polygon points="6,4 20,12 6,20" fill="currentColor" />
    </svg>
  );
  const knobAngle = volume * 270 - 135;
  return (
    <motion.div 
      className="relative w-64 h-96 rounded-3xl shadow-2xl"
      style={{ background: `linear-gradient(45deg, ${playerColor}, ${accentColor})` }}
    >
      {/* Main body */}
      <div className="absolute inset-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4">
        {/* Top display */}
        <div className="bg-gray-900/60 rounded-xl p-3 mb-4">
          <div className="text-white text-sm truncate">{cassette?.title || 'No Track'}</div>
          <div className="text-gray-400 text-xs truncate">{cassette?.artist || 'Connect device'}</div>
        </div>

        {/* Main speaker */}
        <div className="relative aspect-square mb-4">
          {/* Animated glowing ring */}
          <motion.div
            className="absolute inset-[-12px] rounded-full pointer-events-none"
            style={{
              boxShadow: `0 0 40px 10px ${accentColor}55, 0 0 80px 30px ${playerColor}33`,
              zIndex: 1
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.04, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full bg-gray-900/40"
            animate={cassette ? {
              scale: [1, 1.02, 1],
              opacity: [0.5, 0.7, 0.5]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-8 rounded-full bg-gray-800/60"
            animate={cassette ? {
              scale: [1, 1.05, 1],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
          />
          <motion.div 
            className="absolute inset-16 rounded-full bg-gray-700/70"
            animate={cassette ? {
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          {/* Play/Pause button in center with glow */}
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-3 shadow-lg z-10"
            style={{
              outline: 'none',
              border: 'none',
              boxShadow: `0 0 16px 4px ${accentColor}99, 0 2px 8px ${playerColor}55`
            }}
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <PlayPauseIcon playing={isPlaying} />
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Visualizer */}
          <div className="h-8 bg-gray-900/40 rounded-lg overflow-hidden">
            <div className="flex h-full items-end justify-between px-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-purple-500"
                  initial={{ height: '20%' }}
                  animate={cassette ? {
                    height: ['20%', '80%', '40%', '90%', '20%']
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Volume knob at bottom right with lighting */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-[-8px] rounded-full pointer-events-none"
            style={{
              boxShadow: `0 0 24px 8px ${accentColor}55, 0 0 40px 16px ${playerColor}33`
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 rounded-full bg-gray-900/70 border-2 border-gray-700 shadow-inner" />
          {/* Inner glossy highlight */}
          <div className="absolute left-1/2 top-1/2 w-8 h-4 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 60% 30%, #fff8 60%, transparent 100%)`,
              transform: 'translate(-50%, -80%)',
              opacity: 0.18
            }}
          />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-900" />
          {/* Knob indicator */}
          <div
            className="absolute left-1/2 top-1/2 w-2 h-5 bg-white rounded"
            style={{
              transform: `translate(-50%, -90%) rotate(${knobAngle}deg)`,
              transformOrigin: '50% 80%',
              boxShadow: `0 0 8px 2px ${accentColor}88`
            }}
          />
          {/* Range input (functional) */}
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
        </div>
      </div>
    </motion.div>
  );
}
