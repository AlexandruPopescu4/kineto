import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <p className="text-center text-xs text-gray-400">
            Realizat de Otilia Stratu în cadrul proiectului ODA
          </p>
        </footer>
      </div>
    </div>
  );
}
