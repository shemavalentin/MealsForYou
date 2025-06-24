const { onRequest } = require("firebase-functions/v2/https");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places/indexjs");

const { Client } = require("@googlemaps/google-maps-services-js");

// create a client when the core of firebase starts
const client = new Client({});

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

exports.placesNearby = onRequest((request, response) => {
  placesRequest(request, response, client);
});
