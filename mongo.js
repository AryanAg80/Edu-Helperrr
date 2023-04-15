// require("doe")

const mongo = require("mongoose");


async function Mongo() {
   await mongo.connect(process.env.mongo, {
    keepAlive: true,
   })
}

module.exports = {
    Mongo
}