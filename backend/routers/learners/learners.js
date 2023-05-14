const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/learners', (req, res) => {
    res.json(learners);
  });
  
  app.post('/learners', (req, res) => {
    const { name, email } = req.body;
  
    // Generate a new unique ID
    const id = learners.length + 1;
  
    // Add the new learner to the list
    const newLearner = { id, name, email };
    learners.push(newLearner);
  
    res.json(newLearner);
  });
  
  app.put('/learners/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    // Find the learner with the specified ID
    const learner = learners.find((l) => l.id == id);
  
    if (!learner) {
      return res.sendStatus(404);
    }
  
    // Update the learner's information
    learner.name = name;
    learner.email = email;
  
    res.json(learner);
  });
  
  app.delete('/learners/:id', (req, res) => {
    const { id } = req.params;
  
    // Remove the learner with the specified ID
    const index = learners.findIndex((l) => l.id == id);
  
    if (index === -1) {
      return res.sendStatus(404);
    }
  
    learners.splice(index, 1);
  
    res.sendStatus(204);
  });
  
  
  