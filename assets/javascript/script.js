const API_URL = "http://api.weatherapi.com/v1/forecast.json";
const apiKey = "4d6bdb899c0dba66341113292a0286a2";

// DOM elements

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const searchHistory = document.getElementById("search-history");

// Search history array
let searchHistoryArray = [];

// Function to display current weather
function displayCurrentWeather(data) {
  // Placeholder
}

// Function to display forecast
function displayForecast(data) {
  // Placeholder
}

// Function to display search history
function displaySearchHistory() {
  // Update the searchHistory element with the search history data
}

// Event listener for form submission
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    // Make API request to get weather data
    const url = `${API_URL}?key=${apiKey}&q=${encodeURIComponent(city)}&days=5`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        const currentWeatherData = data.current; // Current weather data
        const forecastData = data.forecast.forecastday; // Forecast data

        // Call functions to display current weather and forecast
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);

        // Add searched city to search history
        searchHistoryArray.push(city);
        displaySearchHistory();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Event listener for search history
searchHistory.addEventListener("click", function (event) {
  if (event.target.tagName === "P") {
    const selectedCity = event.target.textContent;
    // Repeat steps to fetch and display weather for the selected city
  }
});
