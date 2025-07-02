import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AboutModal({ isOpen, onClose, accentColor }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with better blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal Container - ensures center alignment on all screens */}
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              {/* Modal */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-lg transform rounded-2xl bg-gray-900/90 
                          p-6 sm:p-8 text-left shadow-2xl transition-all backdrop-blur-lg
                          border border-white/10 mx-4 sm:mx-0"
                style={{
                  background: `linear-gradient(165deg, rgba(0,0,0,0.9), ${accentColor}20)`
                }}
              >
                {/* Close button - repositioned */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white 
                           transition-colors rounded-full p-1 hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content with improved spacing */}
                <div className="text-center">
                  {/* Logo/Brand with enhanced animation */}
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="inline-block mb-6"
                  >
                    <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent 
                                 bg-gradient-to-r from-white to-white/60 tracking-tight">
                      Rewindly
                    </span>
                  </motion.div>

                  {/* Tagline with heart animation */}
                  <motion.div 
                    className="mb-6 text-white/80 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Made with{' '}
                    <motion.span
                      animate={{
                        scale: [1, 1.2, 1],
                        color: [accentColor, '#ff3366', accentColor],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      ❤️
                    </motion.span>
                    {' '}by
                  </motion.div>

                  {/* Developer Info with better spacing */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Kartik Namdev</h3>
                      <p className="text-white/70 text-lg">I love making beautiful apps</p>
                    </div>

                    {/* Social Links with improved hover effects */}
                    <div className="flex justify-center gap-6 pt-2">
                      <a
                        href="https://github.com/Kartiknamdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all transform hover:scale-110"
                      >
                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com/kartikknamdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all transform hover:scale-110"
                      >
                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                        </svg>
                      </a>
                      <a
                        href="mailto:kartikk12na@gmail.com"
                        className="text-white/60 hover:text-white transition-all transform hover:scale-110"
                      >
                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>

                  {/* App Info with improved typography */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-white/10"
                  >
                    <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                      Rewindly is a modern music player that brings back the nostalgic feel of cassette tapes
                      with a contemporary twist. Enjoy your music with beautiful animations and a unique interface.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
