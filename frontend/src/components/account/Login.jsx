import React from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material';
import AppLogo from '../../Images/Blog_App_Logo.png';
// import { API } from '../../service/api.js';
import axios from 'axios';

import { useState } from 'react';

export default function Login() {
    const [account, setAccount] = useState('login');
    const [fullname, setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const signUpUser = async () => {
        axios.post('http://localhost:3000/user/signup',{fullname,email,password}).then(res=>{
            let user = JSON.stringify(res.data);
            console.log(user)
        }).catch(err => {
            console.log(err);
        })
    }
    
  return (
    <>
    <Box style={{ height: '100vh', display : 'flex', alignItems: 'center'}}>
        <Components>
                <Image src={AppLogo} alt='App Logo'/>
                <Typography style={{ textAlign : 'center'}}>" Welcome to our Ultimate Blogging Hub " </Typography>
                <Typography style={{ textAlign : 'center'}}>  Share Your Stories, Ideas, and Creativity!</Typography>
                
                { account==='login' ? 
                    <Wrapper>
                        <TextField variant="standard" label="Enter email"/>
                        <TextField variant="standard" label="Enter password"/>
                        <LoginButton variant="contained">Login</LoginButton>
                        <Text style={{ textAlign : 'center'}}>OR</Text>
                        <Box style={{ textAlign : 'center', marginTop: 0}}>You don't have an account ? <Button variant="text" onClick={()=>setAccount('signup') }>signUp</Button></Box>
                    </Wrapper> :
                    <Wrapper>
                        <TextField variant="standard" onChange={(e)=> setFullName(e.target.value)} name='fullname' label="Enter full name"/>
                        <TextField variant="standard" onChange={(e)=> setEmail(e.target.value)} name='email' label="Enter email"/>
                        <TextField variant="standard" onChange={(e)=> setPassword(e.target.value)} name='password' label="Enter password"/>
                        <LoginButton variant="contained" onClick={()=>{signUpUser()}}>signUp</LoginButton>
                        <Text style={{ textAlign : 'center'}}>OR</Text>
                        <Box style={{ textAlign : 'center', marginTop: 0}}>You don't have an account ? <Button variant="text" onClick={()=>setAccount('login')}>signIn</Button></Box>
                    </Wrapper>
                }
        </Components>
    </Box>
    </>
  )
}

const Components = styled(Box)`
    width : 400px;
    margin : auto;
    box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width : 150,
    display : 'flex',
    margin : 'auto',
    padding : '50px 0 0' 
})

const Wrapper = styled(Box)`
    padding : 25px 35px;
    display : flex;
    flex : 1;
    flex-direction : column;
    & > div, & > button, & > p {
        margin-top : 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform : none;
`;

const Text = styled(Typography)`
    color : #878787;
    font-size : 16px;
`;