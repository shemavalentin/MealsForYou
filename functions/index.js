const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response);
});

exports.placesNearby = onRequest((request, response) => {
  placesRequest(request, response);
});
