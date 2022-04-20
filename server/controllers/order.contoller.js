// @Author: Rahul Kherajani
const {
  OrderHeaderModel,
  OrderLineModel,
  ProductModel,
  PaymentDetailsModel,
} = require('../models');
const Sequelize = require('sequelize');
const DBConnection = require('../config/dbConfig');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Function to handle Order Creation
exports.createOrder = async (req, res) => {
  const order_header = {
    order_user_id: req.body.order_user_id,
    order_total: req.body.order_total,
    order_payment_id: req.body.order_payment_id,
    order_status: req.body.order_status,
    order_line: req.body.order_line,
  };

  //Initiate a Transcation
  let t = await DBConnection.transaction();
  try {
    //Create an Order Header
    let order = await OrderHeaderModel.create(
      order_header,
      {
        include: [{ model: OrderLineModel, as: 'order_line' }],
      },
      { transaction: t }
    );

    //Create All Order Lines
    const promises = order_header.order_line.map((line) => {
      return ProductModel.update(
        {
          product_quantity: Sequelize.literal(
            `product_quantity - ${line.order_product_quantity}`
          ),
        },
        { where: { product_id: line.order_product_id } },
        { transaction: t }
      );
    });

    await Promise.all(promises);

    //Create a Payment Detail
    await PaymentDetailsModel.create(
      {
        paymentIntent: req.body.order_payment_intent_id,
        module: 'order',
        userId: req.body.order_user_id,
        moduleId: order.order_header_id,
      },
      { transaction: t }
    );

    //Commit a Transaction
    await t.commit();
    res.send({ success: true, message: 'Order Booked Successfully.' });
  } catch (error) {
    console.log(error);
    //Rollback a Transaction
    t.rollback();

    //Initiate a Refund
    await stripe.refunds.create({
      amount: req.body.order_total,
      payment_intent: req.body.order_payment_intent_id,
    });

    res.status(500).send({ success: false, message: 'Server error occured.' });
    return;
  }
};

//Function to return all Order Details for a user
exports.findUserOrders = (req, res) => {
  OrderHeaderModel.findAll({
    where: { order_user_id: req.query.order_user_id },
    include: [
      {
        model: OrderLineModel,
        as: 'order_line',
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving products.',
      });
    });
};

// Function ro return all order details of all users
exports.findAllOrders = (req, res) => {
  OrderHeaderModel.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving products.',
      });
    });
};

// Function ro return all order details for an order
exports.findOrderDetails = (req, res) => {
  OrderHeaderModel.findOne({ where: { order_header_id: req.params.orderId },
    include: [
      {
        model: OrderLineModel,
        as: 'order_line',
      },
    ], })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving products.',
      });
    });
};

// Function to update the status of an order
exports.updateOrders = (req, res) => {
  OrderHeaderModel.update({ order_status: req.body.order_status }, { where: { order_header_id: req.body.order_header_id } })
    .then((data) => {
      res.send({ success: true, message: 'Order Updated' });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || 'Internal server error while upadting the order.'
      });
    });
};
