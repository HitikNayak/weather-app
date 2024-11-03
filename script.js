const apiKey = "dbd5df648223a3458d73238e116d82e3"; // Your API Key
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Function to get latitude and longitude from the browser
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to make the API call with latitude and longitude
async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("Location not found!");
      return;
    }

    cityName.innerText = data.name;
    weatherDescription.innerText = data.weather[0].description;
    temperature.innerText = `Temperature: ${data.main.temp} °C`;
    humidity.innerText = `Humidity: ${data.main.humidity} %`;
    windSpeed.innerText = `Wind Speed: ${data.wind.speed} m/s`;
  } catch (error) {
    alert("Error fetching the weather data!");
  }
}

// Function to handle success when getting the user's location
function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeather(lat, lon);
}

// Function to handle errors if location fetching fails
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Event listener for the button click
searchBtn.addEventListener("click", () => {
  getLocation();
});
