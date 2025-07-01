import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  {
    id: 'cassette',
    name: 'Cassette',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v14m0-14l-8 7h16l-8-7z" />
      </svg>
    )
  },
  {
    id: 'walkman',
    name: 'Walkman',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    )
  },
  {
    id: 'radio',
    name: 'Radio',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
      </svg>
    )
  },
  {
    id: 'speaker',
    name: 'Speaker',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3m0 0a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    )
  }
];

export function ThemeSelector({ currentTheme, onThemeSelect }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredButton, setHoveredButton] = React.useState(null);
  const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full 
                   text-white hover:bg-gray-700/80 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHoveredButton('theme')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <span className="text-white/80">{currentThemeData.icon}</span>
      </motion.button>

      {/* Button Tooltip */}
      <AnimatePresence>
        {hoveredButton === 'theme' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute mt-2 bg-gray-800/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            Change Theme
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute mt-2 w-40 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden z-50"
            style={{
              top: '100%',
              right: '0'
            }}
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => {
                  onThemeSelect(theme.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-2.5 text-left text-white hover:bg-gray-700/50 transition-colors
                  ${currentTheme === theme.id ? 'bg-purple-600/50' : ''}`}
                whileHover={{ x: 4 }}
              >
                <span className="text-white/80">{theme.icon}</span>
                <span className="text-sm">{theme.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
