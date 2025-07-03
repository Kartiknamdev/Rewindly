import React, { useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioPlayer = forwardRef(({ currentTrack, isPlaying, onPlayingChange, volume = 0.5 }, ref) => {
  // Set audio source and reset position only when the track changes
  useEffect(() => {
    if (currentTrack?.preview) {
      ref.current.src = currentTrack.preview;
      ref.current.currentTime = 0; // Reset position for new track
      ref.current.volume = volume;
      ref.current.loop = true;
      if (isPlaying) {
        ref.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          onPlayingChange?.(false);
        });
      } else {
        ref.current.pause();
      }
    }
  }, [currentTrack]);

  // Only play/pause when isPlaying changes, without resetting src or position
  useEffect(() => {
    if (!ref.current) return;
    if (!currentTrack?.preview) return;
    if (isPlaying) {
      ref.current.play().catch(error => {
        console.error('Audio playback failed:', error);
        onPlayingChange?.(false);
      });
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

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
