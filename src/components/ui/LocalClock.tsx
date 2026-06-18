import { useState, useEffect } from 'react';
import './LocalClock.css';

const LocalClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Guatemala',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(now);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="local-clock" aria-label="Hora local en Guatemala">
      <span className="clock-dot" />
      <span className="clock-location">Guatemala</span>
      <span className="clock-time">{time}</span>
    </div>
  );
};

export default LocalClock;
