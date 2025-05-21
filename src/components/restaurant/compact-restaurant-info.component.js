import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 140px;
  height: 100px;
`;

const Item = styled(View)`
  padding: 10px;
  max-width: 160px;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  elevation: 6;
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-offset: 0px 3px;
  shadow-radius: 8px;
`;

const NameText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;
  text-align: center;
`;

export const CompactRestaurantInfo = ({ restaurant }) => {
  return (
    <Item>
      {restaurant.photos?.[0] ? (
        <CompactImage
          source={{ uri: restaurant.photos[0] }}
          resizeMode="cover"
        />
      ) : (
        <Text>No image available</Text>
      )}
      <NameText numberOfLines={2}>{restaurant.name || "No Name"}</NameText>
    </Item>
  );
};
