const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
const weatherIcon = document.querySelector("#weather-icon");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?searchTerm=" + searchTerm).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageOne.textContent = data.forecast;
                    weatherIcon.src = `${data.img}`;
                }
            });
        }
    );
});
