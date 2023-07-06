// Weather API endpoint
const API_KEY = "4d6bdb899c0dba66341113292a0286a2";
const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

// DOM elements
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const searchHistory = document.getElementById("search-history");

// Search history array
let searchHistoryArray = [];

// Function to display current weather conditions
function displayCurrentWeather(data) {
  currentWeather.innerHTML = `
    <h2>${data.location.name}</h2>
    <p>Date: ${data.current.date}</p>
    <p>Temperature: ${data.current.temp_c}°C</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind Speed: ${data.current.wind_kph} km/h</p>
    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
  `;
}

// Function to display forecast
function displayForecast(data) {
  forecast.innerHTML = "<h2>5-Day Forecast</h2>";
  const forecastData = data.forecast.forecastday;
  for (let i = 0; i < forecastData.length; i++) {
    const forecastDay = forecastData[i];
    forecast.innerHTML += `
      <div>
        <h3>${forecastDay.date}</h3>
        <p>Temperature: ${forecastDay.day.avgtemp_c}°C</p>
        <p>Humidity: ${forecastDay.day.avghumidity}%</p>
        <p>Wind Speed: ${forecastDay.day.maxwind_kph} km/h</p>
        <img src="${forecastDay.day.condition.icon}" alt="${forecastDay.day.condition.text}">
      </div>
    `;
  }
}

// Function to display search history
function displaySearchHistory() {
  searchHistory.innerHTML = "<h2>Search History</h2>";
  for (let i = 0; i < searchHistoryArray.length; i++) {
    searchHistory.innerHTML += `<p>${searchHistoryArray[i]}</p>`;
  }
}

// Event listener for form submission
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    // Make API request to get weather data
    const url = `${API_URL}&q=${city}&days=5`;
    // Replace fetch() call with your preferred method to make API requests
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Display current weather and forecast
        displayCurrentWeather(data);
        displayForecast(data);

        // Add searched city to search history
      });
  }
});
