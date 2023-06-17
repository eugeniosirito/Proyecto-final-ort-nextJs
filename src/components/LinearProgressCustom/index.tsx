import { LinearProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const LinearProgessCustom = ({ startProgress }: any) => {

  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const progressRef = useRef(() => { });
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      {startProgress ? (
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="success" style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1000' }} />
      ) : null}
    </>
  )
};

export default LinearProgessCustom;