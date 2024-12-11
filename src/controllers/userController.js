const dbConnect = require("../../config/dbConnect");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;
    let hashPass = "";
    const hash = await bcrypt.hash(password, 10);

    console.log(name, email, password, photo, "data ashlo clint theke ");
    const newUser = new userModel({ name, email, password: hash, photo });
    const saveUser = await newUser.save();
    res.status(200).json({ users: saveUser });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Faild to create user" });
  }
};

//GET USER AND IMPLEMENT JWT AUTHENTICATION SYSTEM
const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "25 no line");
    const user = await userModel.findOne({ email });
    // CHECK USER
    if (!email) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { userController, getUser };
