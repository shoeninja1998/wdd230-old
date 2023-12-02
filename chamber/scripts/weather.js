const apiKey = '53f08f4aed81ac6ae9222e0ab578f708';
const city = 'Jackson,US'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

function WindChill(){
    fetch(url)
        .then(response => response.json())
        .then(data => {
        // temperature
        const temperature_kelvin = data.main.temp;
        const temperature = (1.8*(temperature_kelvin -273)+32).toFixed(0);
        const temperature_display = document.getElementById('temperature');
        temperature_display.textContent = temperature;
    
        // Wind speed
        const windSpeed = data.wind.speed;
        const windSpeed_display = document.getElementById('wind-speed');
        windSpeed_display.textContent = windSpeed;
    
        // Wind chill
        const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
        const windChill_display = document.getElementById('wind-chill');
        windChill_display.textContent = windChill.toFixed(2);
            })

    const ONE_DAY = 24 * 60 * 60 * 1000

    function GetTemperature(temps){
        let temp = temps.main.temp;
        let tempText = temps.weather[0].description;
        let tempImgCode = temps.weather[0].icon;
        let wind = temps.wind.speed;

        let temperature = document.getElementById("temperature");
        temperature.textContent = temp;
        let description = document.getElementById("tempText");
        description.textContent = tempText;
        temperature.textContent = temp;
        let windSpeed = document.getElementById("windspeed");
        windSpeed.textContent = wind;
}
}
        
function GetForecast(temps){
    let days = []
    let today = new Date();
    for (let i = 0; i < 3; i++){
        today = new Date(today.getTime() + ONE_DAY);
        let newDay = today.toISOString().slice(0, 10);
        days.push(newDay);
    }
    let high = days.map(function(day){
        return temps.filter(function(temp) {
            return temp.dt_txt.startsWith(day);
        }).reduce(function (current, next){
            return (current.main.temp > next.main.temp ? current : next)
        })
    })

    let low = days.map(function(day){
        return temps.filter(function(temp) {
            return temp.dt_txt.startsWith(day);
        }).reduce(function (current, next){
            return (current.main.temp < next.main.temp ? current : next)
        })
    })
    CreateForcast(high, low);
}

function CreateForcast(high, low){
    let card = document.getElementById('weather');
    let div = document.createElement('div');
    let divHTML = `
        <h2>Three Day Forecast</h2>
        <section class="forecastWeather">
            <section>
            <h3>${high[0].dt_txt}</h3>
            <img src="https://openweathermap.org/img/wn/${high[0].weather[0].icon}.png">
            <p>${high[0].weather[0].description}</p>
            <p>High: ${high[0].main.temp}</p>
            <p>Low: ${low[0].main.temp}</p>
            </section>
            <section>
            <h3>${high[1].dt_txt}</h3>
            <img src="https://openweathermap.org/img/wn/${high[1].weather[0].icon}.png">
            <p>${high[1].weather[0].description}</p>
            <p>High: ${high[1].main.temp}</p>
            <p>Low: ${low[1].main.temp}</p>
            </section>
            <section>
            <h3>${high[2].dt_txt}</h3>
            <img src="https://openweathermap.org/img/wn/${high[2].weather[0].icon}.png">
            <p>${high[2].weather[0].description}</p>
            <p>High: ${high[2].main.temp}</p>
            <p>Low: ${low[2].main.temp}</p>
            </section>
        </section>
            `;
    div.innerHTML = divHTML;
    card.appendChild(div);
}

async function fetchCurrent(){
    const response = await fetch(weatherURL);
    if (response.ok){
        const data = await response.json();
        getTemperature(data);
    }
}

async function fetchForecast(){
    const response = await fetch(forecastURL);
    if (response.ok){
        const data = await response.json();
        getForecast(data.list);
    } 
}

fetchCurrent()
fetchForecast()