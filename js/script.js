"use strict";


let running = false;
const beep = new Audio('audio/404151_select-01.mp3');
const timesup = new Audio('audio/216090_bad-beep-incorrect.mp3');
const startBtn = document.querySelector(".start-btn");


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    }
    return `${number}`;
}


const start = () => {
    running = true;
    let minutes = 25;
    let seconds = 60;
    let digits = document.querySelector(".clock-digits");
    beep.play();

    let timerId = setInterval(() => {
        if (running) {
            startBtn.disabled = true;
        }
        if (seconds === 60) {
            minutes -= 1;
        }
        seconds -= 1;
        digits.innerHTML = `${padZero(minutes)}:${padZero(seconds)}`;
        if (seconds === 0) {
            if (seconds === 0 && minutes === 0) {
                clearInterval(timerId);
                timesup.play();
                digits.innerHTML = `25:00`;
            } else {
                seconds = 60;
            }
            minutes -= 1;
        }
    }, 1000)
}


const reset = () => {
    document.querySelector(".clock-digits").innerHTML = `25:00`;
}


const setUp = () => {
    console.log("Setting up...");
}
