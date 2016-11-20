const mongo = require('./myMongo.js')

console.log(mongo);

const todos = mongo.collection('users')

exports.list = function () {
  todos.find((err, result) => {
    console.log("oucoucoucoucou")
  })
}
