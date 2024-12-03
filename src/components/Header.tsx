import React from 'react';
import { Library, LogOut } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onLogout?: () => void;
}

export function Header({ isAdmin, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Library className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              Tunas Bangsa Library
              {isAdmin && <span className="text-blue-600 ml-2">(Admin)</span>}
            </h1>
          </div>
          {isAdmin && onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}