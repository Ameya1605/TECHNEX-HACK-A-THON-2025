// script.js

// Your OpenWeatherMap API key (replace this with your own key)
const API_KEY = '09da3e41680ffc6529c225b0e0467eea';  // Replace with your actual API key

// Function to fetch weather data from OpenWeatherMap API
function getWeather() {
    // Get the city input value
    const city = document.getElementById('city-input').value;
    
    if (!city) {
        document.getElementById('weather-info').innerHTML = "Please enter a city name.";
        return;
    }

    // Create the URL for the API request
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch weather data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                // City not found
                document.getElementById('weather-info').innerHTML = "City not found!";
            } else {
                // Successfully fetched data, display weather info
                const weatherInfo = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
            }
        })
        .catch(error => {
            // Error handling if the API request fails
            document.getElementById('weather-info').innerHTML = "Error retrieving data. Please try again later.";
            console.error("Error fetching data:", error);
        });
}
