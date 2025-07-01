import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Predefined color themes
const colorThemes = [
  { name: 'Classic Purple', player: '#6366f1', accent: '#ffffff' },
  { name: 'Midnight Blue', player: '#1e3a8a', accent: '#60a5fa' },
  { name: 'Forest Green', player: '#064e3b', accent: '#34d399' },
  { name: 'Dark Rose', player: '#9f1239', accent: '#fb7185' },
  { name: 'Ocean', player: '#0c4a6e', accent: '#38bdf8' },
  { name: 'Sunset', player: '#7c2d12', accent: '#fb923c' },
  { name: 'Neon', player: '#4c1d95', accent: '#a78bfa' }
];

export function ColorPicker({ playerColor, accentColor, onPlayerColorChange, onAccentColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [customMode, setCustomMode] = useState(false);

  const applyTheme = (theme) => {
    onPlayerColorChange(theme.player);
    onAccentColorChange(theme.accent);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {/* Color Theme Toggle Button */}
      <motion.button
        className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full 
                   text-white hover:bg-gray-700/80 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHoveredButton('color')}
        onMouseLeave={() => setHoveredButton(null)}
        style={{
          background: `linear-gradient(135deg, ${playerColor}, ${accentColor})`
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </motion.button>

      {/* Button Tooltip */}
      <AnimatePresence>
        {hoveredButton === 'color' && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
          >
            Change Colors
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Theme Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-full right-0 mb-2 w-48 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {/* Predefined Themes */}
              {!customMode && colorThemes.map((theme) => (
                <motion.button
                  key={theme.name}
                  onClick={() => applyTheme(theme)}
                  className="w-full flex items-center gap-3 p-2 text-left text-white hover:bg-gray-700/50 rounded-md transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${theme.player}, ${theme.accent})`
                    }}
                  />
                  <span className="text-sm">{theme.name}</span>
                </motion.button>
              ))}

              {/* Custom Color Mode */}
              {customMode && (
                <div className="space-y-3 p-2">
                  <div className="space-y-2">
                    <label className="text-white text-sm block">Player Color</label>
                    <input 
                      type="color" 
                      value={playerColor}
                      onChange={(e) => onPlayerColorChange(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm block">Accent Color</label>
                    <input 
                      type="color" 
                      value={accentColor}
                      onChange={(e) => onAccentColorChange(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Toggle Custom Mode Button */}
              <motion.button
                onClick={() => setCustomMode(!customMode)}
                className="w-full flex items-center justify-center gap-2 p-2 mt-1 text-white text-sm hover:bg-gray-700/50 rounded-md transition-colors border-t border-white/10"
                whileHover={{ y: -2 }}
              >
                {customMode ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Themes
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Custom Colors
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
