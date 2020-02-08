const express = require('express')
const route = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../modules/users')
const jwt = require('jsonwebtoken')

route.use(express.json())

route.post("/", async(req, res) => {

    const { error } = validate(_.pick(req.body, ["email", "password"]))
    if (error) return res.status(400).send(error.details[0].message)


    const userCheck = await User.findOne({ email: req.body.email })
    if (!userCheck) return res.status(500).send("invalid email ")

    if (bcrypt.compare(userCheck.password, req.body.password)) {
        let token = jwt.sign({ _id: userCheck.id }, "jwtprivatekey")
        res.send(token)
    }

})

function validate(user) {

    const schema = {

        email: Joi.string().max(250).min(5).required(),
        password: Joi.string().max(1024).min(3).required()

    }
    return Joi.validate(_.pick(user, ["email", "password"]), schema)
}


module.exports = route