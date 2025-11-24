const API_KEY = "f3da564ac166be2e7d8f9fa26eeb7784";

// UI elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const bg = document.getElementById("bg");

// Animation layers
const rainLayer = document.querySelector(".rain");
const snowLayer = document.querySelector(".snow");
const fogLayer = document.querySelector(".fog");
const sunLayer = document.querySelector(".sun");
const cloudsLayer = document.querySelector(".clouds");

// Hide all animations first
function hideAllAnimations() {
    rainLayer.style.display = "none";
    snowLayer.style.display = "none";
    fogLayer.style.display = "none";
    sunLayer.style.display = "none";
    cloudsLayer.style.display = "none";
}

// MAIN WEATHER FUNCTION
async function getWeather(city) {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    // Update UI
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    desc.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;

    // Weather icon
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    // Weather type
    const type = data.weather[0].main;

    // HD background from Unsplash
    bg.style.backgroundImage =
      `url('https://source.unsplash.com/1600x900/?${type},weather,sky,nature')`;

    // RESET all weather animations
    hideAllAnimations();

    // TURN ON correct animation
    if (type === "Rain" || type === "Drizzle" || type === "Thunderstorm") {
        rainLayer.style.display = "block";
    }

    if (type === "Snow") {
        snowLayer.style.display = "block";
    }

    if (type === "Mist" || type === "Fog" || type === "Haze") {
        fogLayer.style.display = "block";
    }

    if (type === "Clear") {
        sunLayer.style.display = "block";
    }

    if (type === "Clouds") {
        cloudsLayer.style.display = "block";
    }
}

// SEARCH button click
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        getWeather(cityInput.value);
    }
});

// ENTER key
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(cityInput.value);
    }
});

// Default weather (Srinagar)
getWeather("Srinagar");
