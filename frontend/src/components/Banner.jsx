import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import BackGround from '../Images/natureEssence.png';

export default function Banner() {
  return (
    <>
        <Image>
            <Heading>
                <Typography>Welcome to our</Typography> 
                <Typography>Ultimate Blogging Hub</Typography>
            </Heading>
            <SubHeading>Share Your Stories, Ideas, and Creativity!</SubHeading>
        </Image>
    </>
  );
}

const Image = styled(Box)`
    background-image: url(${BackGround});
    background-size: cover;
    background-position: center;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size: 36px;
    color: #FFD700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > p {
        font-size: 36px;
        color: #FFD700;
    }
`;

const SubHeading = styled(Typography)`
    font-size: 24px;
    color: #FFA500; 
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;
