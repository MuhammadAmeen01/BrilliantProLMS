const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes for courses
app.get('/courses', (req, res) => {
    res.json(courses);
  });
  
  app.post('/courses', (req, res) => {
    const { name, description } = req.body;
  
    // Generate a new unique ID
    const id = courses.length + 1;
  
    // Add the new course to the list
    const newCourse = { id, name, description };
   
    courses.push(newCourse);
  
    res.json(newCourse);
  });
  
  app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    // Find the course with the specified ID
    const course = courses.find((c) => c.id == id);
  
    if (!course) {
      return res.sendStatus(404);
    }
  
    // Update the course's information
    course.name = name;
    course.description = description;
  
    res.json(course);
  });
  
  app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
  
    // Remove the course with the specified ID
    const index = courses.findIndex((c) => c.id == id);
  
    if (index === -1) {
      return res.sendStatus(404);
    }
  
    courses.splice(index, 1);
  
    res.sendStatus(204);
  });
  