
navigator.geolocation.getCurrentPosition(data => {
  const endpoint = 'api.openweathermap.org/data/2.5/weather?'
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  const key = '4666c8422b21ccb1fa7e7b5e0f11c37f';


  fetch(`${endpoint}lat=${latitude}&lon=${longitude}&APPID={${key}}`);
});
