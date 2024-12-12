const express = require("express");
const {
  createLesson,
  addVocabulary,
} = require("../controllers/lessonController");
const route = express.Router();

route.post("/add-lesson", createLesson);
route.patch("/add-voca", addVocabulary);
module.exports = route;
