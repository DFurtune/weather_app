import { displayLoading } from "./components/displayLoading.js";
import { hideLoading } from "./components/hideLoading.js";
import { hideError } from "./components/hideError.js";
import { showError } from "./components/showError.js";

const apiKey = "ce4ae11bc17be470cdd99c175534fd05";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  displayLoading();

  await fetch(apiUrl + city + `&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      hideLoading();

      document.querySelector(".city").innerHTML =
        data.name + ", " + data.sys.country;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML =
        Math.round(data.main.humidity) + "%";
      document.querySelector(".wind").innerHTML =
        Math.round(data.wind.speed) + "km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "./images/clouds.png";
        case "Clear":
          weatherIcon.src = "./images/clear.png";
        case "Rain":
          weatherIcon.src = "./images/rain.png";
        case "Drizzle":
          weatherIcon.src = "./images/drizzle.png";
        case "Mist":
          weatherIcon.src = "./images/mist.png";
      }
      hideError();
    })
    .catch(() => {
      showError();
    });

  searchBox.value = "";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

