import React from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material';
import AppLogo from '../../Images/Blog_App_Logo.png';

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

export default function Login() {
  return (
    <>
        <Components>
            <Box>
                <Image src={AppLogo} alt='App Logo'/>
                <Typography style={{ textAlign : 'center'}}>Create & read amazing post</Typography>
                <Wrapper>
                    <TextField variant="standard" label="Enter email"/>
                    <TextField variant="standard" label="Enter password"/>
                    <LoginButton variant="contained">Login</LoginButton>
                    <Text style={{ textAlign : 'center'}}>OR</Text>
                    <Box style={{ textAlign : 'center', marginTop: 0}}>You don't have an account ? <Button variant="text">signUp</Button></Box>
                </Wrapper>
            </Box>
        </Components>
    </>
  )
}
