import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSCassetteTape } from './CSSCassetteTape'
import { CSSVinylDisk } from './CSSVinylDisk'

export function CassetteShelf({ 
  cassettes, 
  onCassetteClick, 
  currentTrack, 
  playerColor, 
  accentColor,
  savedTracks,
  onSaveToggle,
  isOpen,
  onClose,
  playerTheme
}) {
  const isTrackSaved = (track) => {
    return savedTracks?.some(t => t.id === track.id);
  };

  const shelfVariants = {
    hidden: { 
      x: '100%',
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,  // Reduced for smoother motion
        damping: 30,     // Adjusted for more natural bounce
        mass: 0.8,       // Lighter mass for quicker response
        when: "afterChildren"
      }
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.03  // Faster stagger for snappier feel
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,  // Reduced x offset for subtler animation
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35
      }
    }
  };

  return (
    <>
      {/* Backdrop with improved blur and fade - conditionally rendered under AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Shelf with enhanced styling - always mounted, sliding off-screen when closed */}
      <motion.div 
        className={`fixed right-0 top-0 h-full w-full sm:w-[440px] bg-gray-900/70 backdrop-blur-md shadow-2xl z-40
                 flex flex-col border-l border-white/10 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={shelfVariants}
        style={{
          background: `linear-gradient(135deg, ${playerColor}90, ${accentColor}90)`,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header with improved spacing and styling */}
        <div className="flex items-center justify-between p-4 pb-2 pt-20 sm:pt-4">
          <h2 className="text-white text-xl font-bold tracking-wide">
            {playerTheme === 'vinyl' ? 'Your Records' : 'Your Cassettes'}
          </h2>
          {isOpen && (
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-white/80 hover:text-white transition-colors rounded-full
                       hover:bg-white/10 active:bg-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Cassettes list with grid layout */}
        <motion.div 
          className="flex-1 overflow-y-auto px-4 custom-scrollbar mt-4"
          style={{
            '--scrollbar-color': `${accentColor}60`,
            '--scrollbar-hover-color': `${accentColor}80`
          }}
        >
          <div className="py-4 pb-4 grid grid-cols-2 gap-3">
            {cassettes.slice(0, 10).map((cassette) => (
              <motion.div
                key={cassette.id}
                variants={itemVariants}
                layout="position"
                className="relative group z-10 hover:z-30 focus-within:z-30"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400, damping: 30 }
                }}
              >
                {playerTheme === 'vinyl' ? (
                  <CSSVinylDisk
                    layoutId={`vinyl-disk-${cassette.id}`}
                    onClick={() => {
                      if (isOpen) {
                        onCassetteClick(cassette);
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
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
                ) : (
                  <CSSCassetteTape
                    layoutId={`cassette-${cassette.id}`}
                    onClick={() => {
                      if (isOpen) {
                        onCassetteClick(cassette);
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
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
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
