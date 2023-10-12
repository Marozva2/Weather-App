const apiKey = '58d26521a18c94512c2b3ccbcf34dec9';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  if (!city) {
    // Handle empty input
    // You can display a message or set default values here
    document.querySelector('.city').innerHTML = '--';
    document.querySelector('.temp').innerHTML = '--';
    document.querySelector('.humidity').innerHTML = '--';
    document.querySelector('.wind').innerHTML = '--';
    weatherIcon.src = ''; // Clear the weather icon
    return;
  }

  const res = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);

  if (res.status === 404) {
     document.querySelector('.weather').style.display = 'none';
  } else {
    let data = await res.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    const celsius = Math.round(data.main.temp - 273.15);
    document.querySelector('.temp').innerHTML = celsius + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    const weatherMain = data.weather[0].main.toLowerCase(); // Convert to lowercase for consistency

// Define a mapping of weather conditions to the corresponding local image file paths
const weatherIcons = {
  clouds: 'images/clouds.png',
  clear: 'images/clear.png',
  rain: 'images/rain.png',
  drizzle: 'images/drizzle.png',
  mist: 'images/mist.png',
};

// Check if the weather condition exists in the mapping
if (weatherMain in weatherIcons) {
    weatherIcon.src = weatherIcons[weatherMain];
} else {
    // If the condition doesn't match, set a default icon or handle it as needed
    weatherIcon.src = 'images/default.png'; // Adjust the path to your default icon
}

  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

// Clear the input field after submission and refresh
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const refreshButton = document.getElementById('refreshButton');
    
    // Add a click event listener to the search button
    searchButton.addEventListener('click', function() {
        searchInput.value = ''; // Clears the input field
    });

    // Add a click event listener to the refresh button
    refreshButton.addEventListener('click', function() {
        location.reload(); // Reload the page
    });

});

// Time generator
function updateTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    const options = {
      timeZone: 'Africa/Nairobi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    timeDisplay.textContent = `${currentTime} EAT`;
  }
  
  // Update the time immediately, then refresh every second
  updateTime();
  setInterval(updateTime, 1000);
  