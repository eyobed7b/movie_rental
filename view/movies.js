const express = require('express');
const gener = require('./genre')
const route = express.Router();
const Joi = require('joi')
route.use(express.json());
const { Movie } = require('../modules/movies')



route.use(express.json());
route.get('/', async(req, res) => {
    let movie = await Movie.find()
    if (!movie) return res.send("NO movie registered")
    res.send(movie)
})

route.get('/:id', async(req, res) => {
    let movie = await Movie.findById(req.params.id).populate("genre", "name -_id")
    if (!movie) return res.status(400).send("movie is not found")

    res.send(movie);


})

route.put('/:id', async(req, res) => {
    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: res.body.name
    }, {
        new: true
    })
    if (!movie) return res.status(400).send("movie not found")
    try {
        movie.save()
        res.send(movie)

    } catch (err) {
        res.send(err.message)
    }





})
route.post('/', async(req, res) => {

    let genre = await gener.Genre.findById(req.body.genreId)
    console.log(genre)
    if (!gener) return res.status(400).send("Gener not found")

    let movie = await Movie.create({
        name: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        rentalRate: req.body.rentalRate


    })
    console.log(movie)
    try {
        await movie.save()
        res.send(movie)
    } catch (err) {
        res.send(err.message)
    }

})
route.delete('/:id', async(req, res) => {
    let movie = await Movie.findByIdAndDelete(req.params.id)
    if (!movie) return res.status(404).send("movie not found ")

})










// route.get('/', async(req, res) => {
//     // res.send(movies);
//     let movie = await Movie.find()
//     res.send(movie)
// })
// route.get('/:id', async(req, res) => {
//     let movie = await Movie.findById(req.params.id)
//     if (!movie) return res.status(404).send("movie not found")
//     res.send(movie);

// });
// route.put('/:id', async(req, res) => {
//     // let movie = await Movie.findById(req.params.id)
//     // movie.set({
//     //     name: req.body.name
//     // })
//     // let result = await movie.save()
//     // res.send(movie)
//     let movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
//         new: true

//     })
//     if (!movie) return res.status(404).send("movie is not found");
//     res.send(movie)
//     ``
//     // movies.push(mov);
//     // res.send(mov);
// });
// route.post('/', async(req, res) => {
//     movie = new Movie({ name: req.body.name })
//     result = await movie.save()
//     res.send(result)

// })
// route.delete('/:id', async(req, res) => {
//     movie = await Movie.findByIdAndRemove(req.params.id)
//     if (!movie) return res.status(404).send("movie is not found")
//    // let result = movie.delete()
//     res.send(movie)

// })

// function validation(movie) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     }
//     return Joi.validate(movie, schema);
// }

module.exports = route;