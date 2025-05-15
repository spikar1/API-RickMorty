'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/timeline" 
                className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Character Timeline</h2>
            <p className="text-gray-600">
              Explore characters in chronological order with an interactive timeline view
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" 
                    alt="Rick Sanchez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-0.5 w-16 bg-gray-300"></div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
                    alt="Morty Smith"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-0.5 w-16 bg-gray-300"></div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="https://rickandmortyapi.com/api/character/avatar/3.jpeg"
                    alt="Summer Smith"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Link>
          <Link href="/search"
                className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Character Search</h2>
            <p className="text-gray-600">
              Search and filter Rick and Morty characters with detailed information
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-md">
                <div className="w-5 h-5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="h-8 w-full bg-gray-200 rounded ml-2"></div>
                <div className="w-10 h-8 bg-blue-500 rounded ml-2"></div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
