'use client';

import React, { useState, useEffect } from 'react';
import { convertSecondstoTime } from '../utils/converter-limiter';
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

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
      <Alert variant="destructive" className="relative w-auto my-5">
        <AlertCircle/>
        <AlertTitle className="ml-2">That's all for today!</AlertTitle>
        <AlertDescription className="ml-2">
          We've run out of words! Please retry in: {convertSecondstoTime(remainingSeconds)}
        </AlertDescription>
      </Alert>
  );
};

export default CountdownTimer;
