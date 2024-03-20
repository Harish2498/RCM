import React, { useState, useEffect } from 'react';
const CounterUpAnimation = (endValue) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let animationInterval;
        const step = Math.ceil(endValue/(50000/1000))
        if (count < endValue) {
            animationInterval = setInterval(() => {
                setCount((prevCount) => prevCount + step);
                if (count + step >= endValue) {
                    setCount(endValue);
                    clearInterval(animationInterval);
                }
            }, 10);
        }
        return () => {
            clearInterval(animationInterval);
        };
    }, [count, endValue]);
    return count
};
export default CounterUpAnimation;