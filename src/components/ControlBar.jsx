import React from 'react';
import { motion } from 'framer-motion';

export function ControlBar({ 
  displayMode, 
  onModeToggle, 
  playerColor, 
  onPlayerColorChange,
  accentColor, 
  onAccentColorChange,
  currentTrack
}) {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md p-4 flex items-center justify-between gap-4 z-50"
    >
      {/* Left Section - Mode Controls */}
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          onClick={onModeToggle}
        >
          {displayMode === '3d' ? '2D Mode' : '3D Mode'}
        </motion.button>
      </div>

      {/* Center Section - Current Track Info */}
      <div className="flex-1 flex justify-center">
        {currentTrack && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-white font-bold">{currentTrack.title}</div>
            <div className="text-gray-400 text-sm">{currentTrack.artist}</div>
          </motion.div>
        )}
      </div>

      {/* Right Section - Color Controls */}
      {displayMode === 'css' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Player</label>
            <input 
              type="color" 
              value={playerColor}
              onChange={onPlayerColorChange}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Accent</label>
            <input 
              type="color" 
              value={accentColor}
              onChange={onAccentColorChange}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
