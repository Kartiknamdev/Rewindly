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
  { name: 'Neon', player: '#4c1d95', accent: '#a78bfa' },
  { name: 'Retro Gold', player: '#854d0e', accent: '#fbbf24' },
  { name: 'Vapor Wave', player: '#86198f', accent: '#22d3ee' },
  { name: 'Matrix', player: '#064e3b', accent: '#4ade80' },
  { name: 'Cherry Blossom', player: '#831843', accent: '#f9a8d4' },
  { name: 'Arctic', player: '#1e293b', accent: '#e2e8f0' },
  { name: 'Cyberpunk', player: '#581c87', accent: '#fbbf24' },
  { name: 'Blood Moon', player: '#7f1d1d', accent: '#fca5a5' },
  { name: 'Deep Space', player: '#020617', accent: '#818cf8' },
  // new vivid themes below ---
  { name: 'Lime Pop', player: '#65a30d', accent: '#d9f99d' },
  { name: 'Bubblegum', player: '#f472b6', accent: '#f9a8d4' },
  { name: 'Aqua Dream', player: '#06b6d4', accent: '#a7f3d0' },
  { name: 'Citrus Punch', player: '#f59e42', accent: '#fef08a' },
  { name: 'Royal Velvet', player: '#312e81', accent: '#a5b4fc' },
  { name: 'Emerald Isle', player: '#059669', accent: '#6ee7b7' },
  { name: 'Pink Lemonade', player: '#f43f5e', accent: '#fde68a' },
  { name: 'Skyline', player: '#0ea5e9', accent: '#f472b6' },
  { name: 'Tangerine', player: '#ea580c', accent: '#fdba74' },
  { name: 'Minty Fresh', player: '#2dd4bf', accent: '#bbf7d0' },
  { name: 'Golden Hour', player: '#fbbf24', accent: '#fef3c7' },
  { name: 'Lavender Fields', player: '#a78bfa', accent: '#f3e8ff' },
  { name: 'Peachy Keen', player: '#fb7185', accent: '#fcd34d' },
  { name: 'Blueberry', player: '#2563eb', accent: '#a5b4fc' },
  { name: 'Dragonfruit', player: '#be185d', accent: '#f472b6' },
  { name: 'Cobalt', player: '#1e40af', accent: '#60a5fa' },
  { name: 'Lava Lamp', player: '#f43f5e', accent: '#fbbf24' },
  { name: 'Frostbite', player: '#0ea5e9', accent: '#e0e7ff' },
  { name: 'Jade', player: '#10b981', accent: '#d1fae5' },
  { name: 'Coral Reef', player: '#fb7185', accent: '#fca5a5' },
  { name: 'Sunrise', player: '#f59e42', accent: '#fbbf24' },
  { name: 'Plum', player: '#6d28d9', accent: '#f472b6' },
  { name: 'Candy Apple', player: '#dc2626', accent: '#fca5a5' },
  { name: 'Turquoise', player: '#14b8a6', accent: '#99f6e4' },
  { name: 'Lemonade', player: '#fde047', accent: '#fbbf24' },
  { name: 'Rose Quartz', player: '#f472b6', accent: '#fbcfe8' },
  { name: 'Sapphire', player: '#2563eb', accent: '#a5b4fc' },
  { name: 'Mango Tango', player: '#f59e42', accent: '#fbbf24' },
  { name: 'Electric Blue', player: '#0ea5e9', accent: '#818cf8' },
  { name: 'Grape Soda', player: '#7c3aed', accent: '#a78bfa' },
  { name: 'Papaya', player: '#fbbf24', accent: '#fca5a5' },
  { name: 'Mint Mojito', player: '#34d399', accent: '#a7f3d0' },
  { name: 'Firefly', player: '#f59e42', accent: '#fef08a' },
  { name: 'Blue Lagoon', player: '#2563eb', accent: '#38bdf8' },
  { name: 'Pink Sky', player: '#f472b6', accent: '#f9a8d4' },
  { name: 'Cranberry', player: '#be185d', accent: '#fca5a5' },
  { name: 'Cactus', player: '#166534', accent: '#bbf7d0' },
  { name: 'Orchid', player: '#a21caf', accent: '#f472b6' },
  { name: 'Sunburst', player: '#fbbf24', accent: '#f59e42' },
  { name: 'Lagoon', player: '#06b6d4', accent: '#a7f3d0' },
  { name: 'Berry Smoothie', player: '#a21caf', accent: '#f472b6' },
  { name: 'Cocoa', player: '#7c2d12', accent: '#fbbf24' },
  { name: 'Fuchsia', player: '#d946ef', accent: '#f9a8d4' },
  { name: 'Cyan Dream', player: '#22d3ee', accent: '#818cf8' },
  { name: 'Limeade', player: '#84cc16', accent: '#fef08a' },
  { name: 'Twilight', player: '#312e81', accent: '#818cf8' },
  { name: 'Bubble Blue', player: '#38bdf8', accent: '#a5b4fc' },
  { name: 'Peach Fuzz', player: '#fb923c', accent: '#fcd34d' },
  { name: 'Citrus Zest', player: '#fbbf24', accent: '#f59e42' },
  { name: 'Lollipop', player: '#f472b6', accent: '#a78bfa' },
  { name: 'Seafoam', player: '#2dd4bf', accent: '#a7f3d0' },
  { name: 'Royal Pink', player: '#be185d', accent: '#f472b6' },
  { name: 'Lime Splash', player: '#a3e635', accent: '#fef08a' },
  { name: 'Cobalt Mint', player: '#2563eb', accent: '#34d399' }
];

export function ColorPicker({ playerColor, accentColor, onPlayerColorChange, onAccentColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [customMode, setCustomMode] = useState(false);

  // Find the current theme name
  const currentTheme = colorThemes.find(
    t => t.player.toLowerCase() === playerColor.toLowerCase() && t.accent.toLowerCase() === accentColor.toLowerCase()
  );
  const currentThemeName = currentTheme ? currentTheme.name : 'Custom';

  const applyTheme = (theme) => {
    onPlayerColorChange(theme.player);
    onAccentColorChange(theme.accent);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <div className="flex items-center gap-2 group relative">
        {/* Current Theme Name (only on hover) */}
        <span
          className="text-xs text-white bg-gray-800/70 px-2 py-1 rounded font-medium max-w-[7.5rem] truncate select-none absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          title={currentThemeName}
        >
          {currentThemeName}
        </span>
        {/* Color Theme Toggle Button */}
        <motion.button
          className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-gray-700/80 relative"
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
      </div>

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
