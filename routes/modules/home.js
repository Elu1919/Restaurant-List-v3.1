const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// home
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// search
router.get('/search', (req, res) => {

  const keyword = req.query.keyword.toString().toLocaleLowerCase().trim()

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      return Model.searchRestaurants(keyword, restaurantData)
    })
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(err => console.log(err))

})

module.exports = router