const api = {
    key: "165b1c00789f09b13106d1224f680ccc",
    base: "https://api.openweathermap.org/data/2.5"

}

// let newinput = document.querySelector('.my-input');
// newinput.value = "Please Type a  City Name."

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', setQuery2);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        value = searchbox.value;
        if (value == '') { alert("Please Type City Name.") }
        else {
            getResults(searchbox.value);

        }
    }
}

function setQuery2() {
    if (document.querySelector('.search-box').value == '') { alert("Please Type City Name.") }
    else {
        getResults(document.querySelector('.search-box').value);
    }
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
            var el = document.querySelector('#mainSection');
            el.style.display = 'none';
            console.log("The error is " + err);
            let errorSection = document.querySelector('.error');
            errorSection.innerText = "Something went Wrong, Please type only name of city. Check spelling too.";
            setTimeout(() => {
                window.location.reload();
            }, 1500);


        }
    });
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    var cityName= city.value;
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now);

    let tempNow = weather.main.temp;
    let feelsLikeT = weather.main.feels_like;
    let celcius = Math.round(parseFloat(tempNow) - 273.15);
    let feelsLike = Math.round(parseFloat(feelsLikeT) - 273.15);


    let temp = document.querySelector('.current  .temp');
    temp.innerText = celcius + '°C';

    let feels = document.querySelector('.current  .feels-like');
    feels.innerText = feelsLike + '°C';


    let getWeather = weather.weather[0].main;
    let getWeatherDes = weather.weather[0].description;


    let weatherNow = document.querySelector('.current .weather');
    weatherNow.innerText = getWeather;

    let weatherDes = document.querySelector('.current .weather-description');
    weatherDes.innerText = getWeatherDes;

     SpeakIt(cityName,celcius, feelsLike, getWeather, getWeatherDes);


}

//copied  
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}



var voiceList = document.querySelector('#voiceList');
var txtInput = document.querySelector('.txtInput');
var btnSpeak = document.querySelector('#btnSpeak');
var tts = window.speechSynthesis;



btnSpeak.addEventListener('click', (e) => {
    e.preventDefault();
   
    
});

function SpeakIt(cityName,temp, feelsLike, weather, weatherDis) {
    var speechA= "You have searched for"
    var speechB=searchbox.value;
    console.log(speechB);
    var speechC= "Current temperature in"
    var speechD= temp;
    console.log(speechD);
    var speechE= "degree celcius"
    var all= speechA+ speechB + speechC + speechB+ 'is'+ speechD + 'degree ' + 'and its feels like' +feelsLike +speechE + 'Weather condition is      ' + weather + weatherDis;
    var toSpeak = new SpeechSynthesisUtterance(all);
    tts.speak(toSpeak);
}
 
