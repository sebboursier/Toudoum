const mongoose = require('mongoose')

module.exports.db = mongoose.connect('mongodb://localhost/toudoum')

module.exports.todoSchema = new mongoose.Schema({
    userId : Number,
      by : Number,
      team : String,
      to : String,
    subject : String,
    createdAt : { type : Date, default : Date.now },
    completedAt : Date
})
