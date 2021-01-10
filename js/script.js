"use strict";


let running = false;
let sessions = 1;
let titleText = document.querySelector("title");
const startBtn = document.querySelector(".start-btn");
const beep = new Audio('audio/404151_select-01.mp3');
const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');

const openButton = document.querySelector('.settings-bttn');
const closeButton = document.querySelector('.close-modal');
const increaseButtons = document.querySelectorAll('.increase-time');
const decreaseButtons = document.querySelectorAll('.decrease-time');
const increaseBreakButtons = document.querySelectorAll('.increase-break');
const decreaseBreakButtons = document.querySelectorAll('.decrease-break');


const addMinute = () => {
    let minute = parseInt(document.querySelector('.time').value, 10);
    if (minute === 60) return;
    minute += 1;
    document.querySelector('.time').value = minute;
}


const subtractMinute = () => {
    let minute = document.querySelector('.time');
    if (minute.value <= 1) return;
    minute.value -= 1;
}


const addBreakMinute = () => {
    let minute = parseInt(document.querySelector('.break').value, 10);
    if (minute === 60) return;
    minute += 1;
    document.querySelector('.break').value = minute;
}


const subtractBreakMinute = () => {
    let minute = document.querySelector('.break');
    if (minute.value <= 1) return;
    minute.value -= 1;
}


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}


    /*
const addMinute = () => {
    let interval = Number(document.getElementById("quantity").innerHTML);
    if (interval > 8) {
        interval = 9;
    } else {
        interval += 1;
    }
    document.getElementById("quantity").innerHTML = interval;
}
    */

    /*
const subtractTime = () => {
    let interval = document.getElementById("quantity").innerHTML;
    if (interval < 2) {
        interval = 1;
    } else {
        interval -= 1;
    }
    document.getElementById('quantity').innerHTML = interval;
}
    */


const openModal = () => {
    console.log(`Opening modal`);
    document.querySelector(".modal").style.display = "flex";
}


const closeModal = () => {
    //let bg = document.querySelectorAll('input');
    //sessions = Number(document.querySelector('.quantity').innerHTML);
    document.querySelector(".modal").style.display = "none";
    /*
    if (bg[0].checked === true) {
        document.querySelector(".clock").style.backgroundColor = 'hsla(0, 0%, 0%, 0.5)';
        document.querySelector(".info").style.backgroundColor = 'hsla(0, 0%, 0%, 0.5)';
        document.querySelector("article").style.backgroundColor = '#47494B';
        let button = document.querySelectorAll(".btn");
        for (let i = 0; i < 3; i++) {
            button[i].style.color = '#1E90FF';
            button[i].style.backgroundColor = '#171717';
            button[i].style.border = '4px solid #0E4275';
        }
    } else {
        document.querySelector("article").style.backgroundColor = '#E9EDF2';
        let button = document.querySelectorAll(".btn");
        document.querySelector(".clock").style.color = '#2B7DFA';
        document.querySelector(".clock").style.backgroundColor = 'hsla(0, 0%, 100%, 0.47)';
        document.querySelector(".info").style.backgroundColor = 'hsla(0, 0%, 100%, 0.47)';
        document.querySelector("article").style.backgroundColor = '#8F8F8F';
        for (let i = 0; i < 3; i++) {
            button[i].style.color = '#193FFF';
            button[i].style.backgroundColor = '#FFFFFF';
            button[i].style.border = '4px solid #193FFF';
        }
    }
    */
}


const countdown = () => {
    beep.play();
    let min = 25;
    let sec = 60;
    running = true;
    let digits = document.querySelector(".clock-digits");
    let timeId = setInterval(() => {
        if (running) {
            startBtn.disabled = true;
            if (sec === 60) {
                min -= 1;
            }
            sec -= 1;
            if (min >= 5) {
                digits.style.color = '#0F31DF';
                document.querySelector(".clock-text").innerHTML = `WORK`;
                digits.innerHTML = `${padZero(min)}:${padZero(sec)}`;
                titleText.innerHTML = `${padZero(min)}:${padZero(sec)} pomodoro focus`;
            } else {
                digits.innerHTML = `${padZero(min)}:${padZero(sec)}`;
                titleText.innerHTML = `${padZero(min)}:${padZero(sec)} pomodoro focus`;
                digits.style.color = '#FF0909';
                document.querySelector(".clock-text").innerHTML = `BREAK!`;
                document.querySelector(".clock-digits").classList.add('flash');
            }
            if (sec === 0) {
                if (min === 0) {
                    sessions -= 1;
                    beep.play();
                    if (sessions === 0) {
                        timesUpSound.play();
                        clearInterval(timeId);
                    } else {
                        min = 25;
                        sec = 60;
                    }
                }
                sec = 60;
            }
        }
    }, 1000);
};


const reset = () => {
    running = false;
    sessions = 1;
    startBtn.disabled = false;
    document.querySelector(".clock-text").innerHTML = `WORK`;
    document.querySelector(".clock-digits").innerHTML = `25:00`;
    document.querySelector(".clock-digits").style.color = '#0F31DF';
    document.querySelector(".clock-digits").classList.remove('flash');
    titleText.innerHTML = `pomodoro focus`;
    startBtn.disabled = false;
}


for (let a = 0; a < increaseButtons.length; a++) {
    increaseButtons[a].addEventListener('click', addMinute, false);
}

for (let b = 0; b < decreaseButtons.length; b++) {
    decreaseButtons[b].addEventListener('click', subtractMinute, false);
}

for (let a = 0; a < increaseBreakButtons.length; a++) {
    increaseBreakButtons[a].addEventListener('click', addBreakMinute, false);
}

for (let b = 0; b < decreaseBreakButtons.length; b++) {
    decreaseBreakButtons[b].addEventListener('click', subtractBreakMinute, false);
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
