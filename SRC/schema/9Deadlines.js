const mongo = require("mongoose");

const Deadline = new mongo.Schema({
    GG: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: false,
    },
    ChannelID: {
        type: String,
        required: false,
    },
    RoleID: {
        type: String,
        required: false,
    },
    Combination: {
        type: String,
        required: false,
    },
    Deadline: {
        type: String,
        required: false,
    },
    DID: {
        type: String,
        required: false,
    }
});

module.exports = mongo.model("Deadline-module", Deadline);