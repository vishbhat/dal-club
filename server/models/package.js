// @Author: Anamika Ahmed
module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define(
      'subscription_package',
      {
        package_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
  
        price: {
          type: DataTypes.FLOAT,
        },
  
        type: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "subscription_package",
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
      return Package;
  };
  