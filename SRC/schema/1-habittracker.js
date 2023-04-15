const mongoose = require('mongoose')

const habitSchema = mongoose.Schema({
    GuildID: {
        type: String,
        required: true,
    },

    UserID: {
        type: String,
        required: true,
    },

    days: {
        type: Number,
        required: false,
    },

    streak: {
        type: Number,
        required: false,
    },

    task: {
        type: String,
        required: false,
    },

    mon: {
        type: String,
        required: false,
    },

    tue: {
        type: String,
        required: false,
    },

    wed: {
        type: String,
        required: false,
    },

    thu: {
        type: String,
        required: false,
    },

    fri: {
        type: String,
        required: false,
    },

    sat: {
        type: String,
        required: false,
    },

    sun: {
        type: String,
        required: false,
    },
    
    reminder: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('20-habitschema', habitSchema)