// @Author: Anamika Ahmed
const express = require('express');
const {
  getPackage,
} = require('../controllers/package.controller');

const PackageRouter = express.Router();

PackageRouter.get('/getPackage', getPackage);

module.exports = PackageRouter;
