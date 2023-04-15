const mongoose = require('mongoose')

const personalschema = mongoose.Schema({
    GuildID: {
        type: String,
        required: true,
    },

    UserID: {
        type: String,
        required: false,
    },

    Location: {
        type: String,
        required: false,
    },

    Time: {
        type: String,
        required: false,
    },

    Country: {
        type: String,
        required: false,
    },

    MessageCount: {
        type: Number,
        required: false,
    },

})

module.exports = mongoose.model('G-personalschema', personalschema)