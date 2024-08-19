import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import { Box, Grid, styled } from '@mui/material';

export default function Home() {
  return (
    <>
       <OuterDiv>
            <Banner />
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    posts
                </Grid>
            </Grid>
        </OuterDiv> 
    </>
  )
}

const OuterDiv = styled(Box)`
    margin-top : 65px;
`;