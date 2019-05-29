const weather: HTMLElement = document.querySelector('.js-weather'),
  temper: HTMLElement = weather.querySelector('.js-temper'),
  placeTag: HTMLElement = weather.querySelector('.js-place');

const API_KEY: string = '0c92beab857078a2c68a3d621dadc849';
const COORDS: string = 'coords';

function getWeather(lat: number, lng: number): void {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then((response: Response) => response.json())
    .then(json => {
      const temp: string = json.main.temp;
      const place: string = json.name;
      const icon: string = json.weather[0].icon;
      const img: HTMLImageElement = document.createElement('img');
      temper.innerText = `${temp} ℃`;
      placeTag.innerText = `${place}`;
      img.src = `http://openweathermap.org/img/w/${icon}.png`;
      temper.prepend(img);
    });
}

function saveCoords(coordsObj: any): void {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(pos: any): void {
  const latitude: number = pos.coords.latitude;
  const longitude: number = pos.coords.longitude;
  const coordsObj: any = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(): void {
  console.log('Can not access geo location');
}

function askForCoords(): void {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(): void {
  const loadedCoords: string = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const { latitude, longitude } = JSON.parse(loadedCoords);
    getWeather(latitude, longitude);
  }
}

function weatherInit(): void {
  loadCoords();
}

weatherInit();
