'use client';

import { useState, useEffect, useCallback } from 'react';
import { Character } from '../types/character';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [character, setCharacter] = useState<Character | null>(null);
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [error, setError] = useState('');
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [showEpisodes, setShowEpisodes] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (response.ok && data.results) {
          setSuggestions(data.results.slice(0, 5));
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        let allEpisodes: Episode[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch episodes');
          }

          allEpisodes = [...allEpisodes, ...data.results];
          hasMore = data.info.next !== null;
          page++;
        }

        setEpisodes(allEpisodes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch episodes');
      }
    };

    fetchEpisodes();
  }, []);

  const selectCharacter = (selectedCharacter: Character) => {
    setCharacter(selectedCharacter);
    setSearchQuery(selectedCharacter.name);
    setSuggestions([]);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Character Search
        </h1>
        
        <div className="relative">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter character name..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectCharacter(suggestion)}
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-gray-600">{suggestion.species} - {suggestion.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {character && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-4">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center">
                    {character.name}
                  </h2>
                </div>

                <div className="flex-1 p-6">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-sm text-gray-600 font-medium">Status</td>
                        <td className="py-3 font-semibold">{character.status}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-sm text-gray-600 font-medium">Species</td>
                        <td className="py-3 font-semibold">{character.species}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-sm text-gray-600 font-medium">Gender</td>
                        <td className="py-3 font-semibold">{character.gender}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-sm text-gray-600 font-medium">Origin</td>
                        <td className="py-3 font-semibold">{character.origin.name}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-sm text-gray-600 font-medium">Location</td>
                        <td className="py-3 font-semibold">{character.location.name}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-sm text-gray-600 font-medium">Type</td>
                        <td className="py-3 font-semibold">{character.type || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm text-gray-600 font-medium">Episodes</td>
                        <td className="py-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{character.episode.length}</span>
                            <button
                              onClick={() => setShowEpisodes(true)}
                              className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                              View Episodes
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Episode Panel */}
          {character && (
            <div 
              className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                showEpisodes ? 'translate-x-0' : 'translate-x-full'
              } z-50`}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {character.name}'s Episodes ({character.episode.length})
                </h2>
                <button
                  onClick={() => setShowEpisodes(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                {episodes
                  .filter(ep => character.episode.includes(ep.url))
                  .map((episode) => (
                    <div key={episode.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-lg">{episode.name}</h3>
                      <p className="text-gray-600 text-sm">{episode.episode}</p>
                      <p className="text-gray-600 text-sm">Air date: {episode.air_date}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
} 