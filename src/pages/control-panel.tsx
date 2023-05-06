import Header from '@/components/Header'
import { Grid } from '@mui/material'
import SideMenu from '@/components/SideMenu'
import Footer from '@/components/Footer'
import styles from '../components/Home/styles.module.css'
import ControlPanelV2 from '@/components/ControlPanel'

export default function AddStation() {
  return (
    <>
      <Header />
      <Grid container lg={12}>
        <Grid lg={1.5} md={2} sm={3} xs={3} display={'flex'} flexDirection={'column'} sx={{ backgroundColor: 'rgb(35, 48, 68)', height: '100vh' }}>
          <SideMenu />
        </Grid>
        <Grid lg={10.5} md={10} sm={9} xs={12}>
          <Grid display={'flex'} xs={12} className={styles.fatherContainer}>
            <Grid lg={12} xs={12} className={styles.leftContainer}>
              <ControlPanelV2 />
            </Grid>
          </Grid >
        </Grid>
        <Footer />
      </Grid>
    </>
  )
}
