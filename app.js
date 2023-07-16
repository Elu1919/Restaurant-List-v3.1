// require packages used in the project 
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')

require('./config/mongoose')

// setting express
const app = express()
const port = 3000

// setting template engine handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// use passport
usePassport(app)

// setting res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// setting routes
app.use(routes)

// setting methodOverride 
app.use(methodOverride("_method"))



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
