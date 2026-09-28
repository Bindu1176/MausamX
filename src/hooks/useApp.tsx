import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Location, Language } from '../types';
import { defaultLocation, getLocationById } from '../data/locations';

export type Theme = 'light' | 'dark';

interface AppState {
  selectedLocation: Location;
  setSelectedLocation: (loc: Location) => void;
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  forecastRange: number;
  setForecastRange: (range: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<Location>(defaultLocation);
  const [selectedLocationId, setSelectedLocationIdState] = useState<string>(defaultLocation.id);
  const [language, setLanguage] = useState<Language>('en');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [forecastRange, setForecastRange] = useState(7);
  
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('mausamx-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme to document
  useEffect(() => {
    localStorage.setItem('mausamx-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setSelectedLocation = (loc: Location) => {
    setSelectedLocationState(loc);
    setSelectedLocationIdState(loc.id);
  };

  const setSelectedLocationId = (id: string) => {
    const loc = getLocationById(id);
    if (loc) {
      setSelectedLocationState(loc);
      setSelectedLocationIdState(id);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        selectedLocationId,
        setSelectedLocationId,
        language,
        setLanguage,
        sidebarOpen,
        setSidebarOpen,
        searchOpen,
        setSearchOpen,
        notificationsOpen,
        setNotificationsOpen,
        forecastRange,
        setForecastRange,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
