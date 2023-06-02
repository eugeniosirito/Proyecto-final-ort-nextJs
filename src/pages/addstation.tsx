import Header from '@/components/Header'
import { Grid } from '@mui/material'
import SideMenu from '@/components/SideMenu'
import Footer from '@/components/Footer'
import SuscribirEstacion from '@/components/SuscribirEstacion'
import styles from '../components/Home/styles.module.css'
import Layout from '@/components/Layout/layout'
import { ToastContainer, Slide } from 'react-toastify';


export default function AddStation() {
  return (
    <Layout>
      <div className='page-animation'>
        <SuscribirEstacion />
      </div>
      <ToastContainer
        transition={Slide}
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Layout>
  )

}
