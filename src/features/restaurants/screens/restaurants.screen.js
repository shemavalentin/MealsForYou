import React, { useContext, useState } from "react";

import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { Search } from "../components/search.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { ActivityIndicator } from "react-native-paper";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

// making optimization for Activity indicator
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  // using the context in the restaurant context
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);

  console.log(navigation);
  return (
    <SafeArea>
      {/* rendering the activity indicator(loading) */}
      {isLoading && (
        <LoadingContainer>
          <Loading
            size={50}
            animating={true}
            // color={MD2Colors.blue300}
            color="#FFA500"
          />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />

      {/* Setting up the Favourites bar */}
      {isToggled && <FavouritesBar />}
      <RestaurantList
        // Giving the component properties(props)
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: item,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
