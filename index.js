// WEATHER APP  

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput"); //textbox
const submitBtn = document.querySelector(".submitBtn"); //search button
const weatherCard = document.querySelector(".weatherCard"); //displays the data
const weatherContainer = document.querySelector(".weatherContainer");
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
    }
  }
  else{
    displayError("Please enter a city");
  }

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
  
  
}

function getWeatherEmoji(weatherID) {
  
}

function displayError(message) {
  
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";
  weatherCard.appendChild(errorDisplay);
}