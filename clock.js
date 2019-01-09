const clockContainer = document.querySelector(".js-clock");
// querySelector는 자식 element를 탐색한다
const clockTitle = clockContainer.querySelector(".js-clockTitle"); 

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    clockTitle.innerHTML=`${hours<10? `0${hours}`:hours}:${
        minutes<10? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`: seconds}`;
}

function init(){
    getTime();
    setInterval(getTime,1000); //update date,hours,minutes,seconds..
}

init();