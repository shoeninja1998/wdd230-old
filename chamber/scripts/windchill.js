const apiKey = '53f08f4aed81ac6ae9222e0ab578f708';
const city = 'Jackson,US'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
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

        


