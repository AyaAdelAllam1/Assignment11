// today
let todayName = document.getElementById("today-date-day-name");
let todayNumber = document.getElementById("today-date-day-number");
let todayMonth = document.getElementById("today-date-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

// nextday
let nextDay = document.getElementById("next-day-name");
let nextMaxTemp = document.getElementById("next-max-temp");
let nextMinTemp = document.getElementById("next-min-temp");
let nextConditionImg = document.getElementById("next-condition-img");
let nextConditionText = document.getElementById("next-condition-text");

// after tomorrow
let afterNextDay = document.getElementById("after-day-name");
let afterNextMaxTemp = document.getElementById("after-max-temp");
let afterNextMinTemp = document.getElementById("after-min-temp");
let afterNextConditionImg = document.getElementById("after-condition-img");
let afterNextConditionText = document.getElementById("after-condition-text");

let searchInput = document.getElementById("search");
//location
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);

    let myLatitude = position.coords.latitude;
    let myLongitude = position.coords.longitude;
    getWeatherData(`${myLatitude},${myLongitude}`)
});

searchInput.addEventListener('input', (e) => {
    let currentVlaue = e.target.value;
    getWeatherData(currentVlaue);
})
//api
async function getWeatherData(term) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${term}&days=3&key=73b362e8618c4624b2f23334243012`);
    let data = await weatherResponse.json()
    console.log(data);
    displayWeatherData(data);
    displayTomorrowData(data);
    displayAfterTomorrowData(data);
}
//show

function displayWeatherData(data) {
    // header
    let thisDate = data.current.last_updated
    console.log(thisDate)
    let myDateName = new Date(thisDate)
    let thisName = myDateName.toLocaleString('eng-us', { weekday: 'long' });
    todayName.innerHTML = thisName
    let thisMonth = myDateName.toLocaleString('eng-us', { month: 'long' });
    todayMonth.innerHTML = thisMonth
    let thisDay = myDateName.getDate();
    todayNumber.innerHTML = thisDay
    // body
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionText.innerHTML = data.current.condition.text;

    let currentImg = data.current.condition.icon;
    let currentSrc = `https:${currentImg}`;
    todayConditionImg.setAttribute('src', currentSrc);

    // footer
    humidity.innerHTML = data.current.humidity;
    wind.innerHTML = data.current.wind_kph;
    windDirection.innerHTML = data.current.wind_dir;
}

function displayTomorrowData(data) {
    let tomorrowDate = data.forecast.forecastday[1];
    console.log(tomorrowDate);
    let myTomorrowDate = new Date(tomorrowDate.date);
    let myTomorrowDateName = myTomorrowDate.toLocaleString('eng-us', { weekday: 'long' });
    nextDay.innerHTML = myTomorrowDateName;

    let tomorrowImg = tomorrowDate.day.condition.icon;
    let tomorrowSrc = `https:${tomorrowImg}`;
    nextConditionImg.setAttribute('src', tomorrowSrc);

    nextMaxTemp.innerHTML = tomorrowDate.day.maxtemp_c;
    nextMinTemp.innerHTML = tomorrowDate.day.mintemp_c;
    nextConditionText.innerHTML = tomorrowDate.day.condition.text;
}

function displayAfterTomorrowData(data) {
    let afterTomorrowDate = data.forecast.forecastday[2];
    console.log(afterTomorrowDate);
    let myAfterTomorrowDate = new Date(afterTomorrowDate.date);
    let myAfterTomorrowDateName = myAfterTomorrowDate.toLocaleString('eng-us', { weekday: 'long' });
    afterNextDay.innerHTML = myAfterTomorrowDateName;

    let afterTomorrowImg = afterTomorrowDate.day.condition.icon;
    let afterTomorrowSrc = `https:${afterTomorrowImg}`;
    afterNextConditionImg.setAttribute('src', afterTomorrowSrc);


    afterNextMaxTemp.innerHTML = afterTomorrowDate.day.maxtemp_c;
    afterNextMinTemp.innerHTML = afterTomorrowDate.day.mintemp_c;
    afterNextConditionText.innerHTML = afterTomorrowDate.day.condition.text;
}
