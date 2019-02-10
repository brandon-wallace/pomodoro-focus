"use strict";


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
    console.log("Increasing count");
}


const decrease = () => {
    console.log("Decreasing count");
}


const modalClose = () => {
    document.querySelector(".modal").style.display = "none";
}


const start = () => {
    let minutes = 25;
    let seconds = 60;
    let digits = document.querySelector(".clock-digits");

    let timerId = setInterval(() => {
        if (seconds === 60) {
            minutes -= 1;
        }
        seconds -= 1;
        digits.innerHTML = `${padZero(minutes)}:${padZero(seconds)}`;
        if (seconds === 0) {
            if (seconds === 0 && minutes === 0) {
                clearInterval(timerId);
                digits.innerHTML = `25:00`;
            } else {
                seconds = 60;
            }
            minutes -= 1;
        }
    }, 1000)
}


const reset = () => {
    document.querySelector(".clock-digits").innerHTML = `25:00`;
}
