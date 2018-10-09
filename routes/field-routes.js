// routes/project-routes.js
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Field = require('../models/Field');

// GET route => to get all the projects
router.get('/fields', (req, res, next) => {
  Field.find().populate('Team')
    .then(allTheProjects => {
      res.json(allTheProjects);
    })
    .catch(err => {
      res.json(err);
    })
});


// POST route => to create a new project
router.post('/fields', (req, res, next)=>{
 
    Field.create({
      location: req.body.location,
      fieldName: req.body.fieldName,
      time: req.body.time,
      price: req.body.price,
      teamsPlaying: req.body.teamsPlaying,
      comments: req.body.comments,
      details: req.body.details,
      avatar: req.body.avatar

    })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })
  });





  // GET route => to get a specific project/detailed view
router.get('/fields/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // our projects have array of tasks' ids and 
    // we can use .populate() method to get the whole task objects
    //                                   ^
    //                                   |
    //                                   |
    Field.findById(req.params.id).populate('fields')
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })
  })





// PUT route => to update a specific project
router.put('/fields/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Field.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({message: `Project with ${req.params.id} is updated successfully.`});
      })
      .catch(err => {
        res.json(err);
      })
  })




  
  
  // DELETE route => to delete a specific project
  router.delete('/fields/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Field.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({message: `Project with ${req.params.id} is removed successfully.`});
      })
      .catch( err => {
        res.json(err);
      })
  })







module.exports = router;