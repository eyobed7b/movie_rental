const jwt = require('jsonwebtoken')


module.exports = function auth(req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) return res.status(401).send("Access denied ")

    try {
        const decode = jwt.verify(token, "jsonPrivatekey")
        req.user = decode

        next()
    } catch (err) {
        res.status(401).send("invalid token")
    }
}