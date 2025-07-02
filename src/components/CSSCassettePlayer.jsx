import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CSSCassettePlayer({ 
  playerColor = '#333', 
  accentColor = '#666',
  cassette,
  onPlayPause,
  onPrevious,
  onNext,
  isPlaying,
  onVolumeChange,
  volume = 0.5,
  children
}) {
  const [volumeVisible, setVolumeVisible] = useState(false);
  const volumeTimeout = useRef(null);

  const showVolumeSlider = () => {
    setVolumeVisible(true);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    volumeTimeout.current = setTimeout(() => {
      setVolumeVisible(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="relative w-96 h-64 rounded-2xl shadow-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${playerColor}, ${accentColor}80)`,
        boxShadow: `0 0 30px ${playerColor}40`,
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Custom Play/Pause Switch - ensure it's above the main body and always visible */}
      <style>{`
        .css-cassette-switch { font-size: 17px; position: absolute; top: 1rem; right: 1rem; z-index: 50; }
        .css-cassette-switch .cb { opacity: 0; width: 0; height: 0; }
        .css-cassette-toggle {
          position: absolute; cursor: pointer; width: 5em; height: 2.5em;
          background: ${playerColor}; border-radius: 0.1em; transition: 0.4s;
          font-weight: 700; overflow: hidden;
          box-shadow: -0.3em 0 0 0 ${playerColor}, -0.3em 0.3em 0 0 ${playerColor},
            0.3em 0 0 0 ${playerColor}, 0.3em 0.3em 0 0 ${playerColor}, 0 0.3em 0 0 ${playerColor};
        }
        .css-cassette-toggle > .left, .css-cassette-toggle > .right {
          position: absolute; display: flex; width: 50%; height: 88%; background: #f3f3f3;
          align-items: center; justify-content: center; bottom: 0; transition: all 150ms;
          border-radius: 0.1em;
        }
        .css-cassette-toggle > .left {
          color: ${isPlaying ? 'rgb(206,206,206)' : playerColor}; left: 0; transform-origin: right;
          transform: ${isPlaying ? 'rotateX(10deg) rotateY(45deg)' : 'rotateX(10deg)'};
        }
        .css-cassette-toggle > .right {
          color: ${isPlaying ? accentColor : 'rgb(206,206,206)'}; right: 1px; transform-origin: left;
          transform: ${isPlaying ? 'rotateX(10deg) rotateY(0deg)' : 'rotateX(10deg) rotateY(-45deg)'};
        }
        .css-cassette-toggle > .left::before, .css-cassette-toggle > .right::before {
          position: absolute; content: ""; width: 100%; height: 100%; background: rgb(206,206,206);
        }
        .css-cassette-toggle > .left::before { left: 0; top: 0; transform-origin: center left; transform: rotateY(90deg); }
        .css-cassette-toggle > .right::before { right: 0; top: 0; transform-origin: center right; transform: rotateY(-90deg); }
        .css-cassette-toggle > .left::after, .css-cassette-toggle > .right::after {
          position: absolute; content: ""; width: 100%; height: 100%; background: rgb(112,112,112);
        }
        .css-cassette-toggle > .left::after { left: 0; bottom: 0; transform-origin: center bottom; transform: rotateX(90deg); }
        .css-cassette-toggle > .right::after { right: 0; bottom: 0; transform-origin: center bottom; transform: rotateX(90deg); }
      `}</style>
      <label className="css-cassette-switch select-none">
        <input
          type="checkbox"
          className="cb"
          checked={isPlaying}
          onChange={onPlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        />
        <span className="css-cassette-toggle">
          <span className="left">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{zIndex:1}}><rect x="5" y="4" width="4" height="14" rx="1.5" fill="currentColor"/><rect x="13" y="4" width="4" height="14" rx="1.5" fill="currentColor"/></svg>
          </span>
          <span className="right">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" style={{zIndex:1}}><path d="M7 5v12l9-6z"/></svg>
          </span>
        </span>
      </label>
      {/* Main body with glass effect */}
      <div className="absolute inset-2 bg-gray-900/20 backdrop-blur-sm rounded-xl p-6 z-10">
        {/* Display Screen */}
        <div className="h-16 bg-gray-900/60 rounded-lg overflow-hidden mb-4">
          <div className="h-full flex flex-col justify-center px-4">
            <div className="text-white text-lg font-medium truncate">
              {cassette?.title || 'No Cassette'}
            </div>
            <div className="text-gray-400 text-sm truncate">
              {cassette?.artist || 'Insert a cassette to begin'}
            </div>
          </div>
        </div>
        
        {/* Cassette Slot with animation */}
        <div className="relative h-32 bg-gray-900/40 rounded-lg mb-4 overflow-hidden">
          {/* Slot details */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900/40" />
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-900/40" />
            {!cassette && (
              <motion.div 
                className="text-gray-500 text-sm"
                initial={false}
                animate={{ opacity: 0.5 }}
              >
                Click a cassette to play
              </motion.div>
            )}
          </div>
          
          {/* This is where the cassette will animate to */}
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="flex justify-between items-center">
          {/* Transport Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-900/40 text-white flex items-center justify-center hover:bg-gray-900/60"
              onClick={onPrevious}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gray-900/40 text-white flex items-center justify-center hover:bg-gray-900/60"
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
              className="w-10 h-10 rounded-full bg-gray-900/40 text-white flex items-center justify-center hover:bg-gray-900/60"
              onClick={onNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
              </svg>
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-900/40 text-white flex items-center justify-center hover:bg-gray-900/60"
              onClick={showVolumeSlider}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {volumeVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 w-32"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      onVolumeChange(parseFloat(e.target.value));
                      showVolumeSlider(); // Reset the hide timer
                    }}
                    className="w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
