import { displayLoading } from "./components/displayLoading.js";
import { hideLoading } from "./components/hideLoading.js";
import { hideError } from "./components/hideError.js";
import { showError } from "./components/showError.js";

const apiKey = "ce4ae11bc17be470cdd99c175534fd05";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#user_input_autocomplete_address");
const weatherIcon = document.querySelector(".weather-icon");
const searchForm = document.getElementById("searchForm");

async function checkWeather(city) {
  displayLoading();

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (response.ok) {
      hideLoading();
      document.querySelector(
        ".city"
      ).textContent = `${data.name}, ${data.sys.country}`;
      document.querySelector(".temp").textContent = `${Math.round(
        data.main.temp
      )}°C`;
      document.querySelector(".humidity").textContent = `${Math.round(
        data.main.humidity
      )}%`;
      document.querySelector(".wind").textContent = `${Math.round(
        data.wind.speed
      )} km/h`;

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "./images/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "./images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "./images/rain.png";
          break;
        case "Drizzle":
          weatherIcon.src = "./images/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "./images/mist.png";
          break;
      }
      hideError();
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    hideLoading();
    showError();
  }

  searchBox.value = "";
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  }
});
