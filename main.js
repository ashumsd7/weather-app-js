const api = {
    key: "165b1c00789f09b13106d1224f680ccc",
    base: "https://api.openweathermap.org/data/2.5"

}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', setQuery2);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        value = searchbox.value;
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function setQuery2(){  
    getResults(document.querySelector('.search-box').value);
}

function getResults(query) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        data: {
            appid: 'a2f7b9bf798c01347a43a510ad6f64e6',
            q: query,

        },
        dataType: 'json',
        success: function (apiResponse) {
            displayResults(apiResponse);
        },
        error: function (err) {
            console.log("The error is " + err);
        }
    });
}

function displayResults(weather) {
    console.log(weather);
    let city= document.querySelector('.location .city');
    city.innerText= `${weather.name}, ${weather.sys.country}`;

    let now= new Date();
    let date= document.querySelector('.location .date')
    date.innerText= dateBuilder(now);

    let tempNow= weather.main.temp;
     let feelsLikeT= weather.main.feels_like;
    let celcius= Math.round(parseFloat(tempNow)-273.15);
    let feelsLike= Math.round(parseFloat(feelsLikeT)-273.15);


   let temp= document.querySelector('.current  .temp');
   temp.innerText= celcius+ '°C';

   let feels= document.querySelector('.current  .feels-like');
   feels.innerText= feelsLike+ '°C';
   

    let getWeather = weather.weather[0].main;
    let getWeatherDes = weather.weather[0].description;
    

   let weatherNow = document.querySelector('.current .weather');
    weatherNow.innerText= getWeather;

    let weatherDes = document.querySelector('.current .weather-description');
    weatherDes.innerText= getWeatherDes;

}

//copied  
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }


  