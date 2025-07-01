import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Predefined color themes
const colorThemes = [
  // Classic & Basic Themes
  { name: 'Classic Purple', player: '#6366f1', accent: '#ffffff' },
  { name: 'Midnight Blue', player: '#1e3a8a', accent: '#60a5fa' },
  { name: 'Forest Green', player: '#064e3b', accent: '#34d399' },
  { name: 'Dark Rose', player: '#9f1239', accent: '#fb7185' },
  { name: 'Ocean', player: '#0c4a6e', accent: '#38bdf8' },
  
  // Warm & Cozy
  { name: 'Sunset', player: '#7c2d12', accent: '#fb923c' },
  { name: 'Autumn', player: '#92400e', accent: '#f97316' },
  { name: 'Coffee', player: '#3f2917', accent: '#a16207' },
  { name: 'Golden Hour', player: '#92400e', accent: '#fde68a' },
  { name: 'Desert Sand', player: '#78350f', accent: '#fcd34d' },
  
  // Cool & Vibrant
  { name: 'Neon', player: '#4c1d95', accent: '#a78bfa' },
  { name: 'Electric', player: '#312e81', accent: '#4ade80' },
  { name: 'Ice Blue', player: '#0c4a6e', accent: '#7dd3fc' },
  { name: 'Northern Lights', player: '#064e3b', accent: '#67e8f9' },
  { name: 'Deep Ocean', player: '#1e3a8a', accent: '#38bdf8' },
  
  // Retro & Vintage
  { name: 'Retro Gold', player: '#854d0e', accent: '#fbbf24' },
  { name: 'Vapor Wave', player: '#86198f', accent: '#22d3ee' },
  { name: 'Vinyl', player: '#1f2937', accent: '#9ca3af' },
  { name: 'Sepia', player: '#78350f', accent: '#d6d3d1' },
  { name: 'Old Radio', player: '#44403c', accent: '#a8a29e' },
  
  // Nature Inspired
  { name: 'Forest Mist', player: '#064e3b', accent: '#6ee7b7' },
  { name: 'Mountain Dawn', player: '#374151', accent: '#93c5fd' },
  { name: 'Spring Bloom', player: '#065f46', accent: '#fcd34d' },
  { name: 'Ocean Breeze', player: '#0e7490', accent: '#67e8f9' },
  { name: 'Twilight', player: '#312e81', accent: '#818cf8' },
  
  // Modern & Sleek
  { name: 'Matrix', player: '#064e3b', accent: '#4ade80' },
  { name: 'Cyberpunk', player: '#581c87', accent: '#fbbf24' },
  { name: 'Minimal', player: '#18181b', accent: '#e4e4e7' },
  { name: 'Tech Blue', player: '#1e40af', accent: '#3b82f6' },
  { name: 'Dark Mode', player: '#18181b', accent: '#6b7280' },
  
  // Soft & Pastel
  { name: 'Cherry Blossom', player: '#831843', accent: '#f9a8d4' },
  { name: 'Lavender', player: '#5b21b6', accent: '#ddd6fe' },
  { name: 'Mint', player: '#065f46', accent: '#a7f3d0' },
  { name: 'Peach', player: '#9a3412', accent: '#fed7aa' },
  { name: 'Baby Blue', player: '#1e40af', accent: '#bfdbfe' },
  
  // Dark & Mysterious
  { name: 'Blood Moon', player: '#7f1d1d', accent: '#fca5a5' },
  { name: 'Deep Space', player: '#020617', accent: '#818cf8' },
  { name: 'Dark Forest', player: '#052e16', accent: '#4ade80' },
  { name: 'Midnight', player: '#020617', accent: '#6366f1' },
  { name: 'Shadow', player: '#18181b', accent: '#52525b' },
  
  // Metallic
  { name: 'Rose Gold', player: '#9f1239', accent: '#fda4af' },
  { name: 'Silver', player: '#334155', accent: '#cbd5e1' },
  { name: 'Bronze', player: '#783f04', accent: '#fbbf24' },
  { name: 'Chrome', player: '#1f2937', accent: '#e5e7eb' },
  { name: 'Platinum', player: '#0f172a', accent: '#94a3b8' }
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
            className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
          >
            {/* Content Container */}
            <div className="flex flex-col">
              {/* Themes List */}
              <div className={`${customMode ? 'hidden' : ''}`}>
                <div className="p-2 space-y-1 overflow-y-auto custom-scrollbar max-h-[40vh]">
                  {colorThemes.map((theme) => (
                    <motion.button
                      key={theme.name}
                      onClick={() => applyTheme(theme)}
                      className="w-full flex items-center gap-2 py-1.5 px-2 text-left text-white hover:bg-gray-700/50 rounded-md transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${theme.player}, ${theme.accent})`
                        }}
                      />
                      <span className="text-xs truncate">{theme.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div className={`${!customMode ? 'hidden' : ''}`}>
                <div className="p-3 space-y-3">
                  {/* Player Color */}
                  <div>
                    <label className="text-white text-xs mb-1 block">Player Color</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={playerColor}
                        onChange={(e) => onPlayerColorChange(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={playerColor}
                        onChange={(e) => onPlayerColorChange(e.target.value)}
                        className="flex-1 bg-gray-700/50 text-white text-xs px-2 py-1 rounded"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="text-white text-xs mb-1 block">Accent Color</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={accentColor}
                        onChange={(e) => onAccentColorChange(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={accentColor}
                        onChange={(e) => onAccentColorChange(e.target.value)}
                        className="flex-1 bg-gray-700/50 text-white text-xs px-2 py-1 rounded"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div 
                    className="h-12 rounded-md"
                    style={{
                      background: `linear-gradient(135deg, ${playerColor}, ${accentColor})`
                    }}
                  />
                </div>
              </div>

              {/* Toggle Button */}
              <motion.button
                onClick={() => setCustomMode(!customMode)}
                className="w-full flex items-center justify-center gap-2 py-2 text-white text-xs hover:bg-gray-700/50 transition-colors border-t border-white/10"
                whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
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
