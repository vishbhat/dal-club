// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define(
    'order_line',
    {
      order_line_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_header_id: {
        type: DataTypes.INTEGER,
      },

      order_product_id: {
        type: DataTypes.INTEGER,
      },

      order_product_name: {
        type: DataTypes.STRING,
      },

      order_product_quantity: {
        type: DataTypes.INTEGER,
      },

      order_product_size: {
        type: DataTypes.STRING,
      },

      order_product_color: {
        type: DataTypes.STRING,
      },

      order_product_image: {
        type: DataTypes.STRING(1000),
      },

      order_product_price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  // OrderHeader.hasMany(OrderLine, { foreignKey: 'order_header_id' });
  return OrderLine;
};
