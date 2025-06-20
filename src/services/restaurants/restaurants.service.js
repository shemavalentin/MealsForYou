import { Platform } from "react-native";

import camelize from "camelize";

// Making a request to get restaurants

export const restaurantsRequest = (location) => {
  const localHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";

  return fetch(
    `http://${localHost}:5001/mealsforyou-d1a77/us-central1/placesNearby?location=${location}`
  ).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
