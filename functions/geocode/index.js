const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");

module.exports.geocodeRequest = (request, response) => {
  const { city } = url.parse(request.url, true).query;
  // Let's return a promise to allow to mimc as if we are calling an API

  const locationMock = locationsMock[city.toLowerCase()];

  response.json(locationMock);
};
