var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err)
  console.log("Connected correctly to server")
  db.close()
})

module.exports = MongoClient;
