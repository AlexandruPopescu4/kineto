'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
  Settings, 
  BarChart3, 
  FileText,
  Activity,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Panou Control', href: '/dashboard', icon: Home },
  { name: 'Pacienți', href: '/patients', icon: Users },
  { name: 'Programări', href: '/appointments', icon: Calendar },
  { name: 'Analize', href: '/analytics', icon: BarChart3 },
  { name: 'Rapoarte', href: '/reports', icon: FileText },
  { name: 'Activitate', href: '/activity', icon: Activity },
  { name: 'Setări', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-blue-600' : 'text-gray-400'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-200 p-3">
        <button className="flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Delogare
        </button>
      </div>
    </div>
  );
}
