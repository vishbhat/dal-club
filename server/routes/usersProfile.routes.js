// @Author: Kunj Vijaykumar Patel
const express = require("express");
const {
  updateUserProfile,getAllUsers
} = require("../controllers/usersProfile.controller");

const UsersProfileRouter = express.Router();

UsersProfileRouter.post("/update/:user_id", updateUserProfile);
UsersProfileRouter.get("/getUsers", getAllUsers);

module.exports = UsersProfileRouter;