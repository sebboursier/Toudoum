const router = require('express').Router()
const bcrypt = require('bcrypt-nodejs')
const daoUser = require('../lib/daoUser.js')


// Formulaire d'ajout d'un user
router.get('/add', (req, res, next) => {
  res.format({
    html: () => {
      res.render('users/add', {})
    },
    json: () => {
      let err = new Error('Bad Request')
      err.status = 400
      next(err)
    }
  })
})

// Ajout d'un user
router.post('/add', (req, res, next) => {
  let pseudo = req.body.pseudo
  let password = bcrypt.hashSync(req.body.password)
  daoUser.addUser(pseudo,password)
    .then((result) => {
      res.format({
        html: () => {
          if(result.data.etat) {
            res.redirect('/sessions')
          }
        },
        json: () => {
          res.set(`Content-Type`, 'application/vnd.api+json')
          res.send(result)
        }
      })
    })
})

// Liste des users
router.get('/', (req, res, next) => {
  daoUser.getAllUsers().then((users) => {
    res.format({
      html: () => { res.render('users/list', {
        users: users.data,
        title: `Liste des Utilisateurs`
      }) },
      json: () => {
        res.set(`Content-Type`, 'application/vnd.api+json')
        res.send(users)
      }
    })
  })
})

module.exports = router
