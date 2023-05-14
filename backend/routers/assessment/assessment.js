const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes for assessments
app.get('/assessments', (req, res) => {
    res.json(assessments);
  });
  
  app.post('/assessments', (req, res) => {
    const { courseId, name } = req.body;
  
    // Generate a new unique ID
    const id = assessments.length + 1;
  
    // Add the new assessment to the list
    const newAssessment = { id, courseId, name };
    assessments.push(newAssessment);
  
    res.json(newAssessment);
  });
  
  app.put('/assessments/:id', (req, res) => {
    const { id } = req.params;
    const { courseId, name } = req.body;
  
    // Find the assessment with the specified ID
    const assessment = assessments.find((a) => a.id == id);
  
    if (!assessment) {
      return res.sendStatus(404);
    }
  
    // Update the assessment's information
    assessment.courseId = courseId;
    assessment.name = name;
  
    res.json(assessment);
  });
  
  app.delete('/assessments/:id', (req, res) => {
    const { id } = req.params;
  
    // Remove the assessment with the specified ID
    const index = assessments.findIndex((a) => a.id == id);
  
    if (index === -1) {
      return res.sendStatus(404);
  }
  
  assessments.splice(index, 1);
  
  res.sendStatus(204);
  });
  