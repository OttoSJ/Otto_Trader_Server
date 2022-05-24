const express = require("express");
const sellers = express.Router();
const User = require("./userModel");

const Sellers = [
  {
    username: "Cheap Auto",
    password: "admin1234",
    email: "cheapauto@gmail.com",
    firstname: "Bobby",
    lastname: "Smith",
    address: "4598 Happy Place",
    city: "Funtown",
    state: "MD",
    zip: "28764",
  },
  {
    username: "David Jackson",
    password: "admin1234",
    email: "davidjackson@gmail.com",
    firstname: "David",
    lastname: "Jackson",
    address: "498 Moutain Top View",
    city: "Yonder",
    state: "NC",
    zip: "34897",
  },
  {
    username: "Sam D",
    password: "admin1234",
    email: "samanthadancer@gmail.com",
    firstname: "Samantha",
    lastname: "Dancer",
    address: "3247 Campper Rd",
    city: "SomeWhere",
    state: "MI",
    zip: "34875",
  },
];

sellers.get("/data/seed", (req, res) => {
  User.insertMany(Sellers);
});

module.exports = sellers;
