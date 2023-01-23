require('dotenv').config()
const { comparePassword } = require('../utils/crypto')
// const UsersService = require('./users.service')
// UsersService.updateUser
// UsersService.getUserByEmail
const models = require('../database/models')

class AuthService {

  constructor() {

  }

  async checkUsersCredentials(email, password) {
    try {
      let user = await models.Users.findOne({
        where: {
          email: email
        }
      })
      const verifyPassword = comparePassword(password, user.dataValues.password)
      if (verifyPassword) {
        return user.dataValues
      }
      return null
    } catch (error) {
      return null
    }
  }

}

module.exports = AuthService