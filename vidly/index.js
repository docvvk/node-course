const mongoose = require('mongoose');

const express = require("express");
const genres = require('./routes/genres');
const app = express();

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
.then(() => console.log('connnected to mongodb...'))
.catch(err => console.error('Error : ', err.message))


app.use(express.json());

app.use('/api/genres', genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}...`));
