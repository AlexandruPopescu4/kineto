'use client';

import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Caută pacienți, exerciții..."
            className="w-96 rounded-xl border border-gray-300 bg-gray-50 pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Dr. Ana Popescu</p>
            <p className="text-xs text-gray-500">Kinetoterapeut</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
