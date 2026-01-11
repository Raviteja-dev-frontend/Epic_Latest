import React, { useRef, useEffect } from 'react';

const NotificationExample = () => {
  const audioRef = useRef(null);

  const playSound = () => {
    audioRef.current?.play().catch(err => {
      console.warn('Autoplay blocked:', err);
    });
  };

  useEffect(() => {
    // Simulate new order after 2 seconds
    const timer = setTimeout(() => {
      playSound();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>React Notification Sound</h2>
      {/* ✅ Correct path and file name */}
      <audio ref={audioRef} src="/Sounds/notification_sound.mp3" preload="auto" />
    </div>
  );
};

export default NotificationExample;
