const mongo = require("mongoose");

const use = new mongo.Schema({
    GG: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: false,
    },
});

module.exports = mongo.model("1Adding", use);