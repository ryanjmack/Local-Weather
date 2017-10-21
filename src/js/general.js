// wrap entire codebase in an IIFE
(() => {

/******************************************
              Variables
******************************************/
let weather; // store weather data

// DOM elements
const description = document.querySelector('.description');
const forecast = document.querySelector('.forecast');
const location = document.querySelector('.location');
const temp = document.querySelector('.temp');
const wind = document.querySelector('.wind');


/******************************************
            Geolocation & API Call
******************************************/
navigator.geolocation.getCurrentPosition(data => {
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather?'
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  const key = '4666c8422b21ccb1fa7e7b5e0f11c37f';

  // make the api call
  fetch(`${endpoint}units=imperial&lat=${latitude}&lon=${longitude}&APPID=${key}`)
    .then(data => data.json())
    .then(data => {
      // we have the data, let's make it easier to use --> save result to the weather variable
      formatWeather(data);
    })
});


/******************************************
              Functions
******************************************/

//we need to display the proper svg icon depedning on weather conditions
function displayIcon() {
  const icon = document.querySelector('.icon');

  //TODO - finish this function
}


// called when data is received and processed, and when user toggles
// between metric and imperial units
function displayWeather() {
  description.textContent = `${weather.description}`;
  forecast.textContent = `${weather.mainWeather}`;
  location.textContent = `${weather.location}`;

  if (weather.isMetric) // then display metric units
  {
    temp.innerHTML = `${weather.metricTemp}<span class="unit">&deg;C</span>`;
    wind.innerHTML = `${weather.metricWindSpeed} <span class="unit">kph</span>`;
  }
  else { // or display imperial units
    temp.innerHTML = `${weather.temp}<span class="unit">&deg;F</span>`;
    wind.innerHTML = `${weather.windSpeed} <span class="unit">mph</span>`;
  }
  // dynamically insert the proper icon
  displayIcon();
}


// called once only when data is returned from the API
function formatWeather(data) {
  //top level variable - weather
  weather =
  {
    // location/forecast strings
    location: data.name,
    mainWeather: data.weather.map(el => el.main),
    description: capitalizeFirstChar(data.weather.map(el => el.description).join(' ,')), // first char isn't capitalized in data

    //imperial
    temp: Math.round(data.main.temp), // rounded to the nearest degree
    windSpeed: Math.round(data.wind.speed * 10) / 10, // rounded to the nearest tenth
    // metric
    isMetric: false, // flag used in displayWeather
    metricTemp: Math.round((data.main.temp - 32) * 5 / 9),
    metricWindSpeed: Math.round(data.wind.speed * 1.609344 * 10) / 10
  }

  // now display the data!
  displayWeather();
}


// the weather description returned from the API is lowercase
function capitalizeFirstChar(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}


/******************************************
              Event Listeners
******************************************/
// a click on either element toggles between metric/imperial units
temp.addEventListener('click', () => {
  weather.isMetric = !weather.isMetric;
  displayWeather();
});

wind.addEventListener('click', () => {
  weather.isMetric = !weather.isMetric;
  displayWeather();
});

})(); // end IIFE
