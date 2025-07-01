import React from 'react';
import { motion } from 'framer-motion';

export function WalkmanPlayer({ cassette, playerColor, accentColor }) {
  return (
    <motion.div 
      className="relative w-80 h-[420px] rounded-xl shadow-2xl"
      style={{
        background: `linear-gradient(45deg, ${playerColor}, ${accentColor})`
      }}
    >
      {/* Main body */}
      <div className="absolute inset-2 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
        {/* Screen */}
        <div className="bg-gray-900/60 rounded-lg p-3 mb-4">
          <div className="text-white text-sm truncate">{cassette?.title || 'No Cassette'}</div>
          <div className="text-gray-400 text-xs truncate">{cassette?.artist || 'Insert a cassette'}</div>
        </div>

        {/* Cassette window */}
        <div className="bg-gray-900/40 rounded-lg h-32 mb-4 relative">
          {cassette && (
            <div className="absolute inset-4 bg-gray-800 rounded flex items-center justify-center">
              <motion.div 
                className="w-16 h-16 border-4 rounded-full"
                style={{ borderColor: accentColor }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-gray-900/40 rounded-full p-3 text-white hover:bg-gray-900/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button className="bg-gray-900/40 rounded-full p-3 text-white hover:bg-gray-900/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </button>
          <button className="bg-gray-900/40 rounded-full p-3 text-white hover:bg-gray-900/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Volume slider */}
        <div className="mt-4">
          <input
            type="range"
            className="w-full"
            min="0"
            max="1"
            step="0.01"
          />
        </div>

        {/* Headphones */}
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
          <div className="w-3 h-20 bg-gray-900 rounded-r-full" />
        </div>
      </div>
    </motion.div>
  );
}
