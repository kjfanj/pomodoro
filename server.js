const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const task = require('./routes/api/tasks');
const app = express();

// Body-parser Middleware
app.use(bodyParser.json())

// DB config
const dbURI = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => { console.log(`MongoDB Connected.`) })
  .catch(err => { console.log(err) })

// use routes
app.use('/api/tasks', task);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));