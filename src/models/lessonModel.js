const { default: mongoose } = require("mongoose");

const lessonModel = new mongoose.Schema({
  lessonName: {
    type: String,
  },
  word: {
    type: String,
  },
  pronunciation: {
    type: String,
  },
  say: {
    type: String,
  },
  lessonNo: {
    type: String,
    default: null,
  },
  creator: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("lesson", lessonModel);
