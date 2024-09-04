import React, { useState, useEffect } from "react";
import "./stopWatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (running && !paused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, paused]);

  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / 3600000) % 24)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleStartPause = () => {
    if (running && !paused) {
      setPaused(true);
    } else {
      setRunning(true);
      setPaused(false);
    }
  };

  const handleStop = () => {
    setRunning(false);
    setPaused(false);
    setTime(0);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
    setPaused(false);
  };

  return (
    <div>
      <h1>STOPWATCH</h1>
      <div>{formatTime(time)}</div>
      <div>
        <button className="stopwatch-button" onClick={handleStartPause}>
          {running && !paused ? "Pause" : "Start"}
        </button>
        <button
          className="stopwatch-button"
          onClick={handleStop}
          disabled={!running}
        >
          Stop
        </button>
        <button className="stopwatch-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
