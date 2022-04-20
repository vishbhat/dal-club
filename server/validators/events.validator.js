// @Author: Kishan Thakkar
const { body, validationResult } = require("express-validator")

const bookEventSchema = [
  body("userId").exists().withMessage("User id is required.").isNumeric().withMessage("User id must be a number"),
  body("paymentIntent").exists().withMessage("Payment intent is required."),
  body("ticketType").exists().withMessage("Ticket type is required.").isIn(["Silver", "Gold", "Platinum"]).withMessage("Invalid ticket type."),
]

// Add last layer which will throw error if data is invalid
const validator = (req, res, next) => {
  let errors = validationResult(req)
  if(errors.isEmpty()) {
    next()
  } else {
    res.status(400).send({ success: false, errors: errors.mapped() })
  }
}

const validateEvent = (value) => {
  switch (value) {
    case "bookEvent":
      return [...bookEventSchema, validator]
    default:
      break;
  }
}

module.exports = validateEvent;
