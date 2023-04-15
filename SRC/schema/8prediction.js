const mongo = require("mongoose");


const fgb = new mongo.Schema({
    UserID: {
        type: String,
        required: true,
    },
    Perdiction: {
        type: Number,
        required: true,
    }
});

module.exports = mongo.model("Prediction", fgb);