const Redis = require('ioredis')
const redis = new Redis()

// Temps d'expiration d'un token
const expireTime = 3600;

module.exports.addSession = (userId, token) => {
  let pipeline = redis.pipeline()
  pipeline.set(`token:${userId}`, token)
  pipeline.expire(`token:${userId}`, expireTime)
  return pipeline.exec()
}

module.exports.checkSession = (userId, token) => {
  return redis.get(`token:${userId}`).then((result) => {
    if(typeof result == "string") {
      return true;
    } else {
      return false;
    }
  })
}
