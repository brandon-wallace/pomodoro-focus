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
    let interval = Number(document.getElementById("quantity").innerHTML);
    if (interval > 8) {
        intervar = 9;
    } else {
        interval += 1;
    }
    document.getElementById("quantity").innerHTML = interval;
}


const decrease = () => {
    let interval = document.getElementById("quantity").innerHTML;
    if (interval < 2) {
        intervar = 1;
    } else {
        interval -= 1;
    }
    document.getElementById("quantity").innerHTML = interval;
}


const modalClose = () => {
    let bg = document.querySelectorAll('input');
    document.querySelector(".modal").style.display = "none";
    if (bg[0].checked === true) {
        document.querySelector("article").style.backgroundColor = '#47494B';
        let button = document.querySelectorAll(".btn");
        for (let i = 0; i < button.length; i++) {
            button[i].style.backgroundColor = '#171717';
            button[i].style.border = '4px solid #0E4275';
        }
    } else {
        document.querySelector("article").style.backgroundColor = '#E9EDF2';
        let button = document.querySelectorAll(".btn");
        for (let i = 0; i < button.length; i++) {
            button[i].style.backgroundColor = '#FFFFFF';
            button[i].style.border = '4px solid #1E90FF';
        }
    }
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
