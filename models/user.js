const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("user", {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
 User.sync({ alter: true }).then(() => {
    console.log("User Model synced");
  });


  module.exports = User

  
