import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/thank.css'
import { Grid, Typography } from '@mui/material';
export default function Thanks(){
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 6000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Grid container md={12} className='thanks-main'>

      <Grid item md={6} className='thanks-title' sx={{marginTop: '5%',
                                                      padding: '3%'}}>
        <Typography variant='h1'>Thank you for choosing and trusting us</Typography>
        <Typography variant='subtitle1'>Wish you have a nice experience</Typography>
      </Grid>
      <Grid item md={6} className='item-thanks'>
        <img src='assets/images/item-thanks.png' />
      </Grid>
    </Grid>
  );
};

