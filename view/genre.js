const express = require('express');
const mongoose = require('mongoose')
const route = express.Router();
const Joi = require('joi')
const auth = require('../midlleware/auth')
const admine = require('../midlleware/admin')

mongoose.connect('mongodb://localhost/movie')
    .then(() => console.log("genre mongodb is connected "))
    .catch(err => console.log("genre  mongdb connection error ", err.message))

const genreSchema = mongoose.Schema({
    name: String
})
const Genre = mongoose.model("Genre", genreSchema)
route.use(express.json())

route.get('/', async(req, res) => {
    try {
        let genre = await Genre.find()
        if (!genre) return res.status(400).send("Genre not setted")
        res.send(genre)
    } catch (err) {
        res.send(err.message)
    }


})
route.get('/:id', async(req, res) => {
    let genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(400).send("Gener is not found")
    res.send(genre)

})
route.post('/', auth, async(req, res) => {
    let genre = new Genre({
        name: req.body.name
    })

    genre.save()
    res.send(genre)

})
route.put('/:id', auth, async(req, res) => {

})
route.delete('/:id', [auth, admine], async(req, res) => {
    let genre = await Genre.findByIdAndDelete(req.params.id)
    res.send("sertoal")
    if (!genre) return res.status(401).send("gener is not found")
    res.send("genre is deleted")
    genre.save()

})

module.exports.route = route;
module.exports.genreSchema = genreSchema
exports.Genre = Genre