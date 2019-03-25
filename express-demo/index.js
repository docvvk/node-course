const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require('config');
const debug = require('debug')('app:startup')

const courses = require('./routes/courses');
const pug = require("./routes/home");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");

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
app.use('/api/courses', courses)
app.use('/', pug);

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


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// REQUEST PROCESSING PIPELINE
// Logging , authentication, validation
