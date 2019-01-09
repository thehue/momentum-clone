const form = document.querySelector(".js-form"), //<form>
input = form.querySelector("input"),
greeting = document.querySelector(".js-greeting"); // <>
b = greeting.querySelector("b");

const USER_LS = "currentUser", //local storage에 내 이름 저장할 key
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    // prevent default of an event
    // event가 발생하면 거품처럼 올라가서 document까지 반응해서 document가 딴데로 가버림
    //--> refresh
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    paintGreeting(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    //when i press enter = when i submit the form
    // submit의 default는 제출했을 때 새로고침 되는 것이기 때문에 없애줘야함
    form.addEventListener("submit",handleSubmit);
}


function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText= `Hello, ${text}.`;
    
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null){
        //local storage에 유저가 저장x
        askForName();
    }else{
        //저장 o
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();