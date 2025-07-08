// This file is going to be the baseline where we are going to
// utilize the credit card information.

import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";

export const CreditCardInput = () => {
  // Declaring the onChange function that is hooked into the onChange event handler

  const onChange = (formData) => {
    // Now building a status check by destructuring values and status off of the formdata

    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");

    console.log(isIncomplete);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
