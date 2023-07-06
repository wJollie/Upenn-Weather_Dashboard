const API_KEY = "4d6bdb899c0dba66341113292a0286a2";

// DOM elements
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const searchHistory = document.getElementById("search-history");

// Event listener for form submission
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    // Make API request to get weather data
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
      city
    )}&days=5`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        const cityName = data.location.name;
        const currentWeatherData = data.current;
        const forecastData = data.forecast.forecastday;

        // Display current weather and forecast
        displayCurrentWeather(cityName, currentWeatherData);
        displayForecast(forecastData);

        // Add searched city to search history
        addSearchHistory(cityName);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Function to display current weather
function displayCurrentWeather(cityName, weatherData) {
  const date = weatherData.date;
  const temperature = weatherData.temp_c;
  const humidity = weatherData.humidity;
  const windSpeed = weatherData.wind_kph;
  const iconUrl = weatherData.condition.icon;

  const html = `
    <h2>${cityName}</h2>
    <p>Date: ${date}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} km/h</p>
    <img src="${iconUrl}" alt="${weatherData.condition.text}">
  `;

  currentWeather.innerHTML = html;
}

// Function to display forecast
function displayForecast(forecastData) {
  let html = "<h2>5-Day Forecast</h2>";

  forecastData.forEach((forecastItem) => {
    const date = forecastItem.date;
    const temperature = forecastItem.day.avgtemp_c;
    const humidity = forecastItem.day.avghumidity;
    const windSpeed = forecastItem.day.maxwind_kph;
    const iconUrl = forecastItem.day.condition.icon;

    html += `
      <div>
        <h3>${date}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
        <img src="${iconUrl}" alt="${forecastItem.day.condition.text}">
      </div>
    `;
  });

  forecast.innerHTML = html;
}

// Function to add searched city to search history
function addSearchHistory(cityName) {
  const searchHistoryItem = document.createElement("p");
  searchHistoryItem.textContent = cityName;
  searchHistory.appendChild(searchHistoryItem);
}

// Event listener for search history
searchHistory.addEventListener("click", function (event) {
  if (event.target.tagName === "P") {
    const selectedCity = event.target.textContent;

    // Trigger a new search for the selected city
    cityInput.value = selectedCity;
    searchForm.dispatchEvent(new Event("submit"));
  }
});
