const mongoose = require('mongoose')

const annonCountSchema = mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },

  messageCount: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('anon-counts', annonCountSchema)