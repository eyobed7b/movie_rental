const express = require('express')
const route = express.Router()
const Joi = require('joi')
const { User } = require('../modules/users')

route.use(express.json())

route.post("/", async(req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    const userCheck = await User.findOne({ email: req.body.email })
    if (!userCheck) return res.status(500).send("invalid email or password ")
    if (!(req.body.password == userCheck.password)) return res.status(500).send("invalid email or password ")

    res.send(`welcome ${userCheck.name}`)

})

function validate(user) {

    const schema = {

        email: Joi.string().max(250).min(5).required(),
        password: Joi.string().max(1024).min(3).required()

    }
    return Joi.validate(user, schema)
}


module.exports = route