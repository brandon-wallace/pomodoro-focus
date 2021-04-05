"use strict";

let running = false;
let titleText = document.querySelector('title');
//const beepSound = new Audio('audio/404151_select-01.mp3');
const resetBttn = document.querySelector('.reset-bttn');
const startBttn = document.querySelector('.start-bttn');
const setBttn = document.querySelector('.set-bttn');
const submitBttn = document.querySelector('.submit__bttn button');
const addBttn = document.querySelectorAll('.add');
const subtractBttn = document.querySelectorAll('.subtract');
//const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');
let workTime = 1;
let breakShort = 5;
let breakLong = 15;


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}


const startTimer = (minutes, timerType) => {
    let seconds = 60;
    if (timerType === 'work') {
        minutes = 1;
        document.querySelector('.timer__text').textContent = `WORK`;
    } else if (timerType === 'break') {
        minutes = 5;
        document.querySelector('.timer__text').textContent = `BREAK`;
    } else if (timerType === 'longbreak') {
        minutes = 15;
        document.querySelector('.timer__text').textContent = `BREAK`;
    }
    let timeId = setInterval(() => {
        if (seconds === 60) {
            minutes -= 1;
        }
        seconds -= 1;
        document.querySelector('.timer__digits').textContent = `${padZero(minutes)}:${padZero(seconds)}`;
        console.log(`Work: ${minutes} ${seconds}`);
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timeId);
                //callback();
            }
            seconds = 60;
        }
    }, 1000);
}


const startBreak = (breaktime) => {
    let seconds = 60;
    let breakId = setInterval(() => {
        if (seconds === 60) {
            breaktime -= 1;
        }
        seconds -= 1;
        document.querySelector('.timer__text').textContent = `BREAK`;
        console.log(`Break: ${breaktime} ${seconds}`);
        if (seconds === 0) {
            if (breakTime === 0) {
                clearInterval(breakId);
            }
        }
    }, 1000);
}


const main = (callback) => {
    //startTimer(workTime, startBreak(breakShort));
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
            startTimer(1, 'work');
        }
    });
}    


// RESET TIMER
const resetTimer = () => {
    running = false;
    document.querySelector('.timer__text').textContent = `WORK`;
    document.querySelector('.timer__digits').textContent = `25:00`;
    titleText.innerHTML = `pomodoro focus`;
    startBttn.disabled = false;
}


// CLOSE
const closeBttn = document.querySelector('.modal__close');

closeBttn.onclick = function() {
    document.querySelector('.modal').style.display = 'none';
}

const closeModal = () => {
    workTime = Number(document.querySelector('.time').textContent);
    breakShort = Number(document.querySelector('.break-short').textContent);
    breakLong = Number(document.querySelector('.break-long').textContent);
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.timer__digits').textContent = `${padZero(workTime)}:00`;
}

submitBttn.addEventListener('click', closeModal); 


// INCREMENT/DECREMENT BUTTONS
for (let elem of addBttn) {
    elem.addEventListener('click', function(event) {
        let digit = Number(event.currentTarget.nextElementSibling.textContent);
        if (digit === 60) return;
        digit += 1;
        event.currentTarget.nextElementSibling.textContent = digit;
    });
}


for (let elem of subtractBttn) {
    elem.addEventListener('click', function(event) {
        let digit = Number(event.currentTarget.previousElementSibling.textContent);
        if (digit === 1) return;
        digit -= 1;
        event.currentTarget.previousElementSibling.textContent = digit;
    });
}
