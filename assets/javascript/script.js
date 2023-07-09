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
    )}&appid=${API_KEY}&units=imperial`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather data not found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const cityName = data.city.name;

        // Process forecast data
        const processedForecastData = processForecastData(data.list);

        // Display current weather and forecast
        displayCurrentWeather(data.list[0], cityName);
        displayForecast(processedForecastData);

        // Add searched city to search history
        addSearchHistory(cityName);

        // Save search history to local storage
        saveSearchHistory();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Function to process forecast data and calculate daily averages
function processForecastData(forecastData) {
  const processedData = {};

  forecastData.forEach((forecastItem) => {
    const date = new Date(forecastItem.dt * 1000).toLocaleDateString();
    if (!processedData[date]) {
      processedData[date] = {
        temperatures: [],
        humidity: [],
        windSpeed: [],
        iconCode: forecastItem.weather[0].icon,
      };
    }

    processedData[date].temperatures.push(forecastItem.main.temp);
    processedData[date].humidity.push(forecastItem.main.humidity);
    processedData[date].windSpeed.push(forecastItem.wind.speed);
  });

  return processedData;
}

// Function to display current weather
function displayCurrentWeather(weatherData, cityName) {
  const date = new Date(weatherData.dt * 1000).toLocaleDateString();
  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

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

  for (const date in forecastData) {
    const temperatures = forecastData[date].temperatures;
    const humidity =
      forecastData[date].humidity.reduce((acc, val) => acc + val) /
      forecastData[date].humidity.length;
    const windSpeed =
      forecastData[date].windSpeed.reduce((acc, val) => acc + val) /
      forecastData[date].windSpeed.length;
    const iconCode = forecastData[date].iconCode;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    html += `
      <div>
        <h3>${date}</h3>
        <p>Temperature: ${Math.round(Math.max(...temperatures))}°F (Max)</p>
        <p>Temperature: ${Math.round(Math.min(...temperatures))}°F (Min)</p>
        <p>Average Humidity: ${Math.round(humidity)}%</p>
        <p>Average Wind Speed: ${Math.round(windSpeed)} mph</p>
        <img src="${iconUrl}" alt="${forecastData[date].description}">
      </div>
    `;
  }

  forecast.innerHTML = html;
}

// Function to add searched city to search history
function addSearchHistory(cityName) {
  const searchHistoryItem = document.createElement("p");
  searchHistoryItem.textContent = cityName;
  searchHistory.appendChild(searchHistoryItem);
}

// Function to save search history to local storage
function saveSearchHistory() {
  const searchItems = Array.from(searchHistory.children).map(
    (item) => item.textContent
  );
  localStorage.setItem("searchHistory", JSON.stringify(searchItems));
}

// Function to retrieve search history from local storage
function getSearchHistory() {
  const searchItems = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchItems.forEach((item) => {
    addSearchHistory(item);
  });
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

// Load search history from local storage on page load
getSearchHistory();
