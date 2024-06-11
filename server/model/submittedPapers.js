const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema({
    
    topic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    abstract: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
