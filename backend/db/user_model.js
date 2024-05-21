const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true,unique: true },
    blogs : {type : Array},
    followers : {type : Array},
    followings : {type : Array}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
