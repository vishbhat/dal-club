// @Author: Kishan Thakkar
const { Sequelize } = require("sequelize");
const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const DBConnection = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 3306,
  dialect: "mysql",
});

module.exports = DBConnection;
