import { useState, useEffect } from 'react';

import { Box, Typography, styled, Paper, Divider, Chip } from '@mui/material';
import { LocalOffer, Security, LocalShipping } from '@mui/icons-material';

const SummaryCard = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #252945 0%, #2d325a 100%)',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'sticky',
    top: theme.spacing(2),
}));

const SummaryHeader = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)',
    color: '#0a0e27',
    padding: theme.spacing(3),
    textAlign: 'center',
}));

const SummaryTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.5rem',
    fontWeight: 700,
}));

const SummaryContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const PriceRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const PriceLabel = styled(Typography)(({ theme }) => ({
    color: '#a0a0a0',
    fontSize: '1rem',
}));

const PriceValue = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1rem',
    color: '#e8e8e8',
}));

const TotalRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
    borderTop: '2px dashed rgba(212, 175, 55, 0.3)',
    borderBottom: '2px dashed rgba(212, 175, 55, 0.3)',
    margin: theme.spacing(2, 0),
}));

const TotalAmount = styled(Typography)(({ theme }) => ({
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#d4af37',
    fontFamily: '"Playfair Display", serif',
}));

const SavingsChip = styled(Chip)(({ theme }) => ({
    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
    color: '#fff',
    fontWeight: 600,
    margin: theme.spacing(2, 0),
}));

const BenefitItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    background: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '12px',
    marginBottom: theme.spacing(1.5),
}));

const BenefitIcon = styled(Box)(({ theme }) => ({
    color: '#d4af37',
    display: 'flex',
    alignItems: 'center',
}));

const BenefitText = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: '#e8e8e8',
    fontWeight: 500,
}));

// component: {
//     // width: '30%'
// },


const TotalView = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItems]);
    
    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            price += item.price.mrp;
            discount += (item.price.mrp - item.price.cost);
            return null;
        });
        setPrice(price);
        setDiscount(discount);
    };

    const deliveryCharge = 40;
    const finalAmount = price - discount + deliveryCharge;
    const totalSavings = discount - deliveryCharge;

    return (
        <SummaryCard elevation={3}>
            <SummaryHeader>
                <SummaryTitle>Order Summary</SummaryTitle>
            </SummaryHeader>
            
            <SummaryContent>
                <PriceRow>
                    <PriceLabel>Price ({cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'})</PriceLabel>
                    <PriceValue>₹{price}</PriceValue>
                </PriceRow>
                
                <PriceRow>
                    <PriceLabel>Discount</PriceLabel>
                    <PriceValue sx={{ color: '#27ae60' }}>-₹{discount}</PriceValue>
                </PriceRow>
                
                <PriceRow>
                    <PriceLabel>Delivery Charges</PriceLabel>
                    <PriceValue>₹{deliveryCharge}</PriceValue>
                </PriceRow>

                <TotalRow>
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#2c3e50' }}>
                        Total Amount
                    </Typography>
                    <TotalAmount>₹{finalAmount}</TotalAmount>
                </TotalRow>

                {totalSavings > 0 && (
                    <Box sx={{ textAlign: 'center' }}>
                        <SavingsChip 
                            icon={<LocalOffer />}
                            label={`You save ₹${totalSavings} on this order!`}
                        />
                    </Box>
                )}

                <Divider sx={{ margin: '24px 0' }} />

                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600, 
                        color: '#2c3e50', 
                        marginBottom: 2,
                        fontSize: '1.1rem'
                    }}
                >
                    MuzzX Benefits
                </Typography>

                <BenefitItem>
                    <BenefitIcon>
                        <Security />
                    </BenefitIcon>
                    <BenefitText>100% Secure Payment</BenefitText>
                </BenefitItem>

                <BenefitItem>
                    <BenefitIcon>
                        <LocalShipping />
                    </BenefitIcon>
                    <BenefitText>Fast & Reliable Delivery</BenefitText>
                </BenefitItem>

                <BenefitItem>
                    <BenefitIcon>
                        <LocalOffer />
                    </BenefitIcon>
                    <BenefitText>Best Price Guarantee</BenefitText>
                </BenefitItem>
            </SummaryContent>
        </SummaryCard>
    );
};

export default TotalView;