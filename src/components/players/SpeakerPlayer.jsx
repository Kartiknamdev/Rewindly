import React from 'react';
import { motion } from 'framer-motion';

export function SpeakerPlayer({ cassette, playerColor, accentColor }) {
  return (
    <motion.div 
      className="relative w-64 h-96 rounded-3xl shadow-2xl"
      style={{
        background: `linear-gradient(45deg, ${playerColor}, ${accentColor})`
      }}
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

          {/* Volume and buttons */}
          <div className="flex items-center gap-4">
            <input
              type="range"
              className="flex-1"
              min="0"
              max="1"
              step="0.01"
            />
            <button className="p-2 rounded-full bg-purple-600/50 text-white hover:bg-purple-600/70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
