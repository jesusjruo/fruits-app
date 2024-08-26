const express = require('express');
const Fruit = require('../models/fruit');

const router = express.Router();

router.use((req, res, next) => {
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect("user/login");
    }
})

router.get('/', async (req, res) => {
    try {
        const fruits = await Fruit.find({ username: req.session.username });
        console.log(fruits);
        res.render('index.ejs', { fruits });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/new', async (req, res) => {
    res.render('new.ejs');
});

router.post('/', async (req, res) => {
    //convert the string to be boolean
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    //we have req.session available to us
    //for every fruit we will save a username property to it
    req.body.username = req.session.username;
    await Fruit.create(req.body);
    res.redirect('/fruit');
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruit.findById(id);
    res.render('edit.ejs', { fruit });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    await Fruit.findByIdAndUpdate(id, req.body);
    res.redirect('/fruit');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Fruit.findByIdAndDelete(id);
    res.redirect('/fruit');
});

module.exports = router;