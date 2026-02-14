const apiKey = "05727ef7856c5b54803545b05fc4112d";
const form = document.getElementById("searchForm");
const input = document.getElementById("cityInput");
const resultContainer = document.getElementById("weatherResult");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city) fetchWeather(city);
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    resultContainer.innerHTML =
        '<div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ville introuvable");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        resultContainer.innerHTML = `<p class="error-msg">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    resultContainer.innerHTML = `
                    <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon mb-2">
                    <h2 class="city-name">${name}</h2>
                    <p class="weather-desc mb-3">${weather[0].description}</p>
                    <div class="temp mb-4">${Math.round(main.temp)}°C</div>
                    
                    <div class="row w-100 g-3 mt-2">
                        <div class="col-6">
                            <div class="detail-box text-center">
                                <div class="detail-label">Ressenti</div>
                                <div class="detail-value">${Math.round(main.feels_like)}°C</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="detail-box text-center">
                                <div class="detail-label">Humidité</div>
                                <div class="detail-value">${main.humidity}%</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="detail-box text-center">
                                <div class="detail-label">Vent</div>
                                <div class="detail-value">${(wind.speed * 3.6).toFixed(1)} km/h</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="detail-box text-center">
                                <div class="detail-label">Pression</div>
                                <div class="detail-value">${main.pressure} hPa</div>
                            </div>
                        </div>
                    </div>
                `;
}
