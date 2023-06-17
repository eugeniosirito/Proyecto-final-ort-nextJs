import React, { useState } from 'react';
import Layout from '@/components/Layout/layout'
import UserPanel from '@/components/UserPanel'
import LinearProgessCustom from '@/components/LinearProgressCustom';

export default function AddStation() {
  const [startProgress, setStartProgress] = useState(false);

  return (
    <>
      <LinearProgessCustom startProgress={startProgress} />
      <Layout setStartProgress={setStartProgress}>
        <div className='page-animation'>
          <UserPanel />
        </div>
      </Layout>
    </>
  )
}
