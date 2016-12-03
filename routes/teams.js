const router = require('express').Router()
const daoUser = require('../lib/daoUser.js')
const daoTeam = require('../lib/daoTeam.js')
const utils = require('../lib/utils.js')

// Joindre une Equipe
router.post('/join/:id', (req, res, next) => {
  daoTeam.join(utils.getUserId(req,res), req.params.id).then( () => {
    res.format({
      html: () => {
        res.redirect('/teams')
      },
      json: () => {
        res.set(`Content-Type`, 'application/vnd.api+json')
        res.send({
          data: 'OK'
        })
      }
    })
  })
})

// Ajouter une Equipe
router.post('/add', (req, res, next) => {
  daoTeam.add(utils.getUserId(req,res), req.body.name).then(() => {
    res.format({
      html: () => {
        res.redirect('/teams')
      },
      json: () => {
        res.set(`Content-Type`, 'application/vnd.api+json')
        res.send({
          data: "add OK"
        })
      }
    })
  })
})

// Recuperer la liste des Equipes
router.get('/', (req, res, next) => {
  daoTeam.get(utils.getUserId(req,res)).then((team) => {
    daoTeam.list().then((teams) => {
      res.format({
        html: () => {
          res.render('teams/list', {
            teamActuel: team,
            teams: teams
          })
        },
        json: () => {
          res.set(`Content-Type`, 'application/vnd.api+json')
          res.send({
            data: teams
          })
        }
      })
    })
  })
})

module.exports = router
