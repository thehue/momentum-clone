const body = document.querySelector("body");

const IMG_NUMBER = 10;



function paintImage(imgNum){    
    const img = new Image(); //const image = document.createElement("img")
    img.src =`images/${imgNum}.jpg`;
    body.appendChild(img); // <body> 밑에 img 태그 설정
    img.classList.add("bgImg");

}

function genRandom(){
    const num = Math.ceil(Math.random()*IMG_NUMBER);
    return num;
}

function init(){
    // 랜덤한 수 부를 것
    const randomNum = genRandom();
    paintImage(randomNum); 
}

init();

/* Math.random() * 5 -> 0이상 5미만 랜덤한 수 호출
Math.floor(3.2) -> 3; 버림
Math.ceil(3.2) -> 4; 올림
*/
