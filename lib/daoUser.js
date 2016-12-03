const sqlite = require('sqlite')

module.exports.getAllUsers =  () => {
  return sqlite.all(`SELECT * FROM User`)
	 .then((result) => {
     return {
       data: result
     }
   }).catch((err) => {
     console.log(`ERR getAllUsers => ${err}`)
     return {
       errors: `Echec lors de la récuperation des Utilisateurs`
     }
   })
}

module.exports.getUserById = (id) => {
  return sqlite.get(`SELECT * FROM User WHERE id = ?`, id)
  	.then((result) => {
      return {
        data: result
      }
  	}).catch((err) => {
      console.log(`ERR getUserById:${id} => ${err}`)
      return {
        data: {message: `Echec lors de la récuperation d'un Utilisateur`, etat: `KO`}
      }
  	})
}

module.exports.getUserByPseudo = (name) => {
  return sqlite.get(`SELECT * FROM User WHERE pseudo = ?`, name)
  	.then((result) => {
      return {
        data: result
      }
  	}).catch((err) => {
      console.log(`ERR getUserByPseudo:${name} => ${err}`)
      return {
        data: {message: `Echec lors de la récuperation d'un Utilisateur`, etat: `KO`}
      }
  	})
}

module.exports.addUser = (pseudo, password) => {
  return sqlite.run(`INSERT INTO User (pseudo, password) VALUES (?,?)`, pseudo, password)
    .then((result) => {
      return {
        data: {message: `l'utilisateur a bien été ajouté`, etat: `OK`}
      }
    }).catch((err) => {
      console.log(`ERR addUser => ${err}`)
      return {
        data: {message: `Echec lors de l'ajout d'un Utilisateur`, etat: `KO`}
      }
  	})
}
