// @Author: Anamika Ahmed
const { PackagesModel } = require("../models");


// Function to fetch all exisitng packages
const getPackage = (req, res) => {
    PackagesModel.findAll({
      where: {
        isActive: true
      }
    })
      .then((package) => {
        res.send({ success: true, package });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false });
      });
  };
  
module.exports = {
    getPackage
};