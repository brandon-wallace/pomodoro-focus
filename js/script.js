"use strict";

let sec = 60;
let min = 2;
let running = false;
let mode = 'work';
let session = 3;

let totalTime;
let workTime;
let breakShort = 5;
let breakLong = 15;

let titleText = document.querySelector('title');
const ctrlBttns = document.querySelectorAll('.ctrl-bttn');
const startBttn = document.querySelector('.bttn-start');
const submitBttn = document.querySelector('.submit__bttn');
const addBttn = document.querySelectorAll('.add');
const subtractBttn = document.querySelectorAll('.subtract');
const beepSound = new Audio('audio/404151_select-01.mp3');
const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');


const buttonAction = (event) => {
    if (event.currentTarget.matches('.start')) {
        running = true;
        beepSound.play();
        startTimer(session);
        //countdown();
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
    bttn.addEventListener('click', buttonAction);
});

const padZero = (number) => {
    return number.toString().padStart(2, '0');
}

const startTimer = async (sess) => {
    const count = sess;
    for (let i = count; i > 0; i--) {
        await countdown();
    }
}

const countdown = () => {
    return new Promise((resolve, reject) => {
    if (running === true) {
        sec = sec - 1;
        document.querySelector('.minutes').textContent = padZero(min);
        document.querySelector('.seconds').textContent = padZero(sec);
        titleText.textContent = `${padZero(min)}:${padZero(sec)} Pomodoro Focus`;
        if (mode === 'break') {
            document.querySelectorAll('.timer__label')[1].classList.add('active');
            document.querySelectorAll('.timer__label')[0].classList.remove('active');
            if (min === 0 && sec === 0) {
                resetTimer();
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
            sec = 60;
        }
            setTimeout(() => {
                countdown();
                resolve();
            }, 1000);
    }
        })
}

const resetTimer = () => {
    mode = 'work';
    sec = 60;
    min = 2;
    document.querySelector('title').textContent = `Pomodoro Focus`;
    document.querySelectorAll('.timer__label')[0].classList.add('active');
    document.querySelectorAll('.timer__label')[1].classList.remove('active');
    document.querySelector('.minutes').textContent = `2`;
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
    min = workTime - 1;
    document.querySelector('.start').disabled = false;
    breakLong = Number(document.querySelector('.break-long').textContent);
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.minutes').textContent = `${padZero(workTime)}`;
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

const rangeSlider = document.querySelector('.session-number');
let rangeOutput = document.querySelector('.range__output');
rangeOutput.textContent = rangeSlider.value;

rangeSlider.addEventListener('input', () => {
    rangeOutput.textContent = rangeSlider.value;
});
