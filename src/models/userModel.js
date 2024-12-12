const { mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: "normal",
  },
});

module.exports = mongoose.model("user", userModel);
