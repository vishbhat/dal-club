// @Author: Kunj Vijaykumar Patel
const express = require("express");
const {
  getPackageList,
  getPackage,
  postPackage,
  deletePackage,
  updatePackage
} = require("../controllers/packages.controller");

const PackagesRouter = express.Router();

PackagesRouter.get("/", getPackageList);
PackagesRouter.get("/:packageId", getPackage);
PackagesRouter.post("/new", postPackage);
PackagesRouter.delete("/delete/:packageId", deletePackage);
PackagesRouter.post("/update/:packageId", updatePackage);

module.exports = PackagesRouter;
