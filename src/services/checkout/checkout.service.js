import createStripe from "stripe-client";

// Initialize Stripe with your public test key
const stripe = createStripe(
  "pk_test_51P5rRECNrjqvtnG7PEv1cMyWwkp9wZQ8a1AAy6tuXv3gXjAtHIMG3k9DRvrtj2B71DA70cTcfQGrFkZIfLXaNoLQ00SJ0JJaDN"
);

// Function to create a card token
export const cardTokenRequest = (card) => stripe.createToken({ card });

// Function to make the payment request
export const payRequest = (token, amount, name) => {
  return fetch("https://pay-mfv7lk4rrq-uc.a.run.app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token.id, // Send only the token ID
      name,
      amount,
    }),
  }).then((res) => {
    if (res.status > 400) {
      console.log();
      return Promise.reject("Something went wrong processing your payment");
    }

    return res.json();
  });
};
