import React, { useState } from 'react'
import { Grid, Container, TextField, Button, Typography, AppBar, Toolbar, IconButton, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material'
import styles from './styles.module.css';
import SuscribirEstacion from '../SuscribirEstacion';
import ControlPanel from '../ControlPanel';
import SideMenu from '../SideMenu';
import DashCards from '../DashCards';
import Footer from '../Footer';
import Header from '../Header';

const HomePage = () => {

  return (
    <>
      <Header />
      <Grid container lg={12}>
        <Grid lg={1.5} md={2} sm={3} xs={3} className={styles.sideMenu} display={'flex'} flexDirection={'column'}>
          <SideMenu />
        </Grid>
        <Grid lg={10.5} md={10} sm={9} xs={12} className={styles.mainBgc}>
          <DashCards />
          {/* <Grid display={'flex'} xs={12} className={styles.fatherContainer}>
            <Grid lg={6} xs={12} className={styles.leftContainer}>
              <SuscribirEstacion />
            </Grid>
            <Grid lg={6} xs={12} className={styles.rightContainer}>
              <ControlPanel />
            </Grid>
          </Grid > */}
        </Grid>
        <Footer />
      </Grid>

    </>
  )
}

export default HomePage;