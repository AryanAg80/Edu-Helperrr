const mongoose = require('mongoose')

const pomschema = mongoose.Schema({
    GuildID: {
        type: String,
        required: true,
    },

    UserID: {
        type: String,
        required: false,
    },

    PomTime: {
        type: Number,
        required: false,
    },

    RemainingTime: {
        type: Number,
        required: false,
    },

    JoinedMember: {
        type: String,
        required: false,
    },

    VCSet: {
        type: String,
        required: false,
    },

    StartTime: {
        type: Number,
        required: false,
    },

    MessageID: {
        type: String,
        required: false,
    },

    ReCur: {
        type: Number,
        required: false,
    },

    BreakTime: {
        type: Number,
        required: false,
    },

    RoleID: {
        type: String,
        required: false,
    },

    Status: {
        type: String,
        required: false,
    },

    SessionLeft: {
        type: Number,
        required: false,
    },

    VCID: {
        type: String,
        required: false,
    },

    CHID: {
        type: String,
        required: false,
    },

    Open: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('L-pomschema', pomschema)