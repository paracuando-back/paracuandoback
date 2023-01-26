const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')

require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET

const UsersService = require('../services/users.service')
const userService = new UsersService

const options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtSecret
}

passport.use(
  new JwtStrategy(options, (tokenDecoded, done) => {
    userService.getUserOr404(tokenDecoded.id)
      .then((user) => {
        if(user){
          done(null, tokenDecoded) //? Caso Exitoso, porque el usuario si existe
        } else {
          done(null, false) //? Caso fallido, en el que no genera error, pero no existe el usuario
        }
      })
      .catch((err) => {
        done(err, false) //? Caso fallido, en el que si genera un error
      })
  })
)

module.exports = passport

/*

// .............................................................................
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')

const jwtSecret = require('../../config').api.jwtSecret
const { findUserById } = require('../users/users.controllers')

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}

passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
            .then((user) => {
                if(user){
                    done(null, tokenDecoded) //? Caso Exitoso, porque el usuario si existe
                } else {
                    done(null, false) //? Caso fallido, en el que no genera error, pero no existe el usuario
                }
            })
            .catch((err) => {
                done(err, false) //? Caso fallido, en el que si genera un error
            })
    })
)

module.exports = passport

*/