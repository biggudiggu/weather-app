// WEATHER APP  

//TODO: Tag und Nacht Display anpassen

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput"); //textbox
const submitBtn = document.querySelector(".submitBtn"); //search button
const weatherCard = document.querySelector(".weatherCard"); //displays the data
const weatherContainer = document.querySelector(".weatherContainer");
const card = document.querySelector(".card");
const humDisDisplay = document.querySelector(".humDisDisplay");

const apiKey = "65a62a648daa38a900d62be7fe8ec28a";

weatherForm.addEventListener("submit", async event => {

  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } 
    catch (error) {
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please enter a city");
  }
  cityInput.value = "";
})

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if(!response.ok){
    throw new Error("Could not fetch weather data")
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);

  const {name: city, 
        main: {humidity, temp, temp_max, temp_min},
        wind: {speed},
        weather: [{id}]} = data;
  
  weatherCard.textContent = "";
  weatherCard.style.display = "flex";

  const weatherContainer = document.createElement("div");
  const cityDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("p");

  const humDisDisplay = document.createElement("div");

  const humidityDiv = document.createElement("div");
  const humidityDisplay = document.createElement("p");
  const humidityIcon = document.createElement("i");
  const humIn = document.createElement("p");

  const windspeed = document.createElement("div");
  const windSpeedDisplay = document.createElement("p");
  const windIcon = document.createElement("i");
  const wind = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
  emojiDisplay.textContent = getWeatherEmoji(id);

  
  weatherContainer.classList.add("weatherContainer");
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  emojiDisplay.classList.add("emojiDisplay");

  humDisDisplay.classList.add("humDisDisplay");
  humidityDiv.classList.add("humidityDiv");
  humidityDisplay.classList.add("humidityDisplay");
  humidityIcon.classList.add("fas", "fa-solid", "fa-water");
  humIn.classList.add("humIn");

  windspeed.classList.add("windspeed");
  windSpeedDisplay.classList.add("windSpeedDisplay");
  windIcon.classList.add("fas", "fa-light", "fa-wind");
  wind.classList.add("wind");

  //structure
  weatherContainer.appendChild(cityDisplay);
  weatherContainer.appendChild(tempDisplay);
  weatherContainer.appendChild(emojiDisplay);
  
  //humidity and wind
  humidityDisplay.appendChild(humidityIcon)
  humidityDisplay.appendChild(document.createTextNode(` ${humidity}%`));
  humIn.textContent = "Humidity";
  humidityDiv.appendChild(humidityDisplay);
  humidityDiv.appendChild(humIn);

  windSpeedDisplay.appendChild(windIcon);
  windSpeedDisplay.appendChild(document.createTextNode(` ${speed}km/h`));
  wind.textContent = "Wind Speed"
  windspeed.appendChild(windSpeedDisplay);
  windspeed.appendChild(wind);

  humDisDisplay.appendChild(humidityDiv);
  humDisDisplay.appendChild(windspeed);

  weatherCard.appendChild(weatherContainer);
  weatherCard.appendChild(humDisDisplay);

  card.appendChild(weatherCard);
}

function getWeatherEmoji(weatherID) {
  switch (true) {
    case (weatherID >= 200 && weatherID < 300): // Thunderstorm
      return "🌩️";
    case (weatherID >= 300 && weatherID < 500): // Drizzle
      return "🌦️";
    case (weatherID >= 500 && weatherID < 600): // Rain
      return "🌧️";
    case (weatherID >= 600 && weatherID < 700): // Snow
      return "🌨️";
    case (weatherID >= 700 && weatherID < 800): // Atmosphere
      return "🌫️";
    case (weatherID == 800): // Clear
      return "☀️";
    case (weatherID > 800): // Clouds
      return "☁️";
    default:
      return "❓";
  }
}


function displayError(message) {
  
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";
  weatherCard.appendChild(errorDisplay);
}