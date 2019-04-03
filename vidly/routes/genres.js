const Joi = require("joi");
// import { Schema } from 'mongoose';
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.use(express.json());

module.exports = function(req, res, next) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    res.status(404).send('Invalid ID');
}

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["horrer", "action", "romance", "thriller", "comedy"]
  },
  tags: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 100,
    max: 1000000,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Genre = mongoose.model("Genre", genreSchema);

// async function createGenre() {
// }

// createGenre();

// async function getGenres() {
//   const genres = await Genre
//     .find({ isPublished: true })
//     // .then(r => res.json(r))
//     console.log(genres);
// }
// getGenres()

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: "Testing in Postman 12345678",
    category: "romance",
    isPublished: true,
    tags: ["movies", "thriller", "romance"],
    price: 54321.9999999999
  });
  try {
    const result = await genre.save();
    console.log(result);
  } catch (e) {
    for (field in e.errors)
      console.log(`${e.errors[field].message} ${e.errors[field].kind}`);
  }
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: "PutIsMyNameeeeeeeeee",
      price: 9999
    },
    { new: true }
  );
  if (!genre) return res.status(404).send("genre not found!");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("genre not found!");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) res.status(404).send("Genre not found...");
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    category: Joi.string()
      .required(),
    price: Joi.number(),
    isPublished: Joi.boolean(),
    tags: Joi.array()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
