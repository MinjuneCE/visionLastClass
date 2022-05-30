const weather = document.querySelector(".js-weather");

const API_KEY = "d3161255c7e490a83730a690204a336c";
const COORDS = "coords";


function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(respone){
        return respone.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ ${place}`;
    });
} 

function savecoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleSuccessGeo(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    savecoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleErrorGeo() {
    console.log("err");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccessGeo, handleErrorGeo);
}

function loadcoords() {
    const loadedcoords = localStorage.getItem(COORDS);
    if(loadedcoords === null) {
        askForCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedcoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadcoords();
}

init();