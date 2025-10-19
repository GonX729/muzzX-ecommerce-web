import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, Box, styled, Avatar, Divider, ListItemIcon } from '@mui/material';
import { 
    PowerSettingsNew, 
    AccountCircle, 
    ShoppingBag, 
    FavoriteBorder, 
    Settings,
    Person
} from '@mui/icons-material';

const StyledMenu = styled(Menu)(({ theme }) => ({
    marginTop: '8px',
    '& .MuiPaper-root': {
        borderRadius: '12px',
        minWidth: 220,
        background: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
        color: '#e8e8e8',
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: '12px 20px',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(212, 175, 55, 0.15)',
        color: '#d4af37',
        '& .MuiListItemIcon-root': {
            color: '#d4af37',
        }
    },
}));

const ProfileButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-1px)',
    }
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: 32,
    height: 32,
    background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
    color: '#0a0e27',
    fontSize: '0.9rem',
    fontWeight: 700,
}));

const MenuHeader = styled(Box)(({ theme }) => ({
    padding: '16px 20px',
    background: 'rgba(212, 175, 55, 0.1)',
    borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
}));

const UserName = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1rem',
    color: '#e8e8e8',
    marginBottom: '4px',
}));

const UserEmail = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem',
    color: '#a0a0a0',
}));

const Profile = ({ account, setAccount }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAccount('');
        handleClose();
    }

    const getInitials = (name) => {
        return name.charAt(0).toUpperCase();
    }
    
    return (
        <>
            <ProfileButton onClick={handleClick}>
                <UserAvatar>{getInitials(account)}</UserAvatar>
                <Typography style={{ fontWeight: 500 }}>{account}</Typography>
            </ProfileButton>
            
            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuHeader>
                    <UserName>{account}</UserName>
                    <UserEmail>MuzzX Premium Member</UserEmail>
                </MenuHeader>

                <StyledMenuItem component={Link} to="/profile" onClick={handleClose}>
                    <ListItemIcon>
                        <Person fontSize="small" sx={{ color: '#e8e8e8' }} />
                    </ListItemIcon>
                    My Profile
                </StyledMenuItem>

                <StyledMenuItem component={Link} to="/orders" onClick={handleClose}>
                    <ListItemIcon>
                        <ShoppingBag fontSize="small" sx={{ color: '#e8e8e8' }} />
                    </ListItemIcon>
                    My Orders
                </StyledMenuItem>

                <StyledMenuItem component={Link} to="/wishlist" onClick={handleClose}>
                    <ListItemIcon>
                        <FavoriteBorder fontSize="small" sx={{ color: '#e8e8e8' }} />
                    </ListItemIcon>
                    Wishlist
                </StyledMenuItem>

                <StyledMenuItem component={Link} to="/settings" onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{ color: '#e8e8e8' }} />
                    </ListItemIcon>
                    Settings
                </StyledMenuItem>

                <Divider sx={{ my: 1, borderColor: 'rgba(212, 175, 55, 0.2)' }} />

                <StyledMenuItem onClick={logout} sx={{ color: '#ff6b6b' }}>
                    <ListItemIcon>
                        <PowerSettingsNew fontSize="small" sx={{ color: '#ff6b6b' }} />
                    </ListItemIcon>
                    Logout
                </StyledMenuItem>
            </StyledMenu>
        </>
    )    
}

export default Profile;