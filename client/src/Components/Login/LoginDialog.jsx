import React, { useState, useEffect, useContext } from 'react';

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled, IconButton, InputAdornment } from '@mui/material';
import { Close, Visibility, VisibilityOff, Login as LoginIcon, PersonAdd } from '@mui/icons-material';

import { authenticateLogin, authenticateSignup } from '../../service/api';
import { LoginContext } from '../../context/ContextProvider';

const Component = styled(DialogContent)`
    height: 70vh;
    width: 90vh;
    padding: 0;
    padding-top: 0;
    background: linear-gradient(135deg, #1e2139 0%, #252945 100%);
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
    color: #0a0e27;
    height: 48px;
    border-radius: 25px;
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(135deg, #c5a028 0%, #d4af37 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: transparent;
    color: #d4af37;
    height: 48px;
    border-radius: 25px;
    border: 1px solid rgba(212, 175, 55, 0.5);
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(212, 175, 55, 0.1);
        border-color: #d4af37;
    }
`;

const Text = styled(Typography)`
    color: #a0a0a0;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #d4af37;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        color: #e8d89e;
        transform: scale(1.02);
    }
`

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    background: linear-gradient(135deg, #252945 0%, #2d325a 100%);
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6b6b;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        color: #e8e8e8;
    }
    & .MuiInputLabel-root {
        color: #a0a0a0;
    }
    & .MuiInput-underline:before {
        border-bottom-color: rgba(212, 175, 55, 0.3);
    }
    & .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom-color: rgba(212, 175, 55, 0.5);
    }
    & .MuiInput-underline:after {
        border-bottom-color: #d4af37;
    }
    & .MuiInputLabel-root.Mui-focused {
        color: #d4af37;
    }
`;
    
const Image = styled(Box)`
    background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
    width: 40%;
    height: 100%;
    padding: 45px 35px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(10,14,39,0.1)"/><circle cx="75" cy="75" r="1.5" fill="rgba(10,14,39,0.08)"/><circle cx="50" cy="10" r="0.5" fill="rgba(10,14,39,0.12)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
        opacity: 0.3;
    }
    
    & > p, & > h5 {
        color: #0a0e27;
        font-weight: 600;
        position: relative;
        z-index: 1;
    }
`;

const CloseButton = styled(IconButton)`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #0a0e27;
    z-index: 10;
    
    &:hover {
        background: rgba(10, 14, 39, 0.1);
        transform: rotate(90deg);
    }
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Welcome Back to MuzzX',
        subHeading: 'Access your Orders, Wishlist and personalized Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Join the MuzzX Community",
        subHeading: 'Create your account to start shopping premium products'
    }
}

const LoginDialog = ({open, setOpen}) => {

    const [ account, toggleAccount ] = useState(accountInitialValues.login);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ error, showError] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);

    const { setAccount } = useContext(LoginContext);
    
    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        if(!response) 
            showError(true);
        else {
            showError(false);
            handleClose();
            setAccount(login.username);
        }
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        setAccount(signup.username);
    }
    
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{display: 'flex', height: '100%'}}>
                    <Image>
                        <CloseButton onClick={handleClose} size="small">
                            <Close />
                        </CloseButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            {account === accountInitialValues.login ? 
                                <LoginIcon sx={{ fontSize: 48, color: '#0a0e27' }} /> : 
                                <PersonAdd sx={{ fontSize: 48, color: '#0a0e27' }} />
                            }
                            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                                {account === accountInitialValues.login ? 'Welcome Back' : 'Join MuzzX'}
                            </Typography>
                        </Box>
                        <Typography style={{marginTop: 20, fontSize: '1rem', lineHeight: 1.6}}>
                            {account === accountInitialValues.login ? 
                                'Access your orders, wishlist, and premium recommendations' : 
                                'Create an account and discover premium quality products'}
                        </Typography>
                    </Image>
                    {
                        account === accountInitialValues.login ? 
                        <Wrapper>
                            <StyledTextField variant="standard" onChange={(e) => onValueChange(e)} name='username' label='Email/Mobile number' />
                            { error && <Error>{error}</Error>}
                            <StyledTextField 
                                variant="standard" 
                                onChange={(e) => onValueChange(e)} 
                                name='password' 
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: '#a0a0a0' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Text>By continuing, you agree to MuzzX Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()} startIcon={<LoginIcon />}>Sign In</LoginButton>
                            <Typography style={{textAlign:'center', color: '#808080'}}>OR</Typography>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignup()}>New to MuzzX? Create an account</CreateAccount>
                        </Wrapper> : 
                        <Wrapper>
                            <StyledTextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='First Name' />
                            <StyledTextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Last Name' />
                            <StyledTextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Username' />
                            <StyledTextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Email' />
                            <StyledTextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='password' 
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: '#a0a0a0' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <StyledTextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Phone Number' />
                            <LoginButton onClick={() => signupUser()} startIcon={<PersonAdd />}>Create Account</LoginButton>
                            <CreateAccount onClick={() => toggleSignup()}>Already have an account? Sign in</CreateAccount>
                        </Wrapper>
                    }
                 </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;