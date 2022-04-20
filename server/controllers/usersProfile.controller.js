// @Author: Anamika Ahmed
const { Users_ProfileModel } = require("../models");

//This function is used to update the model to update the users
const updateUserProfile = (req, res) => {
    Users_ProfileModel.update(req.body, { where: { user_id: req.params.user_id } })
  .then((data) => {
    res.send({ success: true});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ success: false });
  });
}

// Function to fetch all exisitng packages
const getAllUsers = (req, res) => {
  Users_ProfileModel.findAll()
    .then((data) => {
      res.send({ success: true, data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

module.exports = {
  
  updateUserProfile,
  getAllUsers
};
