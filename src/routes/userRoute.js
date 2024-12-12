const express = require("express");
const {
  userController,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const route = express.Router();

route.post("/user", userController);
route.post("/users", getUser);
route.get("/users", getAllUsers);
module.exports = route;
