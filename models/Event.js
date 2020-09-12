const mongoose = require('mongoose');

const event = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        default: 'No Desc'
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Event', event, 'events')