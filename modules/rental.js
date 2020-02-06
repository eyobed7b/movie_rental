const mongoose = require('mongoose')

const Joi = require('joi')

mongoose.connect('mongodb://localhost/movie')
    .then(() => console.log("rental mongodb is connected "))
    .catch(err => console.log("rental  mongdb connection error ", err.message))

const rentalSchema = mongoose.Schema({

    movie: {
        type: new mongoose.Schema({
            title: String,
            rentalRate: Number
        })
    },
    customer: {
        type: new mongoose.Schema({
            name: String,
            phone: String,
        })
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturn: {

        type: Date,


    },
    rentalFee: {
        type: Number,

        min: 0
    }
})
const Rental = mongoose.model("Rental", rentalSchema)

exports.Rental = Rental;
exports.rentalSchema = rentalSchema