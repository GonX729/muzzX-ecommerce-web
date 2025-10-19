import React, { useState } from "react";

import { ButtonGroup, Button, styled, Typography, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantityContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const QuantityLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: '#a0a0a0',
    fontWeight: 500,
    marginRight: theme.spacing(1),
}));

const QuantityButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    border: '1px solid rgba(212, 175, 55, 0.3)',
    borderRadius: '25px',
    overflow: 'hidden',
    '& .MuiButton-root': {
        minWidth: '35px',
        height: '35px',
        border: 'none',
        '&:not(:last-child)': {
            borderRight: '1px solid rgba(212, 175, 55, 0.3)',
        }
    }
}));

const QuantityButton = styled(Button)(({ theme }) => ({
    color: '#e8e8e8',
    background: 'rgba(212, 175, 55, 0.1)',
    '&:hover': {
        background: 'rgba(212, 175, 55, 0.2)',
        color: '#d4af37',
    },
    '&:disabled': {
        background: 'rgba(160, 160, 160, 0.1)',
        color: '#606060',
    }
}));

const QuantityDisplay = styled(Button)(({ theme }) => ({
    color: '#d4af37',
    background: 'rgba(212, 175, 55, 0.1)',
    fontWeight: 600,
    cursor: 'default',
    '&:hover': {
        background: 'rgba(212, 175, 55, 0.1)',
    }
}));

const GroupedButton = () => {
    const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1);
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1);
    };

    return (
        <QuantityContainer>
            <QuantityLabel>Qty:</QuantityLabel>
            <QuantityButtonGroup variant="outlined">
                <QuantityButton 
                    onClick={() => handleDecrement()} 
                    disabled={counter === 1}
                >
                    <Remove sx={{ fontSize: '1rem' }} />
                </QuantityButton>
                <QuantityDisplay disabled>
                    {counter}
                </QuantityDisplay>
                <QuantityButton onClick={() => handleIncrement()}>
                    <Add sx={{ fontSize: '1rem' }} />
                </QuantityButton>
            </QuantityButtonGroup>
        </QuantityContainer>
    );
};

export default GroupedButton;