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

//GET SPECIFIC USER AND IMPLEMENT JWT AUTHENTICATION SYSTEM
const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL USER AND SHOW DASHBOARD COMPONENT
const getAllUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.status(200).json({ users: getUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// USER PROMOTE
const userPromote = async (req, res) => {
  try {
    const { id, role } = req.body;
    console.log(id, role);
    const findUser = await userModel.findByIdAndUpdate(id, {
      $set: { userRole: role },
    });
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
module.exports = { userController, getUser, getAllUsers,userPromote };
