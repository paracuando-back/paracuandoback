const express = require('express')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')
const routesSign = require('./sign.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', /* isAuthenticatedByPassportJwt, */ routesUsers)
  router.use('/login', /* isAuthenticatedByPassportJwt, */ routesAuth)
  router.use('/sign-up', /* isAuthenticatedByPassportJwt, */ routesSign)
  // other models here
}

module.exports = routerModels
