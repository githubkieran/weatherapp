//get the weather data
function getWeather() {
    const apiKey = '7c94977f6aa5a760f90da169c100ed7f'; 
    const city = document.getElementById('city').value;

    if(!city) {
        alert("You must enter a city.");
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);

        })
        .catch(error => {
            console.error ('error fetching current weather data. ', error);
            alert('error fetching current weather data, try again.');

        })
    
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data);

        })
        .catch(error => {
            console.error ('error fetching hourly weather data. ', error);
            alert('error fetching hourly weather data, try again.');
            
        })
}

//display data
function displayWeather(data){
    const weather_icon = document.getElementById('weatherIcon');
    const temp_div = document.getElementById('temporaryDiv');
    const weather_info = document.getElementById('weatherInfo');
    const hour_forecast = document.getElementById('hourForecast');

    //remove previous 
    weather_info.innerHTML = '';
    hour_forecast.innerHTML ='';
    temp_div.innerHTML = '';

    if (data.cod === '404') {
        weather_info.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temp = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const temperatureHTML = `<p>${temp}`;
        const weatherHMTL = `<p>${cityName}</p><p>${description}</p>`;

        temp_div.innerHTML = temperatureHTML;
        weather_info.innerHTML = weatherHMTL;
        weather_icon.src = iconURL;
        weather_icon.alt = description;

        showImage();
    }   
}

function displayHourlyForecast(hourlyData) {
    const hour_forecast = document.getElementById('hourForecast');
    const next24Hours = hourlyData.list.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconURL}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hour_forecast.innerHTML += hourlyItemHTML;
    });
}

function showImage() {
    const weather_icon = document.getElementById('weatherIcon');
    weather_icon.style.display = 'block';
}