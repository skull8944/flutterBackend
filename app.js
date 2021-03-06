const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const covidRoutes = require('./routes/covidRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const runRoutes = require('./routes/runRoutes');
const friendRoutes = require('./routes/friendRoutes');
const schedule = require('node-schedule');
const covidController = require('./controllers/covidController');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use("/headshots", express.static("headshots"));
app.use("/blogPhotos", express.static("blogPhotos"));

function runSchedule () {
  schedule.scheduleJob('0 14 14 * * *', function () {
    covidController.getCovidInfo();
  });
}

mongoose.connect('mongodb://localhost:27017/flutter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((result) =>{ 
    app.listen(7414);
  })
  .catch((err) => console.log(err));

runSchedule();

// routes
app.use(authRoutes);
app.use(blogRoutes);
app.use(covidRoutes);
app.use(userProfileRoutes);
app.use(friendRoutes);
app.use(runRoutes)