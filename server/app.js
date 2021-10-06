// Server for Interactive Planogram entry point

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const itemRoutes = require('./routes/rt_item')
const planRoutes = require('./routes/rt_plan')

const dbURL = 'mongodb://127.0.0.1:27017/interactiveplanogram';
const PORT = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));

app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/plan', planRoutes);
app.use('/item', itemRoutes);

mongoose.connect(dbURL)
.then(res =>
  {
    console.log('Connection to DB success...');
    app.listen(PORT, () =>
    {
      console.log('Server Started...');
      console.log('Listening on ' + PORT);
    })
  })
  .catch((err =>
    {
      console.log("ERROR: " + err);
    }))
