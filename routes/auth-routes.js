const express    = require('express');
const authRoutes = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/User');


authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // const favoriteClub = req.body.favoriteClub;
    // const playerPosition = req.body.playerPosition;
    // const summary = req.body.summary;
    // const avatar = req.body.avatar;
    console.log("starting sign up process server side ------------------------  ", username);
    console.log("starting sign up process server side ------------------------  ", password);
    console.log("starting sign up process server side ------------------------  ", firstName);
    console.log("starting sign up process server side ------------------------  ", lastName);
    console.log("starting sign up process server side ------------------------  ", email);


    if (!username || !password) {
        console.log("checking if username and pw is not null <<<<<<<<<<<<<<<<<<")
      res.json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        console.log("checking password length greater than 7 >>>>>>>>>>>>>>>>>>")
        res.json({ message: 'Please make your password at least 7 characters long for security purposes.' });
        return;
    }  
    User.findOne({ username }, (err, foundUser) => {
        console.log('finding a user on db =-=-=-=-=-=-=-=-=-=-=-')

        if(err){
            console.log("bad username check, have to retry {{{{{{{{{{{{{{{{{{{ ")
            res.json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            console.log("the username is in use<<<< THIS IS AN ERRRRROROOOOORRRRORROROROOR >>>>>>>>")
            res.json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);


  
        const aNewUser = new User({
            username: username,
            password: hashPass,
            firstName: firstName,
            lastName: lastName,
            email: email,
            // favoriteClub: favoriteClub,
            // playerPosition: playerPosition,
            // summary: summary,
            // avatar: avatar
        });

  
        aNewUser.save(err => {
            console.log('savinGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG ', aNewUser);
            if (err) {
                console.log("shyte, this errored when saving the user &&&&&&&&&&&&&&&&&& ")
                res.json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {


                if (err) {
                    res.json({ message: 'Login after signup went bad.' });
                    return;
                }

                console.log('made it all the way !!!!!!!!!!!!!!!!!!!!!!!!!')
            
                // Send the user's information to the frontend
                // We can use also: res.json(req.user);
                res.json(aNewUser);
            });
        });
    });
});



authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});


authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});





module.exports = authRoutes;
