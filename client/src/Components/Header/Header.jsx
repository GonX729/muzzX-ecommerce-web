import { useState, useContext } from 'react';

import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { Link } from 'react-router-dom';

//components
import CustomButtons from './CustomButtons';
import Search from './Search';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { LoginContext } from '../../context/ContextProvider';

const StyledHeader = styled(AppBar)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 70px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    }
`;

const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    color: #FFFFFF;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
        filter: brightness(1.1);
    }
`;

const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const LogoText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(135deg, #fff 0%, #d4af37 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
    
    '&:hover': {
        transform: 'scale(1.05)',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
    }
}))

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    color: 'white',
    transition: 'all 0.3s ease',
    
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.1)'
    },
    
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 auto',
    animation: 'slideInRight 0.6s ease-out',
    
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const ModernDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

const Header = () => {
    // Using a text-based logo since we don't have a MuzzX image logo
    const logoText = 'MuzzX';
    
    const { isDarkMode, colors } = useTheme();
    const { account } = useContext(LoginContext);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box 
            style={{ 
                width: 280, 
                padding: '20px',
                background: 'transparent'
            }} 
            onClick={handleClose}
        >
            <List style={{ padding: 0 }}>
                <Box 
                    style={{ 
                        padding: '20px',
                        borderRadius: '15px',
                        background: colors.surface,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${colors.border}`
                    }}
                >
                    <CustomButtons />
                </Box>
            </List>
        </Box>
    );

    return (
        <StyledHeader 
            position="fixed" 
            className="animate-fade-in"
            style={{ 
                background: isDarkMode 
                    ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
        >
            <Toolbar style={{ minHeight: 70, padding: '0 20px' }}>
                <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>

                <ModernDrawer open={open} onClose={handleClose}>
                    {list()}
                </ModernDrawer>

                <Component to='/' className="animate-slide-left">
                    <LogoText component="h1">
                        {logoText}
                    </LogoText>
                    <Box component="span" style={{ display: 'flex', marginLeft: '8px', alignItems: 'center' }}>
                        <SubHeading>Premium&nbsp;
                            <Box component="span" style={{color:'#d4af37', fontWeight: 600}}>
                                Quality
                            </Box>
                        </SubHeading>
                    </Box>
                </Component>
                
                <Box style={{ flex: 1, margin: '0 20px' }} className="animate-scale">
                    <Search />
                </Box>
                
                {/* Theme Toggle Button - Only show when logged in */}
                {account && (
                    <Box style={{ marginRight: '15px' }}>
                        <ThemeToggle />
                    </Box>
                )}
                
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;