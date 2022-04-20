// @Author: Anamika Ahmed
module.exports = (sequelize, DataTypes) => {
    const Users_Profile = sequelize.define("Users_Profile", {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: DataTypes.STRING(255),
      allowNull: false
      },
      user_email: {
        type: DataTypes.TEXT,
      allowNull: false,

      },

      user_password: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at"
    })
    return Users_Profile
  }