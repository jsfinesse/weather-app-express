const request = require("postman-request");

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
    )}.json?access_token=pk.eyJ1IjoianNmaW5lc3NlIiwiYSI6ImNsMHc2bnpvcjFlNnYzanFvZXpjemNmc3QifQ.e-59IbJarPkeqESCWTD1Nw&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Can't reach our servers!", undefined);
        } else if (body.features.length === 0) {
            callback("Couldn't find the searched location", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
