import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  // to get the restaurants on the map, I need to pull in location and restaurant context
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  // We need to track latitude delta which determines how close the zoom level is going to be on the map.
  const [latDelta, setLatDelta] = useState(0);

  // Guard: Wait until location is available
  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text>Location not available</Text>
        )}
      </View>
    );
  }

  //   if (!location || !location.viewport) {
  //     console.log("location is not fetched");
  //     return null;
  //   }

  // destructuring viewport off of the location
  const { lat, lng, viewport } = location;

  // Now let's use the "useEffect" to calculate exactly where we are supposed to render the marker

  useEffect(() => {
    if (
      viewport &&
      viewport.northeast &&
      viewport.southwest &&
      viewport.northeast.lat !== undefined &&
      viewport.southwest.lat !== undefined
    ) {
      const delta = viewport.northeast.lat - viewport.southwest.lat;
      setLatDelta(delta);
    }
  }, [viewport]);
  return (
    <>
      <Search />
      <Map
        //   Setting up coordinates for the map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {/* Now let's map over the restaurants to get the individual restaurant */}
        {restaurants.map((restaurant) => {
          // now return markers on the map
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            />
          );
        })}
      </Map>
    </>
  );
};
