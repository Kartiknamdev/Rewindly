import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSCassetteTape } from './CSSCassetteTape'

export function CassetteShelf({ 
  cassettes, 
  onCassetteClick, 
  currentTrack, 
  playerColor, 
  accentColor,
  savedTracks,
  onSaveToggle,
  isOpen,
  onClose
}) {
  const isTrackSaved = (track) => {
    return savedTracks?.some(t => t.id === track.id);
  };

  const shelfVariants = {
    hidden: { 
      x: '100%',
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Shelf */}
          <motion.div 
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-gray-800/80 backdrop-blur-sm p-4 shadow-xl z-40
                     flex flex-col"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={shelfVariants}
            style={{
              background: `linear-gradient(45deg, ${playerColor}80, ${accentColor}80)`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-bold">Your Cassettes</h2>
              <button 
                onClick={onClose}
                className="lg:hidden p-2 text-white hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cassettes list */}
            <motion.div 
              className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar"
              style={{
                '--scrollbar-color': `${accentColor}40`
              }}
            >
              <AnimatePresence mode="wait">
                {cassettes.map((cassette) => (
                  <motion.div
                    key={cassette.id}
                    variants={itemVariants}
                    layout="position"
                    className="relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CSSCassetteTape
                      layoutId={`cassette-${cassette.id}`}
                      onClick={() => {
                        onCassetteClick(cassette);
                        // On mobile, close the shelf after selecting a cassette
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                      label={cassette.title}
                      artist={cassette.artist}
                      isPlaying={currentTrack?.id === cassette.id}
                      playerColor={playerColor}
                      accentColor={accentColor}
                      isSaved={isTrackSaved(cassette)}
                      onSaveToggle={() => onSaveToggle?.(cassette)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
