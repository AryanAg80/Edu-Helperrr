const mongo = require("mongoose");

const Time = new mongo.Schema({
    GG: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    Timers: {
        type: String,
        required: true,
    },
    Text: {
        type: String,
        required: true,
    },
    TimeStamp: {
        type: String,
        required: true,
    },
    Channel: {
        type: String,
        required: true,
    },
});

module.exports = mongo.model('Timers', Time);