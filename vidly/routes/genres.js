const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.use(express.json());

const genres = [
  { id: 1, name: "genre1" },
  { id: 2, name: "genre2" },
  { id: 3, name: "genre3" }
];

router.get("/", (req, res) => {
  res.send("Vidly movie app");
});

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  // code to find if id is available
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("genre not found!");

  // code to find if req.body is joi validated
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("genre not found!");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;

