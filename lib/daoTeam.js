const Redis = require('ioredis')
const redis = new Redis()

module.exports.add = (userId, name) => {
  let pipeline = redis.pipeline()
  pipeline.sadd('teams', name)
  pipeline.sadd('team:'+name, userId)
  pipeline.set('user:'+userId, name)
  return pipeline.exec()
}

module.exports.list = () => {
  return redis.smembers('teams')
}

module.exports.get = (userId) => {
  return redis.get('user:'+userId)
}

module.exports.join = (userId, name) => {
  let pipeline = redis.pipeline()
  pipeline.sadd('team:'+name, userId)
  pipeline.set('user:'+userId, name)
  return pipeline.exec()
}
