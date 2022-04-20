const express = require('express')
const router = express.Router();
const { checkToken } = require("../middleware/authMiddleware");
const{login} = require("../controllers/admin.controller");


//router.post("/", checkToken, createUser);
router.post("/login", login);

module.exports=router;