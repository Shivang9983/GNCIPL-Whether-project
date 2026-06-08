
const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (
        document.body.classList.contains("dark")
    ) {

        themeBtn.innerHTML =
            "☀";

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }
});




const apiKey = "983c5946129d7cd0b2802231c997a366";


setInterval(() => {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("en-IN", {
        hour12: false
    });

    date.textContent = now.toDateString();
}, 1000);




function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    sunrise.textContent =
        new Date(data.sys.sunrise * 1000).toLocaleTimeString();

    sunset.textContent =
        new Date(data.sys.sunset * 1000).toLocaleTimeString();
}





async function getWeather(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        if (data.cod != 200) {
            alert("City not found");
            return;
        }

        displayWeather(data);

    } catch {
        alert("Error fetching weather");
    }
}

/* SEARCH CITY */
function searchCity() {
    const city = cityInput.value.trim();

    if (!city) return;

    getWeather(city);
}


searchBtn.onclick = searchCity;

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchCity();
    }
});