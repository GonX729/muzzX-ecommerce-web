
import { Typography, Box, styled, Button, Container } from '@mui/material';
import { ShoppingBag, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const EmptyContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
}));

const EmptyCard = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
    borderRadius: '20px',
    padding: theme.spacing(6, 4),
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(212, 175, 55, 0.2)',
    maxWidth: '500px',
    width: '100%',
    border: '1px solid rgba(212, 175, 55, 0.2)',
}));

const EmptyIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    '& svg': {
        fontSize: '4rem',
        color: '#d4af37',
        opacity: 0.6,
    }
}));

const EmptyTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#e8e8e8',
    marginBottom: theme.spacing(2),
}));

const EmptySubtitle = styled(Typography)(({ theme }) => ({
    color: '#a0a0a0',
    fontSize: '1.1rem',
    marginBottom: theme.spacing(4),
    lineHeight: 1.6,
}));

const ShopButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
    color: '#0a0e27',
    borderRadius: '30px',
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #b8941f 0%, #d4af37 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)',
    },
}));


const EmptyCart = () => {
    return (
        <EmptyContainer maxWidth="lg">
            <EmptyCard>
                <EmptyIcon>
                    <ShoppingBag />
                </EmptyIcon>
                
                <EmptyTitle>
                    Your Cart is Empty
                </EmptyTitle>
                
                <EmptySubtitle>
                    Looks like you haven't added any items to your cart yet. 
                    Discover our amazing products and start shopping!
                </EmptySubtitle>
                
                <ShopButton
                    component={Link}
                    to="/"
                    variant="contained"
                    startIcon={<ArrowBack />}
                >
                    Start Shopping
                </ShopButton>
            </EmptyCard>
        </EmptyContainer>
    )
}

export default EmptyCart;