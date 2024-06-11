const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    displayName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    workplace: {
        type: String
    },
    rewardPoints: {
        type: Number,
        default: 0
    },
    paperSubmitted: {
        type: Number,
        default: 0
    },
    paperRejected: {
        type: Number,
        default: 0
    },
    userImageLink: {
        type: String,
        default: 'xyz'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
