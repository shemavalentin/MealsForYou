import { mocks } from "./mock";
import camelize from "camelize";

// Making a request to get restaurants

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }

    resolve(mock);
  });
};

const restaurantTransform = (result) => {
  const newResult = camelize(result);
  return newResult;
};

restaurantsRequest()
  .then(restaurantTransform)
  .then((transformedResponse) => {
    console.log(transformedResponse);
  })
  .catch((err) => {
    console.log(err);
  });
