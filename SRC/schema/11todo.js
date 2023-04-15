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
    TodoCounting: {
        type: Number,
        required: false,
    },
    Score: {
        type: Number,
        required: false,
    },
})

module.exports = new mongoose.model('TO-DO-COUNT Weekly-5', todoSS);
