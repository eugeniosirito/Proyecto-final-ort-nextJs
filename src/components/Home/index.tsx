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
      <Grid container display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} pt={25}>
        <Grid>
          <Typography color={'white'} variant='h4' textAlign={'center'}>Bienvenido al proyecto RespirAR</Typography>
        </Grid>
        <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Typography variant='h5' color='white' textAlign={'center'}>No tenes ninguna estación inscripta, hace click en el siguiente botón para empezar.</Typography>
          <Grid display={'flex'} justifyContent={'center'}>
            <Button className={styles.buttonRegisterStation}
              size='large'
              variant="contained"
              sx={{ marginTop: '20px' }}
              onClick={() => {
                handleClick();
                setIsLoading(true)
              }}
            >
              {isLoading ? <CircularProgress color="inherit" /> : 'Registrar estación'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage;