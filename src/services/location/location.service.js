import { Platform } from "react-native";

import camelize from "camelize";

import { IS_MOCK } from "@env";

export const locationRequest = (searchTerm) => {
  const localHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  // Making local fetch request. This will ensure local interaction between firebase loal function

  const isDevelopment = __DEV__;

  const mockParam = IS_MOCK === "true" ? "true" : "false";

  const localUrl = `http://${localHost}:5001/mealsforyou-d1a77/us-central1/geocode?city=${searchTerm}&mock=${mockParam}`;
  const prodUrl = `https://geocode-mfv7lk4rrq-uc.a.run.app?city=${searchTerm}`;

  return fetch(isDevelopment ? localUrl : prodUrl).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  // We need to figure out how to get geometric location off of rsult
  // const location = result.results[0];

  // Formating the results which may be not well formatted
  const formattedResponse = camelize(result);

  // we want to get geometry off of location, let's use destructuring
  const { geometry = {} } = formattedResponse.results[0];

  // then get lat and lng

  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};

/*
Now we have the service setup
what we need to do next is to setup the context for it 
in order for it to able to interact with the service.
so we need a react layer basically that's going to interact with the service.
 */
