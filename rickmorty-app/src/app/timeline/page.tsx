'use client';

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { Character } from '../types/character';

interface TimelineCharacter extends Character {
  createdDate: Date;
  episodeIds: number[];
}

interface Filters {
  gender: string;
  species: string;
  origin: string;
  status: string;
  episodes: number[];
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
  season?: number;
}

interface FilterOptions {
  genders: Set<string>;
  species: Set<string>;
  origins: Set<string>;
  statuses: Set<string>;
}

interface FilterSidebarProps {
  options: FilterOptions;
  filters: Filters;
  onFilterChange: (type: keyof Filters, value: string) => void;
  episodes: Episode[];
  onEpisodeToggle: (episodeId: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterItem = memo(({ 
  character, 
  index, 
  isSelected, 
  onSelect,
  filters,
  onFilterChange,
  onViewEpisodes,
  showEpisodes,
  episodes
}: { 
  character: TimelineCharacter;
  index: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
  filters: Filters;
  onFilterChange: (type: keyof Filters, value: string) => void;
  onViewEpisodes: (character: TimelineCharacter) => void;
  showEpisodes: boolean;
  episodes: Episode[];
}) => {
  const handleClick = (e: React.MouseEvent) => {
    onSelect(character.id);
  };

  const characterEpisodes = episodes.filter(ep => 
    character.episodeIds.includes(parseInt(ep.id))
  );

  return (
    <div className="relative flex flex-col items-center">
      <div 
        onClick={handleClick}
        className={`group cursor-pointer transition-all duration-300 ease-in-out ${
          index % 2 === 0 ? '-translate-y-8' : 'translate-y-8'
        } ${
          isSelected ? 'z-50 scale-110' : 'z-10 scale-100'
        }`}
      >
        {/* Info box */}
        <div className="relative flex">
          <div 
            className={`absolute ${
              index % 2 === 0 ? 'bottom-full mb-4' : 'top-full mt-16'
            } left-1/2 transform -translate-x-1/2 rounded-lg transition-all duration-300 ease-in-out ${
              isSelected 
                ? 'w-[32rem] opacity-100 shadow-2xl bg-white' 
                : 'w-48 opacity-90 shadow-lg hover:shadow-xl bg-slate-100'
            }`}
            style={{
              zIndex: isSelected ? 50 : 20,
              maxHeight: isSelected ? 'calc(100vh - 180px)' : 'none'
            }}
          >
            {/* Name always visible */}
            <div className={`p-2 text-center font-medium transition-colors duration-300 border-b min-h-[2rem] ${
              isSelected 
                ? 'text-gray-700 bg-white' 
                : 'text-gray-600 bg-slate-100'
            }`}>
              {character.name}
            </div>

            {/* Additional info that appears when expanded */}
            <div className={`transition-all duration-300 overflow-y-auto ${
              isSelected ? 'opacity-100' : 'opacity-0 max-h-0'
            }`}
            style={{
              maxHeight: isSelected ? 'calc(100vh - 220px)' : '0'
            }}>
              <div className="p-4">
                {/* Character portrait */}
                <div className="flex">
                  <div className="flex-shrink-0 w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info content */}
                  <div className="ml-4 flex-grow space-y-3">
                    <p className="text-sm text-gray-600">
                      Created: {character.createdDate.toLocaleDateString()}
                    </p>
                    <FilterableValue 
                      label="Status" 
                      value={character.status} 
                      filterType="status"
                      currentFilter={filters.status}
                      onFilterChange={onFilterChange}
                    />
                    <FilterableValue 
                      label="Species" 
                      value={character.species} 
                      filterType="species"
                      currentFilter={filters.species}
                      onFilterChange={onFilterChange}
                    />
                    <FilterableValue 
                      label="Gender" 
                      value={character.gender} 
                      filterType="gender"
                      currentFilter={filters.gender}
                      onFilterChange={onFilterChange}
                    />
                    <FilterableValue 
                      label="Origin" 
                      value={character.origin.name} 
                      filterType="origin"
                      currentFilter={filters.origin}
                      onFilterChange={onFilterChange}
                    />
                    <p className="text-sm text-gray-600">
                      Location: {character.location.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Episodes: {character.episodeIds.length}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewEpisodes(character);
                        }}
                        className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        {showEpisodes ? 'Hide Episodes' : 'View Episodes'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes box */}
          <div 
            className={`absolute ${
              index % 2 === 0 ? 'bottom-full mb-16' : 'top-full mt-16'
            } left-1/2 ml-[16rem] transform transition-all duration-300 ease-in-out ${
              isSelected && showEpisodes
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[-50px] opacity-0 pointer-events-none'
            }`}
            style={{
              zIndex: isSelected ? 49 : 19,
              width: '16rem',
              maxHeight: 'calc(100vh - 180px)'
            }}
          >
            <div className={`bg-white rounded-lg shadow-xl flex flex-col ${
              isSelected && showEpisodes ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-lg">Episodes ({characterEpisodes.length})</h3>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                <div className="p-4 space-y-2">
                  {characterEpisodes.map((episode) => (
                    <div key={episode.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm">{episode.name}</h4>
                      <p className="text-gray-600 text-xs">{episode.episode}</p>
                      <p className="text-gray-600 text-xs">Air date: {episode.air_date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Character thumbnail */}
        <div className={`w-12 h-12 rounded-full overflow-hidden relative border-3 ${
          character.status === 'Dead' ? 'border-red-500' :
          character.status === 'Alive' ? 'border-green-500' :
          'border-gray-400'
        }`}>
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
});

const FilterableValue = memo(({ 
  label, 
  value, 
  filterType, 
  currentFilter,
  onFilterChange
}: { 
  label: string;
  value: string;
  filterType: keyof Filters;
  currentFilter: string;
  onFilterChange: (type: keyof Filters, value: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}:</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFilterChange(filterType, currentFilter === value ? '' : value);
        }}
        className={`text-sm px-2 py-1 rounded-md transition-colors ${
          currentFilter === value
            ? 'bg-blue-500 text-white'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        {value}
      </button>
    </div>
  );
});

const groupEpisodesBySeason = (episodes: Episode[]) => {
  const seasons = new Map<number, Episode[]>();
  
  episodes.forEach(episode => {
    const seasonMatch = episode.episode.match(/S(\d+)E/);
    const seasonNumber = seasonMatch ? parseInt(seasonMatch[1]) : 0;
    
    if (!seasons.has(seasonNumber)) {
      seasons.set(seasonNumber, []);
    }
    const seasonEpisodes = seasons.get(seasonNumber);
    if (seasonEpisodes) {
      episode.season = seasonNumber;
      seasonEpisodes.push(episode);
    }
  });
  
  return new Map([...seasons.entries()].sort((a, b) => a[0] - b[0]));
};

const SeasonAccordion = memo(({ 
  season, 
  episodes,
  selectedEpisodes,
  onEpisodeToggle 
}: { 
  season: number;
  episodes: Episode[];
  selectedEpisodes: number[];
  onEpisodeToggle: (episodeId: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedInSeason = episodes.filter(ep => selectedEpisodes.includes(parseInt(ep.id))).length;

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Season {season}</span>
          {selectedInSeason > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              {selectedInSeason} selected
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`transition-all duration-200 ease-in-out ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="divide-y">
          {episodes.map(episode => (
            <div 
              key={episode.id}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => onEpisodeToggle(parseInt(episode.id))}
            >
              <input
                type="checkbox"
                checked={selectedEpisodes.includes(parseInt(episode.id))}
                onChange={() => {}}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700 cursor-pointer truncate">
                {episode.episode} - {episode.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const FilterSidebar = ({ 
  options, 
  filters,
  onFilterChange,
  episodes,
  onEpisodeToggle,
  isOpen,
  onClose
}: FilterSidebarProps) => {
  const seasonGroups = useMemo(() => groupEpisodesBySeason(episodes), [episodes]);

  return (
    <div className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } z-50 flex flex-col`}>
      <div className="flex-none p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Basic filters */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => onFilterChange('gender', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Genders</option>
                {Array.from(options.genders).map(gender => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Species</label>
              <select
                value={filters.species}
                onChange={(e) => onFilterChange('species', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Species</option>
                {Array.from(options.species).map(species => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {Array.from(options.statuses).map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Origin</label>
              <select
                value={filters.origin}
                onChange={(e) => onFilterChange('origin', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Origins</option>
                {Array.from(options.origins).map(origin => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Episodes section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Episodes</label>
              {filters.episodes.length > 0 && (
                <button
                  onClick={() => onFilterChange('episodes', '')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              {Array.from(seasonGroups.entries()).map(([season, seasonEpisodes]) => (
                <SeasonAccordion
                  key={season}
                  season={season}
                  episodes={seasonEpisodes}
                  selectedEpisodes={filters.episodes}
                  onEpisodeToggle={onEpisodeToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Timeline() {
  const [characters, setCharacters] = useState<TimelineCharacter[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<TimelineCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>({
    gender: '',
    species: '',
    origin: '',
    status: '',
    episodes: []
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genders: new Set(),
    species: new Set(),
    origins: new Set(),
    statuses: new Set()
  });

  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    velocity: 0,
    dragStartTime: 0
  });

  const [selectedCharacterForEpisodes, setSelectedCharacterForEpisodes] = useState<TimelineCharacter | null>(null);
  const [showEpisodes, setShowEpisodes] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let allCharacters: TimelineCharacter[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch characters');
          }

          const processedCharacters = data.results.map((char: Character) => ({
            ...char,
            createdDate: new Date(char.created),
            episodeIds: char.episode.map(url => parseInt(url.split('/').pop() || '0'))
          }));

          allCharacters = [...allCharacters, ...processedCharacters];
          hasMore = data.info.next !== null;
          page++;
        }

        allCharacters.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
        setCharacters(allCharacters);
        setFilteredCharacters(allCharacters);

        // Extract unique filter options
        const options = {
          genders: new Set(allCharacters.map(char => char.gender)),
          species: new Set(allCharacters.map(char => char.species)),
          origins: new Set(allCharacters.map(char => char.origin.name)),
          statuses: new Set(allCharacters.map(char => char.status))
        };
        setFilterOptions(options);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  useEffect(() => {
    let result = [...characters];

    if (filters.gender) {
      result = result.filter(char => char.gender === filters.gender);
    }
    if (filters.species) {
      result = result.filter(char => char.species === filters.species);
    }
    if (filters.origin) {
      result = result.filter(char => char.origin.name === filters.origin);
    }
    if (filters.status) {
      result = result.filter(char => char.status === filters.status);
    }
    if (filters.episodes.length > 0) {
      result = result.filter(char => 
        filters.episodes.every(episodeId => 
          char.episodeIds.includes(episodeId)
        )
      );
    }

    setFilteredCharacters(result);
  }, [filters, characters]);

  const handleFilterChange = useCallback((filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const handleEpisodeToggle = useCallback((episodeId: number) => {
    setFilters(prev => ({
      ...prev,
      episodes: prev.episodes.includes(episodeId)
        ? prev.episodes.filter(id => id !== episodeId)
        : [...prev.episodes, episodeId]
    }));
  }, []);

  // Add wheel event handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (timelineRef.current) {
        const scrollAmount = e.deltaY * 2; // Adjust scroll speed
        timelineRef.current.scrollLeft += scrollAmount;
        setScrollPosition(timelineRef.current.scrollLeft);
      }
    };

    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (timeline) {
        timeline.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleCharacterSelect = useCallback((characterId: number) => {
    setSelectedCharacter(prevId => prevId === characterId ? null : characterId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;

    // Only handle left mouse button
    if (e.button !== 0) return;
    
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      scrollLeft: timelineRef.current.scrollLeft,
      lastX: e.clientX,
      velocity: 0,
      dragStartTime: performance.now()
    };

    timelineRef.current.style.cursor = 'grabbing';
    timelineRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const drag = dragRef.current;
    if (!drag.isDragging || !timelineRef.current) return;

    e.preventDefault();
    const deltaX = e.clientX - drag.lastX;
    const now = performance.now();
    const dt = now - drag.dragStartTime;
    
    if (dt > 0) {
      drag.velocity = deltaX * 0.3; // Reduced velocity multiplier for smoother movement
    }
    
    drag.lastX = e.clientX;
    drag.dragStartTime = now;

    const newScrollLeft = drag.scrollLeft + (drag.startX - e.clientX);
    timelineRef.current.scrollLeft = newScrollLeft;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const drag = dragRef.current;
    
    // Only apply momentum if it's a quick release and there's significant velocity
    const isQuickRelease = performance.now() - drag.dragStartTime < 100;
    
    drag.isDragging = false;
    timelineRef.current.style.cursor = 'grab';
    timelineRef.current.style.userSelect = 'auto';

    if (isQuickRelease && Math.abs(drag.velocity) > 1) {
      let velocity = drag.velocity;
      let lastTimestamp = performance.now();
      let frame = 0;

      const animate = (timestamp: number) => {
        if (!timelineRef.current) return;
        
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        frame++;

        // Apply velocity with decay
        if (Math.abs(velocity) > 0.1 && frame < 60) { // Limit animation to 60 frames
          timelineRef.current.scrollLeft -= velocity * (delta * 0.2);
          velocity *= 0.95; // Smoother decay
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    if (dragRef.current.isDragging) {
      dragRef.current.isDragging = false;
      if (timelineRef.current) {
        timelineRef.current.style.cursor = 'grab';
        timelineRef.current.style.userSelect = 'auto';
      }
    }
  };

  // Add click handler to prevent unwanted clicks during drag
  const handleClick = (e: React.MouseEvent) => {
    const drag = dragRef.current;
    const moveDistance = Math.abs(e.clientX - drag.startX);
    
    // If the mouse has moved more than 5px, prevent the click
    if (moveDistance > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleViewEpisodes = (character: TimelineCharacter) => {
    if (selectedCharacterForEpisodes?.id === character.id) {
      setSelectedCharacterForEpisodes(null);
      setShowEpisodes(false);
    } else {
      setSelectedCharacterForEpisodes(character);
      setShowEpisodes(true);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">
          Loading character timeline...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-104px)] w-full overflow-hidden bg-slate-200 flex flex-col relative">
      {/* Top bar with filter button and results count */}
      <div className="bg-white shadow-sm z-40 flex-none flex items-center h-12">
        <div className="w-16 flex items-center justify-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open filters"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
        <div className="flex-1 px-4">
          <div className="text-sm text-gray-600">
            Showing {filteredCharacters.length} of {characters.length} characters
          </div>
        </div>
      </div>

      {/* Filter sidebar */}
      <FilterSidebar 
        options={filterOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
        episodes={episodes}
        onEpisodeToggle={handleEpisodeToggle}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Timeline section */}
      <div 
        ref={timelineRef}
        className="timeline-scroll flex-1 overflow-x-scroll relative cursor-grab select-none will-change-scroll"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100% - 40px)',
          overflowY: 'hidden'
        }}
      >
        <div 
          ref={contentRef}
          className="relative h-full will-change-transform flex items-center"
          style={{
            minWidth: 'max-content',
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
            paddingTop: '6rem',
            paddingBottom: '6rem'
          }}
        >
          {/* Main horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-300 transform -translate-y-1/2"></div>

          {/* Characters container */}
          <div className="relative flex items-center space-x-16">
            {filteredCharacters.map((character, index) => (
              <CharacterItem
                key={character.id}
                character={character}
                index={index}
                isSelected={selectedCharacter === character.id}
                onSelect={handleCharacterSelect}
                filters={filters}
                onFilterChange={handleFilterChange}
                onViewEpisodes={handleViewEpisodes}
                showEpisodes={showEpisodes && selectedCharacterForEpisodes?.id === character.id}
                episodes={episodes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}