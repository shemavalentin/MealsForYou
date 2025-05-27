import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  // Now use the context in LocationContext
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  // For both screens (Restaurant and Map) to update the search keywork
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  // Now use the useEffect hook for us to trigger the search as the searchbar mounts
  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        // setting the searchKeyword to whatever is happening inside here
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
