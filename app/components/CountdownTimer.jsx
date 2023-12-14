'use client';

import React, { useState, useEffect } from 'react';
import { convertSecondstoTime } from '../utils/converter-limiter';

const CountdownTimer = ({ endTimeInSeconds, onTimerFinish }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(endTimeInSeconds);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onTimerFinish();
      return;
    }

    if (remainingSeconds <= 0) {
      setShowTimer(false);
      onTimerFinish(); // Call the callback instead of directly setting the state
    }

    const intervalId = setInterval(() => {
      setRemainingSeconds(remainingSeconds => {
        if (remainingSeconds <= 1) {
          clearInterval(intervalId);
          onTimerFinish();
          return 0;
        }
        return remainingSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingSeconds, onTimerFinish]);

  return (
    <div>
      <span className='text-red-500'>
        Looks like you're out of time! Use it again in:{' '}
        {convertSecondstoTime(remainingSeconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;
