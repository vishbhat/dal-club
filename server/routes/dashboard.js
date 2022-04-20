// @Authors: Rahul Kherajani
const express = require('express');
const {
  returnDashboardStatus,
} = require('../controllers/dashboard.controller');

const DashboardRouter = express.Router();

DashboardRouter.get('/', returnDashboardStatus);

module.exports = DashboardRouter;
