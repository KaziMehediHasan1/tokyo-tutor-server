const express = require("express");
const { userController, getUser } = require("../controllers/userController");
const route = express.Router();

route.post("/user", userController);
route.get("/users", getUser);

module.exports = route;
