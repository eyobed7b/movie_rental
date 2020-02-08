const jwt = require('jsonwebtoken')
    // const auth = require('../midlleware/auth')

module.exports = function(req, res, next) {


    // res.send(req.user.isAdmine)
    if (!req.user.isAdmine) return res.status(403).send("access denied")


    next()

}