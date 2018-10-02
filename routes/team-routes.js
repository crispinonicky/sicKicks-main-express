// routes/Team.js
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Team = require('../models/Team');

// GET route => to get all the teams
router.get('/teams', (req, res, next) => {
  Team.find().populate('User')
    .then(allTheTeams => {
      res.json(allTheTeams);
    })
    .catch(err => {
      res.json(err);
    })
});


// POST route => to create a new team
router.post('/teams', (req, res, next)=>{
 
    Team.create({
      players: req.body.players,
      Creator: req.body.Creator,
      avatar: req.body.avatar,
      teamName: req.body.teamName,
      needMembers: req.body.needMembers,
      wins: req.body.wins,
      losses: req.body.losses,
      draws: req.body.draws,
      league: req.body.league
    })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })
  });




  // GET route => to get a specific team/detailed view
router.get('/teams/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // our teams have array of tasks' ids and 
    // we can use .populate() method to get the whole task objects
    //                                   ^
    //                                   |
    //                                   |
    Team.findById(req.params.id).populate('tasks')
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })
  })





// PUT route => to update a specific team
router.put('/teams/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Team.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({message: `Team with ${req.params.id} is updated successfully.`});
      })
      .catch(err => {
        res.json(err);
      })
  })




  
  
  // DELETE route => to delete a specific team
  router.delete('/teams/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Team.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({message: `Team with ${req.params.id} is removed successfully.`});
      })
      .catch( err => {
        res.json(err);
      })
  })







module.exports = router;