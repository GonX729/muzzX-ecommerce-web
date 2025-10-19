import { useEffect } from 'react';

import { styled, Box, Typography, Grid, Chip } from '@mui/material';
import { Verified } from '@mui/icons-material';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../redux/actions/productActions';

const Component = styled(Box)`
    margin-top: 70px;
    background: linear-gradient(135deg, #0a0e27 0%, #1a1d35 100%);
    min-height: 100vh;
    padding: 20px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
    display: 'flex',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(212, 175, 55, 0.4)',
        borderColor: 'rgba(212, 175, 55, 0.4)',
    },
    
    [theme.breakpoints.down('md')]: {
        margin: 0,
        borderRadius: '15px'
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    padding: 30px;
    
    & > p {
        margin-top: 15px;
    }
`;

const ProductTitle = styled(Typography)`
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #e8e8e8;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #d4af37 0%, #e8d89e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const ProductInfo = styled(Typography)`
    font-family: 'Inter', sans-serif;
    color: #a0a0a0;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const PriceContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 20px 0;
    padding: 15px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(212, 175, 55, 0.3);
`;

const Price = styled(Typography)`
    font-size: 32px;
    font-weight: 700;
    color: #d4af37;
    font-family: 'Inter', sans-serif;
`;

const OriginalPrice = styled(Typography)`
    color: #808080;
    text-decoration: line-through;
    font-size: 18px;
`;

const Discount = styled(Typography)`
    color: #27ae60;
    font-weight: 600;
    font-size: 16px;
    background: rgba(39, 174, 96, 0.2);
    padding: 4px 8px;
    border-radius: 6px;
`;

const AssuredBadge = styled('img')`
    width: 77px;
    margin-left: 15px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const DetailView = () => {
    // Using a Verified icon instead of external image
    
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(product && id !== product.id)   
            dispatch(getProductDetails(id));
    }, [dispatch, product, id, loading]);

    return (
        <Component className="animate-fade-in">
            { product && Object.keys(product).length &&
                <Container container className="scroll-animate"> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <ProductTitle>
                            {product.title?.longTitle}
                        </ProductTitle>
                        
                        <ProductInfo>
                            8 Ratings & 1 Reviews
                            <Chip 
                                icon={<Verified />}
                                label="MuzzX Verified"
                                size="small"
                                sx={{
                                    background: '#27ae60',
                                    color: '#fff',
                                    marginLeft: 2,
                                    '& .MuiChip-icon': {
                                        color: '#fff'
                                    }
                                }}
                            />
                        </ProductInfo>
                        
                        <PriceContainer>
                            <Price>₹{product.price?.cost}</Price>
                            <OriginalPrice>₹{product.price?.mrp}</OriginalPrice>
                            <Discount>{product.price?.discount} off</Discount>
                        </PriceContainer>
                        
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }   
        </Component>
    )
}

export default DetailView;