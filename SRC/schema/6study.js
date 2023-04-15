const mongo = require("mongoose");

const VV = new mongo.Schema({
    UserID: {
        type: String,
        required: true,
    },
    alltime: {
        type: Number,
        required: false,
    },
    daily: {
        type: Number,
        required: false,
    },
    monthly: {
        type: Number,
        required: false,
    },
    weekly: {
        type: Number,
        required: false,
    },
    day1: {
        type: Number,
        required: false,
    },
    day2: {
        type: Number,
        required: false,
    },
    day3: {
        type: Number,
        required: false,
    },
    day4: {
        type: Number,
        required: false,
    },
    day5: {
        type: Number,
        required: false,
    },
    day6: {
        type: Number,
        required: false,
    },
    day7: {
        type: Number,
        required: false,
    }

});

module.exports = mongo.model("study-streak", VV);