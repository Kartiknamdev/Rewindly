import React from 'react';
import { motion } from 'framer-motion';

export function RadioPlayer({ cassette, playerColor, accentColor }) {
  return (
    <motion.div 
      className="relative w-96 h-64 rounded-xl shadow-2xl"
      style={{
        background: `linear-gradient(45deg, ${playerColor}, ${accentColor})`
      }}
    >
      {/* Main body */}
      <div className="absolute inset-2 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
        {/* Top panel */}
        <div className="flex gap-4 mb-4">
          {/* Frequency display */}
          <div className="flex-1 bg-gray-900/60 rounded-lg p-3">
            <div className="text-purple-400 font-mono text-lg">{cassette ? '98.7 FM' : '87.5 FM'}</div>
            <div className="text-gray-400 text-xs truncate mt-1">{cassette?.title || 'Tuning...'}</div>
          </div>
          
          {/* Speaker */}
          <div className="w-16 h-16 rounded-full bg-gray-900/40 flex items-center justify-center">
            <motion.div 
              className="w-12 h-12 rounded-full bg-gray-800"
              animate={cassette ? {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Tuning slider */}
        <div className="bg-gray-900/40 rounded-lg p-4 mb-4">
          <div className="relative">
            <div className="absolute left-0 right-0 h-1 bg-gray-700" />
            <motion.div
              className="w-4 h-8 bg-purple-500 rounded absolute top-1/2 transform -translate-y-1/2"
              style={{ left: cassette ? '70%' : '10%' }}
              animate={cassette ? {} : {
                x: [0, 100, 200, 300, 0],
                transition: { duration: 3, repeat: Infinity }
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          {/* Volume knob */}
          <div className="w-12 h-12 rounded-full bg-gray-900/40 flex items-center justify-center">
            <div className="w-2 h-8 bg-white rounded-full transform -rotate-45" />
          </div>

          {/* Preset buttons */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                className={`w-8 h-8 rounded-lg ${cassette ? 'bg-purple-600/50' : 'bg-gray-900/40'} 
                  text-white text-sm font-medium hover:bg-purple-600/70`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Power button */}
          <div className="w-12 h-12 rounded-full bg-gray-900/40 flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full ${cassette ? 'bg-purple-500' : 'bg-gray-600'}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
