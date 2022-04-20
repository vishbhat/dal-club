// @Author: Kishan Thakkar
module.exports = (sequelize, DataTypes) => {
  const PaymentModel = sequelize.define("events", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    paymentIntent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "payment_intent"
    },
    module: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "module"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "module_id"
    }
  }, {
    tableName: "payment_details",
    createdAt: "created_at",
    updatedAt: "updated_at"
  })
  return PaymentModel;
}