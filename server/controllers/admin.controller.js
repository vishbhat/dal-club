const {getAdminByAdminEmail} = require("../models/admin.model");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
 login: (req, res) => {
  const body = req.body;
  console.log("The body is",body);
  console.log("The email is",body.admin_email);
  console.log("The email is",body.admin_password);
  getAdminByAdminEmail(body.admin_email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      console.log("My result is ",results);  
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
    console.log("My body password is ",body.admin_password);
    console.log("My received password is ",results.admin_password);
    const result = compareSync(body.admin_password, results.admin_password);
    console.log("My result is",result);
    if (body.admin_password==results.admin_password) {
      results.admin_password = undefined;
      const jsontoken = sign({ result: results }, "qwe1234", {
        expiresIn: "1h"
      });
      return res.json({
        success: 1,
        message: "login successfully",
        token: jsontoken
      });
    } else {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
  });
}
};
