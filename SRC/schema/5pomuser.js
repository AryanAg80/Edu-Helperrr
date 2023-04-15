const mongoose = require('mongoose')

const pomuser = mongoose.Schema({
    GuildID: {
        type: String,
        required: true,
    },

    UserID: {
        type: String,
        required: false,
    },

    PomSession: {
        type: String,
        required: false,
    },

    PomCurrent: {
        type: String,
        required: false,
    },

    PomGoal:{
        type: String,
        required: false,
    },

    PomPoints:{
        type: Number,
        required: false,
    },
})

module.exports = mongoose.model('M-pomuserschema', pomuser)