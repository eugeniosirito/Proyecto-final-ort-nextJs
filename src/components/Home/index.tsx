import React, { useEffect, useState } from 'react'
import Router from 'next/router';
import { Grid, Button, Typography, CircularProgress } from '@mui/material'
import styles from './styles.module.css';
import { getEstaciones } from '@/services';


const HomePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [estaciones, setEstaciones] = useState({});


  useEffect(() => {
    getEstaciones()
      .then(response => {
        setEstaciones(response);
        setIsLoading(false);
        console.log('estaciones response', estaciones);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    Router.push('/addstation');
  };

  return (
    <>
      <Grid display={'flex'} flexDirection={'column'} style={{ transform: 'translateY(20%)' }}>
        <Typography variant='h5' color='rgba(255, 255, 255, 0.63)'>No tenes ninguna estación inscripta, hace click en el siguiente botón para empezar.</Typography>
        <Button className={styles.buttonRegisterStation}
          size='large'
          variant="contained"
          sx={{ marginTop: '20px' }}
          onClick={() => {
            handleClick();
            setIsLoading(true)
          }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : 'Registrar'}
        </Button>
      </Grid>
    </>
  )
}

export default HomePage;