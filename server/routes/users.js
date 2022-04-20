const express = require('express')
const router = express.Router();
const{ createUser, login, getUserDetailsAfterLogin } = require("../controllers/users.controller");


//router.post("/", checkToken, createUser);
router.post("/register",createUser);
router.post("/login", login);
router.get("/details/:id", getUserDetailsAfterLogin);

module.exports=router;
