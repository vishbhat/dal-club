// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define(
    'product_color',
    {
      product_color_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      product_color: {
        type: DataTypes.STRING,
      },

      product_image: {
        type: DataTypes.STRING(1000),
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

  return ProductColor;
};
