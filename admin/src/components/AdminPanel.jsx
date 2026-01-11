import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Orders from './components/Orders';

const AdminPanel = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const audioRef = useRef(null);
  const previousOrderLength = useRef(0);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Notification sound blocked or failed:', err);
      });
    }
  };

  // This effect listens for increase in newOrdersCount and plays sound
  useEffect(() => {
    if (newOrdersCount > 0 && previousOrderLength.current < newOrdersCount) {
      playNotificationSound();
    }
    previousOrderLength.current = newOrdersCount;
  }, [newOrdersCount]);

  return (
    <div>
      <Navbar setToken={setToken} newOrdersCount={newOrdersCount} />

      {/* Notification Sound */}
      <audio ref={audioRef} src="/Sounds/notification_sound.mp3" preload="auto" />

      <div style={{ paddingTop: '80px' }}>
        <Orders token={token} setNewOrdersCount={setNewOrdersCount} />
      </div>
    </div>
  );
};

export default AdminPanel;
