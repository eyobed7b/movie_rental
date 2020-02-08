const mongoose = require("mongoose")
const express = require('express')
const Customers = require('../modules/customers')
const router = express.Router()
const auth = require('../midlleware/auth')
    //



router.use(express.json())

router.get('/', async(req, res) => {
    let customer = await Customers.find()
    if (!customer) return res.status(404).send("customer is not found");
    res.send(customer)
})


router.get('/:id', async(req, res) => {
    let customer = await Customers.findById(req.params.id)
    if (!customer) return res.status(404).send("customer is not found");
    res.send(customer)
})
router.post('/', auth, async(req, res) => {
    let customer = new Customers({
        isGold: true,
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold

    })
    try {
        const result = await customer.save()
        res.send(customer)
    } catch (err) {
        res.send(err.message)
    }


})
router.put('/:id', auth, async(req, res) => {
    // let customer = await Customers.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone }, { new: true })
    let customer = await Customers.findById(req.params.id)
    if (customer) {
        customer.set({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        })
        try {
            customer.save()
        } catch (err) {
            res.status(400).send("erre ");
        }
    }

    if (!customer) return res.status(404).send("customer is not found");
    res.send(customer)
})
router.delete('/:id', async(req, res) => {
    let customer = await Customers.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send("customer is not found");
    res.send(customer)
})


module.exports = router;