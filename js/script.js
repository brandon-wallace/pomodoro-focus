"use strict";


let running = false;
let sessions = 1;
let titleText = document.querySelector("title");
const beep = new Audio('audio/404151_select-01.mp3');
const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');
const startBtn = document.querySelector(".start-btn");


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}


const setUp = () => {
    document.querySelector(".modal").style.display = "flex";
}


const increase = () => {
    let interval = Number(document.getElementById("quantity").innerHTML);
    if (interval > 8) {
        interval = 9;
    } else {
        interval += 1;
    }
    document.getElementById("quantity").innerHTML = interval;
}


const decrease = () => {
    let interval = document.getElementById("quantity").innerHTML;
    if (interval < 2) {
        interval = 1;
    } else {
        interval -= 1;
    }
    document.getElementById("quantity").innerHTML = interval;
}


const modalClose = () => {
    let bg = document.querySelectorAll('input');
    sessions = Number(document.querySelector('.quantity').innerHTML);
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


const timerCountdown = () => {
    let sec = 60;
    let min = 6;
    let digits = document.querySelector(".clock-digits");
    running = true;
    console.log(`Starting 25 min interval.`)
    let timerId = setInterval(() => {
        if (running) {
            console.log(min);
            if (sec === 60) {
                min -= 1;
            }
            if (min > 5) {
                digits.innerHTML = `${padZero(min - 5)}:${padZero(sec)}`;
                titleText.innerHTML = `${padZero(min - 5)}:${padZero(sec)} pomodoro focus`;
            } else {
                digits.style.color = '#FF0909';
                document.querySelector(".clock-text").innerHTML = `break!`;
                document.querySelector(".clock-digits").classList.add('flash');
                digits.innerHTML = `${padZero(min)}:${padZero(sec)}`;
                titleText.innerHTML = `${padZero(min)}:${padZero(sec)} pomodoro focus`;
            }
            sec -= 1;
            if (sec === 0) {
                console.log(sessions);
                if (sec === 0 && min === 0) {
                    // timesUpSound.play();
                    running = false;
                    clearInterval(timerId);
                    startBreak();
                } else {
                    sec = 60;
                }
                min -= 1;
            }
        } else {
            clearInterval(timerId);
        }
    }, 1000);
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
