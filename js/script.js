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


class Timer {
    constructor(workTime=25, breakTime=5, longBreakTime=15) {
        this.worTime = workTime;
        this.breakTime = breakTime;
        this.longBreakTime = longBreakTime;
    };

    total() {
        console.log((this.workTime * 3) + (this.breakTime * 3) + this.longbreakTime);
        return (this.workTime * 3) + (this.breakTime * 3) + this.longbreakTime;
    };

    calculateTime() {
        this.min = this.worktime;
        this.hours = (this.min / 60);        
        this.rounded_hours = Math.floor(this.hours);
        this.minutes = (this.hours - this.rounded_hours) * 60;
        this.rounded_minutes = Math.floor(this.minutes);
        return `${this.rounded_hours} ${this.rounded_minutes}`;
    };
};

let timer = new Timer(25, 5, 15);


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
        switch (event.currentTarget.classList[2]) {
            case 'set-bttn':
                document.querySelector('.modal').style.display = 'flex';
                break;
            case 'reset-bttn':
                resetTimer();
                break;
            case 'start-bttn':
                startBttn.disabled = true;
                break;
            default:
                console.log('ERROR');
        }
    });
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
