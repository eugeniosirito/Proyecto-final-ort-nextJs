import DashCards from '@/components/Dashboard'
import Layout from '@/components/Layout/layout'
import LinearProgessCustom from '@/components/LinearProgressCustom';
import VideoBackground from '@/components/VideoComponent';
import { useState } from 'react';

export default function Dashboard() {
  const [startProgress, setStartProgress] = useState(false);

  return (
    <>
      <LinearProgessCustom startProgress={startProgress} />
      <Layout setStartProgress={setStartProgress}>
        <div className='page-animation'>
          <DashCards />
        </div>
        <VideoBackground />
      </Layout>
    </>
  )
}
