import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/layout/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PortfolioPage from './pages/PortfolioPage';
import FirePage from './pages/FirePage';
import TaxPage from './pages/TaxPage';
import ShieldPage from './pages/ShieldPage';

function AppContent() {
  const { activePage } = useUser();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'auth':
        return <AuthPage />;
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'fire':
        return <FirePage />;
      case 'tax':
        return <TaxPage />;
      case 'shield':
        return <ShieldPage />;
      default:
        return <AuthPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans">
      {/* Show Navbar on all pages, including Auth for easy switching */}
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
