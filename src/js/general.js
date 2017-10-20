let weather,
    isMetric = false;

navigator.geolocation.getCurrentPosition(data => {
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather?'
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  const key = '4666c8422b21ccb1fa7e7b5e0f11c37f';

  fetch(`${endpoint}units=imperial&lat=${latitude}&lon=${longitude}&APPID=${key}`)
    .then(data => data.json())
    .then(data => {
      formatWeather(data);
    })
});


function convertUnits() {
  // convert to imperial (fahrenheit, mph)
  if (isMetric) {
    weather.temp = (weather.temp * 5/9) + 32;
    weather.wind *= 0.621371;
  }
  else { // convert to metric (celcius, kph)
    weather.temp = (weather.temp - 32) * 9/5;;
    weather.wind *= 1.609344;
  }
  isMetric = !isMetric;
}


function displayWeather() {
  const description = document.querySelector('.description');
  const forecast    = document.querySelector('.forecast');
  const location    = document.querySelector('.location');
  const temp        = document.querySelector('.temp');
  const wind        = document.querySelector('.wind');

  description.textContent = `${weather.description}`;
  forecast.textContent    = `${weather.mainWeather}`;
  location.textContent    = `${weather.location}`;
  temp.innerHTML          = `${Math.round(weather.temp)}<span class="unit">&deg;${isMetric ? 'C': 'F'}</span>`;
  wind.innerHTML          = `${Math.round(weather.wind * 10) / 10} <span class="unit">${isMetric ? 'kph': 'mph'}</span>`;
}

function formatWeather(data) {
  weather = {
    location: data.name,
    temp: data.main.temp,
    mainWeather: data.weather.map(el => el.main),
    description: data.weather.map(el => el.description).join(' ,'),
    wind: data.wind.speed
  }
  displayWeather();
}
