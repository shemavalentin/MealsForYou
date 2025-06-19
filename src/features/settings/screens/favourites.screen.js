import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";

// Styled container for profile image
const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-width: 2px;
  border-color: #ffa500;
`;

// Placeholder style when no image is available
const Placeholder = styled(Text)`
  text-align: center;
  margin-vertical: 20px;
  font-size: 16px;
  color: gray;
`;

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  const [photoUri, setPhotoUri] = useState(null);

  // Load profile picture on screen focus (after taking new picture)
  useFocusEffect(
    React.useCallback(() => {
      const loadPhoto = async () => {
        const uri = await AsyncStorage.getItem("user-profile-photo");
        if (uri) {
          setPhotoUri(uri);
        }
      };
      loadPhoto();
    }, [])
  );

  return favourites.length ? (
    <SafeArea>
      {/* Profile Picture (tappable) */}
      <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
        {photoUri ? (
          <ProfileImage source={{ uri: photoUri }} />
        ) : (
          <Placeholder>Tap to add a profile photo</Placeholder>
        )}
      </TouchableOpacity>

      {/* Favourites List */}
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
        {photoUri ? (
          <ProfileImage source={{ uri: photoUri }} />
        ) : (
          <Placeholder>Tap to add a profile photo</Placeholder>
        )}
      </TouchableOpacity>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
