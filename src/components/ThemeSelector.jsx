import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  {
    id: 'cassette',
    name: 'Cassette Player',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v14m0-14l-8 7h16l-8-7z" />
      </svg>
    ),
    description: 'Classic cassette player with rotating reels'
  },
  {
    id: 'walkman',
    name: 'Walkman',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    description: 'Portable music player with headphones'
  },
  {
    id: 'radio',
    name: 'Retro Radio',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
      </svg>
    ),
    description: 'Classic radio with tuning dial'
  },
  {
    id: 'speaker',
    name: 'Modern Speaker',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3m0 0a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
    description: 'Modern bluetooth speaker with visualizer'
  }
];

export function ThemeSelector({ currentTheme, onThemeSelect }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="relative">
      {/* Current Theme - Always visible */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-purple-400">{currentThemeData.icon}</span>
          <span className="text-sm font-medium">{currentThemeData.name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-1/2 transform -translate-x-1/2 w-64 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => {
                  onThemeSelect(theme.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700/50 transition-colors
                  ${currentTheme === theme.id ? 'bg-purple-600/50' : ''}`}
                whileHover={{ x: 4 }}
              >
                <div className="text-purple-400">{theme.icon}</div>
                <div>
                  <div className="text-white font-medium">{theme.name}</div>
                  <div className="text-gray-400 text-xs">{theme.description}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
