import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  Modal,
  Grid,
  Zoom,
  Tooltip,
  Snackbar,
  Alert,
  ButtonGroup,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FavoriteBorder,
  Favorite,
  Visibility,
  ShoppingCart,
  Compare,
  Share,
  LocalOffer,
  Verified,
  Close,
  ShoppingBag
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';

const ProductGridContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1400px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const GridHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'stretch',
  },
}));

const FilterBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const ProductGrid = styled(Grid)(({ theme }) => ({
  '& .MuiGrid-item': {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  cursor: 'pointer',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    '& .product-image': {
      transform: 'scale(1.1)',
      filter: 'brightness(1.1)',
    },
    '& .overlay-actions': {
      opacity: 1,
      visibility: 'visible',
    },
    '& .price-container': {
      transform: 'translateY(-5px)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '280px',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'all 0.6s ease',
  filter: 'brightness(1.05)',
}));

const OverlayActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  gap: theme.spacing(1),
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease',
  zIndex: 2,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  color: '#000',
  width: 50,
  height: 50,
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    background: '#d4af37',
    color: '#fff',
    transform: 'scale(1.1)',
  },
}));

const WishlistButton = styled(IconButton)(({ theme, isWishlisted }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  width: 40,
  height: 40,
  zIndex: 3,
  transition: 'all 0.3s ease',
  color: isWishlisted ? '#e74c3c' : '#666',
  '&:hover': {
    background: '#e74c3c',
    color: '#fff',
    transform: 'scale(1.1)',
  },
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.8rem',
  zIndex: 3,
  '& .MuiChip-label': {
    padding: '4px 8px',
  },
}));

const TrendingBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '0.7rem',
  zIndex: 3,
}));

const ProductInfo = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2.5),
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: '24px',
  background: 'rgba(212, 175, 55, 0.1)',
  color: '#d4af37',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  alignSelf: 'flex-start',
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  lineHeight: 1.4,
  marginBottom: theme.spacing(1),
  color: '#2c3e50',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  transition: 'transform 0.3s ease',
}));

const CurrentPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#2c3e50',
  fontFamily: '"Playfair Display", serif',
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#95a5a6',
  textDecoration: 'line-through',
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: '#fff',
  borderRadius: '12px',
  padding: theme.spacing(1.2, 2),
  fontWeight: 600,
  textTransform: 'none',
  marginTop: 'auto',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
  },
}));

const QuickViewModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const ModalContent = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '20px',
  padding: theme.spacing(4),
  maxWidth: '800px',
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto',
  position: 'relative',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: '#fff',
  borderRadius: '25px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  fontSize: '1.1rem',
  textTransform: 'none',
  margin: theme.spacing(4, 'auto', 0),
  display: 'block',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
  },
}));

const PremiumProductGrid = ({ products = [], loading = false }) => {
  const [wishlisted, setWishlisted] = useState(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [cartItems, setCartItems] = useState(new Set());
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Mock product data if none provided
  const mockProducts = [
    {
      id: 1,
      title: { shortTitle: 'Premium Wireless Headphones' },
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      price: { mrp: 299, cost: 199, discount: '33% off' },
      category: 'Electronics',
      rating: 4.8,
      reviews: 234,
      tagline: 'Studio Quality Sound',
      isNew: true,
      isTrending: true,
    },
    {
      id: 2,
      title: { shortTitle: 'Luxury Leather Handbag' },
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
      price: { mrp: 599, cost: 399, discount: '33% off' },
      category: 'Fashion',
      rating: 4.9,
      reviews: 189,
      tagline: 'Handcrafted Excellence',
      isNew: false,
      isTrending: true,
    },
    {
      id: 3,
      title: { shortTitle: 'Smart Fitness Watch' },
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      price: { mrp: 399, cost: 299, discount: '25% off' },
      category: 'Electronics',
      rating: 4.7,
      reviews: 156,
      tagline: 'Track Your Progress',
      isNew: true,
      isTrending: false,
    },
    {
      id: 4,
      title: { shortTitle: 'Artisan Coffee Set' },
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
      price: { mrp: 129, cost: 89, discount: '31% off' },
      category: 'Home',
      rating: 4.6,
      reviews: 89,
      tagline: 'Premium Brewing Experience',
      isNew: false,
      isTrending: false,
    },
    {
      id: 5,
      title: { shortTitle: 'Designer Sunglasses' },
      url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
      price: { mrp: 249, cost: 179, discount: '28% off' },
      category: 'Fashion',
      rating: 4.8,
      reviews: 267,
      tagline: 'UV Protection & Style',
      isNew: true,
      isTrending: true,
    },
    {
      id: 6,
      title: { shortTitle: 'Organic Skincare Set' },
      url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
      price: { mrp: 199, cost: 149, discount: '25% off' },
      category: 'Beauty',
      rating: 4.9,
      reviews: 198,
      tagline: 'Natural Radiance',
      isNew: false,
      isTrending: true,
    },
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;
  const filters = ['all', 'electronics', 'fashion', 'home', 'beauty'];
  const sortOptions = ['featured', 'price-low', 'price-high', 'rating', 'newest'];

  useEffect(() => {
    if (inView && visibleProducts < displayProducts.length) {
      setTimeout(() => {
        setVisibleProducts(prev => Math.min(prev + 4, displayProducts.length));
      }, 500);
    }
  }, [inView, visibleProducts, displayProducts.length]);

  const handleWishlist = (productId) => {
    setWishlisted(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        showSnackbar('Removed from wishlist', 'info');
      } else {
        newSet.add(productId);
        showSnackbar('Added to wishlist', 'success');
      }
      return newSet;
    });
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => new Set(prev).add(product.id));
    showSnackbar(`${product.title.shortTitle} added to cart!`, 'success');
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredProducts = displayProducts.filter(product => {
    if (currentFilter === 'all') return true;
    return product.category.toLowerCase() === currentFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price.cost - b.price.cost;
      case 'price-high':
        return b.price.cost - a.price.cost;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  const renderProductSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ borderRadius: '20px', overflow: 'hidden' }}>
            <Skeleton variant="rectangular" height={280} />
            <CardContent>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="40%" height={32} sx={{ mt: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: '12px' }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <ProductGridContainer id="products-section">
      <GridHeader>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: '#2c3e50',
              mb: 1,
            }}
          >
            Premium Collection
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#7f8c8d',
              fontWeight: 400,
            }}
          >
            Discover our handpicked selection of luxury items
          </Typography>
        </Box>

        <FilterBar>
          <ButtonGroup variant="outlined" sx={{ mr: 2 }}>
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={currentFilter === filter ? 'contained' : 'outlined'}
                onClick={() => setCurrentFilter(filter)}
                sx={{
                  textTransform: 'capitalize',
                  borderColor: '#d4af37',
                  color: currentFilter === filter ? '#fff' : '#d4af37',
                  background: currentFilter === filter ? '#d4af37' : 'transparent',
                  '&:hover': {
                    background: '#d4af37',
                    color: '#fff',
                  },
                }}
              >
                {filter}
              </Button>
            ))}
          </ButtonGroup>

          <ButtonGroup variant="outlined">
            {sortOptions.map((option) => (
              <Button
                key={option}
                variant={sortBy === option ? 'contained' : 'outlined'}
                onClick={() => setSortBy(option)}
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '0.85rem',
                  borderColor: '#2c3e50',
                  color: sortBy === option ? '#fff' : '#2c3e50',
                  background: sortBy === option ? '#2c3e50' : 'transparent',
                }}
              >
                {option.replace('-', ' ')}
              </Button>
            ))}
          </ButtonGroup>
        </FilterBar>
      </GridHeader>

      {loading ? renderProductSkeleton() : (
        <ProductGrid container spacing={3}>
          {sortedProducts.slice(0, visibleProducts).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Zoom in={true} timeout={300 + index * 100}>
                <ProductCard>
                  <ImageContainer>
                    <ProductImage
                      src={product.url}
                      alt={product.title.shortTitle}
                      className="product-image"
                    />
                    
                    {product.discount && (
                      <DiscountBadge label={product.discount} />
                    )}
                    
                    {product.isTrending && (
                      <TrendingBadge 
                        label="🔥 Trending" 
                        sx={{ top: product.discount ? 56 : 12 }}
                      />
                    )}
                    
                    <WishlistButton
                      isWishlisted={wishlisted.has(product.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlist(product.id);
                      }}
                    >
                      {wishlisted.has(product.id) ? <Favorite /> : <FavoriteBorder />}
                    </WishlistButton>

                    <OverlayActions className="overlay-actions">
                      <Tooltip title="Quick View">
                        <ActionButton onClick={() => handleQuickView(product)}>
                          <Visibility />
                        </ActionButton>
                      </Tooltip>
                      <Tooltip title="Compare">
                        <ActionButton>
                          <Compare />
                        </ActionButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <ActionButton>
                          <Share />
                        </ActionButton>
                      </Tooltip>
                    </OverlayActions>
                  </ImageContainer>

                  <ProductInfo>
                    <CategoryChip 
                      label={product.category} 
                      size="small"
                      icon={<LocalOffer sx={{ fontSize: '0.8rem !important' }} />}
                    />
                    
                    <ProductTitle variant="h6">
                      {product.title.shortTitle}
                    </ProductTitle>

                    <RatingContainer>
                      <Rating 
                        value={product.rating} 
                        precision={0.1} 
                        size="small" 
                        readOnly 
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews})
                      </Typography>
                      <Verified sx={{ fontSize: '1rem', color: '#27ae60', ml: 0.5 }} />
                    </RatingContainer>

                    <PriceContainer className="price-container">
                      <CurrentPrice>
                        ${product.price.cost}
                      </CurrentPrice>
                      {product.price.mrp > product.price.cost && (
                        <OriginalPrice>
                          ${product.price.mrp}
                        </OriginalPrice>
                      )}
                    </PriceContainer>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2, fontStyle: 'italic' }}
                    >
                      {product.tagline}
                    </Typography>

                    <AddToCartButton
                      fullWidth
                      startIcon={cartItems.has(product.id) ? <ShoppingBag /> : <ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      disabled={cartItems.has(product.id)}
                    >
                      {cartItems.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
                    </AddToCartButton>
                  </ProductInfo>
                </ProductCard>
              </Zoom>
            </Grid>
          ))}
        </ProductGrid>
      )}

      {visibleProducts < sortedProducts.length && (
        <Box ref={loadMoreRef} sx={{ textAlign: 'center', mt: 4 }}>
          <LoadMoreButton>
            Load More Products
          </LoadMoreButton>
        </Box>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      >
        <ModalContent>
          {quickViewProduct && (
            <>
              <IconButton
                onClick={() => setQuickViewProduct(null)}
                sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
              >
                <Close />
              </IconButton>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={quickViewProduct.url}
                    alt={quickViewProduct.title.shortTitle}
                    sx={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    {quickViewProduct.title.shortTitle}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={quickViewProduct.rating} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({quickViewProduct.reviews} reviews)
                    </Typography>
                  </Box>
                  
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    ${quickViewProduct.price.cost}
                    {quickViewProduct.price.mrp > quickViewProduct.price.cost && (
                      <Typography
                        component="span"
                        sx={{ 
                          ml: 1, 
                          textDecoration: 'line-through', 
                          color: 'text.secondary',
                          fontSize: '1rem'
                        }}
                      >
                        ${quickViewProduct.price.mrp}
                      </Typography>
                    )}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {quickViewProduct.tagline}. Experience premium quality and exceptional craftsmanship with this carefully selected item from our luxury collection.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCart />}
                      sx={{
                        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                        flex: 1,
                      }}
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                    >
                      Add to Cart
                    </Button>
                    
                    <IconButton
                      onClick={() => handleWishlist(quickViewProduct.id)}
                      sx={{
                        border: '2px solid #e74c3c',
                        color: wishlisted.has(quickViewProduct.id) ? '#e74c3c' : '#666',
                      }}
                    >
                      {wishlisted.has(quickViewProduct.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </ModalContent>
      </QuickViewModal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: '12px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ProductGridContainer>
  );
};

export default PremiumProductGrid;