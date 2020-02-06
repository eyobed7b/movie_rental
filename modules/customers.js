const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/movie')
    .then(() => console.log(" customer db is connected "))
    .catch(err => console.log("ere on custommer db connection ", err))


const Customers = mongoose.model("Customers", new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: {
        type: String,
        minLength: 4,
        maxLength: 250,
        required: true,
        uppercase: true
    },
    phone: { type: String, minLength: 50, maxLength: 250, required: true },
}));

module.exports = Customers;