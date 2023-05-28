// require packages used in the project 
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")
const bodyParser = require('body-parser')
const routes = require('./routes')

require('./config/mongoose')

// setting express
const app = express()
const port = 3000

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting routes
app.use(routes)

// setting template engine handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting methodOverride 
app.use(methodOverride("_method"))


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
