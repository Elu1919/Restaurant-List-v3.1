// require packages used in the project 
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const restaurantList = require('./models/restaurant')
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

// setting static files
app.use(express.static('public'))


// routes setting
/*GET*/

// home
app.get('/', (req, res) => {
  const restaurants = restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.err(err))
})

// search
app.get('/search', (req, res) => {

  const keyword = req.query.keyword.toString().toLocaleLowerCase().trim()

  return restaurantList.find({})
    .lean()
    .then(restaurantData => {

      let restaurants = Model.searchRestaurants(keyword, restaurantData)
      console.log(`data: ${restaurantData}`)
      res.render('index', { restaurants, keyword })

    })
    .catch(err => console.log(err))

})

// more information
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// add new restaurant
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

/*POST*/
app.post('/restaurants', (req, res) => {
  return res.render('new')
})



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
