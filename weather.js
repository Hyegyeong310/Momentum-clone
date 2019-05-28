const weather = document.querySelector('.js-weather'),
  temper = weather.querySelector('.js-temper'),
  placeTag = weather.querySelector('.js-place');

const API_KEY = '0c92beab857078a2c68a3d621dadc849';
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(response => response.json())
    .then(json => {
      const temp = json.main.temp;
      const place = json.name;
      const icon = json.weather[0].icon;
      const img = document.createElement('img');
      temper.innerText = `${temp} ℃`;
      placeTag.innerText = `${place}`;
      img.src = `http://openweathermap.org/img/w/${icon}.png`;
      temper.prepend(img);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('Can not access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const { latitude, longitude } = JSON.parse(loadedCoords);
    getWeather(latitude, longitude);
  }
}

function init() {
  loadCoords();
}

init();
