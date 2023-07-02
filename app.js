require('dotenv').config()
const express = require('express')
const books = require("./routes/books");
const users = require("./routes/users");
var cors = require('cors')

const port = process.env.PORT
const app = express()
app.use(cors())

const bodyParser = require('body-parser')
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(express.json())
app.use("/users", users);
app.use("/books", books);


app.listen(port, () => {
  console.log(`Books app listening on port ${port}`)
})