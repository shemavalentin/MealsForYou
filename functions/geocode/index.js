require("dotenv").config(); // Load .env when running locall

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { Client } = require("@googlemaps/google-maps-services-js");
const url = require("url");

const { locations: locationsMock } = require("./geocode.mock");

const GOOGLE_MAPS_API_KEY = defineSecret("GOOGLE_MAPS_API_KEY");
const client = new Client({});

exports.geocodeRequest = onRequest(
  {
    secrets: [GOOGLE_MAPS_API_KEY],
    timeoutSeconds: 10,
  },
  (req, res) => {
    const { city, mock } = url.parse(req.url, true).query;

    if (!city) {
      return res.status(400).json({ error: "Missing city parameter" });
    }

    if (mock === "true") {
      const locationMock = locationsMock[city.toLowerCase()];
      if (!locationMock) {
        return res.status(404).json({ error: "City not found (mock)" });
      }
      return res.json(locationMock);
    }

    const apiKey =
      process.env.FUNCTIONS_EMULATOR === "true"
        ? process.env.GOOGLE_MAPS_API_KEY
        : GOOGLE_MAPS_API_KEY.value();

    client
      .geocode({
        params: {
          address: city,
          key: apiKey,
        },
        timeout: 1000,
      })
      .then((geoRes) => res.json(geoRes.data))
      .catch((error) =>
        res.status(500).json({
          error: error?.response?.data?.error_message || "Geocode failed",
        })
      );
  }
);
