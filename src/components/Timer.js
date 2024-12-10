import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

function Timer() {
    const [time, setTime] = useState(1500); // 25 minutos em segundos por padrão
    const [isActive, setIsActive] = useState(false);
    const [initialTime, setInitialTime] = useState(1500); // Tempo inicial padrão
    const [alarmSound, setAlarmSound] = useState('/alarm1.mp3'); // Som do alarme padrão
    const alarmRef = useRef(null); // Referência ao elemento de áudio

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        } else if (time === 0) {
            clearInterval(interval);
            if (alarmRef.current) {
                alarmRef.current.play(); // Reproduz o áudio quando o tempo chega a zero
            }
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(initialTime); // Reseta para o tempo inicial selecionado
    };

    const setPomodoroTime = () => {
        setIsActive(false);
        setTime(1500);
        setInitialTime(1500);
    };

    const setShortBreakTime = () => {
        setIsActive(false);
        setTime(300);
        setInitialTime(300);
    };

    const setLongBreakTime = () => {
        setIsActive(false);
        setTime(900);
        setInitialTime(900);
    };

    const handleAlarmChange = (event) => {
        setAlarmSound(event.target.value);
    };

    return (
        <div className={styles['timer']}>
            <audio ref={alarmRef} src={alarmSound}>
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <div className={styles['time']}>
                {`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}
            </div>
            <div className={styles['button-container']}>
                <button onClick={handleStart}><FaPlay /></button>
                <button onClick={handlePause}><FaPause /></button>
                <button onClick={handleReset}><FaStop /></button>
            </div>
            <div className={styles['preset-container']}>
                <button onClick={setPomodoroTime}>Pomodoro</button>
                <button onClick={setShortBreakTime}>Short Break</button>
                <button onClick={setLongBreakTime}>Long Break</button>
            </div>
            <div className={styles['alarm-selector']}>
                <label htmlFor="alarm">Escolha o som do alarme:</label>
                <select id="alarm" value={alarmSound} onChange={handleAlarmChange}>
                    <option value="/alarm.mp3">Iphone alarm</option>
                    <option value="/alarm2.mp3">Sirene</option>
                    <option value="/alarm3.mp3">Pi-Pi</option>
                    <option value="/alarm4.mp3">Tic-Tac</option>
                    <option value="/alarm5.mp3">Sansung Bird</option>
                </select>
            </div>
        </div>
    );
}

export default Timer;
