const mongoose = require('mongoose');

const event = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', event, 'events')