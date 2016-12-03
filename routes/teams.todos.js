const router = require('express').Router()
const daoTodo = require('../lib/daoTodo.js')
const daoTeam = require('../lib/daoTeam')
const utils = require('../lib/utils.js')

// Changer l'etat d'un Todo
router.post('/switch/:id', (req, res, next) => {
  daoTodo.switchState(req.params.id, callback)
  function callback(datas) {
    res.format({
      html: () => {
        res.redirect('/teams/todos')
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
  daoTeam.get(utils.getUserId(req,res)).then((team) => {
    daoTodo.addInTeam(utils.getUserId(req,res), req.body.subject, team, req.body.for, callback)
    function callback() {
      res.format({
        html: () => {
          res.redirect('/teams/todos')
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
})

// Lister les Todos
router.get('/', (req, res, next) => {

  daoTeam.get(utils.getUserId(req,res)).then((team) => {
    daoTodo.listInTeam(team, callback)
    function callback(datas) {
      res.format({
        html: () => {
          res.render('teams.todos/list', {
            todos: datas,
            teamName: team
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

})

module.exports = router
