import React, { useRef, useState, useEffect } from 'react'


function HomePage() {
    const [timeLeftSeconds, setTimeLeft] = useState(5000);
    const intervalRef = useRef(); // Add a ref to store the interval id
  
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }, []);
  
    // Add a listener to `timeLeft`
    useEffect(() => {
      if (timeLeftSeconds <= 0) {
        clearInterval(intervalRef.current);
      }
    }, [timeLeftSeconds]);
  
    return (
    <>
    <div>Days: {Math.floor(timeLeftSeconds / (60 * 60 * 24) )}</div>
    <div>Hours: {Math.floor(timeLeftSeconds % (60 * 60 * 24) / (60 * 60)) }</div>
    <div>Minutes: {Math.floor(timeLeftSeconds % (60 * 60) / 60) }</div>
    <div>Seconds: {Math.floor(timeLeftSeconds % 60) }</div>

    <div>{Math.floor( timeLeftSeconds / (60 * 60 * 24) )}   
   {Math.floor( timeLeftSeconds % (60 * 60 * 24) / (60 * 60)) }
    {Math.floor(timeLeftSeconds % (60 * 60) / 60) }
    {Math.floor(timeLeftSeconds % 60) }</div>
    Days: Hours: Minutes: Seconds: 
    </>);
  }

export default HomePage