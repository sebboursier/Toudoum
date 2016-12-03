console.log('SERVER toudoum - Init')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sass = require('node-sass-middleware')
const methodOverride = require('method-override')
const sqlite = require('sqlite')
const session = require('express-session')

const daoSession = require('./lib/daoSession.js')

// Constantes et initialisations
const PORT = process.PORT || 8080
const app = express()

sqlite.open(`./db.sqlite`).then((result) => {
  return Promise.all([
    sqlite.run(`CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, pseudo, password)`),
    sqlite.run(`CREATE TABLE IF NOT EXISTS Sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user, token, createdAt, expiresAt)`)
  ])
}).then((result) => {

  // Configuration du serveur
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'pug')
  app.use(session({secret: 'toudoum'}))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(sass({
    src: path.join(__dirname, 'styles'),
    dest: path.join(__dirname, 'assets', 'css'),
    prefix: '/css',
    outputStyle: 'expanded'
  }))
  app.use(express.static(path.join(__dirname, 'assets')))
  app.use(methodOverride('_method'))

  // ROUTING Public
  app.use('/', require('./routes/index'))
  app.use('/sessions', require('./routes/sessions'))
  app.use('/users', require('./routes/users'))

  // Check Authentification
  app.use((req, res, next) => {

    function checkSession (id, token) {
      daoSession.checkSession(id, token).then((result) => {
        if(result) {
          next()
        } else {
          let err = new Error(`Vous n'êtes pas connecté!`)
          err.status = 404
          next(err)
        }
      })
    }

    res.format({
      html: () => {
        let id = null
        if(req.session.user) {
          id = req.session.user.id
        }
        checkSession(id, req.session.token)
      },
      json: () => {
        // POUR LE JON : il faut un champ id et un champ token dans le header.
        checkSession(req.headers.id, req.headers.token)
      }
    })
  })

  // ROUTING necessitant une Authentification
  app.use('/todos', require('./routes/todos'))
  app.use('/teams/todos', require('./routes/teams.todos'))
  app.use('/teams', require('./routes/teams'))

  // Erreur 404
  app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // Gestion des erreurs
  // Notez les 4 arguments !!
  app.use((err, req, res, next) => {
    // Les données de l'erreur
    let data = {
      message: err.message,
      status: err.status || 500
    }

    // En mode développement, on peut afficher les détails de l'erreur
    if (app.get('env') === 'development') {
      data.error = err.stack
    }

    // On set le status de la réponse
    res.status(data.status)

    // Réponse multi-format
    res.format({
      html: () => { res.render('error', data) },
      json: () => { res.send(data) }
    })
  })

  app.listen(PORT, () => {
    console.log('SERVER toudoum - Launch, port ',PORT)
  })

})
