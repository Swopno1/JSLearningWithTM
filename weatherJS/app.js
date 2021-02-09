// Init Local Storage
const storage = new Storage();
// Get Stored location data
const weatherLocation = storage.getLocationData();
// Init the wather object
const weather = new Weather(weatherLocation.city, weatherLocation.country);
// Init UI
const ui = new UI();

// Get weater on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change Location Event
document.getElementById('w-change-btn').addEventListener('click',(e) => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;

  weather.changeLocation(city, country);

  // Set location in local storage
  storage.setLocationData(city, country);

  // Get and display weather
  getWeather();

  // close the modal
  $('#locModal').modal('hide');
})

function getWeather() {
  weather.getWeather()
  .then(results => {
    ui.paint(results);
    console.log(results);
  })
  .catch(err => console.log(err));
}
