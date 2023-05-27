// require packages used in the project 
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const routes = require('./routes')

const Restaurant = require('./models/restaurant')
const Model = require('./function')

// setting express
const app = express()
const port = 3000

// setting routes
app.use(routes)

// setting dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// setting mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))


// setting static files
app.use(express.static('public'))

// setting methodOverride 
app.use(methodOverride("_method"))


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
