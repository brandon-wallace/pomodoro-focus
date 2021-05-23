"use strict";

let seconds = 60;
let workMinutes = 25;
let breakMinutes = 5;
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


const startTimer = (minutes) => {
    let seconds = 60;
    let timeId = setInterval(() => {
        if (seconds === 60) {
            minutes -= 1;
        }
        seconds -= 1;
        document.querySelector('.timer__text').textContent = `WORK`;
        document.querySelector('.timer__digits').textContent = `${padZero(minutes)}:${padZero(seconds)}`;
        console.log(`Work: ${minutes} ${seconds}`);
        if (seconds === 0) {
            if (minutes === 0) {
                console.log('TIME\'S UP');
                clearInterval(timeId);
                minutes = workTime;
                seconds = 60;
            } 
            seconds = 60;
        }
    }, 1000);
}


const startBreak = (breaktime) => {
    let seconds = 60;
    let breakId = setInterval(() => {
        if (seconds === 60) {
            breakTime -= 1;
        }
        seconds -= 1;
        document.querySelector('.timer__text').textContent = `BREAK`;
        document.querySelector('.timer__digits').textContent = `${padZero(breakTime)}:${padZero(seconds)}`;
        console.log(`Break: ${breakTime} ${seconds}`);
        if (seconds === 0) {
            if (breakTime === 0) {
                clearInterval(breakId);
            } 
        }
    }, 1000);
}


const main = async (worktime, breakShort, breakLong) => {
    console.log('START')
    startTimer(workTime);
    startBreak(breakShort);
    startTimer(workTime);
    startBreak(breakShort);
    startTimer(workTime);
    startBreak(breakLong);
    //for (let count = 3; count > 0; count--) {
        //console.log(count);
        //await startTimer(worktime);
        //await startTimer.then();
        //console.log(`Work time: ${worktime}`);
        /*
        if (count === 1) {
            breakShort = breakLong;
        }
        */
        //startBreak(breakShort);
    console.log('END');
}


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
            //startTimer(workTime);
            //countdown(startTime, seconds);
            main(workTime, breakShort, breakLong);
            startBttn.disabled = true;
            //startCountdown(workTime);
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
