const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const url = 'mongodb://127.0.0.1:27017/Web';
const dbName = 'Web';
var cors = require("cors");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const learnerSchema = new mongoose.Schema({
  CourseID:String,

  fname: String,
  lname: String,
  email: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  CourseID:String,
    name: String,
    desc: String,
    start: Date,
    end: Date,
    enrolled:Number,
  });

  const announceSchema = new mongoose.Schema({
    CourseID:String,
      Announcetext:String,
    });

    const questSchema = new mongoose.Schema({
      title: String,
      questions: [{
        text: String,
        options: [{
          text: String,
          value: String,
          checked: Boolean,
        }],
      }],
    });
    
    // Define a model for surveys
    const MCQs = mongoose.model('MCQs', questSchema);

const Learner = mongoose.model('Learner', learnerSchema);
const Course = mongoose.model('courses', courseSchema);
const Announce = mongoose.model('announce', announceSchema);
//##########################################################################################
app.post('/addLearner', function(req, res) {
  const learner = new Learner({
    CourseID: req.body.course,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });

  learner.save()
  .then(() => {
    console.log('Learner added to database');
    res.send('Learner added to database');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred while adding the learner to the database');
  });

});

// Create the database and learners collection if they don't already exist
mongoose.connection.once('open', function() {
  mongoose.connection.db.listCollections({name: 'learners'})
    .next(function(err, info) {
      if (!info) {
        mongoose.connection.db.createCollection('learners', function(err, collection) {
          if (err) throw err;
          console.log("Learners collection created!");
        });
      }
    });
});
//##########################################################################################
app.post('/addCourse', function(req, res) {
  const course = new Course({
    CourseID:req.body.CourseID,
    name: req.body.name,
    desc: req.body.desc,
    start: req.body.start,
    end: req.body.end,
    enrolled:0,
  });

  course.save()
  .then(() => {
    console.log('Course added to database');
    res.send('Course added to database');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred while adding the course to the database');
  });

});

// Create the database and learners collection if they don't already exist
mongoose.connection.once('open', function() {
  mongoose.connection.db.listCollections({name: 'courses'})
    .next(function(err, info) {
      if (!info) {
        mongoose.connection.db.createCollection('courses', function(err, collection) {
          if (err) throw err;
          console.log("courses collection created!");
        });
      }
    });
});
  

// Create the database and learners collection if they don't already exist
mongoose.connection.once('open', function() {
  mongoose.connection.db.listCollections({name: 'courses'})
    .next(function(err, info) {
      if (!info) {
        mongoose.connection.db.createCollection('courses', function(err, collection) {
          if (err) throw err;
          console.log("courses collection created!");
        });
      }
    });
});


//##########################################################################################

app.get('/GetCourses', function(req, res) {
    Course.find()
      .then(function(courses) {
        res.send(courses);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('An error occurred while retrieving courses from the database');
      });
  });


  app.get('/GetLearnerByName', function(req, res) {
    const n = req.query.name;
    console.log(n)
    Learner.find({CourseID:n})
      .then(function(learner) {
        res.send(learner);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('An error occurred while retrieving courses from the database');
      });
  });
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
app.post('/addAnnouncement', function(req, res) {
  const n = req.query.name;
  const announce = new Announce({
    CourseID:n,
    Announcetext:req.body.announce
  });

  announce.save()
  .then(() => {
    console.log('Announce added to database');
    res.send('Announce added to database');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred while adding the Announce to the database');
  });

});

// Create the database and learners collection if they don't already exist
mongoose.connection.once('open', function() {
  mongoose.connection.db.listCollections({name: 'announce'})
    .next(function(err, info) {
      if (!info) {
        mongoose.connection.db.createCollection('announce', function(err, collection) {
          if (err) throw err;
          console.log("announce collection created!");
        });
      }
    });
});


//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

app.get('/GetAnnounce', function(req, res) {
  const n = req.query.name;
  console.log(n)
  Announce.find({CourseID:n})
    .then(function(announce) {
      res.send(announce);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('An error occurred while retrieving courses from the database');
    });
});
//--------------------------------------------------------

app.post('/MCQ', async (req, res) => {
  try {
    // Parse the survey data from the request body
    const { title, questions } = req.body;

    // Create a new survey document
    const survey = new MCQs({ title, questions });

    // Save the survey to the database
    await survey.save();

    // Send a success response
    res.status(201).json({ message: 'Survey created successfully' });
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message });
  }
});

//---------------------------------------------------------
app.get('/getMCQ', function(req, res) {
  //const n = req.query.name;
  //console.log(n)
  MCQs.find()
    .then(function(MCQ) {
      res.send(MCQ);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('An error occurred while retrieving courses from the database');
    });
});
app.listen(8000, function() {
  console.log(`Server running on port 8000`);
});
