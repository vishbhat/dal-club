const { body, validationResult } = require("express-validator")

const eventRules=[
  body("eventName").exists().withMessage("event name is required").isAlphanumeric().withMessage("No special characters allowed in the name"),
  body("description").exists().withMessage("Description is needed").isLength({min:20}).withMessage("descrption should be minimum of 20 words"),
  body('')  
]
