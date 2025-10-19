import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply theme to document root and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      // Dark theme colors
      primary: '#667eea',
      secondary: '#764ba2',
      background: '#1a1a1a',
      surface: 'rgba(255, 255, 255, 0.1)',
      surfaceHover: 'rgba(255, 255, 255, 0.15)',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: 'rgba(255, 255, 255, 0.2)',
      cardBg: 'rgba(255, 255, 255, 0.05)',
      glassBg: 'rgba(0, 0, 0, 0.3)',
      gradientBg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      shadow: 'rgba(0, 0, 0, 0.5)',
    } : {
      // Light theme colors
      primary: '#667eea',
      secondary: '#764ba2',
      background: '#ffffff',
      surface: 'rgba(255, 255, 255, 0.9)',
      surfaceHover: 'rgba(255, 255, 255, 1)',
      text: '#333333',
      textSecondary: '#666666',
      border: 'rgba(0, 0, 0, 0.1)',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      glassBg: 'rgba(255, 255, 255, 0.25)',
      gradientBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};