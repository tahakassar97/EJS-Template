const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: String
    }
})

User.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

User.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};


let users = mongoose.model('User', User, 'users');
module.exports = users;