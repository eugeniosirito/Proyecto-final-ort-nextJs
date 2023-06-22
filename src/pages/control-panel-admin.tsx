import { useState } from 'react';
import Layout from '@/components/Layout/layout'
import ControlPanelV2 from '@/components/ControlPanel'
import LinearProgessCustom from '@/components/LinearProgressCustom'
import VideoBackground from '@/components/VideoComponent';
import { Slide, ToastContainer } from 'react-toastify';

export default function AddStation() {

  const [startProgress, setStartProgress] = useState(false);

  return (
    <>
      <LinearProgessCustom startProgress={startProgress} />
      <Layout setStartProgress={setStartProgress}>
        <div className='page-animation'>
          <ControlPanelV2 />
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
        <VideoBackground />
      </Layout>
    </>
  )
}
