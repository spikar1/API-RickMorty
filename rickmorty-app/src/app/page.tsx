'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-104px)] bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Project Description */}
        <div className="mb-12 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Rick and Morty Explorer</h1>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Welcome to my Rick and Morty Explorer project! This is a hobby project I created to enhance my skills with modern web development tools and technologies, including:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Next.js for building a fast, SEO-friendly React application</li>
              <li>Cursor as my development environment</li>
              <li>RESTful API integration with the Rick and Morty API</li>
              <li>Vercel for seamless deployment and hosting</li>
            </ul>
            <p className="mb-4">
              This project is primarily a learning exercise rather than a commercial venture. It's helped me understand modern web development workflows and best practices while having fun with one of my favorite shows!
            </p>
            <div className="flex items-center space-x-2">
              <a 
                href="https://github.com/spikar1/API-RickMorty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>View source code on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
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
