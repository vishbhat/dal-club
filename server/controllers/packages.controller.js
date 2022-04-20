// @Author: Kunj Vijaykumar Patel
const { PackagesModel } = require("../models");

//This function is used to call the model to fetch all the packages
const getPackageList = (req, res) => {
  PackagesModel.findAll()
    .then((subscriptionPackages) => {
      res.send({ success: true, subscriptionPackages });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

//This function is used to call the model to fetch the selected package
const getPackage = (req, res) => {
  PackagesModel.findOne({ where: { package_id: req.params.packageId } })
    .then((subscriptionPackage) => {
      res.send({ success: true, subscriptionPackage });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};
//This function is used to update the model to submit the package
const postPackage = (req, res) => {
  const packagePost = {
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    isActive: req.body.isActive,
  };
  PackagesModel.create(packagePost)
    .then((data) => {
      console.log(data);
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Job Application.",
      });
    });
};
//This function is used to update the model to the delete the package
const deletePackage = (req, res) => {
  PackagesModel.destroy({ where: { package_id: req.params.packageId } })
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};
//This function is used to update the model to update the package
const updatePackage = (req, res) => {
  PackagesModel.update(req.body, {
    where: { package_id: req.params.packageId },
  })
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

module.exports = {
  getPackageList,
  postPackage,
  getPackage,
  deletePackage,
  updatePackage,
};
