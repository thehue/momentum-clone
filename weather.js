const API_KEY = "843e233f47326fde038c1d3ea30e0179";
const COORDS = "coords";
const weather = document.querySelector('.js-weather');
const nowPlace = weather.querySelector(".place");
const temp = weather.querySelector(".temp");

/*
JSON : JavaScript Object Notation
JSON is a syntax for storing and exchanging data
JSON is text, written with JavaScript object Notation.
*/
function getWeather(lat,lon){
    //data가 넘어오면 then안에 있는 함수 호출
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
        //console.log(response);
        //여기 response에서는 network정보만 보이기 때문에
        // 날씨 정보가 있는 json을 가져온다
    }).then(function(json){ //json 데이터가 준비되면..
        //console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        //weather = <span>

        nowPlace.innerText= `${place}`;
        temp.innerText= `${temperature}°C`;
    })
}
/*
json =>
{"coord":{"lon":126.83,"lat":37.63},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],...
*/
function saveCoords(obj){
    const coordsData = JSON.stringify(obj);
    localStorage.setItem(COORDS,coordsData);
}


function handleGeoSucess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
        // latitude = latitude랑 똑같은 의미
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("ERROR: 위치 정보를 읽을 수 없습니다.");
}

function askForCoords(){
    //navigator API를 사용하여 위치 받아옴
    navigator.geolocation.getCurrentPosition(handleGeoSucess,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{       
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();

/*
Network 패널은 우리가 request한 내용을 보여준다
response는 보내준 정보 알려줌
network - headers - Request URL 
*/