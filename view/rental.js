const express = require('express');
const { Rental } = require('../modules/rental')
const customer = require('../modules/customers');
const movie = require('../modules/movies')
const auth = require('../midlleware/auth')



const route = express.Router();

route.use(express.json())

route.get('/', async(req, res) => {
    try {
        let rental = await Rental.find()
        if (!rental) return res.status(400).send("Rental not setted")
        res.send(rental)
    } catch (err) {
        res.send(err.message)
    }


})
route.get('/:id', async(req, res) => {
    let rental = await Rental.findById(req.params.id)
    if (!rental) return res.status(400).send("Gener is not found")
    res.send(rental)

})
route.post('/', auth, async(req, res) => {



    let moviemo = await movie.Movie.findById(req.body.movieId)
    if (!moviemo) return res.status(400).send("Movie not found")
        // if (movie.numberInStock == 0) return res.send("No movie left")
    let customermo = await customer.findById(req.body.custId)
    if (!customermo) return res.status(400).send("NU customer is found")
        // res.send(`customer ${customermo}  movie ${moviemo}`)
    let rental = new Rental({
        movie: {
            _id: moviemo._id,
            title: moviemo.name,

        },
        customer: {
            name: customermo.name,
            phone: customermo.phone,

        },
        dateOut: req.body.dateOut,
        dateReturn: req.body.dateReturn,
        rentalFee: req.body.rentalFee
    })
    moviemo.numberInStock--;

    res.send(moviemo)
    try {
        rental.save()
        res.send(rental)
    } catch (err) {
        res.send(err)
    }


})
route.put('/:id', async(req, res) => {

})
route.delete('/:id', async(req, res) => {

})

module.exports = route;