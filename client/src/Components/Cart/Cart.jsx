import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled, Container, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ShoppingBag, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import { post } from '../../utils/paytm';
import { payUsingPaytm } from '../../service/api';

const CartContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%)',
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2, 1),
    }
}));

const CartWrapper = styled(Paper)(({ theme }) => ({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)',
    background: '#1e2139',
}));

const CartHeader = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
    color: '#0a0e27',
    padding: theme.spacing(3, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 3),
        flexDirection: 'column',
        gap: theme.spacing(2),
        textAlign: 'center',
    }
}));

const BackButton = styled(Button)(({ theme }) => ({
    color: '#0a0e27',
    borderColor: 'rgba(10, 14, 39, 0.3)',
    borderRadius: '25px',
    padding: theme.spacing(1, 3),
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
        borderColor: '#0a0e27',
        background: 'rgba(10, 14, 39, 0.1)',
    },
}));

const CartTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.2rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    }
}));

const ItemCount = styled(Typography)(({ theme }) => ({
    background: 'rgba(10, 14, 39, 0.3)',
    color: '#0a0e27',
    padding: theme.spacing(0.5, 2),
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
}));

const CartContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0),
}));

const PlaceOrderButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
    color: '#0a0e27',
    borderRadius: '30px',
    padding: theme.spacing(2, 4),
    fontSize: '1.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #b8941f 0%, #d4af37 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)',
    },
}));

const CheckoutSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #141830 0%, #1a1f3a 100%)',
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
}));

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'kunaltyagi@gmail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    return (
        <>
        { cartItems.length ? 
            <CartContainer maxWidth="lg">
                <CartWrapper>
                    <CartHeader>
                        <CartTitle>
                            <ShoppingBag />
                            My Cart
                            <ItemCount>
                                {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'}
                            </ItemCount>
                        </CartTitle>
                        <BackButton 
                            variant="outlined" 
                            component={Link} 
                            to="/"
                            startIcon={<ArrowBack />}
                        >
                            Continue Shopping
                        </BackButton>
                    </CartHeader>
                    
                    <CartContent>
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={8}>
                                {cartItems.map((item, index) => (
                                    <Box key={item.id}>
                                        <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                                        {index < cartItems.length - 1 && <Divider />}
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TotalView cartItems={cartItems} />
                            </Grid>
                        </Grid>
                    </CartContent>
                    
                    <CheckoutSection>
                        <PlaceOrderButton onClick={() => buyNow()} variant="contained">
                            Place Order
                        </PlaceOrderButton>
                    </CheckoutSection>
                </CartWrapper>
            </CartContainer> : <EmptyCart />
        }
        </>
    )
}

export default Cart;