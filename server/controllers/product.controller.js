// @Author: Rahul Kherajani
const {
  ProductModel,
  ProductSizeModel,
  ProductColorModel,
} = require('../models');
const multiparty = require('multiparty');
const { s3 } = require('../config/awsConfig');
const fs = require('fs');
const DBConnection = require('../config/dbConfig');
const { Op } = require('sequelize');

//Function to return all Active Product Details
exports.findAllActiveProducts = (req, res) => {
  ProductModel.findAll({
    where: { product_isactive: true, product_quantity: { [Op.gt]: 0 } },
    include: [
      { model: ProductColorModel, as: 'product_color' },
      { model: ProductSizeModel, as: 'product_size' },
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

//Function to return Product Details of a specific product
exports.findAProduct = (req, res) => {
  const product_id = req.params.id;
  ProductModel.findByPk(product_id, {
    include: [
      { model: ProductColorModel, as: 'product_color' },
      { model: ProductSizeModel, as: 'product_size' },
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

//Function to return all Product Details
exports.findAllProducts = (req, res) => {
  ProductModel.findAll({
    include: [
      { model: ProductColorModel, as: 'product_color' },
      { model: ProductSizeModel, as: 'product_size' },
    ],
  })
    .then((products) => {
      res.send({ success: true, products });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || 'Some error occurred while retrieving products.',
      });
    });
};

//Function to create a new Product
exports.createProduct = (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, formData) => {
    const product_size = [];
    JSON.parse(fields.sizes[0]).forEach((element) => {
      product_size.push({ product_size: element.size });
    });

    const product_color = [];
    const promises = JSON.parse(fields.colorImages[0]).map((element, index) => {
      const fileContent = fs.readFileSync(formData.images[index].path);
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `store/${formData.images[index].originalFilename}`,
        Body: fileContent,
        ContentType: formData.images[index].mimetype,
      };
      // Uploading to AWS S3 bucket
      return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
          if (err) {
            throw err;
          }
          product_color.push({
            product_color: element.color,
            product_image: data.Location,
          });

          resolve();
        });
      });
    });

    await Promise.all(promises);

    const product = {
      product_name: fields.name[0],
      product_description: fields.description[0],
      product_category: fields.category[0],
      product_price: parseFloat(fields.price[0]),
      product_quantity: parseInt(fields.quantity[0]),
      product_isactive: parseInt(fields.status[0]),
      product_size: product_size,
      product_color: product_color,
    };

    await ProductModel.create(product, {
      include: [
        { model: ProductColorModel, as: 'product_color' },
        { model: ProductSizeModel, as: 'product_size' },
      ],
    })
      .then((products) => {
        res.send({ sucess: true, products });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message:
            err.message || 'Some error occurred while retrieving products.',
        });
      });
  });
};

//Function to update a Product
exports.updateProduct = async (req, res) => {
  const product_id = req.params.id;

  try {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, formData) => {
      JSON.parse(fields.sizes[0]).forEach(async (element) => {
        if (element.id !== '') {
          await ProductSizeModel.destroy({
            where: { product_id: product_id, product_size_id: element.id },
          });
        } else {
          await ProductSizeModel.create({
            product_size: element.size,
            product_id: product_id,
          });
        }
      });

      let index = 0;
      JSON.parse(fields.colorImages[0]).forEach(async (element) => {
        if (element.id !== '') {
          await ProductColorModel.destroy({
            where: { product_id: product_id, product_color_id: element.id },
          });
        } else {
          const fileContent = fs.readFileSync(formData.images[index].path);
          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `store/${formData.images[index].originalFilename}`,
            Body: fileContent,
            ContentType: formData.images[index].mimetype,
          };

          await s3.upload(params, async function (err, data) {
            if (err) {
              throw err;
            }
            await ProductColorModel.create({
              product_color: element.color,
              product_image: data.Location,
              product_id: product_id,
            });
          });

          index += 1;
        }
      });

      await ProductModel.update(
        {
          product_name: fields.name[0],
          product_description: fields.description[0],
          product_category: fields.category[0],
          product_price: parseFloat(fields.price[0]),
          product_quantity: parseInt(fields.quantity[0]),
          product_isactive: fields.status[0] === 'true' ? 1 : 0,
        },
        { where: { product_id: product_id } }
      );

      res.send({ sucess: true, message: 'Product Updated' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Server error occured.' });
    return;
  }
};
