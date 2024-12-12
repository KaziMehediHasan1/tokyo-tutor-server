const express = require("express");
const {
  userController,
  getUser,
  getAllUsers,
  userPromote,
} = require("../controllers/userController");
const route = express.Router();

route.post("/user", userController);
route.post("/users", getUser);
route.get("/users", getAllUsers);
route.patch("/promote", userPromote);
module.exports = route;
