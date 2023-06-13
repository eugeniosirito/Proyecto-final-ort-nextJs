import { useState } from 'react';
import SuscribirEstacion from '@/components/SuscribirEstacion'
import Layout from '@/components/Layout/layout'
import { ToastContainer, Slide } from 'react-toastify';
import LinearProgessCustom from '@/components/LinearProgressCustom';


export default function AddStation() {
  const [startProgress, setStartProgress] = useState(false);

  return (
    <>
      <LinearProgessCustom startProgress={startProgress} />
      <Layout setStartProgress={setStartProgress}>
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
    </>
  )

}
