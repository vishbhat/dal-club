// @Author: Vishwanath Suresh
module.exports = (sequelize, DataTypes) => {
    const Careers = sequelize.define("jobs", {
      job_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      job_type: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      salary: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      vacancies: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(45),
        default: "open"
      }
    }, {
      tableName: "jobs",
      createdAt: "created_at",
      updatedAt: "updated_at"
    })
    return Careers
  }