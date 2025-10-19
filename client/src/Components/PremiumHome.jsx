import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { Security, LocalShipping, Support, Verified, Star } from '@mui/icons-material';

// Import the new premium components
import LuxuryHero from './LuxuryHero';
import PremiumNavigation from './PremiumNavigation';
import PremiumProductGrid from './PremiumProductGrid';
import PremiumFloatingActions from './PremiumFloatingActions';

const HomeContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #d4af37 0%, #e8d89e 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#a0a0a0',
  maxWidth: '600px',
  margin: '0 auto',
  marginBottom: theme.spacing(6),
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e2139 0%, #252945 100%)',
  padding: theme.spacing(8, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(180deg, #1a1d35 0%, #1e2139 100%)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(4, 3),
  borderRadius: '20px',
  border: '1px solid rgba(212, 175, 55, 0.2)',
  boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)',
  transition: 'all 0.4s ease',
  background: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)',
    borderColor: 'rgba(212, 175, 55, 0.5)',
    '& .feature-icon': {
      transform: 'scale(1.1)',
      background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
      color: '#0a0e27',
    },
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
  color: '#0a0e27',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  fontSize: '2rem',
  transition: 'all 0.4s ease',
}));

const TestimonialSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e2139 0%, #252945 100%)',
  color: '#fff',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
    `,
    zIndex: 1,
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  background: 'rgba(212, 175, 55, 0.1)',
  backdropFilter: 'blur(20px)',
  color: '#fff',
  border: '1px solid rgba(212, 175, 55, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  height: '100%',
  position: 'relative',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'rgba(212, 175, 55, 0.2)',
    borderColor: 'rgba(212, 175, 55, 0.5)',
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
  padding: theme.spacing(6, 0),
  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '3rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #d4af37 0%, #e8d89e 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#a0a0a0',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const BrandStorySection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1d35 0%, #1e2139 100%)',
  padding: theme.spacing(8, 0),
}));

const NewsletterSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
  color: '#0a0e27',
  padding: theme.spacing(6, 0),
  textAlign: 'center',
}));

const PremiumHome = () => {
  const dispatch = useDispatch();
  const getProductsState = useSelector(state => state.getProducts);
  const { products, loading } = getProductsState;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const features = [
    {
      icon: <LocalShipping />,
      title: 'Fast & Reliable Delivery',
      description: 'Free shipping on orders over $150. We ensure your MuzzX products reach you safely and quickly.'
    },
    {
      icon: <Security />,
      title: 'Secure Shopping',
      description: 'Your data is protected with industry-standard security. Shop with confidence at MuzzX.'
    },
    {
      icon: <Support />,
      title: 'Customer Support',
      description: 'Our friendly support team is here to help you with any questions about your MuzzX experience.'
    },
    {
      icon: <Verified />,
      title: 'Quality Assured',
      description: 'Every MuzzX product goes through quality checks to ensure you receive only the best.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b142?w=100&h=100&fit=crop&crop=face',
      comment: 'Great quality products and excellent customer service. MuzzX has become my trusted shopping destination.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Regular Shopper',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      comment: 'Love the product variety and fast shipping. The MuzzX team really cares about customer satisfaction.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'MuzzX Customer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      comment: 'Reliable platform with good products. I appreciate the attention to detail in packaging and delivery.',
      rating: 5
    }
  ];

  const stats = [
    { number: '15K+', label: 'Happy Customers' },
    { number: '500+', label: 'Quality Products' },
    { number: '50+', label: 'Trusted Brands' },
    { number: '4.8', label: 'Customer Rating' }
  ];

  return (
    <HomeContainer>
      {/* Premium Navigation */}
      <PremiumNavigation />
      
      {/* Luxury Hero Section */}
      <LuxuryHero />

      {/* Features Section */}
      <FeatureSection>
        <SectionContainer>
          <SectionTitle variant="h2">
            Why Choose MuzzX?
          </SectionTitle>
          <SectionSubtitle>
            Discover what makes MuzzX your trusted partner for quality products and exceptional service.
          </SectionSubtitle>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard>
                  <FeatureIcon className="feature-icon">
                    {feature.icon}
                  </FeatureIcon>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      color: '#e8e8e8'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#a0a0a0',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>
      </FeatureSection>

      {/* Premium Product Grid */}
      <PremiumProductGrid products={products} loading={loading} />

      {/* Brand Story Section */}
      <BrandStorySection>
        <SectionContainer>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: '#e8e8e8',
                  mb: 3,
                }}
              >
                The MuzzX Story
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#a0a0a0',
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                MuzzX was created to bring you carefully selected products that combine quality, style, and value. We believe that everyone deserves access to great products and exceptional shopping experiences.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label="Est. 2023" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                    color: '#fff',
                    fontWeight: 600
                  }}
                />
                <Chip 
                  label="Worldwide Shipping" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                    color: '#fff',
                    fontWeight: 600
                  }}
                />
                <Chip 
                  label="Quality Assured" 
                  icon={<Verified sx={{ color: '#fff !important' }} />}
                  sx={{ 
                    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                    color: '#fff',
                    fontWeight: 600
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Luxury craftsmanship"
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Grid>
          </Grid>
        </SectionContainer>
      </BrandStorySection>

      {/* Statistics Section */}
      <StatsSection>
        <SectionContainer>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatCard>
                  <StatNumber>
                    {stat.number}
                  </StatNumber>
                  <StatLabel>
                    {stat.label}
                  </StatLabel>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>
      </StatsSection>

      {/* Testimonials Section */}
      <TestimonialSection>
        <SectionContainer>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
              position: 'relative',
              zIndex: 2,
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '1.2rem',
              opacity: 0.9,
              mb: 6,
              position: 'relative',
              zIndex: 2,
            }}
          >
            Read what our valued customers have to say about their MuzzX experience.
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: '#d4af37', fontSize: '1.5rem' }} />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      mb: 3,
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar}
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        mr: 2,
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>
      </TestimonialSection>

      {/* Newsletter Section */}
      <NewsletterSection>
        <SectionContainer>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Join Our Exclusive Community
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4,
              maxWidth: '600px',
              margin: '0 auto',
              marginBottom: 4,
            }}
          >
            Be the first to discover new luxury arrivals, exclusive offers, and insider access to premium collections.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: '#fff',
              color: '#d4af37',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '12px 40px',
              borderRadius: '30px',
              textTransform: 'none',
              '&:hover': {
                background: '#f8f9fa',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Subscribe Now
          </Button>
        </SectionContainer>
      </NewsletterSection>

      {/* Premium Floating Actions */}
      <PremiumFloatingActions />
    </HomeContainer>
  );
};

export default PremiumHome;