import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { CompactRestaurantInfo } from "../../../components/restaurant/compact-restaurant-info.component";

const PopupWidth = 160;
const PopupHeight = 130;
const MarkerHeight = 40;

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const PopupContainer = styled(Animated.View)`
  position: absolute;
  z-index: 999;
  overflow: visible;
  align-items: center;
`;

const styles = {
  arrowContainer: {
    marginTop: 0,
    height: 0,
    width: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "orange", // match popup background
  },
};

const RestaurantMap = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [], isLoading } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [popupInitialPosition, setPopupInitialPosition] = useState(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const mapRef = useRef();

  const { lat, lng, viewport } = location || {};

  useEffect(() => {
    if (
      viewport?.northeast?.lat !== undefined &&
      viewport?.southwest?.lat !== undefined
    ) {
      const delta = viewport.northeast.lat - viewport.southwest.lat;
      setLatDelta(delta);
    }
  }, [viewport]);

  const animateIn = () => {
    opacity.setValue(0);
    translateY.setValue(10);
    pan.setValue({ x: 0, y: 0 });
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleMarkerPress = async (restaurant) => {
    const coordinate = {
      latitude: restaurant.geometry.location.lat,
      longitude: restaurant.geometry.location.lng,
    };

    setSelectedRestaurant(restaurant);

    if (mapRef.current) {
      try {
        const point = await mapRef.current.pointForCoordinate(coordinate);
        const initialX = point.x - PopupWidth / 2;
        const initialY = point.y - PopupHeight - MarkerHeight;

        setPopupInitialPosition({ x: initialX, y: initialY });
        pan.setValue({ x: 0, y: 0 }); // reset pan offset
        animateIn();
      } catch (error) {
        console.log("Coordinate conversion failed:", error);
      }
    }
  };

  const clearPopup = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedRestaurant(null);
      setPopupInitialPosition(null);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

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

  if (!restaurants.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "gray" }}>
          No restaurants found in this area.
        </Text>
      </View>
    );
  }

  return (
    <>
      <Search />
      <Map
        ref={mapRef}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
        onPress={clearPopup}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            onPress={() => handleMarkerPress(restaurant)}
          />
        ))}
      </Map>

      {selectedRestaurant && popupInitialPosition && (
        <PopupContainer
          style={{
            left: popupInitialPosition.x,
            top: popupInitialPosition.y,
            width: PopupWidth,
            opacity,
            transform: [
              ...pan.getTranslateTransform(),
              { translateY: translateY },
            ],
          }}
          {...panResponder.panHandlers}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("Restaurants", {
                screen: "RestaurantDetail",
                params: {
                  restaurant: selectedRestaurant,
                },
              })
            }
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 8,
              width: "100%",
            }}
          >
            <CompactRestaurantInfo restaurant={selectedRestaurant} />

            <Pressable
              onPress={(e) => {
                e.stopPropagation(); // prevent bubbling up to parent Pressable
                clearPopup();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  color: "blue",
                  fontSize: 12,
                }}
              >
                Close
              </Text>
            </Pressable>
          </Pressable>

          <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
          </View>
        </PopupContainer>
      )}
    </>
  );
};

export const MapScreen = ({ navigation }) => {
  const { location, error, isLoading } = useContext(LocationContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error || !location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Unable to load map. Please enter a valid location.
        </Text>
      </View>
    );
  }

  return <RestaurantMap navigation={navigation} />;
};
