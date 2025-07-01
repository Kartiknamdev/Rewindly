import React, { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scene } from './components/Scene'
import { CassetteShelf } from './components/CassetteShelfNew'
import { SearchBar } from './components/SearchBar'
import { AudioPlayer } from './components/AudioPlayer'
import { ControlBar } from './components/ControlBar'

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(null)

  if (hasError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-gray-400">{error?.message}</p>
        </div>
      </div>
    )
  }

  return children
}

function App() {
  const [cassettes, setCassettes] = useState([])
  const [displayMode, setDisplayMode] = useState('css')
  const [playerColor, setPlayerColor] = useState('#333')
  const [accentColor, setAccentColor] = useState('#666')
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleTrackSelect = (track) => {
    setCassettes(prev => {
      if (prev.length >= 6) {
        return [...prev.slice(1), track]
      }
      return [...prev, track]
    })
    setIsSearchOpen(false)
  }

  const handleCassetteClick = (cassette) => {
    setCurrentTrack(cassette)
  }

  return (
    <ErrorBoundary>
      <motion.div 
        className="relative h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={
          <motion.div 
            className="flex h-screen w-full items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-white text-2xl font-bold">Loading...</div>
          </motion.div>
        }>
          {/* Main Scene */}
          <Scene 
            mode={displayMode} 
            playerColor={playerColor} 
            cassetteColor={accentColor}
            currentTrack={currentTrack}
          />

          {/* Search Button */}
          <motion.button
            className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
          >
            <span role="img" aria-label="search">🔍</span>
            Search Music
          </motion.button>

          {/* Search Modal */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-20 left-1/2 transform -translate-x-1/2 w-96 z-50 bg-gray-800 rounded-lg shadow-xl p-4"
              >
                <SearchBar onTrackSelect={handleTrackSelect} />
                <motion.button
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchOpen(false)}
                >
                  ×
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cassette Shelf */}
          <CassetteShelf 
            cassettes={cassettes} 
            onCassetteClick={handleCassetteClick}
            currentTrack={currentTrack}
          />

          {/* Audio Player */}
          <AudioPlayer track={currentTrack} />

          {/* Control Bar */}
          <ControlBar
            displayMode={displayMode}
            onModeToggle={() => setDisplayMode(mode => mode === '3d' ? 'css' : '3d')}
            playerColor={playerColor}
            onPlayerColorChange={(e) => setPlayerColor(e.target.value)}
            accentColor={accentColor}
            onAccentColorChange={(e) => setAccentColor(e.target.value)}
            currentTrack={currentTrack}
          />
        </Suspense>
      </motion.div>
    </ErrorBoundary>
  )
}

export default App
