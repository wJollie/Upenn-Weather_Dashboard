const apiLink = "${http://api.weatherapi.com/v1}&q=${city}&days=5";
const apiKey = "4d6bdb899c0dba66341113292a0286a2";

//Dom Elements

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const searchHistory = document.getElementById("search-history");

// search history array
let searchHistoryArray = [];

// display current weather
function displayCurrentWeather(data) {
  //placeholder
}

// display forecast
function displayForecast(data) {
  // placeholder
}

// display search history
function displaySearchHistory() {
  // update the searchHistory element with the search history data
}

// Event Listener for submit
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    const url =
      "${http://api.weatherapi.com/v1}?key=${apiKey}&q=${encodeURIComponent(city)}&days=5";
    fetch(apiLink)
      .then((response) => response.json())
      .then((data) => {
        const currentWeatherData = data.current; //Current weather data
        const forecastData = data.forecast.forecastday; //Forecast data

        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);

        // Add searched city to search history
        searchHistoryArray.push(city);
        displaySearchHistory();
      })
      .catch((error) => {
        console.log(error);
      });
    // make api request to get weather data
    // display current weather and forecast
    // add searched city to search history
  }
});

// Event listener for history
searchHistory.addEventListener("click", function (event) {
  if (event.target.tagName === "P") {
    const selectedCity = event.target.textContent;
    // repeat steps to fetch and display weather for selected city
  }
});
