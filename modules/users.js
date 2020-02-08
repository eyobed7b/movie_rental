const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb://localhost/movie')
    .then(() => console.log("uwer mongodb is connected"))
    .catch(err => console.log(err.message))

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 250,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 1024
    },
    isAdmine: Boolean
})

UserSchema.methods.gererateAuthtoken = function() {
    const token = jwt.sign({ _id: this._id, isAdmine: this.isAdmine }, "jsonPrivatekey")
    return token
}

function userValidation(user) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().max(250).min(5).required(),
        password: Joi.string().max(1024).min(3).required()

    }
    return Joi.validate(user, schema)
}

const User = mongoose.model("users", UserSchema)


exports.UserSchema = UserSchema,
    exports.User = User
exports.validate = userValidation