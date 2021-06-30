import React, { useEffect, useRef, useState } from "react";
import '../components/CountDown.css'

const CountDown = (props) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  let dt = "", tm = "" 
 

  const getConfDate  =() => {
    props.conference.period;
    props.conference.startingTime
    let date = props.conference.period.split("-")

    let time = props.conference.startingTime.split(" ")
    let t = time[0].split(".")

    dt = date[0]+", 2021";
    tm = t[0]+":"+t[1]+":00";

  }



  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(dt +" " + tm).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    getConfDate();
    const setTime = () =>{
      let i = interval.current;
      startTimer();
      return () => {
        clearInterval(i);
      };
    }
    setTime()  
  });

  return (
    <div className="timer">
      <div className="timeCard">
        <p>
          <small>Days</small>
        </p>
        <h3>{timerDays}</h3>
      </div>
      <div className="timeCard">
        <p>
          <small>Hours</small>
        </p>
        <h3>{timerHours}</h3>
      </div>
      <div className="timeCard">
        <p>
          <small>Minutes</small>
        </p>
        <h3>{timerMinutes}</h3>
      </div>
      <div className="timeCard">
        <p>
          <small>Seconds</small>
        </p>
        <h3>{timerSeconds}</h3>
      </div>
    </div>
  );
};

export default CountDown;
