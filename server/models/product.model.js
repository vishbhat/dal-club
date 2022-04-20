// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
      },

      product_description: {
        type: DataTypes.STRING(1000),
      },

      product_category: {
        type: DataTypes.STRING,
      },

      product_price: {
        type: DataTypes.FLOAT,
      },

      product_quantity: {
        type: DataTypes.INTEGER,
      },
      product_isactive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Product;
};
