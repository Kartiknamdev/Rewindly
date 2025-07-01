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
  const audioRef = useRef(null);



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
        return prev.filter(t => t.id !== track.id);
      } else {
        return [...prev, track];
      }
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

  return (
    <ErrorBoundary>
      <LayoutGroup>
        <motion.div 
          className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            {/* Theme Selector - replaces mode toggle in ControlBar */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <ThemeSelector
                currentTheme={playerTheme}
                onThemeSelect={setPlayerTheme}
                playerColor={playerColor}
                accentColor={accentColor}
              />
            </div>

            {/* Playlist toggle button */}
            <motion.button
              className="fixed top-4 left-4 z-50 bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-white hover:bg-gray-700/80"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </motion.button>

            {/* Search button */}
            <motion.button
              className="fixed top-4 right-16 z-50 bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-white hover:bg-gray-700/80"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>

            {/* Color controls */}
            <motion.div className="fixed bottom-4 right-4 z-50 flex gap-4">
              <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
                <label htmlFor="playerColor" className="text-white text-sm">Theme</label>
                <input
                  id="playerColor"
                  type="color"
                  value={playerColor}
                  onChange={(e) => setPlayerColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
                <label htmlFor="accentColor" className="text-white text-sm">Accent</label>
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

            {/* Main content area */}
            <motion.div 
              className="min-h-screen flex items-center justify-center"
              initial={false}
              animate={{ 
                background: `radial-gradient(circle at center, ${playerColor}20, transparent)` 
              }}
            >
              {renderPlayer()}
            </motion.div>

            {/* Cassette Shelf */}
            <CassetteShelf 
              cassettes={cassettes}
              onCassetteClick={handleCassetteClick}
              currentTrack={currentTrack}
              playerColor={playerColor}
              accentColor={accentColor}
              savedTracks={savedTracks}
              onSaveToggle={toggleSaveTrack}
            />

            {/* Audio Player */}
            <AudioPlayer 
              ref={audioRef}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayingChange={setIsPlaying}
              volume={volume}
            />

            {/* Player Controls */}
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
          </Suspense>
        </motion.div>
      </LayoutGroup>
    </ErrorBoundary>
  );
}

export default App;
