//import the mongoose VARIABLE which holds the configuration on the file called connection.js
const mongoose = require('./connection');

//created our SCHEMA. 
const FruitSchema = new mongoose.Schema({
    name: String,
    readyToEat: Boolean,
    color: String,
    username: String,
});

//this variable holds all the configurations and schema and is the thing that 'talks' to the db and express app
const Fruit = mongoose.model('fruit', FruitSchema);

// export this Dog for it to be used 
module.exports = Fruit;