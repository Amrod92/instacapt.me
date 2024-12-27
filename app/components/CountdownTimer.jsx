'use client';

import React, {useState, useEffect} from 'react';
import {AlertCircle} from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

const CountdownTimer = ({retryAfterInSeconds, onComplete}) => {
    const [timeLeft, setTimeLeft] = useState(retryAfterInSeconds);

    useEffect(() => {
        // Start the timer if timeLeft is greater than 0
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            // Clear the timer on component unmount
            return () => clearInterval(timer);
        }

        // Trigger the completion callback when time reaches zero
        if (timeLeft === 0 && onComplete) {
            onComplete();
        }
    }, [timeLeft, onComplete]);

    const formatTime = (seconds) => {
        if (seconds <= 0) return "00:00:00";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <Alert variant="destructive" className="relative w-auto my-5">
            <AlertCircle/>
            <AlertTitle className="ml-2">That's all for today!</AlertTitle>
            <AlertDescription className="ml-2">
                We've run out of words! Please retry in: {formatTime(timeLeft)}
            </AlertDescription>
        </Alert>
    );
};

export default CountdownTimer;
