import { useState } from 'react'
import { Grid } from '@mui/material'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HomePage from '@/components/Home'
import SideMenu from '@/components/SideMenu'
import styles from '../components/Layout/styles.module.css'
import LinearProgessCustom from '@/components/LinearProgressCustom'

export default function Home() {
  const [startProgress, setStartProgress] = useState(false);

  return (
    <div>
      <LinearProgessCustom startProgress={startProgress} />
      <Header />
      <Grid container>
        <Grid
          item
          lg={1.5}
          md={2}
          sm={3}
          xs={3}
          display={"flex"}
          flexDirection={"column"}
          sx={{ backgroundColor: "rgb(35, 48, 68)", height: "100vh" }}
          className={styles.sideMenuContainer}
        >
          <SideMenu setStartProgress={setStartProgress} />
        </Grid>
        <Grid item lg={10.5} md={10} sm={9} xs={12} display={'flex'} justifyContent={'center'}>
          <HomePage />
        </Grid>
        <Footer />
      </Grid>
    </div>
  )
}
