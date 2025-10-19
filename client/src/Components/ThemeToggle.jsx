import React from 'react';
import { IconButton, styled } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = styled(IconButton)(({ theme, isDark }) => ({
  position: 'relative',
  width: '50px',
  height: '50px',
  background: isDark 
    ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)'
    : 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
  border: `2px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)'}`,
  borderRadius: '50%',
  color: isDark ? '#ffd700' : '#ffffff',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: isDark 
    ? '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 8px 25px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'scale(1.1) rotate(180deg)',
    boxShadow: isDark
      ? '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 12px 35px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  
  '&:hover::before': {
    left: '100%',
  },
  
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
    transition: 'all 0.3s ease',
    filter: isDark ? 'drop-shadow(0 0 8px #ffd700)' : 'drop-shadow(0 0 8px #ffffff)',
  },
  
  // Pulsing animation for dark mode
  ...(isDark && {
    animation: 'moonGlow 3s ease-in-out infinite alternate',
  }),
  
  // Sun rays animation for light mode
  ...(!isDark && {
    animation: 'sunRotate 8s linear infinite',
  }),
}));

const AnimatedIcon = styled('div')(({ isDark }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&::after': isDark ? {} : {
    content: '""',
    position: 'absolute',
    width: '60px',
    height: '60px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    animation: 'sunRays 4s linear infinite',
  },
}));

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeToggleButton
      onClick={toggleTheme}
      isDark={isDarkMode}
      aria-label="Toggle theme"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatedIcon isDark={isDarkMode}>
        {isDarkMode ? (
          <DarkMode />
        ) : (
          <LightMode />
        )}
      </AnimatedIcon>
    </ThemeToggleButton>
  );
};

export default ThemeToggle;