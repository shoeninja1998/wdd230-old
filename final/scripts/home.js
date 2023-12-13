const LAT = 33.1581;
const LONG = -117.3506;
const apiKey = "53f08f4aed81ac6ae9222e0ab578f708";

let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=${apiKey}&units=imperial`;
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LONG}&appid=${apiKey}&units=imperial`;

const ONE_DAY = 24 * 60 * 60 * 1000

function FormatDate(dateString){
    const format = {weekday: 'short', month: 'numeric', day: 'numeric'};
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', format);
}

// Set functions

function SetWeather(temps){
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("tempText");
    let weatherImage = document.getElementById("tempImage");
    let humid = document.getElementById("humidity");

    let temp = temps.main.temp;
    let tempText = temps.weather[0].description;
    let tempImgCode = temps.weather[0].icon;
    let humidityText = temps.main.humidity; 

    temperature.textContent = temp;
    description.textContent = tempText;
    humid.textContent = humidityText;

    weatherImage.src = `https://openweathermap.org/img/wn/${tempImgCode}.png`;
}



function SetForecast(temps){
    let days = []
    let today = new Date();
    for (let i = 0; i < 3; i++){
        today = new Date(today.getTime() + ONE_DAY);
// Converts into usable string and adds it to 'days' list
        let newDay = today.toISOString().slice(0, 10);
        // newDay = newDay.
        days.push(newDay);
    }

    let high = days.map(function(day){
// This function filters out 'temp' objects that don't correspond to the correct day 
        return temps.filter(function(temp) {
            return temp.dt_txt.startsWith(day);
// This function uses .reduce to find the highest filtered 'temp'.
        }).reduce(function (current, next){
            return (current.main.temp > next.main.temp ? current : next)
        })
    })

// This section is the same except it's gets the lowest temps. 
    let low = days.map(function(day){
        return temps.filter(function(temp) {
            return temp.dt_txt.startsWith(day);
        }).reduce(function (current, next){
            return (current.main.temp < next.main.temp ? current : next)
        })
    })
    DisplayForecast(high, low);
}

// Display functions

function DisplayForecast(high, low){
    let card = document.getElementById('forecastWeather');
    let div = document.createElement('div');
    let divHTML = `
        ${high.map((dayHigh) => `
        <section class="card">
        <h3>${FormatDate(dayHigh.dt_txt)}</h3>
        <img src="https://openweathermap.org/img/wn/${dayHigh.weather[0].icon}.png">
        <p>${dayHigh.weather[0].description}</p>
        </section>
        `).join('')}

`;
    div.innerHTML = divHTML;
    card.appendChild(div);
}

// Get functions

async function GetWeather(){
    try{
        const response = await fetch(weatherURL);
        if (response.ok){
            const data = await response.json();
            SetWeather(data);
        }
    }
    catch(error){
        console.error("Didn't fetch weather data.")
    }
}

async function GetForecast(){
    try{
        const response = await fetch(forecastURL);
        if (response.ok){
            const data = await response.json();
            SetForecast(data.list);
        } 
    }
    catch(error){
        console.error("Didn't fetch forecast data.")
    }
}

GetWeather()
GetForecast()

const drinkTotal = document.getElementById('drinkTotal');
const count = localStorage.getItem('drinkCounter') || 0;
drinkTotal.textContent = count;