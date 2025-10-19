// MuzzX Global Theme Configuration
export const muzzxTheme = {
  // Color Palette
  colors: {
    // Primary Dark Theme
    background: {
      primary: '#0a0e27',
      secondary: '#1a1d35',
      card: '#1e2139',
      surface: '#252945',
      elevated: '#2d325a',
    },
    
    // Gold Accents
    gold: {
      primary: '#d4af37',
      secondary: '#c5a028',
      light: '#e8d89e',
      dark: '#b8941f',
    },
    
    // Text Colors
    text: {
      primary: '#e8e8e8',
      secondary: '#a0a0a0',
      muted: '#808080',
      heading: '#ffffff',
    },
    
    // Status Colors
    status: {
      success: '#27ae60',
      error: '#ff6b6b',
      warning: '#f39c12',
      info: '#3498db',
    },
    
    // Border & Divider
    border: {
      default: 'rgba(212, 175, 55, 0.2)',
      light: 'rgba(212, 175, 55, 0.1)',
      strong: 'rgba(212, 175, 55, 0.3)',
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
      heading: '"Playfair Display", serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Border Radius
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '25px',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 8px rgba(212, 175, 55, 0.1)',
    md: '0 4px 15px rgba(212, 175, 55, 0.2)',
    lg: '0 8px 25px rgba(212, 175, 55, 0.3)',
    xl: '0 10px 40px rgba(212, 175, 55, 0.4)',
    glow: '0 0 20px rgba(212, 175, 55, 0.5)',
  },
  
  // Gradients
  gradients: {
    gold: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
    goldReverse: 'linear-gradient(135deg, #c5a028 0%, #d4af37 100%)',
    dark: 'linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%)',
    darkReverse: 'linear-gradient(135deg, #1a1d35 0%, #0a0e27 100%)',
    surface: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
    text: 'linear-gradient(135deg, #d4af37 0%, #e8d89e 100%)',
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  // Z-Index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export default muzzxTheme;
