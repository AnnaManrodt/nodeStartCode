const express = require('express');
const router = require("./routes")
const sequelize = require('./config/connection');

const Customer = require("./models/Customer");
const routes = require("./routes")
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


/*

1. customer decides to create an account 
  - they provide a password
  -we encrpt the password
  -we store the encryted verson of hte password in the DB

2. Customer comes back and wants to log in 
  - they suplly an email and password
  - we check first if the email is valid bu acessing if we have records with this emial address
  - if we find a match we check the password on just that record 
        * when a password is store we hash it so its encrpted once info is hashed it cant be unhashed
*/