// This file is going to be the baseline where we are going to
// utilize the credit card information.

import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";

import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51P5rRECNrjqvtnG7PEv1cMyWwkp9wZQ8a1AAy6tuXv3gXjAtHIMG3k9DRvrtj2B71DA70cTcfQGrFkZIfLXaNoLQ00SJ0JJaDN"
);

export const CreditCardInput = () => {
  // Declaring the onChange function that is hooked into the onChange event handler

  const onChange = async (formData) => {
    // Now building a status check by destructuring values and status off of the formdata

    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");

    console.log(isIncomplete);

    const card = {
      number: "4242424242424242",
      exp_month: "02",
      exp_year: "2026",
      cvc: "244",
      name: "Val",
    };

    const info = await stripe.createToken({ card });
    console.log(info);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
