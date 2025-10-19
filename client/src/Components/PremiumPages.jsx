import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PremiumNavigation from './PremiumNavigation';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%)',
  paddingTop: theme.spacing(12),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 3),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #d4af37 0%, #e8d89e 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const BackButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
  color: '#0a0e27',
  borderRadius: '25px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 700,
  textTransform: 'none',
  marginTop: theme.spacing(4),
  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #c5a028 0%, #d4af37 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)',
  },
}));

// Collections Page
export const Collections = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>Our Collections</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Browse through our carefully curated product collections designed to meet your lifestyle needs.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        We're organizing our collections to make your shopping experience even better. Check back soon!
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// About Page
export const About = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>About MuzzX</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        MuzzX is your trusted destination for quality products and exceptional shopping experiences.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Founded in 2023, we're committed to bringing you the best products with outstanding customer service.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Contact Page
export const Contact = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>Contact Us</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Have questions? We're here to help! Reach out to our friendly customer support team.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Our contact form and support center are being set up. For now, feel free to explore our products!
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Profile Page
export const Profile = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>My Profile</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Manage your account settings and preferences in your personal luxury dashboard.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Your personalized profile experience is being crafted with premium features.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Orders Page
export const Orders = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>My Orders</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Track your luxury purchases and view your order history with detailed information.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Advanced order tracking and management features are in development.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Wishlist Page
export const Wishlist = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>My Wishlist</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Save and organize your favorite luxury items for future consideration.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        A sophisticated wishlist management system is being prepared for you.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Category Page
export const Category = ({ category }) => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'}</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Explore our premium selection of {category} items curated for luxury enthusiasts.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Advanced category browsing with filters and sorting options are being developed.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Search Results Page
export const SearchResults = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>Search Results</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Discover luxury items that match your search criteria.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Advanced search functionality with AI-powered recommendations is coming soon.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);

// Settings Page
export const Settings = () => (
  <PageContainer>
    <PremiumNavigation />
    <ContentContainer>
      <PageTitle>Settings</PageTitle>
      <Typography variant="h6" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
        Customize your luxury shopping experience with personalized preferences.
      </Typography>
      <Typography variant="body1" sx={{ color: '#e8e8e8', mb: 4 }}>
        Comprehensive settings panel with theme options and preferences is in development.
      </Typography>
      <BackButton component={Link} to="/" startIcon={<ArrowBack />}>
        Back to Home
      </BackButton>
    </ContentContainer>
  </PageContainer>
);