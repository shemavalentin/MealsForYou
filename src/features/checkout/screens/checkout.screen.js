import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { List } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";

import { CreditCardInput } from "../components/credit-card.component";

import {
  CartIconContainer,
  CartIcon,
  NameInput,
} from "../components/checkout.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

export const CheckoutScreen = () => {
  const { cart, restaurant, sum } = useContext(CartContext);

  // Starting to build the payment
  const [name, setName] = useState("");

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon bg="green" icon="cart-off" />
          <Text> Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order: </Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }) => {
              return <List.Item title={`${item}: ${price / 100}`} />;
            })}
          </List.Section>

          <Text> Total: {sum / 100}</Text>
        </Spacer>

        <NameInput
          label="Name"
          value={name}
          onChangeText={(txt) => {
            // if (txt.length) {
            //   setName(txt);
            // } else {
            //   setName(null);
            // }

            setName(txt);
          }}
        />

        {name.length > 0 && (
          <CreditCardInput
            // Now linking up the name into the credit card input
            // To enable us when we fill in credit card inputs we get the name
            name={name}
          />
        )}
      </ScrollView>
    </SafeArea>
  );
};
