import React from 'react';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted >
        <source src="/assets/videobg6.mp4" type="video/mp4" />
        {/* Aquí puedes agregar más elementos <source> para diferentes formatos de video */}
      </video>
    </div>
  );
};

export default VideoBackground;