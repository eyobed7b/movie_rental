const express = require('express');
const app = express();
const movie = require('./view/movies');
const customer = require('./view/customers')
const genre = require('./view/genre')
const rental = require('./view/rental')
const user = require('./view/users')
const auth = require('./view/auth')


app.use(express.json())
app.use('/api/users', user)
app.use('/api/rentals', rental)
app.use('/api/customers', customer)
app.use('/api/movies', movie)
app.use('/api/genres', genre.route)
app.use('/api/auth', auth)


const port = process.env.port || 3000;
app.listen(port, () => console.log(`runnig on port ${port}`));