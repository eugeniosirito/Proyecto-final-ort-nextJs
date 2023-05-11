import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import city from '../../assets/city.jpg'

const SignUp = () => {

  const [isSignUp, setIsSignUp] = React.useState(false);

  const signUpData = [
    {
      label: 'Nombre',
      value: '',
    },
    {
      label: 'Apellido',
      value: '',
    },
    {
      label: 'Mail',
      value: '',
    },
    {
      label: 'Contraseña',
      value: '',
    },
    {
      label: 'Confirmar contraseña',
      value: '',
    },

  ]

  const signInData = [
    {
      label: 'Usuario',
      value: ''
    },
    {
      label: 'Contraseña',
      value: ''
    },
  ]

  return (
    <>
      <Grid display={'flex'}>
        <Grid
          item
          className={styles.leftContainer}
          container
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'auto'}
          padding={5}
          xs={8}
          height={'100vh'}
        >
        </Grid>
        <Grid
          item
          className={styles.signUpContainer}
          container
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'auto'}
          padding={5}
          xs={4}
          height={'100vh'}
        >
          {!isSignUp ? (
            <>
              <Typography color={'white'} variant='h5' paddingBottom={1}>Get started</Typography>
              <Typography color={'white'} textAlign={'center'} paddingBottom={1}>Start creating the best possible user experience for you customers</Typography>
              <Grid container>
                {signUpData.map((item, i) => (
                  <Grid item md={12} key={i} paddingBottom={'24px'}>
                    <TextField label={item.label} fullWidth sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.63)',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.63)',
                      },
                    }} />
                  </Grid>
                ))}
              </Grid>
              <Button style={{ backgroundColor: '#1976d2', color: 'white' }} size="large" fullWidth href='/'>
                Registrarse
              </Button>
            </>
          ) : (
            <>
              <Typography color={'white'} variant='h5' paddingBottom={1}>Get started</Typography>
              <Typography color={'white'} textAlign={'center'} paddingBottom={1}>Start creating the best possible user experience for you customers</Typography>
              <Grid container>
                {signInData.map((item, i) => (
                  <Grid item md={12} key={i} paddingBottom={'24px'}>
                    <TextField label={item.label} fullWidth sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.63)',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.63)',
                      },
                    }} />
                  </Grid>
                ))}
              </Grid>
              <Button style={{ backgroundColor: '#1976d2', color: 'white' }} size="large" fullWidth href='/'>
                Ingresar
              </Button>
              <Button style={{ backgroundColor: '#1976d2', color: 'white', marginTop: '12px' }} size="large" fullWidth href='/'>
                Crear usuario
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp;