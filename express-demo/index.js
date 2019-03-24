const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require('config');
const debug = require('debug')('app:startup')

const logger = require("./logger");
const authenticator = require("./authenticator");

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default optional

// REQUEST PROCESSING PIPELINE

// ENVIRONMENTS

// console.log(process)

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// CONFIGURATION
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server Name: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))


//TEMPLATING ENGINES


// Environments - development, staging, testing or production
if (app.get("env") === "development") {
  app.use(morgan("common")); // HTTP request logged in terminal
 debug("Morgan enabled...");
}

// DB WORD
// dbDebugger('connected to db');

app.use(logger);
app.use(authenticator);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.render('index', {title: 'My Express App', message: 'Hello There Now this is PUG'});
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// ROUTE PARAMETERS

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found!");
  res.send(course);
});

// QUERY-STRING PARAMETERS // ?sortBy=name

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course with given ID not found!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// REQUEST PROCESSING PIPELINE
// Logging , authentication, validation
