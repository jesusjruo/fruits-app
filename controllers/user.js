const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});


//saving the data from the signup page

router.post('/signup' , async (req , res) => {
    try {
        // console.log(req.body);

        // encrypt my password.
        // await bcrypt(genSalt(10)): generates a 'salt' (cost factor) for password hashing process.
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        
        // Create the user in the DB
        await User.create(req.body);

        res.redirect('/user/login');

    } catch(err) {
        res.send(400).json(err);
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login", async (req, res) => {
    try {
        //find a user from the user table
        const user = await User.findOne({username: req.body.username});
        
        if(!user){
            res.send('User doesnt exist');
        } else {
            const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);

            if(passwordsMatch) {
                req.session.username = req.body.username;
                req.session.loggedIn = true;
                res.redirect('/fruit');
            } else {
                res.send('Wrong password');
            }
        }

    }catch(err) {
        res.send(400).json(err); 
    }
});

router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/user/login")
    })
})

module.exports = router;