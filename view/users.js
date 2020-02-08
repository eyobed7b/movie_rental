const express = require('express')
const route = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, validate } = require('../modules/users')
const auth = require('../midlleware/auth')

route.use(express.json())
route.get('/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    } catch (err) {
        res.send(err.message)
    }
});

// route.get("/me", auth, async(req, res) => {
//     return res.send(req.user._id)
//     const user = await User.findById(req.user.id).select("-password")
//     res.send(user)
// })

route.post("/", async(req, res) => {

    const { error } = validate(res.body)
    if (error) return res.status(400).send(error.details[0].message)

    let userCheck = await User.findOne({ email: req.body.email })
    if (userCheck) return res.status(500).send("User is registerd ")
    const salt = await bcrypt.genSalt(10)


    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmine: req.body.isAdmine
    })

    user.password = await bcrypt.hash(user.password, salt)

    try {
        user.save()
        let token = user.gererateAuthtoken();
        //let token = jwt.sign({ _id: user._id }, "jsonPrivateKey")
        res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]))
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = route