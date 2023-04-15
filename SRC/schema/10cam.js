const mongoose = require("mongoose");

const CAM = mongoose.Schema({
    GG: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    Chan: {
        type: String,
        required: true,
    },
    Enable: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    BReakTime: {
        type: String,
        required: true,
    },
    MessageId: {
        type: String,
        required: false,
    },
    Timer: {
        type: String,
        required: false,
    },
    INVC: {
        type: String,
        required: false,
    },
})

module.exports = new mongoose.model("Cam-sessions", CAM);