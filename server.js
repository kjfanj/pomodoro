const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// routes
const task = require('./routes/api/tasks');
const auth = require('./routes/auth/googleAuth');

const app = express();

// for env var
require('dotenv').config()

app.use(bodyParser.json())


// DB config
const dbURI = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => { console.log(`MongoDB Connected.`) })
  .catch(err => { console.log(err) })

// use routes
// for task api
app.use('/api/tasks', task);
// for google auth
app.use('/auth', auth)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));