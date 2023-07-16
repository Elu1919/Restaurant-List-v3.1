const express = require('express')
const Restaurant = require('../../models/restaurant')
const Model = require('../../function')

const router = express.Router()

// home
router.get('/', (req, res) => {

  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// sort
router.get('/sort/:sortType', (req, res) => {
  const { sortType } = req.params
  let sorts = ""
  let mode = ""

  switch (sortType) {
    case "atoz":
      sorts = "name"
      mode = "ace"
      break

    case "ztoa":
      sorts = "name"
      mode = "des"
      break

    case "category":
      sorts = "category"
      mode = "ace"
      break

    case "location":
      sorts = "location"
      mode = "ace"
      break
  }

  console.log(sortType)
  console.log(sorts)
  console.log(mode)

  Restaurant.find()
    .lean()
    .sort({ sorts: mode })
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

// add new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

module.exports = router