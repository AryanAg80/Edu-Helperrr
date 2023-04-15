const mongo = require("mongoose");

const F = new mongo.Schema({
    user: {
        type: String,
        required: true,
    },
    EduCoins: {
        type: Number,
        required: false,
    }
});

module.exports = mongo.model("coins", F);