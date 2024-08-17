import React from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import AppLogo from '../../Images/Blog_App_Logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    console.log(email, password);

    const signInUser = async () => {
        axios.post('http://localhost:3000/user/signin', { email, password })
             .then(res=>{
                let user = JSON.stringify(res.data);
                console.log(user);
                console.log(res.data.message);
                createNotification(res.data.message);
             }).catch(error => {
                console.log(error);
                const message = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong. Please try again later...';
                createNotification(message);
    
                if(message==='This email is not registered.'){
                    setEmailError(true);
                }
                
            })
    }

    const createNotification = (type) => {
        switch (type) {
            case 'error':
                toast.error('Something went wrong. Please try again later...');
                break;
            case 'User successfully registered.':
                toast.success('User successfully registered.');
                break;
            case 'Email already exists.':
                toast.error('Email already exists.');
                break;
            case 'This email is not registered.':
                toast.error('This email is not registered.');
                break;
            case 'User successfully logged in.':
                toast.success('User successfully logged in.');
                break;
            default:
                toast.info(type);  // If the response message isn't error or success, show it as info.
                break;
        }
    };

    return (
        <>
            <Box style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Components>
                    <Image src={AppLogo} alt='App Logo' />
                    <Typography style={{ textAlign: 'center' }}>" Welcome to our Ultimate Blogging Hub " </Typography>
                    <Typography style={{ textAlign: 'center' }}>  Share Your Stories, Ideas, and Creativity!</Typography>

                        <Wrapper>
                            <TextField variant="standard" 
                            onChange={
                                (e) => {setEmail(e.target.value);
                                setEmailError(false);
                            }} 
                            error={emailError}
                            sx={{ 
                                input: { 
                                    color: emailError ? 'red' : 'inherit'
                                }
                            }} 
                            label="Enter email" />
                            <TextField variant="standard" onChange={(e) => setPassword(e.target.value)} label="Enter password" />
                            <LoginButton variant="contained" onClick={() => { signInUser() }}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <Box style={{ textAlign: 'center', marginTop: 0 }}>You don't have an account? <Button variant="text" onClick={()=>navigate('/signup')}>signUp</Button></Box>
                        </Wrapper> 
                    <ToastContainer />
                </Components>
            </Box>
        </>
    )
}

const Components = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled('img')({
    width: 150,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`;
