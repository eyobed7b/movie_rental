const mongoose = require('mongoose')

const gener = require('../view/genre')


mongoose.connect('mongodb://localhost/movie')
    .then(() => console.log("movie mongodb is connected "))
    .catch(err => console.log("movie mongdb connection error ", err.message))



const Movie = mongoose.model("Movie", new mongoose.Schema({
    name: { type: String, required: true },
    numberInStock: {
        type: Number,
        min: 0,
        required: true
    },
    rentalRate: {
        type: Number,
        required: true,
    },
    genre: gener.genreSchema,
    //  rental: rentalSchema

}))

module.exports.Movie = Movie