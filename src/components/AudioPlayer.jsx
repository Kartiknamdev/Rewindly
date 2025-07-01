import React, { useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioPlayer = forwardRef(({ currentTrack, isPlaying, onPlayingChange, volume = 0.5 }, ref) => {
  useEffect(() => {
    if (currentTrack?.preview) {
      ref.current.src = currentTrack.preview;
      ref.current.volume = volume;
      if (isPlaying) {
        ref.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          onPlayingChange?.(false);
        });
      } else {
        ref.current.pause();
      }
    }
  }, [currentTrack, isPlaying, volume]);

  // Handle audio state changes
  useEffect(() => {
    if (!ref.current) return;

    const handleEnded = () => {
      onPlayingChange?.(false);
    };

    const handlePlay = () => {
      onPlayingChange?.(true);
    };

    const handlePause = () => {
      onPlayingChange?.(false);
    };

    ref.current.addEventListener('ended', handleEnded);
    ref.current.addEventListener('play', handlePlay);
    ref.current.addEventListener('pause', handlePause);

    return () => {
      ref.current?.removeEventListener('ended', handleEnded);
      ref.current?.removeEventListener('play', handlePlay);
      ref.current?.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <audio ref={ref} preload="auto" />
  );
});

AudioPlayer.displayName = 'AudioPlayer';
