const mongoose = require('mongoose');
const Joi = require('joi');
const express = require("express");
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const app = express();

Joi.objectId = require('joi-objectid')(Joi);


// Middleware
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
.then(() => console.log('connnected to mongodb...'))
.catch(err => console.error('Error : ', err.message))


app.use(express.json());

// Routing
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}...`));
