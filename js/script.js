"use strict";


let running = false;
let titleText = document.querySelector("title");
const beep = new Audio('audio/404151_select-01.mp3');
const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');
const startBtn = document.querySelector(".start-btn");


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    }
    return `${number}`;
}


const setUp = () => {
    document.querySelector(".modal").style.display = "flex";     
}


const increase = () => {
    console.log("Increasing count");
}


const decrease = () => {
    console.log("Decreasing count");
}


const modalClose = () => {
    document.querySelector(".modal").style.display = "none";
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
            if (seconds === 60) {
                minutes -= 1;
            }
            seconds -= 1;
            digits.innerHTML = `${padZero(minutes)}:${padZero(seconds)}`;
            titleText.innerHTML = `${padZero(minutes)}:${padZero(seconds)} pomodoro focus`;
            if (seconds === 0) {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(timerId);
                    timesUpSound.play();
                    digits.innerHTML = `25:00`;
                } else {
                    seconds = 60;
                }
                minutes -= 1;
            }
        } else {
            clearInterval(timerId);
        }
    }, 1000)
}


const reset = () => {
    running = false;
    document.querySelector(".clock-digits").innerHTML = `25:00`;
    titleText.innerHTML = `pomodoro focus`
    startBtn.disabled = false;
}
