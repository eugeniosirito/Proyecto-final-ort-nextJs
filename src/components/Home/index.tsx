import React, { useState } from 'react'
import { Grid, Container, TextField, Button, Typography, AppBar, Toolbar, IconButton, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material'
import styles from './styles.module.css';
import Header from '../Header';
import SuscribirEstacion from '../SuscribirEstacion';
import ControlPanel from '../ControlPanel';

const HomePage = () => {

  return (
    <>
      <Header />
      <Grid container display={'flex'} xs={12} className={styles.fatherContainer}>
        <Grid md={6} sm={12} xs={12} className={styles.leftContainer}>
          <SuscribirEstacion />
        </Grid>
        <Grid md={6} xs={12} className={styles.rightContainer}>
          <ControlPanel />
        </Grid>
      </Grid >
    </>
  )
}

export default HomePage;