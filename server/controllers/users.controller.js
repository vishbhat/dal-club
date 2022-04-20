const {create,  getUserByUserEmail, getUserDetailsAfterLogin} = require("../models/users.model");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {

    const body = req.body;
    console.log("The body is",body);
    const salt = genSaltSync(10);
    console.log("The password is",body.user_password);
    body.user_password = hashSync(body.user_password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  
},
login: (req, res) => {
  const body = req.body;
  console.log("The body is",body);
  console.log("The email is",body.user_email);
  getUserByUserEmail(body.user_email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
    const result = compareSync(body.user_password, results.user_password);
    if (result) {
      results.user_password = undefined;
      const jsontoken = sign({ result: results }, "qwe1234", {
        expiresIn: "1h"
      });
      return res.json({
        success: 1,
        message: "login successfully",
        token: jsontoken,
        user: results
      });
    } else {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
  });
},
  getUserDetailsAfterLogin: (req, res) => {
    getUserDetailsAfterLogin(req.params.id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Cannot get user details."
        });
      } else {
        return res.json({
          success: true,
          userDetails: results
        })
      }
    })
  }
};
