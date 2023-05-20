// require packages used in the project 
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require("method-override")

const Restaurant = require('./models/restaurant')
const Model = require('./function')

// setting express
const app = express()
const port = 3000

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


// routes setting ////////////////////////

/* GET */
// home
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// search
app.get('/search', (req, res) => {

  const keyword = req.query.keyword.toString().toLocaleLowerCase().trim()

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      return Model.searchRestaurants(keyword, restaurantData)
    })
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(err => console.log(err))

})

// more information
app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// add new restaurant
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

// edit restaurant info
app.get('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

/* POST */
// add new restaurant
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


/* PUT */
// edit the info
app.put('/restaurants/:id', (req, res) => {
  const { id } = req.params

  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

/* DELETE */
app.delete('/restaurants/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
