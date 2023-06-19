import React, { useState } from 'react';
import Layout from '@/components/Layout/layout'
import UserPanel from '@/components/UserPanel'
import LinearProgessCustom from '@/components/LinearProgressCustom';
import { Slide, ToastContainer } from 'react-toastify';
import { Grid } from '@mui/material';

export default function AddStation() {
  const [startProgress, setStartProgress] = useState(false);

  return (
    <>
      <LinearProgessCustom startProgress={startProgress} />
      <Layout setStartProgress={setStartProgress}>
        <div className='page-animation'>
          <UserPanel />
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
    </>
  )
}
