const Note = require("../models/noteModel");
const User = require("../models/userModel");

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.status(200).json(notes);
};

const addNotes = async (req, res, next) => {
  console.log(req.body, req.user);
  try {
    const note = await Note.create({
      heading: req.body.heading,
      body: req.body.body,
      user: req.user._id,
    });
    res.json(note);
  } catch (ex) {
    console.log(ex);
    // next(ex)
  }
};

const updateNotes = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400).Error({ message: "note not found" });
  }

  //check for user

  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  //check relationship between logged in user and goal user id
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not recorgnized");
  }

  const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updateNote);
};

const deleteNotes = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("user not recorgnized");
  }

  //check for user

  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  //check relationship between logged in user and goal user id
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not recorgnized");
  }

  await note.remove();

  res.json({ id: req.params.id });
};

module.exports = {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes,
};
