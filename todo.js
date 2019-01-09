const toDoForm = document.querySelector(".js-toDoForm"), //<form>
    toDoinput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"); //<ul>

    //local storage에 저장할 key


const TODOS_LS = "toDos"; //Local Storage key name
const ID_LS = "storedID";
let toDos = []; // toDos.length ; 0



function deleteToDo(event){
    let keptID = parseInt(localStorage.getItem(ID_LS));
    const btn = event.target; //<button>
    const li = btn.parentNode; //<li>
    toDoList.removeChild(li); //<ul>의 li삭제
    //filter는 array의 모든 item을 걸쳐서 함수를 실행하고
    // item들의 조건이 true일때 새로운 array를 만든다
    const cleanToDos = toDos.filter(function(toDo){
        //console.log(toDo.id, li.id );
        // 버튼을 클릭할 때 삭제할 해당 li id와
        // 다른 id를 갖는 item만 가지고 새로운 array를 만들자
        //toDo.id는 숫자, li.id는 string임
        //li.id를 정수로 변환시켜주자 
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(keptID);
}

function saveToDos(ID){
    //JavaScript tries to make everything inside
    //of the local Storage a string. -> boolean true를 저장하면 "true"로 나옴
    // 근데 배열 안에 object를 string으로 변하게는 못하고  "[object Object]" 으로 구조를 string 형태로 저장
    // we need to make our object become a string
    // json stringify takes any javascript object and 
    // it turns it into a string
    // json은 압축풀기 같은 느낌인듯
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    localStorage.setItem(ID_LS,ID);
}

function paintToDos(text,ID){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    //const newID = toDos.length+1;

    //delBtn.innerText ="❌"; //<button>❌</button>
    delBtn.innerText = ' ✖';
    delBtn.className="js-delBtn";
    delBtn.addEventListener("click",deleteToDo);

    span.innerText = text; //<span>text</span>
    span.style.cursor="pointer";

    li.appendChild(span); //<li><span>text</span></li>
    li.appendChild(delBtn); // <li><button>❌</button></li>
    
    li.style.color = "white";

    li.addEventListener("click",function(ev){
        ev.target.classList.toggle("checked");     
},false);

    //li에 id추가, 나중에 어떤걸 지워야할지 정해주기 위해
    li.id = ID;
    
    toDoList.appendChild(li); // <ul>에 <li><span> 랑 <li><button>넣기 
    const toDoObj = {
        text: text,
        id: ID
    };
    toDos.push(toDoObj);
    saveToDos(ID);

}

function handleSubmit(event){
    event.preventDefault();
    let new_ID = parseInt(localStorage.getItem(ID_LS));
    new_ID = new_ID+1;
    const currentValue = toDoinput.value; // 오류가 안나는걸 보니 event를 끝내고 나서 변수들이 사라지는 걸 알 수 있음 -> 새로운 할당
    paintToDos(currentValue,new_ID);
    toDoinput.value=""; // enter치고 공백으로 만들기 위해서
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    let loaded_ID=0;
    if(loadedToDos !== null && loadedToDos !== "[]"){//저장된게 있다면
        // loadedToDos -> [{"text":"sfdfd","id":1},{"text":"dfdf","id":2}] 저장되어 있음
        // json.parse로 string을 문법적으로 분석해서 object로 돌려줌
        /*
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        */
       const parsedToDos = JSON.parse(loadedToDos);
       /* array에 있는 함수 forEach
       forEach안에 함수를 만든다
       새로 만든 함수는 parsedToDos에 있는 것들의 각각에 대해 실행해줌
       그 각각의 객체를 toDo로 정하는 것
       */
       parsedToDos.forEach(function(toDo){
           paintToDos(toDo.text,toDo.id);
       })
    }else{
        //저장된게 없다면 0을 저장해버림
        localStorage.setItem(ID_LS,loaded_ID);
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit); //<form>에 submit event달기
}

init();