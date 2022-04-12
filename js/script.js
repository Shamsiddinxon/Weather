const app = document.querySelector(".app");
const temp = document.querySelector(".left__box-c");
const dataOtput = document.querySelector(".data");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudPutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const rainOutput = document.querySelector(".rain");
const form = document.querySelector(".panel__form");
const search = document.querySelector(".panel__search");
const btn = document.querySelector(".panel__submit");
const cities = document.querySelector(".panel__cities");
const clities = document.querySelector(".panel__city");

let cityInput = "Toshkent";

cities.addEventListener("click", (evt) => {
  if (evt.target.id == "1") {
    cityInput = "Namangan";
  } else if (evt.target.id == "2") {
    cityInput = "Sirdaryo";
  } else if (evt.target.id == "3") {
    cityInput = "Andijon";
  } else if (evt.target.id == "4") {
    cityInput = "Buxoro";
  } else if (evt.target.id == "5") {
    cityInput = "Qashqadaryo";
  }

  fechWeatherData();
  app.style.opacity = "0";
});

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

//  HAFTAKUNLARINI AJRATISH
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

      // DATA TIME - text
      dataOtput.innerHTML = `${dayOfTheWeek(d, m, y)}  ${d}/ ${m}/ ${y}`;
      timeOutput.innerHTML = time;

      // ICON IMG
      nameOutput.innerHTML = data.location.name;
      icon.src = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/day/113.png"
      );

      // OBHAVO MALUMOTLARI
      cloudPutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";
      rainOutput.innerHTML = data.current.precip_mm + "mm";

      let timeOfDay = "day";
      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        app.style.backgroundImage = `url(./img/${timeOfDay}.clear.jpg)`;

        if (timeOfDay == "night") {
          btn.getElementsByClassName.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./img/${timeOfDay}.claudy.jpg)`;

        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./img/${timeOfDay}.rain.jpg)`;

        if (timeOfDay == "night") {
          btn.getElementsByClassName.background = "#647d75";
        }
      }

      app.style.opacity = "1";
    })
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

fechWeatherData();

app.style.opacity = "1";
