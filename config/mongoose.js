const mongoose = require('mongoose')

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


module.exports = db