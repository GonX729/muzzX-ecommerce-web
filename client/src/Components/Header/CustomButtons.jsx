import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    textDecoration: 'none',
    color: '#FFFFFF',
    transition: 'all 0.3s ease',
    padding: theme.spacing(1, 2),
    borderRadius: '20px',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#d4af37',
        transform: 'translateY(-1px)',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        textAlign: 'center',
    }
}));

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    '& > *': {
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: '0.95rem',
        alignItems: 'center',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            color: '#d4af37',
            transform: 'translateY(-1px)',
        },
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            '&:hover': {
                color: '#d4af37',
            }
        }
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        gap: 0,
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#0a0e27',
    background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '25px',
    padding: '8px 30px',
    height: 40,
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    '&:hover': {
        background: 'linear-gradient(135deg, #c5a028 0%, #d4af37 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(212, 175, 55, 0.5)',
    },
    [theme.breakpoints.down('sm')]: {
        background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
        color: '#0a0e27',
        padding: '8px 25px',
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
        color: '#0a0e27',
        fontWeight: 700,
        fontSize: '0.7rem',
        minWidth: '20px',
        height: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)',
    }
}));


const CustomButtons = () => {
    
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Wrapper>
            {
                account ? (
                    <>
                        <Typography>Become a Seller</Typography>
                        <Typography>More</Typography>
                        
                        <Container to='/cart'>
                            <StyledBadge badgeContent={cartItems?.length} color="secondary">
                                <ShoppingCart />
                            </StyledBadge>
                            <Typography>Cart</Typography>
                        </Container>
                        
                        <Profile account={account} setAccount={setAccount} />
                    </>
                ) : (
                    <LoginButton variant="contained" onClick={() => openDialog()}>Sign In</LoginButton>
                )
            }
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Wrapper>
    )
}

export default CustomButtons;