const form = document.querySelector("form");
const search = document.querySelector("input");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    fetch("http://localhost:3000/weather?searchTerm="+searchTerm).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    });
});
})