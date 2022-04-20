// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define(
    'product_size',
    {
      product_size_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_size: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return ProductSize;
};
