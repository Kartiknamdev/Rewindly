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
  onSaveToggle
}) {
  const isTrackSaved = (track) => {
    return savedTracks?.some(t => t.id === track.id);
  };

  const shelfVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
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
    <motion.div 
      className="fixed right-0 top-16 h-[calc(100%-8rem)] w-72 bg-gray-800/80 backdrop-blur-sm p-4 shadow-xl rounded-l-xl z-10"
      initial="hidden"
      animate="visible"
      variants={shelfVariants}
      style={{
        background: `linear-gradient(45deg, ${playerColor}80, ${accentColor}80)`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <h2 className="text-white text-xl font-bold mb-4">Your Cassettes</h2>
      <motion.div className="flex flex-col gap-4 h-[calc(100%-4rem)] overflow-y-auto pr-2">
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
            <AnimatePresence mode="wait">
              <CSSCassetteTape
                layoutId={`cassette-${cassette.id}`}
                onClick={() => onCassetteClick(cassette)}
                label={cassette.title}
                artist={cassette.artist}
                isPlaying={currentTrack?.id === cassette.id}
                playerColor={playerColor}
                accentColor={accentColor}
                isSaved={isTrackSaved(cassette)}
                onSaveToggle={() => onSaveToggle?.(cassette)}
              />
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
