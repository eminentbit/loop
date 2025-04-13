// require("dotenv").config();
// const { Sequelize } = require("sequelize");

// Using the DATABASE_URL from .env file
const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");
config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

module.exports = sequelize;
