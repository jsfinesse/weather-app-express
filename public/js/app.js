const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
const weatherIcon = document.querySelector("#weather-icon");

async function getLocation() {
    if (navigator.geolocation) {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    } else {
        alert("Geolocation not supported by browser");
    }
}

async function showLocation() {
    let position;
    try {
        position = await getLocation();
    } catch (error) {
        alert("Please allow location");
    }

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    const response = await fetch(geoApiUrl);
    const data = await response.json();
    searchTerm = data.locality;
    return searchTerm;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let searchTerm;

    if (clicked === "getLocation") {
        searchTerm = await showLocation();
    } else {
        searchTerm = search.value;
    }

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    weatherIcon.src = "/img/transparent.png";

    fetch("/weather?searchTerm=" + searchTerm).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                weatherIcon.src = `${data.img}`;
            }
        });
    });
});
