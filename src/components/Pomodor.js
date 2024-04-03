import React, { useState, useEffect } from 'react';
import { UilHourglass, UilPlay, UilStopCircle,UilSetting } from '@iconscout/react-unicons';
import { BiReset } from 'react-icons/bi';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Pomodoro() {
  const [minute, setMinute] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [run, setRun] = useState(false);
  const [intervalType, setIntervalType] = useState('focus');
  const [focusManualTime, setFocusManualTime] = useState(0);
  const [breakManualTime, setBreakManualTime] = useState(0);
  const [longBreakManualTime, setLongBreakManualTime] = useState(0);
  const [showManualInput, setShowManualInput] = useState(false);

  const min = 1;
  const max = 59;

  useEffect(() => {
    let timer;

    if (run) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minute === 0) {
            clearInterval(timer);
            setRun(false);

            if (intervalType === 'focus') {
              setMinute(5);
              setSeconds(0);
              setIntervalType('break');
            } else if (intervalType === 'break') {
              setMinute(30);
              setSeconds(0);
              setIntervalType('longBreak');
            } else if (intervalType === 'longBreak') {
              setMinute(25);
              setSeconds(0);
              setIntervalType('focus');
            }
          } else {
            setMinute((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [run, minute, seconds, intervalType, focusManualTime, breakManualTime, longBreakManualTime]);

  const startTimer = () => {
    setRun(true);
  };

  const stopTimer = () => {
    setRun(false);
  };

  const resetTimer = () => {
    setRun(false);
    setMinute(25);
    setSeconds(0);
    setIntervalType('focus');
  };

  const ManualInput = ({ type, setTime, manualTime, setManualTime }) => {
    const setManualTimer = () => {
      setRun(false);
      setTime(Math.max(min, Math.min(max, manualTime)));
      setSeconds(0);
      setIntervalType(type);
    };

    return (
      <div>
        <input
          type='number'
          value={manualTime}
          onChange={(e) => setManualTime(Math.max(min, Math.min(max, Number(e.target.value))))}
          placeholder='time '
          className='manual-input'
        />
        <button className='manual-btn' onClick={setManualTimer}>
          Set {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </div>
    );
  };

  const toggleManualInput = () => {
    setShowManualInput((prev) => !prev);
  };

  const calculateProgress = () => {
    const totalTime = minute * 60 + seconds;
  
    let initialTime;
    if (intervalType === 'focus' && focusManualTime > 0) {
      initialTime = focusManualTime * 60;
    } else if (intervalType === 'break' && breakManualTime > 0) {
      initialTime = breakManualTime * 60;
    } else if (intervalType === 'longBreak' && longBreakManualTime > 0) {
      initialTime = longBreakManualTime * 60;
    } else {
      
      const defaultDurations = { focus: 25, break: 5, longBreak: 15 };
      initialTime = defaultDurations[intervalType] * 60;
    }
  
    return (totalTime / initialTime) * 100;
  };
  
  

  return (
    <div className='mainContainer'>
      <h1>
        Pomodoro Timer <UilHourglass />
      </h1>
      <div>
        <div className='buttoncontainer1'>
          <div className='button'>
            <button
              className='focus'
              onClick={() => {
                stopTimer();
                setMinute(25);
                setSeconds(0);
                setIntervalType('focus');
              }}
            >
              FOCUS
            </button>
          </div>
          <div className='button'>
            <button
              className='break'
              onClick={() => {
                stopTimer();
                setMinute(5);
                setSeconds(0);
                setIntervalType('break');
              }}
            >
              BREAK
            </button>
          </div>
          <div className='button'>
            <button
              className='longbreak'
              onClick={() => {
                stopTimer();
                setMinute(15);
                setSeconds(0);
                setIntervalType('longBreak');
              }}
            >
              LONG BREAK
            </button>
          </div>
        </div>

        <div className='container111'>
          
          <div style={{ width: '50%', margin: 'auto' }}>
            <CircularProgressbar
              value={calculateProgress()}
              text={`${minute}:${seconds < 10 ? '0' + seconds : seconds}`}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: '#1e052d',
                trailColor: 'transparent',
              })}
            />
          </div>
        </div>

        <div className='buttoncontainer2'>
          <div className='button1'>
            <button className='startbtn' onClick={startTimer}>
              <UilPlay size={30} />
            </button>
          </div>
          <div className='button1'>
            <button className='stopbtn' onClick={stopTimer}>
              <UilStopCircle size={30} />
            </button>
          </div>
          <div className='button1'>
            <button className='Resetbtn' onClick={resetTimer}>
              <BiReset size={30} />
            </button>
          </div>
       
        </div>
       
        {showManualInput && (
          <div>
             <div className='mnaul'>   <div >
            <ManualInput 
            
              type='focus'
              setTime={setMinute}
              manualTime={focusManualTime}
              setManualTime={setFocusManualTime}
            />
          </div>
          <div >
            <ManualInput
              type='break'
              setTime={setMinute}
              manualTime={breakManualTime}
              setManualTime={setBreakManualTime}
            />
          </div>
          <div >
            <ManualInput
              type='longBreak'
              setTime={setMinute}
              manualTime={longBreakManualTime}
              setManualTime={setLongBreakManualTime}
            />
          </div></div>
            <button className='settingsBtn' onClick={toggleManualInput}>
            <UilSetting size={30}/>
            </button>
          </div>
        )}
        {!showManualInput && (
          <div>
            <button className='settingsBtn' onClick={toggleManualInput}>
              <UilSetting size={30}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pomodoro;

