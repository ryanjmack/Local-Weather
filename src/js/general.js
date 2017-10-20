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
