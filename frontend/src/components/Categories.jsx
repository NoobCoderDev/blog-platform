import React from 'react';
import { Button, Table, TableHead, TableBody, TableCell, TableRow, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { categories } from '../constants/Data';

export default function Categories() {
  return (
    <>  
        <Link to={'/blog/create'}>
            <StyledButton variant='contained'>Create Blog</StyledButton>
        </Link>
        
        <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell>All Categories</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>{category.type}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </StyledTable>
    </>
  )
}

const StyledTable = styled(Table)`
    border : 2px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin : 10px;
    width : 85%;
    background : #6495ED;
    color : #ffffff;
`;