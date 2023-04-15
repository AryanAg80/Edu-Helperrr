const mongoose = require("mongoose")

const todoSS = mongoose.Schema({
    GG: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    TODO: {
        type: String,
        required: false,
    },
    TotalTodo: {
        type: String,
        required: false,
    },
    TodoCount: {
        type: Number,
        required: false,
    },
    Done: {
        type: String,
        required: false,
    },
    Remind: {
        type: String,
        required: false,
    },
    Time: {
        type: String,
        required: false,
    },
    RemindChannel: {
        type: String,
        required: false,
    },
    RemindCount: {
        type: String,
        required: false,
    },
})

module.exports = new mongoose.model('TO-DOSVvv-5', todoSS);