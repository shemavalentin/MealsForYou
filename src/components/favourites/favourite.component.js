import React, { useContext } from "react";
import styled from "styled-components";

// Importing AntDesigning to help adding a heart icon
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
`;

// Then importing the FavouritesContext for favourites to be captured
import { FavouritesContext } from "../../services/favourites/favourites.context";

export const Favourite = () => {
  const { Favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  return (
    <FavouriteButton>
      <AntDesign name="heart" size={24} color="red" />
    </FavouriteButton>
  );
};
