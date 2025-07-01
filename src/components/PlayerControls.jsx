import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
      className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 z-50"
      style={{
        background: `linear-gradient(to top, ${playerColor}, ${playerColor}00)`,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex-shrink-0 w-48">
          {currentTrack && (
            <div>
              <div className="text-white font-medium truncate">{currentTrack.title}</div>
              <div className="text-gray-400 text-sm truncate">{currentTrack.artist}</div>
            </div>
          )}
        </div>

        {/* Visualizer */}
        <div 
          ref={visualizerRef}
          className="flex items-end gap-[2px] h-12 w-32"
          style={{ opacity: currentTrack ? 1 : 0.3 }}
        >
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-white/30 rounded-t"
              style={{ height: '20%' }}
              animate={{ height: ['20%', '60%', '20%'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Time and Seek */}
        <div className="flex-1 flex items-center gap-3 text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="flex-1 accent-white"
            style={{ accentColor }}
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Volume */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white hover:bg-white/10 rounded-full"
            onClick={showVolumeSlider}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
            </svg>
          </motion.button>

          {isVolumeVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-2 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 w-32"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  onVolumeChange(parseFloat(e.target.value));
                  showVolumeSlider();
                }}
                className="w-full accent-white"
                style={{ accentColor }}
              />
            </motion.div>
          )}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white hover:bg-white/10 rounded-full"
            onClick={onPrevious}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 text-white hover:bg-white/10 rounded-full"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white hover:bg-white/10 rounded-full"
            onClick={onNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
