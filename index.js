function getWeather(event) {
    event.preventDefault(); // Prevents page reload on form submission
    const apiKey = '379d8882a567e0c36baa321b5ead4997';
    const cityInput = document.getElementById('input');
    const cityName = cityInput.value;

    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('City not found. Please try again.');
    } else if(data.main && data.weather){
        const temperature = data.main.temp;
        const cityName = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        document.getElementById('place').innerHTML = cityName;
        document.getElementById('degree').innerHTML = `${temperature}°C`;
        document.getElementById('hum').innerHTML = `${humidity} %`;
        document.getElementById('speed').innerHTML = `${windSpeed} km/h`;
    }
}