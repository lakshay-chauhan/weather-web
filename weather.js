const API_URL1 = "https://api.weatherapi.com/v1/current.json";
const API_URL2 = "https://api.weatherbit.io/v2.0/forecast/daily";
const API_KEY1 = "50a5bed1df8a46ce9b0172129250403";
const API_KEY2 = "bde4dbfec7db489c87054082fcbb05cb";
let unit = "C";
let journal = [];

async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    try {
        const response = await fetch(`${API_URL1}?key=${API_KEY1}&q=${city}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        document.getElementById("weather").innerHTML = `<div class='border p-4'>
            <p>${data.location.name}</p>
            <p>${unit === "C" ? data.current.temp_c : data.current.temp_f}°${unit}</p>
        </div>`;
        journal.push(`Fetched weather for ${city}`);
        document.getElementById("error").textContent = "";
        fetchForecast(city);
    } catch (err) {
        document.getElementById("error").textContent = err.message;
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(`${API_URL2}?city=${city}&key=${API_KEY2}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        document.getElementById("forecast").innerHTML = data.data.map(day => `
            <div class='border p-4 mt-2'>
                <p>${day.datetime}</p>
                <p>${unit === "C" ? day.temp : (day.temp * 9) / 5 + 32}°${unit}</p>
            </div>`).join("");
    } catch (err) {
        document.getElementById("error").textContent = err.message;
    }
}

function toggleUnit() {
    unit = unit === "C" ? "F" : "C";
    fetchWeather();
}

function exportToPDF() {
    const doc = new jsPDF();
    doc.text("Weather Journal", 10, 10);
    journal.forEach((entry, index) => {
        doc.text(entry, 10, 20 + index * 10);
    });
    doc.save("weather-journal.pdf");
}