"use strict";

let running = false;
let loop = false;
//const seconds = 60;
let titleText = document.querySelector('title');
//const beepSound = new Audio('audio/404151_select-01.mp3');
const resetBttn = document.querySelector('.reset-bttn');
const startBttn = document.querySelector('.start-bttn');
const setBttn = document.querySelector('.set-bttn');
const submitBttn = document.querySelector('.submit__bttn button');
const addBttn = document.querySelectorAll('.add');
const subtractBttn = document.querySelectorAll('.subtract');
//const timesUpSound = new Audio('audio/216090_bad-beep-incorrect.mp3');
let workTime = 25;
let breakShort = 5;
let breakLong = 15;


const padZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}


const startCountdown = (minutes) => {
    let seconds = 60;
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
            }
            seconds = 60;
        }
    }, 1000);
}


const startBreak = (breakTime) => {
    let seconds = 60;
    let breakId = setInterval(() => {
        if (seconds === 60) {
            breaktime -= 1;
        }
        seconds -= 1;
        document.querySelector('.timer__text').textContent = `BREAK`;
        console.log(`Break: ${min} ${sec}`);
        if (seconds === 0) {
            if (breakTime === 0) {
                clearInterval(breakId);
            }
        }
    }, 1000);
}


const main = (workTime, breakShort, breakLong) => {
    /*
    console.log(`Work: ${workTime}`);
    console.log(`Short Break: ${breakShort}`);
    console.log(`Long Break: ${breakLong}`);
    console.log(`\n\n`);
    */
    for (let count = 3; count > 0; count--) {
        //countdown();
        console.log(count);
        console.log(`Work time: ${workTime}`);
        if (count < 2) {
            breakShort = breakLong;
        }
        console.log(`Break time: ${breakShort}`);
    }
    console.log('END!');
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
            //startTimer();
            //countdown(startTime, seconds);
            //main(workTime, breakShort, breakLong);
            startCountdown(workTime);
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
    //let time = Number(document.querySelector('.time').textContent);
    //workTime = time;
    //let shortbreak = Number(document.querySelector('.break-short').textContent);
    //shortBreak = shortbreak;
    //let longbreak = Number(document.querySelector('.break-long').textContent);
    //longBreak = longbreak;
    //loop = document.querySelector('.loop');
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

/*
const longBreak = (breakTime) => {
    let seconds = 60;
    let breakId = setInterval(() => {
        if (seconds === 60) {
            breatTime -= 1;
        }
        seconds -= 1;
        console.log(`Break: ${min} ${sec}`);
    }, 1000);
}
*/


// START TIMER
/*
const startTimer = (longtime, shorttime, breaktime) => {
    //let count = 3;
    //startBttn.blur();
    //beepSound.play();
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
            console.log(`${min} ${sec}`);
            digits.textContent = `${padZero(min)}:${padZero(sec)}`;
            titleText.textContent = `${padZero(min)}:${padZero(sec)} pomodoro focus`;
            if (sec === 0) {
                if (min === 0) {
                    min = min + shortBreak;
                    document.querySelector(".timer__text").textContent = `BREAK`;
                    //beepSound.play();
                    if (min === 0 && sec === 0) {
                        //timesUpSound.play();
                        if (count === 0) {
                            shortBreak = 0;
                            min = longBreak;
                            longBreak = 0;
                            clearInterval(timeId);
                        }
                        count -= 1;
                    }
                }
                sec = 60;
            }
        } 
    }, 1000);
};
*/
