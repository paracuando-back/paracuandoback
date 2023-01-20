const express = require('express')
const routesUsers = require('./users.routes')
// const isAuthenticatedByPassportJwt = require('../libs/passport')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', /* isAuthenticatedByPassportJwt, */ routesUsers)
  // other models here
}

module.exports = routerModels
