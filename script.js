const API_KEY = 'c6bdc90e5154c27e8256ca36fbc2553e'; // API 키

const searchBtn = document.querySelector('.search-btn');

const request = async (url) => {
    const res = await fetch(url);
    return res.ok ? res.json() : Promise.reject({error: 500});
}

const getWeatherInfo = async (area, container) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${API_KEY}`
        const res = await request(url);
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        const weatherMain = document.createElement('img');
        weatherMain.classList.add('weather-main');
        const weatherInfo = document.createElement('p');
        weatherMain.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
        weatherInfo.innerHTML = `<strong>${res.name}</strong><br><strong>기온🌡</strong> ${(res.main.temp - 273.15).toFixed(1)}℃ || <strong>습도💧</strong> ${res.main.humidity}%`;
        weatherCard.appendChild(weatherMain);
        weatherCard.appendChild(weatherInfo);
        container.innerHTML = "";
        container.appendChild(weatherCard);
    } catch (err) {
        console.log(err);
    }
}

const searchWeather = (e) => {
    e.preventDefault();
    console.log('click');
    const searchInput = document.querySelector('.search-input');
    console.log(searchInput.value);
    getWeatherInfo(searchInput.value, document.querySelector('.weather-container'));
    searchInput.value = '';
}

searchBtn.addEventListener('click', searchWeather);