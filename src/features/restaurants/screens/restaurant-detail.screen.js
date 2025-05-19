import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

export const RestaurantDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  const { restaurant } = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />

      {/* Enabling scroll */}
      <ScrollView>
        {/* Accordion list for Breakfast */}
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded} // When breakfastExpanded is false
          // When the breakfastExpanded is true, now set it back to false when pressed
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breadfast" />
        </List.Accordion>

        {/* Accordion list for Lunch */}
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded} // When breakfastExpanded is false
          // When the breakfastExpanded is true, now set it back to false when pressed
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Burger w/ Fries" />
          <List.Item title="Steak Sandwitch" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>

        {/* Accordion list for Dinner */}
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded} // When breakfastExpanded is false
          // When the breakfastExpanded is true, now set it back to false when pressed
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom" />
          <List.Item title="Steak Frites" />
        </List.Accordion>

        {/* Accordion list for Drinks */}
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded} // When breakfastExpanded is false
          // When the breakfastExpanded is true, now set it back to false when pressed
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
