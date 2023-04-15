const mongoose = require('mongoose')
require('dotenv').config()
const mongoPath = (process.env.mongo);

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) 
    mongoose.set('strictQuery', false);

    return mongoose
}
