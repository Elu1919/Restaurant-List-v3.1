// require packages used in the project 
const express = require('express')
const restaurantList = require('./restaurant.json')
const Model = require('./function')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


// routes setting
/*GET*/
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toString().toLocaleLowerCase().trim()
  let restaurants = Model.searchRestaurants(keyword)

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => req.params.restaurant_id == restaurant.id)
  res.render('show', { restaurant: restaurant[0] })
})

/*POST*/



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
