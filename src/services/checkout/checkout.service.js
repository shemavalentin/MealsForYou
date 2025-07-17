import React from "react";

import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51P5rRECNrjqvtnG7PEv1cMyWwkp9wZQ8a1AAy6tuXv3gXjAtHIMG3k9DRvrtj2B71DA70cTcfQGrFkZIfLXaNoLQ00SJ0JJaDN"
);

// Making request to get the stripe token

export const cardTokenRequest = (card) => stripe.createToken({ card });
