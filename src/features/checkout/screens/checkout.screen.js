import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { List } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";

import { CreditCardInput } from "../components/credit-card.component";
import { payRequest } from "../../../services/checkout/checkout.service";

import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "../components/checkout.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, clearCart, sum } = useContext(CartContext);

  // Starting to build the payment
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then(() => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccess");
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: err,
        });
      });
  };

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
      {isLoading && <PaymentProcessing />}
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

        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardInput
              // Now linking up the name into the credit card input
              // To enable us when we fill in credit card inputs we get the name
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your credit card",
                })
              }
            />
          )}
        </Spacer>

        <Spacer position="top" size="xxl" />

        {/* Now need to create two buttons */}

        <PayButton
          disabled={isLoading}
          icon="cash"
          mode="contained"
          onPress={onPay}
        >
          Pay Now
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton
            disabled={isLoading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            {" "}
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
