const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

const Users = mongoose.model('user', UserSchema);

module.exports = Users;