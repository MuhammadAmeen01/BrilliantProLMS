const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes for materials
app.get('/materials', (req, res) => {
    res.json(materials);
  });
  
  app.post('/materials', (req, res) => {
    const { courseId, name, url } = req.body;
  
    // Generate a new unique ID
    const id = materials.length + 1;
  
    // Add the new material to the list
    const newMaterial = { id, courseId, name, url };
    materials.push(newMaterial);
  
    res.json(newMaterial);
  });
  
  app.put('/materials/:id', (req, res) => {
    const { id } = req.params;
    const { courseId, name, url } = req.body;
  
    // Find the material with the specified ID
    const material = materials.find((m) => m.id == id);
  
    if (!material) {
      return res.sendStatus(404);
    }
  
    // Update the material's information
    material.courseId = courseId;
    material.name = name;
    material.url = url;
  
    res.json(material);
  });
  
  app.delete('/materials/:id', (req, res) => {
    const { id } = req.params;
  
    // Remove the material with the specified ID
    const index = materials.findIndex((m) => m.id == id);
  
    if (index === -1) {
      return res.sendStatus(404);
    }
  
    materials.splice(index, 1);
  
    res.sendStatus(204);
  });