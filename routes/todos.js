const router = require('express').Router()
const daoTodo = require('../lib/daoTodo.js')
const utils = require('../lib/utils.js')

// Changer l'etat d'un Todo
router.post('/switch/:id', (req, res, next) => {
  daoTodo.switchState(req.params.id, callback)
  function callback(datas) {
    res.format({
      html: () => {
        res.redirect('/todos')
      },
      json: () => {
        res.set(`Content-Type`, 'application/vnd.api+json')
        res.send({
          data: 'OK'
        })
      }
    })
  }
})

// Ajouter un Todo
router.post('/add', (req, res, next) => {
  daoTodo.add(utils.getUserId(req,res), req.body.subject, callback)
  function callback() {
    res.format({
      html: () => {
        res.redirect('/todos')
      },
      json: () => {
        res.set(`Content-Type`, 'application/vnd.api+json')
        res.send({
          data: "add OK"
        })
      }
    })
  }
})

// Lister les Todos
router.get('/', (req, res, next) => {
  daoTodo.list(utils.getUserId(req,res), callback)
  function callback(datas) {
    res.format({
      html: () => {
        res.render('todos/list', {
          todos: datas
        })
      },
      json: () => {
        res.set(`Content-Type`, 'application/vnd.api+json')
        res.send({
          data: datas
        })
      }
    })
  }
})

module.exports = router
