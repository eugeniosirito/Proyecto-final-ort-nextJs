import React from 'react';
import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './styles.module.css';

const HomeTab = () => {

  const cardItems = [
    {
      title: 'Client',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Client'
    },
    {
      title: 'Help',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Help'
    },
    {
      title: 'Sites',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Sites'
    },
    {
      title: 'Email',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Email'
    },
    {
      title: 'DNS',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to DNS'
    },
    {
      title: 'Monitor',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Monitor'
    },
    {
      title: 'Tools',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Tools'
    },
    {
      title: 'System',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to System'
    },
  ]

  return (
    <>
      <Typography paddingX={3} paddingY={2} color={'white'} variant='h3'>Welcome user.name</Typography>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', paddingLeft: '12px' }} />
      <Typography paddingX={3} paddingY={2} color={'white'} variant='h4'>Available Modules</Typography>
      <Grid container display={'flex'} flexDirection={'row'} paddingX={3}>
        {cardItems.map((item, i) => (
          <Grid key={i} item lg={2} padding={0} paddingRight={2} paddingTop={2}>
            <Card className={styles.cardsContainer}>
              <CardContent>
                <Typography variant='h5' textAlign={'center'} color={'white'}>{item.title}</Typography>
                <Grid item display={'flex'} justifyContent={'center'} paddingTop={0}>
                  <Button sx={{ backgroundColor: 'blue' }}>{item.button}</Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', paddingLeft: '12px', marginTop: '28px' }} />
      <Grid container >
        <Grid item lg={12} paddingX={3} paddingTop={3}>
          <Card className={styles.notificationContainer}>
            <CardContent>
              <Typography variant='h5' color={'white'}>Notificaciones</Typography>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '12px' }} />
              <Button sx={{ padding: 0, paddingY: 1 }}>Notificacion</Button>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '0px' }} />
              <Button sx={{ padding: 0, paddingY: 1 }}>Notificacion</Button>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '0px' }} />
              <Button sx={{ padding: 0, paddingY: 1 }}>Notificacion</Button>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '0px' }} />
              <Button sx={{ padding: 0, paddingY: 1 }}>Notificacion</Button>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '0px' }} />
              <Button sx={{ padding: 0, paddingY: 1 }}>Notificacion</Button>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '0px' }} />
              <Button sx={{ padding: 0, paddingY: 1 }}>Notificacion</Button>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', marginTop: '0px' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default HomeTab;