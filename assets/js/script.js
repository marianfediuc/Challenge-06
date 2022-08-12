console.log("Hello World")
const apiKey = "2d72e2f8188401752e4a98550c06c3e9"
//const lat = "70"
//const lon = "70"
// var cityName = "Austin";
// const url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey
var button= document.querySelector("#search-btn")
var windowInput= document.querySelector("#search-input")

button.addEventListener("click", startSearch);
var historyArea = document.querySelector("#history")
var currentSelection = document.querySelector("#city-selection-current")
var firstDay = document.querySelector("#day-1")
var secondDay = document.querySelector("#day-2")
var thirdDay = document.querySelector("#day-3")
var fourthDay = document.querySelector("#day-4")
var fifthDay = document.querySelector("#day-5")
var citySearch = document.querySelector("#city-name")
var tempOutput = document.querySelector("#temp")
var windOutput  = document.querySelector("#wind")
var humidityOutput = document.querySelector("#humidity")
var uviOutput = document.querySelector("#uvi")
document.querySelector("#history").addEventListener("click", getHistoryWeather)

function startSearch() {
  var cityName = windowInput.value;
  getLatLon(cityName)
}

function getLatLon(cityName) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

  fetch(url).then(response => {
    if (response.ok) {
      // console.log (response.json)
      return response.json()
    }


  })
    .then(data => {
      
      var history=JSON.parse(localStorage.getItem("weatherApp")) || []
    
      var newCity={name: data.name, lat:data.coord.lat, long: data.coord.lon}
      history.push(newCity)
      localStorage.setItem("weatherApp", JSON.stringify (history))
      createButton(newCity)
      citySearch.textContent= data.name
      getForecast(data.coord.lat, data.coord.lon)

    })
}
function getHistoryWeather(e) {
  console.log(e)
  console.log(e.target)
  console.log(e.target.value)
  console.log(e.target.dataset)
  console.log(e.target.dataset.lon)
  citySearch.textContent= e.target.innerText
  getForecast(e.target.dataset.lat, e.target.dataset.lon)

}

function createButton(city){
  console.log(city)
var newButton=document.createElement("button")
newButton.dataset.lon=city.long
newButton.dataset.lat=city.lat
newButton.textContent=city.name
historyArea.appendChild(newButton)

}

function getForecast(lat, lon) {


  const url="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
 // const url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
  fetch(url).then(response => {
    if (response.ok) {
      // console.log (response.json)
      return response.json()
    }
  })
    .then(data => {
      console.log("forecast:", data);
      console.log(data.current.uvi)
      console.log(data.current.temp)
      console.log(data.current.humidity)
      console.log(data.current.wind_speed)
    
      tempOutput.textContent="temp: "+ data.current.temp +"°F"
      windOutput.textContent= data.current.wind_speed
      humidityOutput.textContent= data.current.humidity
      uviOutput.textContent= data.current.uvi
    })
}


function getHistory() {
  var history=JSON.parse(localStorage.getItem("weatherApp")) || []
  console.log (history)
  for (let city of history) {
   
    createButton (city)
  }
  
} 

getHistory()

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

