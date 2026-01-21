
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            <div className="w-2.5 h-6 bg-[#4285F4] rounded-sm"></div>
            <div className="w-2.5 h-6 bg-[#EA4335] rounded-sm"></div>
            <div className="w-2.5 h-6 bg-[#FBBC04] rounded-sm"></div>
            <div className="w-2.5 h-6 bg-[#34A853] rounded-sm"></div>
          </div>
          <h1 className="text-lg font-bold text-gray-900 hidden sm:block">
            PCA Daily Bot Manager
          </h1>
          <h1 className="text-lg font-bold text-gray-900 sm:hidden">
            PCA Bot
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <i className="fas fa-cog"></i>
          </button>
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-inner">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
