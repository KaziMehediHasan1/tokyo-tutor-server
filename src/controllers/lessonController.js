const lessonModel = require("../models/lessonModel");

// CREATET NEW LESSON
const createLesson = async (req, res) => {
  try {
    const { lessonName, lessonNo } = req.body;
    console.log(lessonName, lessonNo);

    const newLesson = new lessonModel({ lessonName, lessonNo });
    const saveLesson = await newLesson.save();
    res.status(200).json({ lesson: saveLesson });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Lesson not creating" });
  }
};


// UPDATE LESSON AND ADD NEW VOCABULARY
const addVocabulary = async (req, res) => {
  try {
    const { word, pronunciation, Description, lessonNo } = req.body;
    console.log(word, pronunciation, Description, lessonNo);
    const update = {
      $set: {
        word: word,
        pronunciation: pronunciation,
        Description: Description,
        lessonNo: lessonNo,
      },
    };
    const id = "675a55a6ef093605efab0adc";
    const newVocabulary = await lessonModel.findByIdAndUpdate(
      id,
      update,
      {new:true}
    );
    res.status(200).json(newVocabulary);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to add vocabulary" });
  }
};

// DELETE VOCABULARY


module.exports = { createLesson, addVocabulary };
