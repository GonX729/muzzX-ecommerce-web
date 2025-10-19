
import { Box, Typography, Button, styled, IconButton, Chip } from '@mui/material';
import { Delete, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';

import { addEllipsis } from '../../utils/util';
import GroupButton from './GroupButton';

const ItemCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(3, 4),
    alignItems: 'flex-start',
    gap: theme.spacing(3),
    background: '#252945',
    transition: 'all 0.3s ease',
    borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
    '&:hover': {
        background: '#2d325a',
        borderColor: 'rgba(212, 175, 55, 0.3)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    }
}));

const ProductImage = styled('img')(({ theme }) => ({
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    borderRadius: '12px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    padding: theme.spacing(1),
    background: '#1e2139',
    [theme.breakpoints.down('sm')]: {
        width: '100px',
        height: '100px',
    }
}));

const ProductDetails = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#e8e8e8',
    lineHeight: 1.4,
    marginBottom: theme.spacing(1),
}));

const SellerInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: '#a0a0a0',
    fontSize: '0.9rem',
}));

const PriceSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    margin: theme.spacing(1.5, 0),
    flexWrap: 'wrap',
}));

const CurrentPrice = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#d4af37',
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    color: '#808080',
    textDecoration: 'line-through',
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.8rem',
}));

const ActionSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width: '100%',
    }
}));

const RemoveButton = styled(Button)(({ theme }) => ({
    color: '#ff6b6b',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    borderRadius: '25px',
    padding: theme.spacing(0.8, 2.5),
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
        background: 'rgba(255, 107, 107, 0.2)',
        borderColor: '#ff6b6b',
    },
}));

const WishlistButton = styled(IconButton)(({ theme }) => ({
    color: '#a0a0a0',
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#ff6b6b',
        transform: 'scale(1.1)',
    },
}));

const CartItem = ({ item, removeItemFromCart }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    return (
        <ItemCard>
            <ProductImage 
                src={item.url} 
                alt={item.title.shortTitle}
            />
            
            <ProductDetails>
                <ProductTitle>
                    {addEllipsis(item.title.longTitle)}
                </ProductTitle>
                
                <SellerInfo>
                    <Typography variant="body2">
                        Sold by: <strong>MuzzX Official Store</strong>
                    </Typography>
                    <Chip 
                        label="Verified" 
                        size="small" 
                        sx={{ 
                            background: '#27ae60', 
                            color: '#fff', 
                            fontSize: '0.7rem',
                            height: '20px'
                        }} 
                    />
                </SellerInfo>

                <PriceSection>
                    <CurrentPrice>₹{item.price.cost}</CurrentPrice>
                    <OriginalPrice>₹{item.price.mrp}</OriginalPrice>
                    <DiscountChip 
                        label={item.price.discount} 
                        size="small"
                    />
                </PriceSection>

                <Box sx={{ maxWidth: '200px' }}>
                    <GroupButton />
                </Box>

                <ActionSection>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <RemoveButton 
                            onClick={() => removeItemFromCart(item.id)}
                            startIcon={<Delete />}
                        >
                            Remove
                        </RemoveButton>
                        
                        <WishlistButton 
                            onClick={toggleWishlist}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                        </WishlistButton>
                    </Box>
                </ActionSection>
            </ProductDetails>
        </ItemCard>
    )
}

export default CartItem;