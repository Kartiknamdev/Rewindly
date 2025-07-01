import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchTracks, getTrendingTracks } from '../services/shazamApi';

export function SearchModal({ onClose, onTrackSelect, playerColor, accentColor }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending tracks on mount
  useEffect(() => {
    const loadTrendingTracks = async () => {
      setIsTrendingLoading(true);
      setError(null);
      try {
        const tracks = await getTrendingTracks();
        if (tracks && tracks.length > 0) {
          setTrendingTracks(tracks);
        } else {
          throw new Error('No trending tracks available');
        }
      } catch (err) {
        console.error('Failed to load trending tracks:', err);
        setError('Unable to load trending tracks. Please try searching instead.');
      } finally {
        setIsTrendingLoading(false);
      }
    };

    loadTrendingTracks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const tracks = await searchTracks(query);
      if (tracks && tracks.length > 0) {
        setResults(tracks);
      } else {
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search tracks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center py-8">
      <svg className="animate-spin h-8 w-8 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  const TrackItem = ({ track }) => (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => {
        onTrackSelect(track);
        onClose();
      }}
    >
      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
          {track.albumArt && (
            <img 
              src={track.albumArt} 
              alt={track.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{track.title}</h3>
          <p className="text-gray-400 text-sm truncate">{track.artist}</p>
        </div>
        <motion.div 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="p-2 rounded-full bg-white/10 hover:bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl bg-gray-900/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${playerColor}40, ${accentColor}20)`,
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Search Music</h2>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for songs..."
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 pr-12
                       focus:outline-none focus:ring-2 focus:ring-white/20"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 
                       text-white/70 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </form>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {error && (
            <div className="text-red-400 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {results.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-white/90 font-medium mb-3">Search Results</h3>
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {results.map((track) => (
                      <TrackItem key={track.id} track={track} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="trending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-white/90 font-medium mb-3">Trending Now</h3>
                  {isTrendingLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {trendingTracks.map((track) => (
                        <TrackItem key={track.id} track={track} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
