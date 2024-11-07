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
    document.querySelector('.error').innerHTML="Error finding City.Please try again"
    document.querySelector('.error').style.display = 'block';

    } else if(data.main && data.weather){
        const temperature = data.main.temp.toFixed(2);
        const cityName = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        document.getElementById('place').innerHTML = cityName;
        document.getElementById('degree').innerHTML = `${temperature}°C`;
        document.getElementById('hum').innerHTML = `${humidity} %`;
        document.getElementById('speed').innerHTML = `${windSpeed} km/h`;

        const weatherIcon = document.querySelector('.weather-icon');
        
        if (temperature >=10 && temperature <= 20) {
            weatherIcon.src = './images/clouds.png';
        } else if (temperature >20 && temperature <=30) {
            weatherIcon.src = './images/sun.png';
        } else if (temperature >30 && temperature <=40) {
            weatherIcon.src = './images/hot-temperature.png';
        } else if (temperature <10) {
            weatherIcon.src = './images/snow.png';
        } else {
            // weatherIcon.src =  ; // Default icon if no match
        }
    }
}
function showError(message) {
    const errorDiv = document.querySelector('.error');
    errorDiv.innerHTML = "Error finding City.Please try again";
    errorDiv.style.display = 'block';

    // Automatically hide the error after 3 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 2000);
}