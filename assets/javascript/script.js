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
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        const cityName = data.city.name;
        const currentWeatherData = data.list[0].weather[0];
        const forecastData = data.list.slice(1, 6);

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
  const date = new Date(weatherData.dt_txt).toLocaleDateString();
  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  const html = `
    <h2>${cityName}</h2>
    <p>Date: ${date}</p>
    <p>Temperature: ${temperature}°F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} mph</p>
    <img src="${iconUrl}" alt="${weatherData.weather[0].description}">
  `;

  currentWeather.innerHTML = html;
}

// Function to display forecast
function displayForecast(forecastData) {
  let html = "<h2>5-Day Forecast</h2>";

  forecastData.forEach((forecastItem) => {
    const date = new Date(forecastItem.dt_txt).toLocaleDateString();
    const temperature = forecastItem.main.temp;
    const humidity = forecastItem.main.humidity;
    const windSpeed = forecastItem.wind.speed;
    const iconUrl = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;

    html += `
      <div>
        <h3>${date}</h3>
        <p>Temperature: ${temperature}°F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} mph</p>
        <img src="${iconUrl}" alt="${forecastItem.weather[0].description}">
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
