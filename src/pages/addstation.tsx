import Header from '@/components/Header'
import { Grid } from '@mui/material'
import SideMenu from '@/components/SideMenu'
import Footer from '@/components/Footer'
import SuscribirEstacion from '@/components/SuscribirEstacion'
import styles from '../components/Home/styles.module.css'
import Layout from '@/components/Layout/layout'

export default function AddStation() {
  return (
    <Layout>
      <div className='page-animation'>
        <SuscribirEstacion />
      </div>
    </Layout>
  )

}
