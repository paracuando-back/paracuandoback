const express = require('express')
const routesUsers = require('./users.routes')
const routesAuth = require('./auth.routes')
const routesSign = require('./sign.routes')
const routesUserInfo = require('./user_info.routes')
const passportJWT = require('../middlewares/auth.middleware')
const adminRoleMiddleware = require('../middlewares/auth.checkers')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/sign-up', routesSign)
  router.use('/login', routesAuth)
  router.use('/user-info', passportJWT.authenticate('jwt', { session: false }), routesUserInfo)
  router.use('/users', passportJWT.authenticate('jwt', { session: false }), routesUsers)
  // other models here
}

module.exports = routerModels
