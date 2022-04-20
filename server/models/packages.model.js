// @Author: Kunj Vijaykumar Patel
module.exports = (sequelize, DataTypes) => {
    const Packages = sequelize.define("subscriptionPackage", {
      package_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
      allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(45),
      allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "is_active"
      }
    }, {
      tableName: "subscription_package",
      createdAt: "created_at",
      updatedAt: "updated_at"
    })
    return Packages
  }