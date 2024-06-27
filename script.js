const apiKey = 'YOUR_API_KEY';  // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap

document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeatherData(location) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    fetch(apiURL)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod !== 200) {
        alert('Location not found');
        return;
    }
    
    document.getElementById('city').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

// Fetch weather data based on user's geolocation
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            
            fetch(apiURL)
                .then(response => response.json())
                .then(data => displayWeatherData(data))
                .catch(error => console.error('Error fetching the weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};
