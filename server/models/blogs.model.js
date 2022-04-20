// @Author: Kunj Vijaykumar Patel
module.exports = (sequelize, DataTypes) => {
    const Blogs = sequelize.define("blogs", {
      blog_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
      },
      title: {
        type: DataTypes.STRING(255),
      allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
      allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "is_visible"
      }
    }, {
      tableName: "blogs",
      createdAt: "created_at",
      updatedAt: "updated_at"
    })
    return Blogs
  }