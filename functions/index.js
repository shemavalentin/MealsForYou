require("dotenv").config();

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { geocodeRequest } = require("./geocode");
const { placesNearby } = require("./places/indexjs");
const { payRequest } = require("./pay");

// Define Secrets
const STRIPE_SECRET = defineSecret("STRIPE_SECRET_KEY");
const GOOGLE_MAPS_API_KEY = defineSecret("GOOGLE_MAPS_API_KEY");

// Passing stripeClient INSIDE the function, not as a 'secret'
const getStripeClient = () => {
  const stripeKey =
    process.env.FUNCTIONS_EMULATOR === "true"
      ? process.env.STRIPE_SECRET_KEY
      : STRIPE_SECRET.value();
  return require("stripe")(stripeKey);
};

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

// PlacesNearby Function
exports.pay = onRequest(
  {
    secrets: [STRIPE_SECRET],
    timeoutSeconds: 10,
  },
  async (req, res) => {
    const stripe = getStripeClient();
    await payRequest(req, res, stripe);
  }
);
