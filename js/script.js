const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dataOtput = document.querySelector(".data");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudPutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector(".form");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelector(".cities");
const clities = document.querySelector(".city");

let cityInput = "Toshkent";

//   clities.addEventListener("click", (evt) => {

//     cityInput = e.target.innerHTML;
//     console.log("wijdbcc");
//     // fechWeatherData()
//     app.getElementsByClassName.opacity = "0";
//   });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;
    fechWeatherData();
    search.value = "";
    app.getElementsByClassName.opacity = "0";
  }
});

function dayOfTheWeek(day, moth, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${moth}/${year}`).getDay()];
}

function fechWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=266dfd511fd1453295a135131220402&q=${cityInput}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temp.innerHTML = data.current.temp_c + "&#176 ";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dataOtput.innerHTML = `${dayOfTheWeek(d, m, y)} ${m} ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;
      const iconn = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/day/113.png"
      );
      icon.src = iconn;
    });
}

fechWeatherData();
