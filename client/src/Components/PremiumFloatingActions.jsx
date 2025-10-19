import React, { useState, useEffect } from 'react';
import {
  Fab,
  Badge,
  Zoom,
  Tooltip,
  Box,
  Typography,
  IconButton,
  Slide,
  Paper,
  Divider,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ShoppingCart,
  Close,
  Add,
  Remove,
  Delete,
  KeyboardArrowUp
} from '@mui/icons-material';

const FloatingCartFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: '#fff',
  width: 60,
  height: 60,
  zIndex: 1300,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
  },
}));

const ScrollToTopFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(12),
  right: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  color: '#2c3e50',
  width: 50,
  height: 50,
  zIndex: 1300,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#fff',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const CartPreview = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(12),
  right: theme.spacing(3),
  width: 350,
  maxHeight: 400,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: theme.spacing(2),
  zIndex: 1300,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 32px)',
    right: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const CartHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const CartItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  marginBottom: theme.spacing(1),
  background: 'rgba(248, 249, 250, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(212, 175, 55, 0.1)',
  },
}));

const ItemImage = styled('img')(({ theme }) => ({
  width: 50,
  height: 50,
  objectFit: 'cover',
  borderRadius: '8px',
  marginRight: theme.spacing(1.5),
}));

const QuantityControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  padding: theme.spacing(0.5),
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  width: 24,
  height: 24,
  background: '#2c3e50',
  color: '#fff',
  '&:hover': {
    background: '#d4af37',
    transform: 'scale(1.1)',
  },
}));

const PremiumFloatingActions = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Luxury Leather Handbag',
      price: 399,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop'
    }
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <Zoom in={true} timeout={500}>
        <FloatingCartFab onClick={handleCartToggle}>
          <Badge 
            badgeContent={totalItems} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                background: '#e74c3c',
                color: '#fff',
                fontWeight: 600,
                animation: totalItems > 0 ? 'pulse 2s infinite' : 'none',
              }
            }}
          >
            <ShoppingCart sx={{ fontSize: '1.5rem' }} />
          </Badge>
        </FloatingCartFab>
      </Zoom>

      {/* Scroll to Top Button */}
      <Zoom in={showScrollTop} timeout={300}>
        <ScrollToTopFab onClick={scrollToTop}>
          <Tooltip title="Back to Top" placement="left">
            <KeyboardArrowUp />
          </Tooltip>
        </ScrollToTopFab>
      </Zoom>

      {/* Cart Preview Slide */}
      <Slide direction="up" in={cartOpen} timeout={400}>
        <CartPreview elevation={0}>
          <CartHeader>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#2c3e50',
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Shopping Cart ({totalItems})
            </Typography>
            <IconButton 
              onClick={() => setCartOpen(false)}
              sx={{ 
                color: '#7f8c8d',
                '&:hover': { 
                  background: 'rgba(231, 76, 60, 0.1)',
                  color: '#e74c3c'
                }
              }}
            >
              <Close />
            </IconButton>
          </CartHeader>

          <Divider sx={{ mb: 2, background: 'rgba(0, 0, 0, 0.1)' }} />

          <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
            {cartItems.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Your cart is empty
                </Typography>
              </Box>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  
                  <Box sx={{ flex: 1, mr: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#2c3e50',
                        mb: 0.5,
                        lineHeight: 1.3
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#d4af37',
                        fontWeight: 600
                      }}
                    >
                      ${item.price}
                    </Typography>
                  </Box>

                  <QuantityControls>
                    <QuantityButton 
                      size="small"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Remove sx={{ fontSize: '0.8rem' }} />
                    </QuantityButton>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        minWidth: '20px', 
                        textAlign: 'center',
                        fontWeight: 600
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    
                    <QuantityButton 
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Add sx={{ fontSize: '0.8rem' }} />
                    </QuantityButton>
                  </QuantityControls>

                  <IconButton 
                    size="small"
                    onClick={() => removeItem(item.id)}
                    sx={{ 
                      ml: 1,
                      color: '#e74c3c',
                      '&:hover': {
                        background: 'rgba(231, 76, 60, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Delete sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </CartItem>
              ))
            )}
          </Box>

          {cartItems.length > 0 && (
            <>
              <Divider sx={{ my: 2, background: 'rgba(0, 0, 0, 0.1)' }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#2c3e50'
                  }}
                >
                  Total:
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#d4af37',
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                  },
                }}
              >
                Checkout Now
              </Button>
            </>
          )}
        </CartPreview>
      </Slide>

      {/* CSS Animation for pulse effect */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default PremiumFloatingActions;