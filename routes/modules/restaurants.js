const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

/* GET */
// more information
router.get('/:id', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// add new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

// edit restaurant info
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

/* POST */
// add new restaurant
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


/* PUT */
// edit the info
router.put('/:id', (req, res) => {
  const { id } = req.params

  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/${id}`))
    .catch(err => console.log(err))
})

/* DELETE */
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router