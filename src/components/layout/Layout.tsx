import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="flex justify-between items-center p-2 border-b border-gray-800">
        <h1 className="text-xl font-bold sm:mx-50">DemoApp</h1>
        <div className="flex items-center space-x-4 sm:mx-50">
          <Search className="h-5 w-5 text-gray-400" />
          <HelpCircle className="h-5 w-5 text-gray-400" />
          <Bell className="h-5 w-5 text-gray-400" />
        </div>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;