
// Afin de pointer vers le bon endroit pour le token
module.exports.getUserId = (req,res) => {
  res.format({
    html: () => {
      return req.session.user.id
    },
    json: () => {
      return req.headers.id
    }
  })
}
