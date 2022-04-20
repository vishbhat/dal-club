// @Author: Kishan Thakkar
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create intent for stripe form in UI
const getPaymentIntent = (req, res) => {
  const { module="", entityId, entityName, amount, ticketsBooked } = req.body
  // Added metadata to payment intent which will be required while booking event
  const paymentIntent = {
    currency: "cad",
    metadata: { module, id: entityId, name: entityName, ticketsBooked },
    description: `${module.toUpperCase()} - ${entityName}`,
    amount: 100 * amount,
  }
  stripe.paymentIntents.create(paymentIntent).then(response => {
    res.send({ success: true, clientSecret: response.client_secret })
  }).catch(err => {
    console.log(err);
    res.send({ success: false, message: "Cannot initialize payment." })
  })
}

module.exports = { getPaymentIntent }