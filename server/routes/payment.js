// @Author: Kishan Thakkar
const express = require("express");
const { getPaymentIntent } = require("../controllers/payment.controller")

const PaymentRouter = express.Router();

PaymentRouter.post("/createIntent", getPaymentIntent);

module.exports = PaymentRouter;
