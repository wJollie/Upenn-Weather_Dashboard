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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        const cityName = data.name;
        const currentWeatherData = data.weather[0];
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Display current weather
        displayCurrentWeather(
          cityName,
          currentWeatherData,
          temperature,
          humidity,
          windSpeed
        );

        // Add searched city to search history
        addSearchHistory(cityName);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Function to display current weather
function displayCurrentWeather(
  cityName,
  weatherData,
  temperature,
  humidity,
  windSpeed
) {
  const iconCode = weatherData.icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  const html = `
    <h2>${cityName}</h2>
    <img src="${iconUrl}" alt="${weatherData.description}">
    <p>Temperature: ${temperature} K</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;

  currentWeather.innerHTML = html;
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
