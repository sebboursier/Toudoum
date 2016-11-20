const router = require('express').Router()
const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')
const daoUser = require('../lib/daoUser.js')
const daoSession = require('../lib/daoSession.js')

// Formulaire de connection d'un user
router.get('/', (req, res, next) => {
  res.format({
    html: () => {
      res.render('sessions/connect', {})
    },
    json: () => {
      let err = new Error('Bad Request')
      err.status = 400
      next(err)
    }
  })
})

// Accord d'une connection
router.post('/', (req, res, next) => {
  daoUser.getUserByPseudo(req.body.pseudo)
    .then((user) => {
      if (typeof user.data == "undefined") {
        res.format({
          html: () => {
            res.render('sessions/connect', {
              message: 'Pseudo incorrecte!'
            })
          },
          json: () => {
            res.set(`Content-Type`, 'application/vnd.api+json')
            res.send({
              data: 'Pseudo incorrecte!'
            })
          }
        })
      } else {
        if (bcrypt.compareSync(req.body.password, user.data.password)) {
          crypto.randomBytes(48, (err, buffer) => {
            let token = buffer.toString('hex')
            daoSession.addSession(user.data.id, token).then((result) => {
              res.format({
                html: () => {
                  req.session.token = token
                  req.session.user = user.data
                  res.render('sessions/ok', {
                    user: req.session.user
                  })
                },
                json: () => {
                  res.set(`Content-Type`, 'application/vnd.api+json')
                  res.send({
                    data: {
                      token: token
                    }
                  })
                }
              })
            }).catch((err) => {
              console.log(err)
            })
          })
        } else {
          res.format({
            html: () => {
              res.render('sessions/connect', {
                message: 'Mot de passe incorrecte!'
              })
            },
            json: () => {
              res.set(`Content-Type`, 'application/vnd.api+json')
              res.send({
                data: 'Mot de passe incorrecte!'
              })
            }
          })
        }
      }
    })
})

module.exports = router
