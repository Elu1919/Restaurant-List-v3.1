const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

/* GET */
// more information
router.get('/:id', (req, res) => {

  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// edit restaurant info
router.get('/:id/edit', (req, res) => {

  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

/* POST */
// add new restaurant
router.post('/', (req, res) => {

  const userId = req.user._id
  req.body = { ...req.body, userId }

  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


/* PUT */
// edit the info
router.put('/:id', (req, res) => {

  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

/* DELETE */
router.delete('/:id', (req, res) => {

  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOneAndRemove({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router