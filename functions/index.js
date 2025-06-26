const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { geocodeRequest } = require("./geocode");
const { placesNearby } = require("./places/indexjs");

const { Client } = require("@googlemaps/google-maps-services-js");

// Define the secret here
const GOOGLE_MAPS_API_KEY = defineSecret("GOOGLE_MAPS_API_KEY");

// Create shared client
const client = new Client({});

// Wrap geocode
exports.geocode = onRequest(
  {
    secrets: [GOOGLE_MAPS_API_KEY],
    timeoutSeconds: 10,
  },
  (request, response) => {
    geocodeRequest(request, response, client, GOOGLE_MAPS_API_KEY);
  }
);

// Wrap placesNearby
exports.placesNearby = onRequest(
  {
    secrets: [GOOGLE_MAPS_API_KEY],
    timeoutSeconds: 10,
  },
  (request, response) => {
    placesNearby(request, response, client, GOOGLE_MAPS_API_KEY);
  }
);

exports.geocode = require("./geocode").geocodeRequest;
exports.placesNearby = require("./places/indexjs").placesNearby;
