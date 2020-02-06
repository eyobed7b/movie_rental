const express = require('express')
const route = express.Router()
const { User, validate } = require('../modules/users')


route.post("/", async(req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let userCheck = await User.findOne({ email: req.body.email })
    if (userCheck) return res.status(500).send("User is registerd ")

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        user.save()
        res.send({
            name: user.name,
            email: user.email
        })
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = route