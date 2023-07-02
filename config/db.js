const { Sequelize } = require("sequelize")
const {DB_NAME, DB_USER, DB_PWD} = process.env
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
    host: 'localhost',
    dialect: 'postgres'
})
const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
module.exports = { sq: sequelize, testDbConnection }
  


