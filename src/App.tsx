import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './hooks/useApp';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Clean lazy loaded pages
const Landing = React.lazy(() => import('./pages/Landing'));
const Home = React.lazy(() => import('./pages/Home'));
const MyLocation = React.lazy(() => import('./pages/MyLocation'));
const Advisory = React.lazy(() => import('./pages/Advisory'));
const Alerts = React.lazy(() => import('./pages/Alerts'));
const About = React.lazy(() => import('./pages/About'));

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--background)' }}>
      {/* Sidebar - fixed 240px */}
      <Sidebar />
      
      {/* Main Content Area - takes remaining width */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '24px 28px' }}>
          <React.Suspense fallback={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div className="w-8 h-8 border-4 border-[#1E6091] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return (
      <React.Suspense fallback={<div style={{ height: '100vh', background: 'var(--background)' }} />}>
        <Landing />
      </React.Suspense>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/location" element={<MyLocation />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
