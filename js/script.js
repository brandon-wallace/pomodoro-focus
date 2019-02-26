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
    let sessions = document.querySelector("quantity");
    let bg = document.querySelectorAll('input');
    document.querySelector(".modal").style.display = "none";
    if (bg[0].checked === true) {
        document.querySelector(".clock").style.backgroundColor = 'hsla(0, 0%, 0%, 0.5)';
        document.querySelector(".info").style.backgroundColor = 'hsla(0, 0%, 0%, 0.5)';
        document.querySelector("article").style.backgroundColor = '#47494B';
        let button = document.querySelectorAll(".btn");
        for (let i = 0; i < 3; i++) {
            button[i].style.backgroundColor = '#171717';
            button[i].style.border = '4px solid #0E4275';
        }
    } else {
        document.querySelector("article").style.backgroundColor = '#E9EDF2';
        let button = document.querySelectorAll(".btn");
        document.querySelector(".clock").style.backgroundColor = 'hsla(0, 0%, 100%, 0.47)';
        document.querySelector(".info").style.backgroundColor = 'hsla(0, 0%, 100%, 0.47)';
        document.querySelector("article").style.backgroundColor = '#8F8F8F';
        for (let i = 0; i < 3; i++) {
            button[i].style.backgroundColor = '#FFFFFF';
            button[i].style.border = '4px solid #1E90FF';
        }
    }
}


const startBreak = () => {
    let min = 5;
    let sec = 60;
    if (running) {
        min -= 1;
    }
    sec -= 1;
    if (seconds === 0) {
        if (seconds === 0 && minutes === 0) {
            timesUpSound.play();
        }
    }

}


const start = () => {
    running = true;
    let minutes = 1;
    let seconds = 60;
    let breakminutes = 5;
    let breakseconds = 60;
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
                    timesUpSound.play();
                    // digits.innerHTML = `25:00`;
                    digits.innerHTML = `${padZero(breakminutes)}:${padZero(breakseconds)}`;
                    digits.innerHTML = `5:00`;
                    digits.style.color = '#FF0909';
                    document.querySelector(".clock-text").innerHTML = `break!`;
                    document.querySelector(".clock-digits").classList.add('flash');
                    titleText.innerHTML = `${padZero(breakminutes)}:${padZero(breakseconds)} pomodoro focus`;
                    startBreak();
                    // if (breakseconds === 60) {
                    //     breakminutes -= 1;
                    // }
                    // breakseconds -= 1;
                    // digits.innerHTML = `${padZero(breakminutes)}:${padZero(breakseconds)}`;
                    // titleText.innerHTML = `${padZero(breakminutes)}:${padZero(breakseconds)} pomodoro focus`;
                    // if (breakseconds === 0) {
                    //     if (breakseconds === 0 && breakminutes === 0) {
                    //         clearInterval(timerId);
                    //     }
                    //     breakseconds = 60;
                    // } else {
                    //     breakseconds -= 1;
                    //     // clearInterval(timerId);
                    // }
                    clearInterval(timerId);
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
    document.querySelector(".clock-text").innerHTML = `work`;
    document.querySelector(".clock-digits").innerHTML = `25:00`;
    document.querySelector(".clock-digits").style.color = '#0F31DF';
    document.querySelector(".clock-digits").classList.remove('flash');
    titleText.innerHTML = `pomodoro focus`
    startBtn.disabled = false;
}
