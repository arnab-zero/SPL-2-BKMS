const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
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
    userImageLink: {
        type: String,
        default: 'xyz'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
