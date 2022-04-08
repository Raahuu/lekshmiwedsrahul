import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";

import TimerCountdown from "./components/timer-countdown";
import "./sass/main.scss";

function App() {
  const [remainingTime, setRemainingTime] = useState(0);
  const endTime = useRef(null);

  useEffect(() => {
    const weddingDate = moment();
    weddingDate.year(2022);   // Year   : 2022
    weddingDate.month(8);     // Month  : 09 (September)
    weddingDate.date(11);     // Day    : 11 (Sunday)
    weddingDate.hour(11);     // Hour   : 11 (Morning 11 am)
    weddingDate.minutes(45);  // Minute : 45
    weddingDate.seconds(0);   // Second : 0

    endTime.current = weddingDate.valueOf();
  }, []);

  const calculateRemainingTime = useCallback(() => {
    let difference = moment(endTime.current).valueOf() - moment().valueOf();

    if (difference < 0) {
      difference = -difference;
    }

    let differenceDuration = moment.duration(difference);

    let months =
      differenceDuration.months() > 9
        ? differenceDuration.months()
        : `0${differenceDuration.months()}`;
    let days =
      differenceDuration.days() > 9
        ? differenceDuration.days()
        : `0${differenceDuration.days()}`;
    let hours =
      differenceDuration.hours() > 9
        ? differenceDuration.hours()
        : `0${differenceDuration.hours()}`;
    let minutes =
      differenceDuration.minutes() > 9
        ? differenceDuration.minutes()
        : `0${differenceDuration.minutes()}`;
    let seconds =
      differenceDuration.seconds() > 9
        ? differenceDuration.seconds()
        : `0${differenceDuration.seconds()}`;

    setRemainingTime({ months, days, hours, minutes, seconds });

    setTimeout(() => {
      calculateRemainingTime();
    }, 1000);
  }, []);

  useEffect(() => {
    calculateRemainingTime();
  }, [calculateRemainingTime]);

  return (
    <div className="content-wrapper">
      <div className="timer-container">
        <p className="timer-title">It’s our big day and the clock is ticking</p>

        <div className="timer-wrapper">
          <TimerCountdown
            value={remainingTime.months}
            type={remainingTime.months > 1 ? "months" : "month"}
          />
          <TimerCountdown
            value={remainingTime.days}
            type={remainingTime.days > 1 ? "days" : "day"}
          />
          <TimerCountdown
            value={remainingTime.hours}
            type={remainingTime.hours > 1 ? "hours" : "hour"}
          />
          <TimerCountdown
            value={remainingTime.minutes}
            type={remainingTime.minutes > 1 ? "minutes" : "minute"}
          />
          <TimerCountdown
            value={remainingTime.seconds}
            type={remainingTime.seconds > 1 ? "seconds" : "second"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
