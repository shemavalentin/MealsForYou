const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { geocodeRequest } = require("./geocode");
const { placesNearby } = require("./places/indexjs");

const GOOGLE_MAPS_API_KEY = defineSecret("GOOGLE_MAPS_API_KEY");

// Geocode Function
exports.geocode = onRequest(
  {
    secrets: [GOOGLE_MAPS_API_KEY],
    timeoutSeconds: 10,
  },
  geocodeRequest
);

// PlacesNearby Function
exports.placesNearby = onRequest(
  {
    secrets: [GOOGLE_MAPS_API_KEY],
    timeoutSeconds: 10,
  },
  placesNearby
);
