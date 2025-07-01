import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PlayerControls({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  onVolumeChange,
  volume,
  playerColor,
  accentColor 
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const volumeTimeout = useRef(null);
  const audioRef = useRef(null);
  const visualizerRef = useRef(null);
  
  useEffect(() => {
    if (currentTrack?.preview) {
      audioRef.current = document.querySelector('audio');
      if (audioRef.current) {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }
    }
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    updateVisualizer();
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const updateVisualizer = () => {
    if (!visualizerRef.current || !audioRef.current) return;
    const bars = visualizerRef.current.children;
    for (let i = 0; i < bars.length; i++) {
      const height = Math.random() * (isPlaying ? 100 : 20) + 10;
      bars[i].style.height = `${height}%`;
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const time = (e.target.value / 100) * duration;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showVolumeSlider = () => {
    setIsVolumeVisible(true);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    volumeTimeout.current = setTimeout(() => setIsVolumeVisible(false), 2000);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 
                pb-safe z-50" // Added pb-safe for iOS safe area
      style={{
        background: `linear-gradient(to top, ${playerColor}, ${playerColor}00)`,
      }}
    >
      {/* Seek bar */}
      <div className="w-full h-1 bg-gray-700/50">
        <motion.div 
          className="h-full"
          style={{ 
            background: accentColor,
            width: `${(currentTime / duration) * 100}%`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {/* Track Info - Full width on mobile */}
          <div className="w-full sm:w-48 text-center sm:text-left mb-2 sm:mb-0">
            {currentTrack && (
              <div>
                <div className="text-white font-medium truncate">{currentTrack.title}</div>
                <div className="text-gray-400 text-sm truncate">{currentTrack.artist}</div>
              </div>
            )}
          </div>

          {/* Main Controls - Centered on mobile */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-1">
            <button
              className="text-white/80 hover:text-white p-2"
              onClick={onPrevious}
              disabled={!currentTrack}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              onClick={onPlayPause}
              disabled={!currentTrack}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            <button
              className="text-white/80 hover:text-white p-2"
              onClick={onNext}
              disabled={!currentTrack}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Volume and Time - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-4 w-48">
            <div className="text-white/60 text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="relative">
              <button
                className="text-white/80 hover:text-white p-2"
                onClick={showVolumeSlider}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>

              <AnimatePresence>
                {isVolumeVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 rounded-lg shadow-lg"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-24 accent-current"
                      style={{ color: accentColor }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
