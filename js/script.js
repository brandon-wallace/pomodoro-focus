"use strict";

let running = false;
let loop = false;
let titleText = document.querySelector('title');
const beepSound = new Audio('audio/404151_select-01.mp3');
const resetBttn = document.querySelector('.reset-bttn');
const startBttn = document.querySelector('.start-bttn');
const setBttn = document.querySelector('.set-bttn');
const submitBttn = document.querySelector('.submit__bttn button');
const addBttn = document.querySelectorAll('.add');
const subtractBttn = document.querySelectorAll('.subtract');
const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');
let startTime = 25;
let shortBreak = 5; 
let longBreak = 15;


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}


// START TIMER
const startTimer = () => {
    startBttn.blur();
    beepSound.play();
    let min = startTime;
    let sec = 60;
    running = true;
    let digits = document.querySelector('.timer__digits');
    let timeId = setInterval(() => {
        if (running) {
            startBttn.disabled = true;
            if (sec === 60) {
                min -= 1;
            }
            sec -= 1;
            digits.textContent = `${padZero(min)}:${padZero(sec)}`;
            titleText.textContent = `${padZero(min)}:${padZero(sec)} pomodoro focus`;
            if (sec === 0) {
                if (min === 0) {
                    min = min + shortBreak;
                    shortBreak = 0;
                    document.querySelector(".timer__text").textContent = `BREAK`;
                    beepSound.play();
                    if (min === 0 && sec === 0) {
                        timesUpSound.play();
                        clearInterval(timeId);
                    }
                }
                sec = 60;
            }
        } 
    }, 1000);
};


// RESET TIMER
const resetTimer = () => {
    running = false;
    document.querySelector('.timer__text').textContent = `WORK`;
    document.querySelector('.timer__digits').textContent = `25:00`;
    titleText.innerHTML = `pomodoro focus`;
    startBttn.disabled = false;
}


// CONTROL BUTTONS
const controls = [resetBttn, startBttn, setBttn];

for (let item of controls) {
    item.addEventListener('click', function(event) {
        if (event.currentTarget.classList[2] === 'set-bttn') {
            document.querySelector('.modal').style.display = 'flex';
        }
        if (event.currentTarget.classList[2] === 'reset-bttn') {
            resetTimer();
        }
        if (event.currentTarget.classList[2] === 'start-bttn') {
            startTimer();
        }
    });
}    


// CLOSE
const closeModal = () => {
    let time = Number(document.querySelector('.time').textContent);
    startTime = time;
    let shortbreak = Number(document.querySelector('.break-short').textContent);
    shortBreak = shortbreak;
    let longbreak = Number(document.querySelector('.break-long').textContent);
    longBreak = longbreak;
    loop = document.querySelector('.loop');
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.timer__digits').textContent = `${padZero(time)}:00`;
}

submitBttn.addEventListener('click', closeModal); 


// INCREMENT/DECREMENT BUTTONS
for (let elem of addBttn) {
    elem.addEventListener('click', function(event) {
        let digit = Number(event.currentTarget.nextElementSibling.textContent);
        digit += 1;
        event.currentTarget.nextElementSibling.textContent = digit;
    });
}


for (let elem of subtractBttn) {
    elem.addEventListener('click', function(event) {
        let digit = Number(event.currentTarget.previousElementSibling.textContent);
        digit -= 1;
        event.currentTarget.previousElementSibling.textContent = digit;
    });
}
