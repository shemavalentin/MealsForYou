import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  // Let's return a promise to allow to mimc as if we are calling an API
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
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
