//Imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fruitRouter = require('./controllers/fruit');
const userRouter = require('./controllers/user');
const mongoStore = require('connect-mongo');
const session = require('express-session');
const Fruit = require('./models/fruit');

const app = express();

//Middlewares
app.use(session({
    secret: process.env.SECRET,
    store: mongoStore.create({mongoUrl: process.env.DBURL}),
    saveUninitialized: true,
    resave: false
}));

app.get('/', async (req, res) => {
    const allFruits = await Fruit.find({});
    res.render("landing.ejs", { allFruits });
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/fruit' , fruitRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening to port:', PORT)
});