import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { CSSCassetteTape } from './components/CSSCassetteTape';
import { CSSCassettePlayer } from './components/CSSCassettePlayer';
import { WalkmanPlayer } from './components/players/WalkmanPlayer';
import { RadioPlayer } from './components/players/RadioPlayer';
import { SpeakerPlayer } from './components/players/SpeakerPlayer';
import { AudioPlayer } from './components/AudioPlayer';
import { SearchModal } from './components/SearchModal';
import { PlaylistManager } from './components/PlaylistManager';
import { CassetteShelf } from './components/CassetteShelfNew';
import { ThemeSelector } from './components/ThemeSelector';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PlayerControls } from './components/PlayerControls';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';

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

function ColorControl({ label, color, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-white text-sm">{label}</label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-purple-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
        <input 
          type="color" 
          value={color}
          onChange={onChange}
          className="w-10 h-10 cursor-pointer rounded bg-transparent relative"
        />
      </div>
    </div>
  );
}

function App() {
  const [savedTracks, setSavedTracks] = useLocalStorage('savedTracks', []);
  const [cassettes, setCassettes] = useState([]);
  const [playerTheme, setPlayerTheme] = useLocalStorage('playerTheme', 'cassette');
  const [playerColor, setPlayerColor] = useLocalStorage('playerColor', '#6366f1');
  const [accentColor, setAccentColor] = useLocalStorage('accentColor', '#ffffff');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useLocalStorage('volume', 0.5);
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCassette, setSelectedCassette] = useState(null)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const [isShelfOpen, setIsShelfOpen] = useState(window.innerWidth >= 1024); // Open by default on desktop
  const audioRef = useRef(null);
  const { toasts, addToast, removeToast } = useToast();
  const [hoveredButton, setHoveredButton] = useState(null);

  const themeLabels = {
    cassette: 'Cassette',
    walkman: 'Walkman',
    radio: 'Radio',
    speaker: 'Speaker'
  };

  const buttonTooltip = {
    playlist: 'Playlist',
    search: 'Search',
    cassettes: 'Your Cassettes'
  };

  const handleTrackSelect = (track) => {
    setCassettes(prev => {
      if (prev.length >= 6) {
        return [...prev.slice(1), track];
      }
      return [...prev, track];
    });
    setIsSearchOpen(false);
  };

  const handleCassetteClick = (cassette) => {
    if (currentTrack?.id === cassette.id) {
      // If clicking the same cassette, toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // If clicking a different cassette, select and play it
      setSelectedCassette(cassette);
      setCurrentTrack(cassette);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = cassettes.findIndex(c => c.id === currentTrack.id);
    if (currentIndex > 0) {
      const previousTrack = cassettes[currentIndex - 1];
      setSelectedCassette(previousTrack);
      setCurrentTrack(previousTrack);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = cassettes.findIndex(c => c.id === currentTrack.id);
    if (currentIndex < cassettes.length - 1) {
      const nextTrack = cassettes[currentIndex + 1];
      setSelectedCassette(nextTrack);
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaylistTrackClick = (track) => {
    // If the track is already in cassettes, just play it
    const existingCassette = cassettes.find(c => c.id === track.id);
    if (existingCassette) {
      handleCassetteClick(existingCassette);
    } else {
      // Add to cassettes and play
      handleTrackSelect(track);
      setTimeout(() => {
        handleCassetteClick(track);
      }, 100);
    }
  };

  const toggleSaveTrack = (track) => {
    setSavedTracks(prev => {
      const isAlreadySaved = prev.some(t => t.id === track.id);
      if (isAlreadySaved) {
        addToast({ 
          message: `Removed ${track.title} from playlist`, 
          type: 'info',
          duration: 2000
        });
        return prev.filter(t => t.id !== track.id);
      } else {
        addToast({ 
          message: `Added ${track.title} to playlist`, 
          type: 'success',
          duration: 2000
        });
        return [...prev, track];
      }
    });
  };

  const handleThemeChange = (newTheme) => {
    setPlayerTheme(newTheme);
    addToast({ 
      message: `Theme changed to ${newTheme}`, 
      type: 'info',
      duration: 1500
    });
  };

  const isTrackSaved = (track) => {
    return savedTracks.some(t => t.id === track.id);
  };

  const renderPlayer = () => {
    if (!selectedCassette) return null;

    const props = {
      cassette: selectedCassette,
      playerColor,
      accentColor,
      isPlaying: isPlaying && currentTrack?.id === selectedCassette.id,
      onPlayPause: handlePlayPause,
      onPrevious: handlePrevious,
      onNext: handleNext,
      volume,
      onVolumeChange: handleVolumeChange
    };

    switch (playerTheme) {
      case 'walkman':
        return <WalkmanPlayer {...props} />;
      case 'radio':
        return <RadioPlayer {...props} />;
      case 'speaker':
        return <SpeakerPlayer {...props} />;
      default:
        // Cassette player theme
        return (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CSSCassettePlayer {...props}>
                <AnimatePresence>
                  {selectedCassette && (
                    <motion.div
                      key={selectedCassette.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CSSCassetteTape
                        layoutId={`cassette-${selectedCassette.id}`}
                        label={selectedCassette.title}
                        artist={selectedCassette.artist}
                        isPlaying={currentTrack?.id === selectedCassette.id}
                        playerColor={playerColor}
                        accentColor={accentColor}
                        isSaved={isTrackSaved(selectedCassette)}
                        onSaveToggle={(e) => {
                          e.stopPropagation();
                          toggleSaveTrack(selectedCassette);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CSSCassettePlayer>
            </motion.div>
          </div>
        );
    }
  };

  const themeIcons = {
    cassette: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
        <circle cx="8" cy="12" r="2" strokeWidth="2"/>
        <circle cx="16" cy="12" r="2" strokeWidth="2"/>
        <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2"/>
      </svg>
    ),
    walkman: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="2"/>
        <circle cx="12" cy="14" r="3" strokeWidth="2"/>
        <line x1="8" y1="7" x2="16" y2="7" strokeWidth="2"/>
      </svg>
    ),
    radio: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
        <circle cx="6" cy="12" r="2" strokeWidth="2"/>
        <path d="M12 9v6M16 9v6" strokeWidth="2"/>
      </svg>
    ),
    speaker: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 6v12m0-12c2 1 4 1 6 0m-6 12c2-1 4-1 6 0M6 6c2 1 4 1 6 0M6 18c2-1 4-1 6 0" strokeWidth="2"/>
      </svg>
    )
  };

  const handleThemeClick = () => {
    const themes = ['cassette', 'walkman', 'radio', 'speaker'];
    const currentIndex = themes.indexOf(playerTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    handleThemeChange(themes[nextIndex]);
  };

  return (
    <ErrorBoundary>
      <LayoutGroup>
        <motion.div 
          className="min-h-screen overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            background: `radial-gradient(circle at center, ${playerColor}20, rgba(17, 24, 39, 1))`
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            background: { duration: 0.8 }
          }}
        >
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-50">
              {/* Left Side - Playlist */}
              <motion.div className="relative">
                <motion.button
                  className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full 
                           text-white hover:bg-gray-700/80 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                  onMouseEnter={() => setHoveredButton('playlist')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <motion.div
                    animate={isPlaylistOpen ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {hoveredButton === 'playlist' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                               bg-gray-800/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                    >
                      {buttonTooltip.playlist}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Center - Theme Switcher */}
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2
                         border border-white/10 shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={handleThemeClick}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="text-white/80 text-sm capitalize"
                  animate={{ opacity: [0.6, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  {themeLabels[playerTheme]}
                </motion.span>
                <motion.div 
                  className="w-5 h-5 flex items-center justify-center text-white/80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Right Side - Search and Cassettes */}
              <div className="flex items-center gap-3">
                <motion.div className="relative">
                  <motion.button
                    className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full 
                             text-white hover:bg-gray-700/80"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchOpen(true)}
                    onMouseEnter={() => setHoveredButton('search')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <motion.div
                      animate={isSearchOpen ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {hoveredButton === 'search' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                                 bg-gray-800/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                      >
                        {buttonTooltip.search}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div className="relative">
                  <motion.button
                    className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full 
                             text-white hover:bg-gray-700/80"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsShelfOpen(prev => !prev)}
                    onMouseEnter={() => setHoveredButton('cassettes')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <motion.div
                      animate={isShelfOpen ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {hoveredButton === 'cassettes' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                                 bg-gray-800/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                      >
                        {buttonTooltip.cassettes}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Main content - adjusted padding for mobile */}
            <motion.div 
              className="min-h-screen flex items-center justify-center px-4 pt-16 pb-24 sm:p-8"
              initial={false}
              animate={{ 
                background: `radial-gradient(circle at center, ${playerColor}20, transparent)` 
              }}
            >
              {renderPlayer()}
            </motion.div>

            {/* Cassette Shelf - now toggleable */}
            <CassetteShelf 
              cassettes={cassettes}
              onCassetteClick={handleCassetteClick}
              currentTrack={currentTrack}
              playerColor={playerColor}
              accentColor={accentColor}
              savedTracks={savedTracks}
              onSaveToggle={toggleSaveTrack}
              isOpen={isShelfOpen}
              onClose={() => setIsShelfOpen(false)}
            />

            {/* Audio Player */}
            <AudioPlayer 
              ref={audioRef}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayingChange={setIsPlaying}
              volume={volume}
            />

            {/* Player Controls - now with mobile optimizations */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
              <PlayerControls 
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onVolumeChange={handleVolumeChange}
                volume={volume}
                playerColor={playerColor}
                accentColor={accentColor}
              />
            </div>

            {/* Color controls - moved to a more accessible position on mobile */}
            <motion.div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 sm:flex-row sm:bottom-4">
              <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
                <label htmlFor="playerColor" className="text-white text-sm hidden sm:inline">Theme</label>
                <input
                  id="playerColor"
                  type="color"
                  value={playerColor}
                  onChange={(e) => setPlayerColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
                <label htmlFor="accentColor" className="text-white text-sm hidden sm:inline">Accent</label>
                <input
                  id="accentColor"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </motion.div>

            {/* Search Modal */}
            <AnimatePresence>
              {isSearchOpen && (
                <SearchModal
                  onClose={() => setIsSearchOpen(false)}
                  onTrackSelect={handleTrackSelect}
                  playerColor={playerColor}
                  accentColor={accentColor}
                />
              )}
            </AnimatePresence>

            {/* Playlist */}
            <AnimatePresence>
              {isPlaylistOpen && (
                <PlaylistManager
                  savedTracks={savedTracks}
                  onRemoveFromPlaylist={toggleSaveTrack}
                  onPlayTrack={handlePlaylistTrackClick}
                  currentTrack={currentTrack}
                  onClose={() => setIsPlaylistOpen(false)}
                  playerColor={playerColor}
                  accentColor={accentColor}
                />
              )}
            </AnimatePresence>

            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
          </Suspense>
        </motion.div>
      </LayoutGroup>
    </ErrorBoundary>
  );
}

export default App;
