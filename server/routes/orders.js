// @Author: Rahul Kherajani
const express = require('express');
const {
  findUserOrders,
  createOrder,
  findAllOrders,
  updateOrders,
  findOrderDetails
} = require('../controllers/order.contoller.js');

const OrderRouter = express.Router();

OrderRouter.get('/', findUserOrders);
OrderRouter.post('/new', createOrder);
OrderRouter.get('/all', findAllOrders);
OrderRouter.put('/update', updateOrders);
OrderRouter.get('/:orderId', findOrderDetails);

module.exports = OrderRouter;
