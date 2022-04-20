// @Authors: Rahul Kherajani
const {
  ProductModel,
  OrderHeaderModel,
  CareersModel,
  JobApplicationsModel,
} = require('../models');

exports.returnDashboardStatus = async (req, res) => {
  const status = [];

  const products = await ProductModel.count({
    where: { product_isactive: true },
  });

  status.push({
    title: 'Products',
    stats: products,
    message: 'Active Products',
  });

  const orders = await OrderHeaderModel.count({
    where: { order_status: 'Created' },
  });

  status.push({ title: 'Orders', stats: orders, message: 'Orders Received' });

  const jobs = await CareersModel.count({
    where: { status: 'open' },
  });

  status.push({ title: 'Jobs', stats: jobs, message: 'Jobs Open' });

  const applications = await JobApplicationsModel.count({});

  status.push({
    title: 'Application',
    stats: applications,
    message: 'Open Job Applications',
  });

  res.send({ success: true, status });
};
