const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Book = sq.define("book", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    author: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    
    genre: {
      type: DataTypes.ENUM,
      values: ['sci-fi', 'horror', 'history', 'business', 'mystery', 'philosophy', 'fantasy', 'biography', 'crime', "technology"]
    },
  
    publication_date: {
      type: DataTypes.DATE,
    }
  });
  
 Book.sync({ alter: true }).then(() => {
    console.log("Book Model synced");
  });


  module.exports = Book

  
