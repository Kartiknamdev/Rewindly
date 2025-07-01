import React, { useState } from 'react';
import { searchTracks } from '../services/shazamApi';

export function SearchBar({ onTrackSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const tracks = await searchTracks(query);
      setResults(tracks);
      setIsOpen(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackSelect = (track) => {
    onTrackSelect(track);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs..."
          className="w-full px-4 py-2 text-gray-300 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-xl max-h-96 overflow-auto">
          {results.map((track) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className="flex items-center w-full p-4 hover:bg-gray-700 transition-colors"
            >
              {track.albumArt && (
                <img src={track.albumArt} alt={track.title} className="w-12 h-12 object-cover rounded" />
              )}
              <div className="ml-4 text-left">
                <h3 className="text-white font-medium">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
