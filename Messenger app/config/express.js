const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
// const path = require('path')
const handlebars = require('express-handlebars')


module.exports = (app, config) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user
    }

    next()
  })

  // Set View Engine
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('view engine', 'hbs')

  // Configure "public" folder
  app.use(express.static('./public'))

  console.log('Express ready!')
}
