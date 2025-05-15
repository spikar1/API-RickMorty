import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm">
            <span>Designed & Developed by</span>
            <a 
              href="https://fureli.design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Steffen Fureli
            </a>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">Fureli Design</span>
          </div>
          <div className="text-xs text-gray-400">
            © {currentYear} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 