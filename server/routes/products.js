// @Author: Rahul Kherajani
const express = require('express');
const {
  findAllProducts,
  findAProduct,
  findAllActiveProducts,
  createProduct,
  updateProduct,
} = require('../controllers/product.controller.js');

const ProductRouter = express.Router();

ProductRouter.get('/', findAllActiveProducts);
ProductRouter.get('/all', findAllProducts);
ProductRouter.get('/:id', findAProduct);
ProductRouter.post('/new', createProduct);
ProductRouter.put('/update/:id', updateProduct);
module.exports = ProductRouter;
