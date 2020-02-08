const express = require('express')
const route = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, validate } = require('../modules/users')

route.use(express.json())
route.post("/", async(req, res) => {

    const { error } = validate(res.body)
    if (error) return res.status(400).send(error.details[0].message)

    let userCheck = await User.findOne({ email: req.body.email })
    if (userCheck) return res.status(500).send("User is registerd ")
    const salt = await bcrypt.genSalt(10)


    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.password = await bcrypt.hash(user.password, salt)

    try {
        user.save()
            //let token = user.generaAuthToke();
        let token = jwt.sign({ _id: user._id }, "jsonPrivateKey")
        res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]))
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = route