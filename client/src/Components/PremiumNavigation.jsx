import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme as useMUITheme,
  Autocomplete,
  Avatar,
  Divider
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  ShoppingCart,
  FavoriteBorder,
  Person,
  Menu as MenuIcon,
  Close,
  ArrowDropDown,
  Notifications
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled 
    ? 'rgba(255, 255, 255, 0.95)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  borderBottom: scrolled 
    ? '1px solid rgba(0, 0, 0, 0.1)'
    : '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: scrolled 
    ? '0 4px 20px rgba(0, 0, 0, 0.1)'
    : 'none',
  transition: 'all 0.3s ease',
  color: '#000',
  position: 'fixed',
  zIndex: 1300,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2rem',
  fontWeight: 800,
  color: '#000',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #000 0%, #d4af37 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const NavMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: '#000',
  fontWeight: 500,
  fontSize: '1rem',
  textTransform: 'none',
  position: 'relative',
  padding: theme.spacing(1, 0),
  minWidth: 'auto',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '2px',
    background: '#d4af37',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    background: 'transparent',
    '&::after': {
      width: '100%',
    },
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: alpha('#000', 0.05),
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: alpha('#000', 0.08),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 'auto',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontSize: '0.9rem',
    '&::placeholder': {
      color: '#999',
    },
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  background: '#000',
  color: '#fff',
  width: 45,
  height: 45,
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#d4af37',
    color: '#000',
    transform: 'scale(1.1)',
  },
}));

const CartBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    background: '#c0392b',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.7rem',
    animation: 'pulse 2s infinite',
  },
}));

const MegaMenuContainer = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    marginTop: theme.spacing(1),
    minWidth: '600px',
    padding: theme.spacing(2),
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
}));

const CategoryGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  padding: theme.spacing(1),
}));

const CategoryItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  textAlign: 'center',
  '&:hover': {
    background: 'rgba(212, 175, 55, 0.1)',
    transform: 'translateY(-3px)',
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: theme.spacing(2),
  },
}));

const UserMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    marginTop: theme.spacing(1),
    minWidth: '200px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
}));

const PremiumNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoriesAnchor, setCategoriesAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [cartItems] = useState(3); // Mock cart items
  const [wishlistItems] = useState(5); // Mock wishlist items
  
  const muiTheme = useMUITheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Sample search suggestions
  const searchSuggestions = [
    'Luxury Watches',
    'Designer Bags',
    'Premium Jewelry',
    'Exclusive Shoes',
    'High-end Electronics',
    'Artisan Crafts',
    'Limited Edition Items',
  ];

  // Sample categories for mega menu
  const categories = [
    { name: 'Fashion', icon: '👗', description: 'Latest trends' },
    { name: 'Electronics', icon: '📱', description: 'Tech essentials' },
    { name: 'Home & Living', icon: '🏠', description: 'Comfort & style' },
    { name: 'Beauty', icon: '💄', description: 'Premium cosmetics' },
    { name: 'Sports', icon: '⚽', description: 'Active lifestyle' },
    { name: 'Books', icon: '📚', description: 'Knowledge & wisdom' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoriesOpen = (event) => {
    setCategoriesAnchor(event.currentTarget);
  };

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSearchSubmit = (value) => {
    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
      setSearchValue('');
    }
  };

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <StyledAppBar scrolled={scrolled} elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Logo component={Link} to="/" variant="h4">
            MuzzX
          </Logo>

          {/* Desktop Navigation */}
          <NavMenu>
            {navigationLinks.map((link) => (
              <NavLink
                key={link.label}
                component={Link}
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}
            
            <NavLink
              onClick={handleCategoriesOpen}
              endIcon={<ArrowDropDown />}
            >
              Categories
            </NavLink>
          </NavMenu>

          {/* Search Bar */}
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              freeSolo
              options={searchSuggestions}
              value={searchValue}
              onChange={(event, newValue) => {
                if (newValue) handleSearchSubmit(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setSearchValue(newInputValue);
              }}
              renderInput={(params) => (
                <StyledInputBase
                  {...params.InputProps}
                  placeholder="Search luxury items..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(searchValue);
                    }
                  }}
                />
              )}
              PaperComponent={({ children, ...props }) => (
                <Box
                  {...props}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    mt: 1,
                  }}
                >
                  {children}
                </Box>
              )}
            />
          </SearchContainer>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <>
                <ActionButton>
                  <Notifications />
                </ActionButton>
                
                <ActionButton>
                  <Badge badgeContent={wishlistItems} color="error">
                    <FavoriteBorder />
                  </Badge>
                </ActionButton>
              </>
            )}
            
            <ActionButton component={Link} to="/cart">
              <CartBadge badgeContent={cartItems} color="error">
                <ShoppingCart />
              </CartBadge>
            </ActionButton>
            
            {!isMobile ? (
              <ActionButton onClick={handleUserMenuOpen}>
                <Person />
              </ActionButton>
            ) : (
              <ActionButton onClick={() => setMobileMenuOpen(true)}>
                <MenuIcon />
              </ActionButton>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Categories Mega Menu */}
      <MegaMenuContainer
        anchorEl={categoriesAnchor}
        open={Boolean(categoriesAnchor)}
        onClose={handleCategoriesClose}
        MenuListProps={{
          'aria-labelledby': 'categories-button',
        }}
      >
        <Typography
          variant="h6"
          sx={{ 
            fontWeight: 600, 
            mb: 2, 
            color: '#000',
            fontFamily: '"Playfair Display", serif'
          }}
        >
          Shop by Category
        </Typography>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryItem
              key={category.name}
              component={Link}
              to={`/category/${category.name.toLowerCase()}`}
              onClick={handleCategoriesClose}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                {category.icon}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#000' }}>
                {category.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                {category.description}
              </Typography>
            </CategoryItem>
          ))}
        </CategoryGrid>
      </MegaMenuContainer>

      {/* User Menu */}
      <UserMenu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose} component={Link} to="/profile">
          <Avatar sx={{ mr: 2, width: 24, height: 24 }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} component={Link} to="/orders">
          My Orders
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} component={Link} to="/wishlist">
          Wishlist
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose} component={Link} to="/settings">
          Settings
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          Logout
        </MenuItem>
      </UserMenu>

      {/* Mobile Drawer */}
      <MobileDrawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#000' }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        
        <List>
          {navigationLinks.map((link) => (
            <ListItem 
              key={link.label}
              button 
              component={Link} 
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
          
          <Divider sx={{ my: 2 }} />
          
          {categories.map((category) => (
            <ListItem 
              key={category.name}
              button 
              component={Link} 
              to={`/category/${category.name.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText 
                primary={`${category.icon} ${category.name}`}
                secondary={category.description}
              />
            </ListItem>
          ))}
          
          <Divider sx={{ my: 2 }} />
          
          <ListItem button component={Link} to="/profile" onClick={() => setMobileMenuOpen(false)}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
            <ListItemText primary="Wishlist" />
          </ListItem>
          <ListItem button component={Link} to="/orders" onClick={() => setMobileMenuOpen(false)}>
            <ListItemText primary="My Orders" />
          </ListItem>
        </List>
      </MobileDrawer>

      {/* Add pulse animation for cart badge */}
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

export default PremiumNavigation;