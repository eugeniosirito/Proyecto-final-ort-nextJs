import Header from '@/components/Header'
import { Grid } from '@mui/material'
import SideMenu from '@/components/SideMenu'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Grid container lg={12}>
        <Grid lg={1.5} md={2} sm={3} xs={3} display={'flex'} flexDirection={'column'} sx={{ backgroundColor: 'rgb(35, 48, 68)', height: '100vh' }}>
          <SideMenu />
        </Grid>
        <Grid lg={10.5} md={10} sm={9} xs={12} sx={{ backgroundColor: 'rgb(27, 38, 53)' }}>
        </Grid>
        <Footer />
      </Grid>
    </>
  )
}
