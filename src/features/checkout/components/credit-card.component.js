// This file is going to be the baseline where we are going to
// utilize the credit card information.

import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";

import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name, onSuccess, onError }) => {
  // Declaring the onChange function that is hooked into the onChange event handler

  const onChange = async (formData) => {
    // Now building a status check by destructuring values and status off of the formdata

    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");

    const expiry = values.expiry.split("/");

    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };

    if (!isIncomplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (e) {
        onError();
      }
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
