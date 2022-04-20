// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const OrderHeader = sequelize.define(
    'order_header',
    {
      order_header_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_user_id: {
        type: DataTypes.INTEGER,
      },

      order_total: {
        type: DataTypes.DOUBLE,
      },

      order_status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return OrderHeader;
};
