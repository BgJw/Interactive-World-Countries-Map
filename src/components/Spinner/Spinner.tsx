import React, { useEffect, useRef, useState } from 'react';

interface SpinnerProps {
    visible?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ visible = true }) => {
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!visible) {
            setProgress(0);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        setProgress(0);
        intervalRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return prev; 
                return prev + Math.random() * 10;
            });
        }, 300);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [visible]);

    // When visible becomes false, reset progress
    useEffect(() => {
        if (!visible) setProgress(0);
    }, [visible]);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            zIndex: 9999,
            background: 'transparent'
        }}>
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                    transition: 'width 0.3s ease'
                }}
            />
        </div>
    );
};

export default Spinner;