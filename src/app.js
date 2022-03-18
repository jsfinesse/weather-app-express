const path = require("path");

const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Path definitions
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Express setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About the App",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.searchTerm) {
        return res.send({
            error: "You must provide a location",
        });
    }

    geocode(
        req.query.searchTerm,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    searchTerm: req.query.searchTerm,
                });
            });
        }
    );
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Looks like you're lost :(",
    });
});

app.listen(3000, () => {
    console.log("Server is up on PORT: 3000");
});
