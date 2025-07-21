module.exports.payRequest = async (req, res, stripeClient) => {
  try {
    const { token, amount } = JSON.parse(req.body);

    // Now use the paymentIntents

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },

      confirm: true,
    });

    res.json(paymentIntent);
  } catch (error) {
    console.log("Payment error:", error);
    res.status(400).send({
      error: error.message || "Something went wrong with your payment",
    });
  }
};
