const mongoose = require('./myMongoDB.js')

module.exports.list = (id, callback) => {
  var TodoModel = mongoose.db.model('todos', mongoose.todoSchema)
  TodoModel.find(null).where({userId : id}).exec((err, comms) => {
    if (err) { throw err }
    callback(comms)
  })
}

module.exports.list = (id, callback) => {
  var TodoModel = mongoose.db.model('todos', mongoose.todoSchema)
  TodoModel.find(null).where({userId : id}).sort({completedAt: 'asc'}).exec((err, comms) => {
    if (err) { throw err }
    callback(comms)
  })
}

module.exports.switchState = (todoId,callback) => {
  var TodoModel = mongoose.db.model('todos', mongoose.todoSchema)
  TodoModel.findOne(null).where('_id', todoId).exec( (err, comm) => {
    if (err) { throw err }

    if(typeof comm.completedAt == 'undefined' || comm.completedAt == null || comm.completedAt == "") {
      TodoModel.update({ _id : comm._id}, {completedAt: Date.now()}, callback)
    } else {
      TodoModel.update({ _id : comm._id}, {completedAt: null}, callback)
    }

  })
}

module.exports.add = (userId, subject, callback) => {
  var TodoModel = mongoose.db.model('todos', mongoose.todoSchema)
  var newTodo = new TodoModel({
    userId : userId,
    subject : subject
  })
  newTodo.save(callback)
}

// TEAM

module.exports.listInTeam = (id, callback) => {
  var TodoModel = mongoose.db.model('todos', mongoose.todoSchema)
  TodoModel.find(null).where({team : id}).exec((err, comms) => {
    if (err) { throw err }
    callback(comms)
  })
}

module.exports.addInTeam = (userId, subject, team, forId, callback) => {
  var TodoModel = mongoose.db.model('todos', mongoose.todoSchema)
  var newTodo = new TodoModel({
    by : userId,
    subject : subject,
    team : team,
    to : forId,
  })
  newTodo.save(callback)
}
