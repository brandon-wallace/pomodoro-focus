"use strict";

let sec = 60;
let min = 2;
let breakMinutes = 5;
let running = false;
let mode = 'work';

let totalTime;
let workTime;
let breakShort;
let breakLong;

let titleText = document.querySelector('title');
const ctrlBttns = document.querySelectorAll('.ctrl-bttn');
const beepSound = new Audio('audio/404151_select-01.mp3');
const startBttn = document.querySelector('.bttn-start');
const submitBttn = document.querySelector('.submit__bttn');
const addBttn = document.querySelectorAll('.add');
const subtractBttn = document.querySelectorAll('.subtract');
const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');


const action = (event) => {
    if (event.currentTarget.matches('.start')) {
        running = true;
        beepSound.play()
        countdown();
        document.querySelector('.start').disabled = true;
    } else if (event.currentTarget.matches('.reset')) {
        running = false;
        document.querySelector('.start').disabled = false;
        resetTimer();
    } else if (event.currentTarget.matches('.settings')) {
        document.querySelector('.modal').style.display = 'flex';
    };
}

ctrlBttns.forEach(bttn => {
    bttn.addEventListener('click', action);
});

const padZero = (number) => {
    return number.toString().padStart(2, '0');
}

const countdown = () => {
    if (running === true) {
        sec = sec - 1;
        document.querySelector('.minutes').textContent = padZero(min);
        document.querySelector('.seconds').textContent = padZero(sec);
        titleText.textContent = `${padZero(min)}:${padZero(sec)} Pomodoro Focus`;
        if (mode === 'break') {
            document.querySelectorAll('.timer__label')[1].classList.add('active');
            document.querySelectorAll('.timer__label')[0].classList.remove('active');
            if (min === 0 && sec === 0) {
                timesUpSound.play();
                return;
            }
        }
        if (sec == 0) {
            if (min === 0 && mode === 'work') {
                mode = 'break';
                beepSound.play();
                min = breakShort;
            }
            min = min - 1;
            sec = 60
        }
        setTimeout(() => {
            countdown();
        }, 50);
    }
}

const resetTimer = () => {
    mode = 'work';
    sec = 60;
    min = 25;
    document.querySelector('title').textContent = `Pomodoro Focus`;
    document.querySelectorAll('.timer__label')[0].classList.add('active');
    document.querySelectorAll('.timer__label')[1].classList.remove('active');
    document.querySelector('.minutes').textContent = `25`;
    document.querySelector('.seconds').textContent = `00`;
    titleText.innerHTML = `Pomodoro Focus`;
}

const closeBttn = document.querySelector('.modal__close');

closeBttn.onclick = function() {
    document.querySelector('.modal').style.display = 'none';
}

const closeModal = () => {
    workTime = Number(document.querySelector('.time').textContent);
    breakShort = Number(document.querySelector('.break-short').textContent);
    totalTime = workTime + breakShort;
    min = workTime;
    document.querySelector('.start').disabled = false;
    breakLong = Number(document.querySelector('.break-long').textContent);
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.minutes').textContent = `${padZero(totalTime - breakShort)}`;
}

submitBttn.addEventListener('click', closeModal);

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

/*
const timerType = (timerDescription) => {
    if (typeof timerDescription === 'function') console.log('Is a function')
    if (timerDescription === 'work') {
        return 1;
    } else if (timerDescription === 'break') {
        return 5;
    } else {
        return 15; // long break
    }
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
            startTimer(1, timerType('work'));
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
*/
