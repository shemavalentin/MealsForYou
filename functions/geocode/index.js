const functions = require("firebase-functions");

const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");
const { error } = require("console");

// wrapping in Firebase HTTPS  Functions

exports.geocodeRequest = functions.https.onRequest(
  (request, response, client) => {
    const { city, mock } = url.parse(request.url, true).query;

    // validating the mock parameter
    if (mock === "true") {
      const locationMock = locationsMock[city.toLowerCase()];
      return response.json(locationMock);
    }

    // Now using client
    client
      .geocode({
        params: {
          address: city,
          key: "",
        },
        timeout: 1000,
      })
      .then((res) => {
        return response.json(res.data);
      })
      .catch((e) => {
        response.status(400);
        return response.send(e.response.data.error_message);
      });

    if (!city) {
      return response.status(400).json({ error: "Missing city parameter" });
    }
    // Let's return a promise to allow to mimc as if we are calling an API

    if (!locationMock) {
      return response.status(404).json({ error: "City not found" });
    }
  }
);
