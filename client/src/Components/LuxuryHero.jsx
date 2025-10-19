import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ArrowForward, PlayArrow, Star } from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #000 0%, #2d2d2d 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(44, 62, 80, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 90, 60, 0.1) 0%, transparent 50%)
    `,
    zIndex: 1,
    animation: 'backgroundFloat 20s ease-in-out infinite alternate',
  },
}));

const HeroBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.4,
    filter: 'brightness(0.7)',
  },
});

const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: '#fff',
  padding: theme.spacing(0, 3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2),
  },
}));

const HeroBadge = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  background: 'rgba(212, 175, 55, 0.2)',
  color: '#d4af37',
  padding: theme.spacing(1, 3),
  borderRadius: '30px',
  border: '1px solid #d4af37',
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 500,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(4),
  animation: 'fadeInUp 1s ease-out 0.2s both',
  fontSize: '0.9rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: theme.spacing(0.8, 2),
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 800,
  lineHeight: 1.1,
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #fff 0%, #d4af37 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'fadeInUp 1s ease-out 0.4s both',
  fontSize: 'clamp(3rem, 8vw, 6rem)',
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(2rem, 8vw, 3rem)',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  marginBottom: theme.spacing(6),
  opacity: 0.9,
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  animation: 'fadeInUp 1s ease-out 0.6s both',
  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1rem, 4vw, 1.2rem)',
    marginBottom: theme.spacing(4),
  },
}));

const CTAContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  animation: 'fadeInUp 1s ease-out 0.8s both',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
  color: '#000',
  border: 'none',
  padding: theme.spacing(2, 4),
  borderRadius: '30px',
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 700,
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '280px',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#fff',
  border: '2px solid rgba(255, 255, 255, 0.5)',
  padding: theme.spacing(1.8, 3.8),
  borderRadius: '30px',
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 600,
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#fff',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '280px',
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(8),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(6),
  zIndex: 2,
  animation: 'fadeInUp 1s ease-out 1s both',
  [theme.breakpoints.down('md')]: {
    bottom: theme.spacing(4),
    gap: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: '#fff',
  '& .stat-number': {
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.5rem',
    fontWeight: 700,
    display: 'block',
    background: 'linear-gradient(135deg, #fff 0%, #d4af37 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  '& .stat-label': {
    fontSize: '0.9rem',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 500,
  },
  [theme.breakpoints.down('sm')]: {
    '& .stat-number': {
      fontSize: '2rem',
    },
    '& .stat-label': {
      fontSize: '0.8rem',
    },
  },
}));

const ScrollIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#fff',
  opacity: 0.6,
  animation: 'bounce 2s infinite',
  cursor: 'pointer',
  zIndex: 2,
  '& .scroll-text': {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: theme.spacing(1),
  },
  '& .scroll-arrow': {
    fontSize: '1.5rem',
    animation: 'bounceArrow 2s infinite',
  },
}));

// Keyframes for animations
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes backgroundFloat {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(1deg);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40%, 43% {
      transform: translateX(-50%) translateY(-10px);
    }
    70% {
      transform: translateX(-50%) translateY(-5px);
    }
    90% {
      transform: translateX(-50%) translateY(-2px);
    }
  }
  
  @keyframes bounceArrow {
    0%, 20%, 53%, 80%, 100% {
      transform: translateY(0);
    }
    40%, 43% {
      transform: translateY(-10px);
    }
    70% {
      transform: translateY(-5px);
    }
  }
`;

const LuxuryHero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <HeroSection>
        <HeroBackground>
          <img 
            src={heroImages[currentImage]} 
            alt="Luxury Shopping Experience"
            style={{
              transition: 'opacity 1s ease-in-out',
            }}
          />
        </HeroBackground>
        
        <HeroContent maxWidth="lg">
          <HeroBadge>
            MuzzX Exclusive 2025
          </HeroBadge>
          
          <HeroTitle variant="h1">
            Welcome to MuzzX
          </HeroTitle>
          
          <HeroSubtitle variant="h4">
            Your premium destination for curated excellence. We bring you handpicked products that blend quality, style, and innovation - because you deserve nothing but the best.
          </HeroSubtitle>
          
          <CTAContainer>
            <PrimaryButton
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              component={Link}
              to="/collections"
            >
              Explore Now
            </PrimaryButton>
            
            <SecondaryButton
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
            >
              Brand Story
            </SecondaryButton>
          </CTAContainer>
        </HeroContent>
        
        <StatsContainer>
          <StatItem>
            <span className="stat-number">15K+</span>
            <span className="stat-label">Satisfied Customers</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">500+</span>
            <span className="stat-label">Quality Products</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">50+</span>
            <span className="stat-label">Trusted Brands</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">
              <Star sx={{ fontSize: '2.5rem', verticalAlign: 'top' }} />
              4.8
            </span>
            <span className="stat-label">Customer Rating</span>
          </StatItem>
        </StatsContainer>
        
        <ScrollIndicator onClick={scrollToProducts}>
          <div className="scroll-text">Explore</div>
          <ArrowForward className="scroll-arrow" sx={{ transform: 'rotate(90deg)' }} />
        </ScrollIndicator>
      </HeroSection>
    </>
  );
};

export default LuxuryHero;